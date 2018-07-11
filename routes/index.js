const db = require("../models");
// const userController = require("../controllers/userController");
const path = require("path");
// const router = require("express").Router();
// const apiRoutes = require("./api");
// const htmlRoutes = require("./html");
const express = require("express");
const app = express();
const passport = require("passport");
// module.exports = function(app, passport){
// // API Routes
// router.use("/api", apiRoutes);
// //html routes
// router.use("/app", htmlRoutes);

// // If no API routes are hit, send the React app
// router.use(function(req, res) {
//   res.sendFile(path.join(__dirname, "../client/build/index.html"));
// });

// }
// module.exports = router;

function isLoggedIn(req, res, next){
    //if user is authenticated in the session carry on
    if(req.isAuthenticated())
        return next();
    //if they aren't redirect them to the home page
    res.json(req.user);
}

module.exports = function(app, passport){
  app.get("/app/profile", isLoggedIn, function(req, res){
    const user = req.user;
    res.json(user);
  })

  app.get("/app/logout", function(req, res){
    req.logout();
    res.redirect("/");
  })
  app.get("/app/signup", function(req,res){
    res.sendStatus(200);
  })
  app.get("/login", function(req, res){
    res.sendStatus(200);
  })
  app.get("/app/searchUsers/:country", function(req, res){

      db.User.find({"local.country":req.params.country})
      .then(users=>{res.json(users)})
      .catch(err=>res.status(423).json(err))
  })
  app.get("/api/user/:id", function(req, res){
    console.log("hitting 'findUserInfo' route")
    db.User.find({_id:req.params.id})
    .then((dbUser)=>{
      res.json(dbUser);
    })
    .catch(err=> res.status(500).json(err));
  })

  //SENDING A FRIEND REQUEST (adding user who sent requested to "requests" array of target user, and adding target user to "panding" array)
  app.post("/api/request/:id", isLoggedIn, function(req,res){
    console.log("YAAAAAAYYY");
    const userId = req.params.id;
    req.user.update({ $addToSet: {"local.pending": userId }})
      .then(() => {
        return db.User.findOne({_id:userId});
      })
      .then((dbUser) => {
        return dbUser.update({$addToSet: {"local.requests": req.user._id}})
      })
      .then((query) => res.json({_id: userId, success: true}))
      .catch(err=>res.status(500).json(err));
  })

  //ACCEPTING A FRIEND REQUEST (removing from pending and requests array, and moving to friends array)
  app.post("/api/acceptfriend/:id", isLoggedIn, function(req, res){
    const id=req.params.id;
    console.log("reach accept friend route "+ id);
    req.user.update({$pull: {"local.requests": id}})
      .then(()=> {
        return db.User.findOneAndUpdate({_id: req.user._id},{$addToSet: {"local.friend": id}})
      })
      .then(()=> {
        return db.User.findOneAndUpdate({_id:id}, {$pull: {"local.pending": req.user._id}})
      })
      .then(()=>{
        return db.User.findOneAndUpdate({_id:id},{$addToSet:{"local.friend": req.user._id}})
      })
      .then(()=>{
        return db.Chat.create({participants:[id, req.user._id]});
      })
      .then((dbChat)=>{
        console.log("!!!!!!!!!!!!!!!!! ", dbChat);
        db.User.findOneAndUpdate({_id:req.user._id},{$addToSet: {"chats": dbChat._id}})
        .then(()=>{
          return db.User.findOneAndUpdate({_id:id}, {$addToSet: {"chats": dbChat._id}})
        })
        .catch(err=>console.log(err));
      })
      .then((query)=> res.json({success:true}))
      .catch(err=> res.status(500).json(err));
  })
  
  app.get("/api/friends/", isLoggedIn, function(req, res){
    console.log("hitting get route");
    const userId = req.user._id;
    db.User.findOne({_id:userId})
    // .populate("friend")
    .populate("local.pending")
    .populate("local.friend")
    .populate("local.requests")
    // {path:"friend"}, {path:"requests"}
    // .populate("requests")
    .then(function(dbUser){
      
      // console.log("populated USER !!!! %O" + dbUser);
      res.json(dbUser);
    })
    .catch(err=>{
      res.status(500).json(err);
      console.log(err)
    });
    // res.json(user.populate("user"));
  })

  app.get("/api/loadChats", isLoggedIn, function(req, res){
    console.log("hitting 'get chats' route");
    // db.Chat.find({ participants: req.user._id })
    // .populate('participants')
    // .then(chats => {
    //   res.json(Object.assign({}, req.user.toJSON(), { chats }));
    // });
    db.Chat.find({ participants: req.user._id }).populate('participants').then(function(chats) {
      res.json(Object.assign({}, req.user._doc, { chats }));
    })
    // db.User.findOne({_id: req.user._id})
    // //.populate('chats')
    // .then(function(dbUser){
    //   console.log('DB User: ' + dbUser);
    //   return db.Chat.find({ participants: dbUser._id }).populate('participants').then(function(chats) {
    //     res.json(Object.assign({}, dbUser, { chats }))
    //   });
    // })
    .catch(err=>{
      res.status(500).json(err);
      console.log(err);
    })
  })

  app.post("/app/signup", passport.authenticate("local-signup", {
    successRedirect: "/app/profile",
    failureRedirect:"/app/signup",
    failureFlash: true
  }))

  app.post("/login", passport.authenticate("local-login", {
    successRedirect:"/app/profile",
    failureRedirect:"/login",
    failureFlash: true
  }));

  
}

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

  // app.get('/api/loginFailure', function(req, res) {
  //   res.status(401).json({message: 'Login Failed', success: false});
  // });

  // app.get('/api/loginSuccess', function(req, res) {
  //     res.status(200).json({message:'Welcome!', success: true});
  // });

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

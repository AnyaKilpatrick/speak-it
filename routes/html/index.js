// const router = require("express").Router();
// const userController = require("../../controllers/userController");

// const passport= require("passport");

// function isLoggedIn(req, res, next){
//     //if user is authenticated in the session carry on
//     if(req.isAuthenticated())
//         return next();
//     //if they aren't redirect them to the home page
//     res.redirect("/");
// }
// //matching /app/profile
// router.route("/app/profile", isLoggedIn)
// .get(userController.create)
// //matching /app/signup
// router.route("/signup", passport.authenticate("local-signup", {
//     successRedirect:"/app/profile", //redirect to the secure profile section
//     failureRedirect: "/app/signup", //redirect back to the signup page if there is an error
//     failureFlash: true //allow flash messages
// })).post(userController.create);

// // router.route("/:id")
// // .put(articleController.deleteArticle)

// module.exports = router;
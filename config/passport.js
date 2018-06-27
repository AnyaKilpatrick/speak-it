const LocalStrategy = require("passport-local").Strategy;

// load up the user model
const User = require("../models/user");

// expose this function to our app using module.exports
module.exports = function(passport){
    //passport session set up

    //required for persistent login sessions
    //passport needs ability to serialize and unserialize users out of session

    //used to serialize the user for the session
    passport.serializeUser(function(user, done){
        done(null, user.id);
    })
    //used to deserialize the user
    passport.deserializeUser(function(id, done){
        User.findById(id, function(err, user){
            done(err, user);
        });
    });

    //===================================LOCAL SIGNUP==================================
    //we use named strategies because we have one for login and one forsignup
    //be default, if there was no name, it would just be called "local"

    passport.use("local-signup", new LocalStrategy({
        //by default local strategy uses username and password
        usernameField: "username",
        passwordField: "password",
        passReqToCallback: true //allows us to pass back the entire request to the callback

    },
    function(req, username, password, done){
        console.log("reached passport local-signup");
        //asynchronous
        //User.finOne won't fire unless data is sent back
        process.nextTick(function(){
            console.log(JSON.stringify(req.body));
            console.log("username "+ username);
            //find a user whose username is the sameas the forms username
            //we are checking to see if the user trying to signup already exists
            User.findOne({"local.username":username}, function(err, user){
                console.log("error "+err);
                console.log("found user? " + user);
                //if thereare any errors, return the error
                if(err) {
                    console.log("OOPS.ERROR");
                    return done(err);
                }  
                //check to see if there is already a user with that username
                else if(user) {
                    console.log("this username is already taken");
                    return done(null, false, req.flash("signupMessage", "That username is already taken"));
                }else{
                    console.log("good!this user doesn't exist yet")
                    //if there is no user with that username
                    //create the user
                    const newUser= new User();
                    //set the user's local credentials
                    newUser.local.username = username;
                    newUser.local.password = newUser.generateHash(password);
                    newUser.local.nativeLang = req.body.nativeLang;
                    newUser.local.country = req.body.country;
                    newUser.local.age = req.body.age;
                    newUser.local.aboutUser = req.body.aboutUser;
                    newUser.local.fullname=req.body.fullname;

                    //save the user
                    newUser.save(function(err){
                        if(err) {
                            console.log("failed on saving new user");
                            throw err;   
                        }
                        return done(null, newUser);
                    })
                }
            })
        })
    }
    ))

        //====================LOCAL LOGIN=================
        passport.use("local-login", new LocalStrategy({
            usernameField: "username",
            passwordField: "password",
            passReqToCallback: true
        },
        function(req, username, password, done){ //callback with username and password from the form
            //find a user whose username is the same as the forms username
            //we are checking to see if the user trying to login already exists
            console.log("hitting local login");
            User.findOne({"local.username": username}, function(err, user){
                if(err){
                    console.log("OOPS.ERR");
                    return done(err);
                }
                    
                //if no user is found
                else if(!user) {
                    console.log("no user found");
                    return done(null, false, req.flash("loginMessage", "No user found"));
                } 

                //if the user is found but the password is wrong
                else if(!user.validPassword(password)){
                    console.log("not matching password");
                    return done(null, false, req.flash("loginMessage", "Ooops! Wrong passsword"));
                }
                else{ 
                // if user and password match
                console.log("matching password and username");
                return done(null, user);
                }
            });
        }
    ))

}


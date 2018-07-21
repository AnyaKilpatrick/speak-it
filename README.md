# SpeakIT

SpeakIT 2.0
(Final Solo Project for the University of Richmond Coding Boot Camp)

Website [here](https://speak-it-2.herokuapp.com/)

We've all wanted to learn different languages but the existing methods (classes, online tutorials, etc.) don't cut it for learning how to speak conversationally; I wanted to create an experience where users can connect to learn from fluent speakers of other languages and at the same time make new friends. 

Design is both unique and simplistic. App is mobile-friendly and comfortable to use on any size of screen.

All app is built around user. 

* Comfortable UI, responsive navbar with intuitive icons and clean material animations.

* Indicating users' online status with a green ring around the avatar.

* Interactive map on profile page (with colored countries when user has a friend from there)

* Incoming and outgoing friend requests

* Live chat with persistent history.


## Authentication

`Passport.js`

Passport is authentication middleware for Node.js. Extremely flexible and modular.

Authenticating requests is as simple as calling passport.authenticate() and specifying which strategy to employ. authenticate()'s function signature is standard Connect middleware, which makes it convenient to use as route middleware in Express applications.

Ex:

routes.js
```javascript
    app.post("/signup", passport.authenticate("local-signup", {
        successRedirect : "/profile", // redirect to the secure profile section if user was successfully authenticated
        failureRedirect : "/signup", // redirect back to the signup page if there is an error
    }));

```

Passport uses what are termed strategies to authenticate requests.

Before asking Passport to authenticate a request, the strategy (or strategies) used by an application must be configured.

Strategies, and their configuration, are supplied via the use() function. For example, the following uses the LocalStrategy for username/password authentication.


`config/passport.js`
```javascript
passport.use("local-login", new LocalStrategy({
        usernameField: "username",
        passwordField: "password",
        passReqToCallback: true
    },
    function(req, username, password, done){ //callback with username and password from the form
        //find a user whose username is the same as the forms username
        //checking to see if the user trying to login already exists
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
))}
```
Instead of a password string, app is storing in database a generated hash key. For that was used `bcrypt-nodejs` npm package. It allows app an encoding of UTF-8 encoded strings.

`models/user.js`
```javascript
//generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
//checking if password is valid
userSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.local.password);
};
```

To avoid making a get request to the backend all the time, what would slow down the work of a web site, when user logs in, app stores a data of an authenticated user in a session storage. When person logs out or closes tab, app clears the storage.

I am building a function in utils folder. What is easily accessible, and keeps us from reapeating a code (as I call this function many times throughout the app)

`client/src/utils/Auth.js`
```javascript
export function getUser() {
    return sessionStorage.user ? JSON.parse(sessionStorage.user) : null;
}
```


## Direction for the future development

* Filter search results by age, gender, add a search by username or language
* Improve a profile page of users. When you look at friend's page show a current time in town where this friend is from.
* Including Google translator to allow users to select a language while chatting so they could have the text translated
* Clubs where people can come together as groups and meet
* Disable "send friend request" button,  when the user is already among your friends
* Ability to delete friends
* Ability to block friends
* Pictures of the users

## More content will be added by 7/23/2018


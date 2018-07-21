const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3001;
const socketPort = 8000;


//setting up Passport
const passport = require("passport");
const flash = require("connect-flash");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");


require("./config/passport")(passport); //pass passport for configuration

// Define middleware here
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  // app.use("*", express.static("client/build"));
}
app.use(morgan("dev")); //log every request to the console
app.use(cookieParser()); // read cookies (for auth)

// app.set("view engine", "ejs"); //set up ejs for templating

app.use(session({ secret: "ilovescotchscotchyscotchscotch"})); //session secret
app.use(passport.initialize());
app.use(passport.session()); //persistent login sessions
app.use(flash());

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/speakit-db");
// Add routes, both API and view
// app.use(routes);
require("./routes")(app, passport);

// Start the API server
// const expressServer = app.listen(PORT, function() {
//   console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
// });

var server = require('http').Server(app);
var io = require('socket.io').listen(server);
io.on("connection", require("./socket.js"));//importing socket.io methods

// app.listen(PORT, function() {
//   console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
// });
server.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
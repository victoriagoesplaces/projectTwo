require("dotenv").config();
var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var cookieParser = require("cookie-parser");

//Authentication packages
var session = require("express-session");
var SessionStore = require('express-session-sequelize')(session.Store);
var passport = require("passport");
var LocalStrategy = require('passport-local').Strategy;
//var MySQLStore = require("express-mysql-session")(session);
var bcrypt = require('bcrypt');


var db = require("./models");


var app = express();
var PORT = process.env.PORT || 8080;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(cookieParser());
 
//sets up approptiate to allow sessions to continue
/*
var options = {
  host: "localhost",
  user: "root",
  password: "root",
  database: "workout_db",
  port: process.env.dbport,
};
var sessionStore = new MySQLStore(options);
*/
var sessionStore = new SessionStore({
  db: db.sequelize
});

//set use for express-session
//this portion creates the cookie for each session
app.use(session({
  secret: "lotsofwordsandstuffthiscanberandomtext",//this is like a salt for a hashing function. It should be random text
  resave: false, //session only saves when a change is made
  store: sessionStore,
  saveUninitialized: false, //only creates a cookie if the user logs in
  //cookie: {secure: true}
}));
//sets up use for authentication
app.use(passport.initialize());
app.use(passport.session());

//tells passport we are using a local databse for authentication checks
passport.use(new LocalStrategy(function (username, password, done) {
  console.log(username);//this needs to be called username
  console.log(password);// this needs to be called password

  db.User.findOne({
    where: {
      email: username
    }
  }).then(function (dbUser) {

    console.log("In local strategy with userId");
    console.log(dbUser.id);

    if (!dbUser) {
      console.log("not a valid user");
      return (null, false);
    };
    console.log("valid user");
    const hash = dbUser.password;

    bcrypt.compare(password, hash, function (err, response) {
      if (err) throw err;
      if (response === true) {
        console.log('True portion, redirect should work to matches')
        return done(null, dbUser.id);
      } else {
        console.log("False portion, redirect should work to login")
        return done(null, false);
      }
    });

  });//end database call to get user trying to login

})); //end passport local-strategy set up

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function () {
  app.listen(PORT, function () {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;

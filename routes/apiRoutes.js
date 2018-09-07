//require bcrypt as our hashing algorithm
var bcrypt = require("bcrypt");
const saltRounds = 10;

//require passport
var passport = require("passport");

//require the databse
var db = require("../models");

module.exports = function (app) {
  // Get all examples
  app.get("/api/examples", function (req, res) {
    db.Example.findAll({}).then(function (dbExamples) {
      res.json(dbExamples);
    });
  });

  // Post route to add a new user to the database and send the new user to the survey
  //The path for this route should match the path for the submit button on the register a new user
  app.post("/api/createnewuser", function (req, res) {

    //read in data from the submission from the registration page


    //hash the password with bcrypt for secure storage in the databse
    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {

      newUser = {
        email: req.body.userEmail,
        password: hash
      };

     

      //sequelize send info to database
      //need to match name to model name, placeholder as user for now
      db.User.create(newUser).then(function (dbUser) {

        var userId = dbUser.id;

        //logs in user if profile creation succeeds
        if (userId) {
          
          req.login(userId, function (err) {
            var newPath = "/survey"// + "/" +userId //uncomment when individual id paths are ready

            res.json({
              "redirect": true,
              "redirect_url": newPath
            });
          });
        }

      });
    });
  });//end register a user


  //This route logs a user in from the login page
  app.post("/api/authenticateuser", passport.authenticate("local", {
    successRedirect: '/matches',
    failureRedirect: '/login'
  }));

  app.get('/logout', function (req, res) {
    req.logout();
    req.session.destroy();
    res.redirect('/');
  });


  //This route takes the survey submission from the survey page, sends then to the database, then redirects the user to the matches page
  app.put("/api/updatesurvey", authenticationMiddleware(), function (req, res) {
  

    var survey = req.body;
    var currentUser = req.user;

    db.User.update(
      survey,
      {where: {
        id: currentUser
      }}
    ).then(function (err) {
      res.json({
        "redirect": true,
        "redirect_url": "/matches"
      });
    });

  });//end update api route

  //this route displays the profile of a single match when chosen from the matches screen

  
  app.post("/transfer", authenticationMiddleware(), function(req, res) {

  console.log()

    newRoute = "/profile/" + req.body.id
    

    res.json({
      "redirect": true,
      "redirect_url": newRoute
    });


  });//end get individual profile route

  


  //This route adds a review to the database and resends the user to the /profile/:id page
  app.post("/review", authenticationMiddleware(), function(req, res) {
   

      db.Review.create(
        req.body
      ).then(function (err) {
        
       // if (err) throw err;
        res.end();
      /*res.json({
        "redirect": true,
        "redirect_url": "/profile/" + req.body.id
      });*/
    });

      
  });


  // Delete an example by id
  app.delete("/api/examples/:id", function (req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function (dbExample) {
      res.json(dbExample);
    });
  });
};


passport.serializeUser(function (userId, done) {
  done(null, userId);
});

passport.deserializeUser(function (userId, done) {
  done(null, userId);
});


//call this function to allow access only to signed in and authenticated users.
function authenticationMiddleware() {
  return (req, res, next) => {

    if (req.isAuthenticated()) return next();

    res.redirect('/login');
  };
};
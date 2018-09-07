var db = require("../models");

module.exports = function (app) {
  // Load index page-landing page
  app.get("/", function (req, res) {
    res.render("index", {});

  });

  //login page
  app.get("/login", function (req, res) {
    res.render("login", {
    });

  });

  //signup page
  app.get("/signup", function (req, res) {
    res.render("signup", {
    });

  });

  //survey
  //JVE changing route to be called createnewuser which will redirect to /survey upon adding a new user
  app.get("/survey", authenticationMiddleware(), function (req, res) {

    res.render("survey", {

    });
  });

  //return matches when selected

  app.get("/matches", authenticationMiddleware(), function (req, res) {

    var matchesObject = {
      matchesArray: []
    };
  

    var currentUser = req.user;

    //datbse calls to get get current user info, then to get all users to allow looping for comparison algorithm
    db.User.findOne({
      where: { id: currentUser }
    }).then(function (userInfo) {


      db.User.findAll({}).then(function (allUsers) {

        //loop to compare each user to the current user and increment the count for matches




        //loop through all users in the database
        for (i = 0; i < allUsers.length; i++) {
          if (currentUser !== allUsers[i].id) {

            var matchCompatibility = 0;
            var userResponse = createAnswerArray(userInfo);
            var allResponse = createAnswerArray(allUsers[i]);

            //check answers of user vs a single other user
            for (j = 0; j < allResponse.length; j++) {
              if (allResponse[j] == userResponse[j]) {
                matchCompatibility = matchCompatibility + 1;
              };

            };//close j loop through questions

            //adds match to the user array
            if (matchCompatibility > 5) {

              allUsers[i].compatibility = matchCompatibility;

              matchesObject.matchesArray.push(allUsers[i]);
              //matchesObject.matchScoreArray.push(matchCompatibility);

            };//end match compatibility check
          };//end check to ensure user is not compared to their own survey

        };

      }).then(function () {

        res.render("matches", matchesObject);
      });
    });
  });

  //Route to access individual profiles
  app.get("/profile/:id", authenticationMiddleware(), function (req, res) {

    console.log("Parameters for Profile");
    console.log(req.params.id);

    db.User.findOne({
      include: [{
        model: db.Review
      }],
      where: {
        id: req.params.id
      }
    }).then(function (dbMatch) {

      console.log(dbMatch);

      res.render("profile", dbMatch);
    });

  });

  //profile and reviews
  app.get("/matches/:id/profile", function (req, res) {
    res.render("profile", {
      // msg: "Welcome!",
      // examples: workout_db
    });
  });


  //add Review
  app.get("/matches/:id/addreview", function (req, res) {
    res.render("addreview", {
      // msg: "Welcome!",
      // examples: workout_db
    });
  });

  // // Load example page and pass in an example by id
  // app.get("/example/:id", function(req, res) {
  //   db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
  //     // res.render("example", {
  //     //   example: dbExample
  //     // });
  //   });
  // });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};

//call this function to allow access only to signed in and authenticated users.
function authenticationMiddleware() {
  return (req, res, next) => {

    if (req.isAuthenticated()) return next();

    res.redirect('/login');
  };
};


//create an array of question responses from the object returned from the database
function createAnswerArray(databaseObject, answerArray) {
  var answerArray = [];

  answerArray.push(databaseObject.question1);
  answerArray.push(databaseObject.question2);
  answerArray.push(databaseObject.question3);
  answerArray.push(databaseObject.question4);
  answerArray.push(databaseObject.question5);
  answerArray.push(databaseObject.question6);
  answerArray.push(databaseObject.question7);
  answerArray.push(databaseObject.question8);
  answerArray.push(databaseObject.question9);
  answerArray.push(databaseObject.question10);

  return answerArray;

}; //end create answer array



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
      // msg: "Welcome!",
      // examples: dbExamples
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

    currentUser = req.user.userId;

    //datbse calls to get get current user info, then to get all users to allow looping for comparison algorithm
    db.User.findOne({
      where: {id: currentUser}
    }).then(function(userInfo){
      console.log("XXXXXXXXXXXXXXXX");
      console.log(userInfo.id);
      db.User.findAll({}).then(function(allUsers){
        console.log("XXXXXXXXXXXXXXXX");
        //loop to compare each user to the current user and increment the count for matches
         var matchCompatibility = 0;

         for (i=0; i<allUaers.length; i++) {
          if (currentUser !== allUsers[i].id) {
            ///////////////////////////////////////
              /// Input code here for comparisions
            ///////////////////////////////////////

            //adds match to the user array
            if (matchCompatibility > 5) {
              matchesObject.matchesArray.push(allUsers[i]);
            }
          }//end check to ensure user is not compared to their own survey
         }

        //
      });
    });

    res.render("matches", matchesObject)
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

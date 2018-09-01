var db = require("../models");

module.exports = function(app) {
  // Load index page-landing page
  app.get("/", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("index", {
      });
    });
  });

  //login page
  app.get("/login", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("login", {
      });
    });
  });

//signup page
  app.get("/signup", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("signup", {
        // msg: "Welcome!",
        // examples: dbExamples
      });
    });
  });

  //survey
  app.get("/survey", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("survey", {
        // msg: "Welcome!",
        // examples: dbExamples
      });
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
  app.get("*", function(req, res) {
    res.render("404");
  });
};

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
      name: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING,
      photo: DataTypes.STRING,
      location: DataTypes.STRING, 
      age: DataTypes.INTEGER,
      question1: DataTypes.INTEGER,
      question2: DataTypes.INTEGER,
      question3: DataTypes.INTEGER,
      question4: DataTypes.INTEGER,
      question5: DataTypes.INTEGER,
      question6: DataTypes.INTEGER,
      question7: DataTypes.INTEGER,
      question8: DataTypes.INTEGER,
      question9: DataTypes.INTEGER,
      question10: DataTypes.INTEGER
    });

    User.associate = function(models) {
      User.hasMany(models.Review, {
        onDelete: "cascade"
      });
    };

    return User;
  }; 
 

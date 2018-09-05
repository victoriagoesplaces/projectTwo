module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
      name: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING,
      photo: DataTypes.STRING,
      location: DataTypes.STRING,
      age: DataTypes.INTEGER,
      
    });
    return User;
  };
  
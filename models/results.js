module.exports = function(sequelize, DataTypes) {
    var Results = sequelize.define("Results", {
      name: DataTypes.STRING,
      photo: DataTypes.STRING,
      location: DataTypes.STRING,
      email: DataTypes.STRING
    });
    return Results;
  };
module.exports = function(sequelize, DataTypes) {
    var Review = sequelize.define("Review", {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      rating: DataTypes.INTEGER
    });
    return Review;
  };
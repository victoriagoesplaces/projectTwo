module.exports = function(sequelize, DataTypes) {
    var Review = sequelize.define("Review", {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      rating: DataTypes.INTEGER
    });

    Review.associate = function(models) {
      Review.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      });
    };

    return Review;
  };
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Personality = sequelize.define('Personality', {
    name: DataTypes.STRING,
    title: DataTypes.STRING,
    location: DataTypes.STRING,
    bio: DataTypes.STRING
  }, {});
  Personality.associate = function(models) {
    // associations can be defined here
  };
  return Personality;
};
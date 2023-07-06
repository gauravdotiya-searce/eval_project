module.exports = function (sequelize, DataTypes) {
  let Note = sequelize.define("note", {
    note_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Note;
};

const { Sequelize } = require("sequelize");
const dbConfig = {
  username: "postgres",
  password: "gaurav",
  database: "eval_db",
  host: "localhost",
  dialect: "postgres",
  logging: false,
  timezone: "+05:30",
  dialectOptions: {
    useUTC: false,
  },
};
const sequelize = new Sequelize(dbConfig); // initializing database connection with connection parameters

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

//MODELS
db.Note = require("./Note.js")(sequelize, Sequelize);
db.User = require("./User.js")(sequelize, Sequelize);

//ASSOCIATIONS

db.User.hasMany(db.Note, { foreignKey: "user_id" }); //A user can have multiple notes and each note belongs to one user only
db.Note.belongsTo(db.User, { foreignKey: "user_id" });

module.exports = db;

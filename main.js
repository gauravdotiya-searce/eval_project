const db = require("./models/db");
const app = require("./app");
require("dotenv").config();
const port = process.env.PORT;
const start_server = async () => {
  await db.sequelize.authenticate();
  await db.sequelize.sync({ force: false });
  console.log("Connect to postgres");
  app.listen(port, () => {
    console.log(`Backend up on port ${port}`);
  });
};
try {
  start_server();
} catch (error) {
  console.log(error);
}

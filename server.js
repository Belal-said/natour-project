const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");
const dns = require("dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE;
mongoose
  .connect(DB)
  .then((con) => {
    console.log("DB connected successfully");
  });

// Running the app ( server )
const port = process.env.PORT || 3500;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});

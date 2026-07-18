const dotenv = require("dotenv");
const app = require("./app");
const mongoose = require("mongoose");
dotenv.config({ path: "./config.env" });
const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);


const DB = process.env.DATABASE;
mongoose
  .connect(DB)
  .then(() => console.log("DB connected successfully"))
  .catch((err) => console.error(err));


// Running the app ( server )
const port = process.env.PORT || 3500;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});

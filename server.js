const dotenv = require("dotenv");
const app = require("./app");

dotenv.config({ path: "./config.env" });

console.log(process.env);

// Running the app ( server )
const port = process.env.PORT || 3500;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});

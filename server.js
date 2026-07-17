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

// Creating Schema
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true
  },
  rating: {
    type: Number,
    default: 4.5
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price']
  }
})

// Creating Schema Model
const Tour = mongoose.model('Tour', tourSchema);

// Running the app ( server )
const port = process.env.PORT || 3500;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});

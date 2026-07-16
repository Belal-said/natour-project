const app = require('./app')

// Running the app ( server )
const port = 3500;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});

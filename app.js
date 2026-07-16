// Requiring express moduel ( package )
const fs = require("fs");
const express = require("express");
const app = express();
const morgan = require('morgan')

// MIDDLEWARES
// first middelware
app.use(morgan('dev'));

// second middleware
app.use(express.json());

// third middleware
app.use((req, res, next) => {
  console.log('Hello from the middleware');
  next();
})

// fourth middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
})

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`),
);

// REQUEST HANDLERS
// get request method under routing
const getAllTours = function (req, res) {
  // req, res function here is called route handler
  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours
    },
  });
};

// get one tour
const getTour = function (req, res) {
  const id = req.params.id * 1; // Converts id from string to number
  const tour = tours.find((el) => el.id === id);

  if (!tour) {
    res.status(404).json({
      status: "fail",
      message: "Tour Not found",
    });
  }

  res.status(200).json({
    // res.json sends a json response to the client.
    status: "success",
    data: {
      tour,
    },
  });
};

// create tour
const createTour = function (req, res) {
  console.log(req.body);

  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours), // Converts a JavaScript object into a JSON string.
    (err) => {
      res.status(201).json({
        status: "success",
        data: {
          tour: newTour,
        },
      });
    },
  );
};

// update tour
const updateTour = function (req, res) {
  const id = req.params.id * 1; // Converts id from string to number
  const tour = tours.find((el) => el.id === id);

  Object.assign(tour, req.body); // method that copies the properties from one object into another
  // the target object here is tour
  // the source here is the req.body

  fs.writeFile(
    "./dev-data/data/tours-simple.json",
    JSON.stringify(tours),
    (err) => {
      if (err) {
        return res.status(500).json({
          status: "error",
          message: "Could not save data",
        });
      }
    },
  );

  res.status(200).json({
    status: "success",
    data: {
      tour,
    },
  });
};

// delete tour
const deleteTour = function (req, res) {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: "fail",
      data: null,
    });
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
};

// app.get("/api/v1/tours", getAllTours);
// app.get("/api/v1/tours/:id", getTour);
// app.post("/api/v1/tours", createTour);
// app.patch("/api/v1/tours/:id", updateTour);
// app.delete("/api/v1/tours/:id", deleteTour);

app
  .route("/api/v1/tours")
  .get(getAllTours)
  .post(createTour);

app
  .route("/api/v1/tours/:id")
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

// Running the app ( server )
const port = 3500;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});

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
const getAllTours = (req, res) => {
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
const getTour = (req, res) => {
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
const createTour = (req, res) => {
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
const updateTour = (req, res) => {
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
const deleteTour = (req, res) => {
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

// get all users
const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'Error',
    message: 'This route is not yet defined'
  })
};

// get a user
const getUser = (req, res) => {
  res.status(500).json({
    status: 'Error',
    message: 'This route is not yet defined'
  })
};

// create a user
const createUser = (req, res) => {
  res.status(500).json({
    status: 'Error',
    message: 'This route is not yet defined'
  })
};

// update a user
const updateUser = (req, res) => {
  res.status(500).json({
    status: 'Error',
    message: 'This route is not yet defined'
  })
};

// delete a user
const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'Error',
    message: 'This route is not yet defined'
  })
};


// ROUTER
const tourRouter = express.Router();
const userRouter = express.Router();

tourRouter
  .route("/")
  .get(getAllTours)
  .post(createTour);

tourRouter
  .route("/:id")
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

userRouter
  .route("/")
  .get(getAllUsers)
  .post(createUser);

userRouter
  .route("/:id")
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// Running the app ( server )
const port = 3500;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});

const fs = require('fs')
const Tour = require('./../models/tourModel.js')

// check Id 
// exports.checkID = (req, res, next, val) => {
//   const id = req.params.id * 1; // Converts id from string to number
//   const tour = tours.find((el) => el.id === id);

//   if (!tour) {
//     res.status(404).json({
//       status: "fail",
//       message: "Invalid ID",
//     });
//   }
//   next();
// };

// check body
exports.checkBody = (req, res, next) => {
  if (!Object.hasOwn(req.body, "name") || !Object.hasOwn(req.body, "price")) {
    return res.status(400).json({
      status: 'fail',
      message: 'missing name or price'
    })
  }
  next();
}

// get request method under routing
exports.getAllTours = (req, res) => {
  // req, res function here is called route handler
  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime
    // results: tours.length,
    // data: {
    //   tours
    // },
  });
};
// get one tour
exports.getTour = (req, res) => {
  res.status(200).json({
    // res.json sends a json response to the client.
    status: "success",
    // data: {
    //   tour,
    // },
  });
};

// create tour
exports.createTour = (req, res) => {
  res.status(200).json({
    // res.json sends a json response to the client.
    status: "success",
    // data: {
    //   tour,
    // },
  });
};

// update tour
exports.updateTour = (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      tour: 'Updated Tour Here'
    },
  });
};

// delete tour
exports.deleteTour = (req, res) => {
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

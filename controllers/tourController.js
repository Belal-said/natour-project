const fs = require('fs')
const Tour = require('./../models/tourModel.js')

// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`),
// );

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
// exports.checkBody = (req, res, next) => {
//   if (!Object.hasOwn(req.body, "name") || !Object.hasOwn(req.body, "price")) {
//     return res.status(400).json({
//       status: 'fail',
//       message: 'missing name or price'
//     })
//   }
//   next();
// }

// get request method under routing
exports.getAllTours = (req, res) => {
  // req, res function here is called route handler
  res.status(200).json({
    // status: "success",
    // requestedAt: req.requestTime,
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
    // status: "success",
    // data: {
    //   tour,
    // },
  });
};

// create tour
exports.createTour = async (req, res) => {
  console.log(`create tour function called`)
  console.log(req.body)
  try {
    const newTour = await Tour.create(req.body)
    console.log(newTour)
    res.status(200).json({
      status: "success",
      data: {
        tour: newTour
      },
    });
  } catch(err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    })
  }
}

// update tour
exports.updateTour = (req, res) => {
  res.status(200).json({
    // status: "success",
    // data: {
    //   tour,
    // },
  });
};

// delete tour
exports.deleteTour = (req, res) => {
   res.status(200).json({
    // status: "success",
    // data: {
    //   tour,
    // },
  });
};

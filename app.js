// Requiring express moduel ( package )
const fs = require('fs');
const express = require('express');
const app = express();

app.use(
  express.json({
    limit: '100kb',
  }),
); //middleware

// Routing with express
// app.get('/', (req, res) => {
//       res.status(200).send('Hello client, this is a get request');
// })

// app.post('/', (req, res) => {
//       res.status(200).send('Hello client, this is a post request');
// })

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`),
);

// get request method under routing
app.get('/api/v1/tours', (req, res) => {
  // req, res function here is called route handler
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
});

app.get('/api/v1/tours/:id', (req, res) => {
  // To make a param optional, put a question mark directly after it.
  // req, res function here is called route handler
  // console.log(req.params); // Will work only when you commenting res.json.

  const id = req.params.id * 1; // Converts id from string to number
  const tour = tours.find((el) => el.id === id);

  if (!tour) {
    res.status(404).json({
      status: 'fail',
      message: 'Tour Not found',
    });
  }

  res.status(200).json({
    // res.json sends a json response to the client.
    status: 'success',
    data: {
      tour,
    },
  });
});

// post request method under routing
app.post('/api/v1/tours', (req, res) => {
  console.log(req.body);

  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours), // Converts a JavaScript object into a JSON string.
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    },
  );
});

// Update request method ( PATCH / PUT )
app.patch('/api/v1/tours/:id', (req, res) => {
  const id = req.params.id * 1; // Converts id from string to number
  const tour = tours.find((el) => el.id === id);

  //   if (!tour) {
  //     res.status(404).json({
  //       status: 'fail',
  //       message: 'Invalid ID',
  //     });
  //   }

  Object.assign(tour, req.body); // method that copies the properties from one object into another
  // the target object here is tour
  // the source here is the req.body

  fs.writeFile(
    './dev-data/data/tours-simple.json',
    JSON.stringify(tours),
    (err) => {
      if (err) {
        return res.status(500).json({
          status: 'error',
          message: 'Could not save data',
        });
      }
    },
  );

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
});

// Deleting request methods
app.delete('/api/v1/tours/:id', (req, res) => {
      if (req.params.id * 1 > tours.length) {
            return res.status(404).json({
                  status: 'fail',
                  data: null
            })
      }

  
      res.status(204).json({
            status: 'success',
            data: null
      })
}) 

// Running the app ( server )
const port = 3500;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});

// Requiring express moduel ( package )
const fs = require("fs");
const express = require("express");
const app = express();
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes.js');
const userRouter = require('./routes/userRoutes.js');


// MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.static(`${__dirname}/public`))
app.use(express.json());
app.use((req, res, next) => {
  console.log('Hello from the middleware');
  next();
})

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
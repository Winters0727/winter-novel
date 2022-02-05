const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const APIRouter = require('@/routes');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api', APIRouter);

app.use((err, req, res, next) => {
  return res.status(500).json({ error: err });
});

module.exports = app;

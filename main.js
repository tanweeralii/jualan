require("dotenv").config({path: './src/env/.env'});
const cors = require("cors");
const express = require('express');
const connectDB = require('./src/database/db')
const bodyParser = require('body-parser')
const passport = require('passport')
const morgan  = require('morgan')
const PORT = process.env.APP_PORT || 3000;
const routes = require('./routes/index')
const app = express();

connectDB()
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(routes)

app.listen(PORT, console.log(`Server running in: ${process.env.NODE_ENV} mode on port: ${PORT}`));
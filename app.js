const express = require('express')
const app = express()
const chalk = require('chalk')
const morgan = require('morgan')
const api = require('./src/routes/api')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3000;
require('dotenv').config()

// Set up Mongoose and MongoDB
const MONGODB_URL = process.env.MONGODB_URL

mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useCreateIndex: true })
mongoose.connection.on('connected', () => console.log('Succesful'))

// Middleware
app.use(morgan('combined'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Test
app.get('/', (req, res) => res.send('Server is working!'))

//CORS
app.use((request, response, next) => {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept, Authorization");

  next();
});

app.options("*", (request, response, next) => {
  response.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE"
  );
  response.send(200);

  next();
})

//API route
app.use('/api/v1', api)

//Errors
app.use((req, res) => res.status(404).json({ message: '404 Not Found' }))
app.use((req, res) => res.status(500).json({ message: '500 Server Error' }))

app.listen(PORT, () => console.log(chalk.yellow(`Serven at port ${PORT}`)))

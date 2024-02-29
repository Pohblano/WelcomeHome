// Basic Server Set up 
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const app = express();
const corsOption = {
  origin: ['http://localhost:3000','http://localhost:3001'],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
}

// Router Imports
const UserRouter = require('./Routers/UserRouter')
const MenuRouter = require('./Routers/MenuRouter')



// Middleware
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(cors(corsOption));
// Routers
app.use("/api/profile",UserRouter)
app.use("/api/menu", MenuRouter)

// Server address
const port = process.env.PORT || 3001; //Backend Routing Port
app.listen(port, () =>{
  console.log(`Server is running on port ${port}`)
});

const dbConnectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/MyApp';
mongoose.connect(dbConnectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
  console.log('Successfully connected to MongoDB database');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

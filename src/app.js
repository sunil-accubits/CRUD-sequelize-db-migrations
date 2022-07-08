const express = require('express');
const app = express();
require('dotenv').config();

userRoutes = require('./routes/user');

//MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//TEST API
app.get("/api", (req, res) => {
    res.json({ message: "Test API is Working" });
  });

  app.use('/api',userRoutes);

  module.exports =  app
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./src/routes/userRoute');
const activityRoutes = require('./src/routes/activityRoute');
const foodRoutes = require('./src/routes/foodRoute');
const authRoutes = require("./src/routes/authRoute");

const app = express();

// Middleware
app.use(bodyParser.json());

const cors = require("cors");
app.use(
  cors({
    origin: "*", // Allow requests from all origins
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"], // Allow all HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow only specific headers
  })
);

// Connect to MongoDB

const dotenv = require("dotenv");
dotenv.config();
mongoose.connect(`${process.env.MONGO_CONNECTION}`).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('MongoDB connection error:', error);
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/foods', foodRoutes);
app.use('/api', authRoutes);


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

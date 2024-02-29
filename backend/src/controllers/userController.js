const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const ActivityMapping = require('../models/activityMapping');
const FoodMapping = require('../models/foodMapping');
const dotenv = require("dotenv");
dotenv.config();

// Controller function to register a new user
exports.registerUser = async (req, res) => {
  try {
    const { username, email, password, firstName, lastName, dateOfBirth } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10); // Hashing the password
    const newUser = new User({ username, email, password: hashedPassword, firstName, lastName, dateOfBirth });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Controller function to get user details
exports.getUserDetails = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Controller function to update user details
exports.updateUserDetails = async (req, res) => {
  try {
    const userId = req.params.userId;
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Controller function to delete a user account
exports.deleteUserAccount = async (req, res) => {
  try {
    const userId = req.params.userId;
    await User.findByIdAndDelete(userId);
    res.status(200).json({ message: 'User account deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};


// Controller function to login a user
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Please provide username and password' });
    }

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Create JWT token with expiry of 30 days
    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '30d' });

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.dashboard = async (req, res) => {
  try {
    // Get the user ID from the authenticated request
    const userId = req.user.id;

    // Retrieve user-specific data from the database based on the user ID
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Retrieve tasks and activities associated with the user
    const foodMapping = await FoodMapping.find({ user: userId }).populate('food');
    const activityMapping = await ActivityMapping.find({ user: userId }).populate('activity');

    // Combine user information with tasks and activities data
    const userData = {
      id: user._id,
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      dateOfBirth: user.dateOfBirth,
      createdAt: user.createdAt,
      foodMap: foodMapping,
      activityMap: activityMapping
    };

    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

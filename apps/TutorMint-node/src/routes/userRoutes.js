// userRoutes.js
const express = require('express');
const router = express.Router();
// const userController = require('../controllers/userController');
const {authenticateUserJwt} = require('../middleware/authMiddleware');
const jwt = require('jsonwebtoken');
const {secretKey: SECRET} = require('../config/config')
const User = require('../models/userModel');
const Course = require('../models/courseModel');


// Define user routes here
router.post('/signup', async (req, res) => {
  let newUser = { username: req.body.username, password: req.body.password };
  let user = await User.findOne(newUser);
  if (!user) {
    newUser = new User(newUser);
    await newUser.save();
    const token = jwt.sign({ username: req.body.username, role: 'user' }, SECRET, { expiresIn: '1h' });
    res.json({ message: 'user created successfully', token });
  } else return res.status(403).send({ resp: 'user already exists' });
});

router.post('/login', async (req, res) => {
  const { username, password } = req.headers;
  const user = await User.findOne({ username, password });
  if (user) {
    const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '1h' });
    res.json({ message: 'Logged in successfully', token });
  } else {
    res.status(403).json({ message: 'Invalid username or password' });
  }
});

router.get('/courses', authenticateUserJwt, async (req, res) => {
  // logic to list all courses
  const courses = await Course.find({ published: true });
  res.json({ courses });
});

router.post('/courses/:courseId', authenticateUserJwt, async (req, res) => {
  // logic to purchase a course
  try {
    const course = await Course.findById(req.params.courseId);
    const user = await User.findOne({ username: req.user.username });

    // console.log(course);
    if (course) {
      // logic to check if course is already purchesed or not
      if (user.purchasedCourses.indexOf(req.params.courseId) != -1) {
        res.json({ message: 'course already purchased' });
      } else {
        user.purchasedCourses.push(course);
        await user.save();
        res.json({ message: 'Course purchased successfully' });
      }
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  } catch (error) {
    res.json({ message: error });
  }
});

router.get('/purchasedCourses', authenticateUserJwt, async (req, res) => {
  // logic to view purchased courses
  try {
    const user = await User.findOne({ username: req.user.username }).populate('purchasedCourses');
    if (user) {
      res.json({ purchasedCourses: user.purchasedCourses || [] });
    } else {
      res.status(403).json({ message: 'User not found' });
    }
  } catch (error) {
    res.json({ message: error });
  }
});


module.exports = router;

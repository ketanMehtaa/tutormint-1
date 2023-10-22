// adminRoutes.js
// const adminController = require('../controllers/adminController');
const express = require('express');
const router = express.Router();
const { authenticateAdminJwt } = require('../middleware/authMiddleware');
const Admin = require('../models/adminModel');
const Course = require('../models/courseModel');
const { secretKey: SECRET } = require('../config/config');
const jwt = require('jsonwebtoken');

// Define admin routes here
router.post('/verify',authenticateAdminJwt, async (req, res) => {
  return res.json({admin:req.user});
});

router.post('/signup', async (req, res) => {
  let newAdmin = { username: req.body.username, password: req.body.password };
  let admin = await Admin.findOne(newAdmin);
  if (!admin) {
    newAdmin = new Admin(newAdmin);
    newAdmin.save();
    const token = jwt.sign({ username: req.body.username, role: 'admin' }, SECRET, { expiresIn: '1h' });
    res.json({ message: 'Admin created successfully', token });
  } else return res.status(403).send({ resp: 'admin already exists' });
});

router.post('/login', async (req, res) => {
  const { username, password } = req.headers;
  const admin = await Admin.findOne({ username, password });
  if (admin) {
    const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
    res.json({ message: 'Logged in successfully', token ,admin});
  } else {
    res.status(403).json({ message: 'Invalid username or password' });
  }
});

router.post('/courses', authenticateAdminJwt, async (req, res) => {
  const course = new Course(req.body);
  await course.save();
  res.json({ message: 'Course created successfully', courseId: course.id });
});

//start if courseid not proper case
router.put('/courses/:courseId', authenticateAdminJwt, async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.courseId, req.body, { new: true });
    if (course) {
      res.json({ message: 'Course updated successfully' });
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  } catch (error) {
    console.log('error in course edit', error);
    res.json({ message: 'error in update course' });
  }
});

router.get('/courses', authenticateAdminJwt, async (req, res) => {
  // logic to get all courses
  const courses = await Course.find({});
  res.json({ courses });
});

module.exports = router;

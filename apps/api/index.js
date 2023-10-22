// index.js
// Main server file

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./src/config/config.js');
const adminRoutes = require('./src/routes/adminRoutes.js');
const userRoutes = require('./src/routes/userRoutes.js');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

// Use the admin and user routes
app.use('/admin', adminRoutes);
app.use('/users', userRoutes);

// const PORT = process.env.PORT || 3000;
const PORT = 3000;


app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});


// const express = require('express');
// const jwt = require('jsonwebtoken');
// const bodyParser = require('body-parser');
// // const fs = require('fs');
// const path = require('path');
// // const cors = require('cors');
// const mongoose = require('mongoose');
// const app = express();
// app.use(bodyParser.json());
// // app.use(cors());
// const SECRET = 'your-secret-key';
// mongoose.connect('mongodb+srv://ketan:ketan@cluster0.nfjpfhs.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true });

// const userSchema = new mongoose.Schema({
//   username: { type: String },
//   password: String,
//   purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
// });

// const adminSchema = new mongoose.Schema({
//   username: String,
//   password: String,
// });

// const courseSchema = new mongoose.Schema({
//   title: String,
//   description: String,
//   price: Number,
//   imageLink: String,
//   published: Boolean,
// });

// // Define mongoose models
// const User = mongoose.model('User', userSchema);
// const Admin = mongoose.model('Admin', adminSchema);
// const Course = mongoose.model('Course', courseSchema);

// const authenticateAdminJwt = (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   if (authHeader) {
//     const token = authHeader.split(' ')[1];
//     jwt.verify(token, SECRET, (err, user) => {
//       if (err) {
//         return res.sendStatus(403);
//       }
//       if (user.role != 'admin') {
//         return res.json({ message: 'not admin' });
//       }
//       req.user = user;
//       next();
//     });
//   } else {
//     res.sendStatus(401);
//   }
// };
// const authenticateUserJwt = (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   if (authHeader) {
//     const token = authHeader.split(' ')[1];
//     jwt.verify(token, SECRET, (err, user) => {
//       if (err) {
//         return res.sendStatus(403);
//       }
//       if (user.role != 'user') {
//         return res.json({ message: 'not user' });
//       }
//       req.user = user;
//       next();
//     });
//   } else {
//     res.sendStatus(401);
//   }
// };

// app.post('/admin/signup', async (req, res) => {
//   let newAdmin = { username: req.body.username, password: req.body.password };
//   let admin = await Admin.findOne(newAdmin);
//   if (!admin) {
//     newAdmin = new Admin(newAdmin);
//     newAdmin.save();
//     const token = jwt.sign({ username: req.body.username, role: 'admin' }, SECRET, { expiresIn: '1h' });
//     res.json({ message: 'Admin created successfully', token });
//   } else return res.status(403).send({ resp: 'admin already exists' });
// });

// app.post('/admin/login', async (req, res) => {
//   const { username, password } = req.headers;
//   const admin = await Admin.findOne({ username, password });
//   if (admin) {
//     const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
//     res.json({ message: 'Logged in successfully', token });
//   } else {
//     res.status(403).json({ message: 'Invalid username or password' });
//   }
// });

// app.post('/admin/courses', authenticateAdminJwt, async (req, res) => {
//   const course = new Course(req.body);
//   await course.save();
//   res.json({ message: 'Course created successfully', courseId: course.id });
// });

// //start if courseid not proper case
// app.put('/admin/courses/:courseId', authenticateAdminJwt, async (req, res) => {
//   try {
//     const course = await Course.findByIdAndUpdate(req.params.courseId, req.body, { new: true });
//     if (course) {
//       res.json({ message: 'Course updated successfully' });
//     } else {
//       res.status(404).json({ message: 'Course not found' });
//     }
//   } catch (error) {
//     console.log('error in course edit', error);
//     res.json({ message: 'error in update course' });
//   }
// });

// app.get('/admin/courses', authenticateAdminJwt, async (req, res) => {
//   // logic to get all courses
//   const courses = await Course.find({});
//   res.json({ courses });
// });

// //----------------------------------user-------------------------------------------------------------------------
// // User routes
// app.post('/users/signup', async (req, res) => {
//   let newUser = { username: req.body.username, password: req.body.password };
//   let user = await User.findOne(newUser);
//   if (!user) {
//     newUser = new User(newUser);
//     await newUser.save();
//     const token = jwt.sign({ username: req.body.username, role: 'user' }, SECRET, { expiresIn: '1h' });
//     res.json({ message: 'user created successfully', token });
//   } else return res.status(403).send({ resp: 'user already exists' });
// });

// app.post('/users/login', authenticateUserJwt, async (req, res) => {
//   const { username, password } = req.headers;
//   const user = await User.findOne({ username, password });
//   if (user) {
//     const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '1h' });
//     res.json({ message: 'Logged in successfully', token });
//   } else {
//     res.status(403).json({ message: 'Invalid username or password' });
//   }
// });

// app.get('/users/courses', authenticateUserJwt, async (req, res) => {
//   // logic to list all courses
//   const courses = await Course.find({ published: true });
//   res.json({ courses });
// });

// app.post('/users/courses/:courseId', authenticateUserJwt, async (req, res) => {
//   // logic to purchase a course
//   try {
//     const course = await Course.findById(req.params.courseId);
//     const user = await User.findOne({ username: req.user.username });

//     // console.log(course);
//     if (course) {
//       // logic to check if course is already purchesed or not
//       if (user.purchasedCourses.indexOf(req.params.courseId) != -1) {
//         res.json({ message: 'course already purchased' });
//       } else {
//         user.purchasedCourses.push(course);
//         await user.save();
//         res.json({ message: 'Course purchased successfully' });
//       }
//     } else {
//       res.status(404).json({ message: 'Course not found' });
//     }
//   } catch (error) {
//     res.json({ message: error });
//   }
// });

// app.get('/users/purchasedCourses', authenticateUserJwt, async (req, res) => {
//   // logic to view purchased courses
//   try {
//     const user = await User.findOne({ username: req.user.username }).populate('purchasedCourses');
//     if (user) {
//       res.json({ purchasedCourses: user.purchasedCourses || [] });
//     } else {
//       res.status(403).json({ message: 'User not found' });
//     }
//   } catch (error) {
//     res.json({ message: error });
//   }
// });

// app.listen(3000, () => {
//   console.log('Server is listening on port 3000');
// });

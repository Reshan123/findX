const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const courseController = require('../controllers/course.controller');
const authMiddleware = require('../middlewares/user.verifyAuth');

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/courseImages');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Get all courses
router.get('/getAllCourses', courseController.getAllCourses);

// Get a single course by ID
router.get('/getCourse/:id', courseController.getCourseById);

// Add a new course
router.post('/add/course', authMiddleware('admin'), upload.single('image'), (req, res, next) => {
  req.file ? req.body.image = req.file.filename : null;
  next();
}, courseController.addCourse);

// Update a course by ID
router.put('/updateCourse/:id', authMiddleware('admin'), upload.single('image'), (req, res, next) => {
  req.file ? req.body.image = req.file.filename : null;
  next();
}, courseController.updateCourse);

// Delete a course by ID
router.delete('/deleteCourse/:id', authMiddleware('admin'), courseController.deleteCourse);

// New routes for pinning and unpinning courses
router.put('/pin/:id', authMiddleware('admin'), courseController.pinCourse);
router.put('/unpin/:id', authMiddleware('admin'), courseController.unpinCourse);

module.exports = router;

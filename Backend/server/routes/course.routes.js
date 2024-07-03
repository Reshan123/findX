const express = require('express');
const router = express.Router();
const courseController = require('../controllers/course.controller');
const authMiddleware = require('../middlewares/user.verifyAuth');
const upload = require('../middlewares/multer.middleware');

// Get all courses
router.get('/getAllCourses', courseController.getAllCourses);

// Get a single course by ID
router.get('/getCourse/:id', courseController.getCourseById);

// Add a new course
router.post('/add/course', authMiddleware('admin'),upload.single('image'), courseController.addCourse);

// Update a course by ID
router.put('/updateCourse/:id', authMiddleware('admin'),upload.single('image'), courseController.updateCourse);

// Delete a course by ID
router.delete('/deleteCourse/:id', authMiddleware('admin'), courseController.deleteCourse);

module.exports = router;

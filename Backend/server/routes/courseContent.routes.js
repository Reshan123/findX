const express = require('express');
const router = express.Router();
const courseContentController = require('../controllers/courseContent.controller');
const auth = require('../middlewares/user.verifyAuth');

// Create
router.post('/add',auth('admin'), courseContentController.addCourseContent);

// Read all
router.get('/getAllContent', courseContentController.getCourseContents);

// Read by ID
router.get('/getContent/:id', courseContentController.getCourseContentById);

// Read by Course ID
router.get('/courseContent/:courseId', courseContentController.getCourseContentByCourseId);

router.get('/courses-with-content', courseContentController.getAllCoursesWithContent);

// Update
router.put('/updateContent/:id',auth('admin'), courseContentController.updateCourseContent);

// Delete
router.delete('/deleteContent/:id',auth('admin'), courseContentController.deleteCourseContent);



module.exports = router;

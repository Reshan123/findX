const CourseContent = require('../models/courseContent.model');
const Course = require('../models/course.models');
const upload = require('../middlewares/courseContent.multer');
const path = require('path');
const fs = require('fs');

// Ensure uploads/courseContent directory exists
const uploadPath = path.join(__dirname, '../uploads/courseContent');
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

exports.addCourseContent = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ message: 'File upload failed', error: err });
    }

    const { courseId, title, description, youtubeLink } = req.body;
    const file = req.file ? req.file.path : '';

    try {
      const course = await Course.findById(courseId);
      if (!course) {
        return res.status(404).json({ message: 'Course not found' });
      }

      const courseContent = new CourseContent({ courseId, title, description, youtubeLink, file });
      await courseContent.save();

      res.status(201).json({ message: 'Course content added successfully', courseContent });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  });
};

exports.getCourseContents = async (req, res) => {
  try {
    const courseContents = await CourseContent.find();
    res.status(200).json(courseContents);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.getCourseContentById = async (req, res) => {
  try {
    const courseContent = await CourseContent.findById(req.params.id);
    if (!courseContent) {
      return res.status(404).json({ message: 'Course content not found' });
    }
    res.status(200).json(courseContent);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.updateCourseContent = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ message: 'File upload failed', error: err });
    }

    const { title, description, youtubeLink } = req.body;
    const file = req.file ? req.file.path : '';

    try {
      const courseContent = await CourseContent.findById(req.params.id);
      if (!courseContent) {
        return res.status(404).json({ message: 'Course content not found' });
      }

      courseContent.title = title || courseContent.title;
      courseContent.description = description || courseContent.description;
      courseContent.youtubeLink = youtubeLink || courseContent.youtubeLink;
      if (file) {
        courseContent.file = file;
      }

      await courseContent.save();
      res.status(200).json({ message: 'Course content updated successfully', courseContent });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  });
};

exports.deleteCourseContent = async (req, res) => {
  try {
    const courseContent = await CourseContent.findById(req.params.id);
    if (!courseContent) {
      return res.status(404).json({ message: 'Course content not found' });
    }

    await courseContent.remove();
    res.status(200).json({ message: 'Course content deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// New method to get course content by course ID
exports.getCourseContentByCourseId = async (req, res) => {
  try {
    const { courseId } = req.params;
    const courseContents = await CourseContent.find({ courseId });
    if (!courseContents || courseContents.length === 0) {
      return res.status(404).json({ message: 'No content found for this course' });
    }
    res.status(200).json(courseContents);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.getAllCoursesWithContent = async (req, res) => {
    try {
      const courses = await Course.find();
  
      if (!courses || courses.length === 0) {
        return res.status(404).json({ message: 'No courses found' });
      }
  
      const coursesWithContent = await Promise.all(
        courses.map(async (course) => {
          const contents = await CourseContent.find({ courseId: course._id });
          return {
            course,
            contents,
          };
        })
      );
  
      res.status(200).json(coursesWithContent);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };
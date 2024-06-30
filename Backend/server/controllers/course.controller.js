// controllers/courseController.js
const Course = require('../models/course.models');

// Get all courses
exports.getAllCourses = async (req, res) => {
    try {
      const courses = await Course.find();
      res.status(200).json(courses);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching courses', error });
    }
  };
  
  // Get a single course by ID
  exports.getCourseById = async (req, res) => {
    try {
      const course = await Course.findById(req.params.id);
      if (!course) {
        return res.status(404).json({ message: 'Course not found' });
      }
      res.status(200).json(course);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching course', error });
    }
  };
  
  // Add a new course
  exports.addCourse = async (req, res) => {
    try {
      const { title, description } = req.body;
      const image = req.file ? req.file.path : '';
      const newCourse = new Course({ title, image, description });
      await newCourse.save();
      res.status(201).json(newCourse);
    } catch (error) {
      res.status(500).json({ message: 'Error adding course', error });
    }
  };
  
  // Update a course by ID
  exports.updateCourse = async (req, res) => {
    try {
      const { title, description } = req.body;
      const image = req.file ? req.file.path : req.body.image;
      const updatedCourse = await Course.findByIdAndUpdate(
        req.params.id,
        { title, image, description },
        { new: true }
      );
      if (!updatedCourse) {
        return res.status(404).json({ message: 'Course not found' });
      }
      res.status(200).json(updatedCourse);
    } catch (error) {
      res.status(500).json({ message: 'Error updating course', error });
    }
  };
  
  // Delete a course by ID
  exports.deleteCourse = async (req, res) => {
    try {
      const deletedCourse = await Course.findByIdAndDelete(req.params.id);
      if (!deletedCourse) {
        return res.status(404).json({ message: 'Course not found' });
      }
      res.status(200).json({ message: 'Course deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting course', error });
    }
  };

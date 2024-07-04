const User = require('../models/user.models');
const Post = require('../models/posts.model');
const Course = require('../models/course.models');


exports.getCounts = async (req, res) => {
    try {
      // Replace these with actual logic to fetch counts
      const totalPosts = await Post.countDocuments();
      const totalUsers = await User.countDocuments();
      const suspendedUsers = await User.countDocuments({ status: 'suspended' });
      const totalCourses = await Course.countDocuments();
  
      res.status(200).json({
        totalPosts,
        totalUsers,
        suspendedUsers,
        totalCourses,
      });
    } catch (error) {
      console.error('Error fetching counts:', error);
      res.status(500).json({ message: 'Error fetching counts', error });
    }
  };
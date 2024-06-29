const express = require('express');
const router = express.Router();
const { getAllUsers, suspendUser, unsuspendUser, updateUserPassword } = require('../controllers/admin.auth');
const authMiddleware = require('../middlewares/user.verifyAuth');

// Admin-specific routes
router.get('/admin/users', authMiddleware('admin'), getAllUsers);
router.put('/admin/suspend/:id', authMiddleware('admin'), suspendUser);
router.put('/admin/unsuspend/:id', authMiddleware('admin'), unsuspendUser);
router.put('/admin/updatePassword', authMiddleware('admin'), updateUserPassword);

module.exports = router;

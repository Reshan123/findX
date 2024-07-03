const express = require('express');
const router = express.Router();
const admin = require('../controllers/admin.auth');
const authMiddleware = require('../middlewares/user.verifyAuth');
const { getCounts } = require('../controllers/stats.controllers');

// Admin-specific routes
router.get('/admin/users',  admin.getAllUsers);
router.put('/admin/suspend/:id', authMiddleware('admin'), admin.suspendUser);
router.put('/admin/unsuspend/:id', authMiddleware('admin'), admin.unsuspendUser);
router.put('/admin/updatePassword', authMiddleware('admin'), admin.updateUserPassword);
router.get('/admin/counts', getCounts);

module.exports = router;

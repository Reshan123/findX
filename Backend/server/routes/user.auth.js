const express = require("express");
const router = express.Router();
const user = require("../controllers/user.auth");
const auth = require('../middlewares/user.verifyAuth');

// Route token validation
router.get("/user/validateUser" ,auth('user') , user.validateUser);

// Route for user registration
router.post("/user/signup", user.registerUsers);

// Route for user sign-in
router.post("/user/signin", user.signIn);

// Route for getting user profile
router.get('/user/profile', auth('user'), user.getUserProfile);

// Route for updating user profile
router.put('/user/updateProfile', auth('user'), user.updateUserProfile);

// Route for deleting user account (either user themselves or admin can delete)
router.delete('/user/removeAccount', auth('user'), user.deleteUserAccount);

//route for liking for posts
router.post('/like/:postId', auth('admin'), user.likePost);

// Unlike a post
router.post('/unlike/:postId', auth('admin'), user.unlikePost);

module.exports = router;

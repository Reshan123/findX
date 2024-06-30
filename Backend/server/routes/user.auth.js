const express = require("express");
const router = express.Router();
const user = require("../controllers/user.auth");
const auth = require('../middlewares/user.verifyAuth');

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
router.post('/user/like/:id', auth('user'), user.likeUser);

module.exports = router;

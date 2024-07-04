const express = require('express');
const router = express.Router();
const postController = require('../controllers/post.controller');
const upload = require('../middlewares/multer.middleware');
const auth = require('../middlewares/user.verifyAuth');

// Create a new post
router.post('/create/posts',auth('admin'), upload.single('image'), postController.createPost);

// Get all posts
router.get('/posts',  postController.getAllPosts);

// Get a single post by ID
router.get('/posts/:id', postController.getPostById);

// Update a post
router.put('/update/posts/:id',auth('admin'), upload.single('image'), postController.updatePost);

// Delete a post
router.delete('/delete/posts/:id',auth('admin'), postController.deletePost);

module.exports = router;

const Post = require('../models/posts.model');
const PostTrash = require('../models/postTrash.model');

exports.createPost = async (req, res) => {
    const { title, description } = req.body;
    const image = req.file ? req.file.path : '';
    console.log('Creating post with:', { title, description, image });
  
    try {
      const newPost = new Post({ title, description, image });
      await newPost.save();
      res.status(201).json(newPost);
    } catch (error) {
      console.error('Error creating post:', error);
      res.status(500).json({ message: 'Error creating post', error });
    }
  };
  
  exports.getAllPosts = async (req, res) => {
    try {
      const posts = await Post.find();
      res.status(200).json(posts);
    } catch (error) {
      console.error('Error fetching posts:', error);
      res.status(500).json({ message: 'Error fetching posts', error });
    }
  };
  
  exports.getPostById = async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      res.status(200).json(post);
    } catch (error) {
      console.error('Error fetching post:', error);
      res.status(500).json({ message: 'Error fetching post', error });
    }
  };
  
  exports.updatePost = async (req, res) => {
    const { title, description } = req.body;
    const image = req.file ? req.file.path : req.body.image;
    console.log('Updating post with:', { title, description, image });
  
    try {
      const updatedPost = await Post.findByIdAndUpdate(
        req.params.id,
        { title, description, image },
        { new: true }
      );
      if (!updatedPost) {
        return res.status(404).json({ message: 'Post not found' });
      }
      res.status(200).json(updatedPost);
    } catch (error) {
      console.error('Error updating post:', error);
      res.status(500).json({ message: 'Error updating post', error });
    }
  };
  
  exports.deletePost = async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      // Create a new postTrash document with the same data
      const postTrash = new PostTrash({
        title: post.title,
        description: post.description,
        image: post.image,
      });
  
      await postTrash.save();
      await Post.findByIdAndDelete(req.params.id); // Remove post from original collection
  
      res.status(200).json({ message: 'Post moved to trash successfully' });
    } catch (error) {
      console.error('Error moving post to trash:', error);
      res.status(500).json({ message: 'Error moving post to trash', error });
    }
  };

  exports.pinPost = async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      post.pinned = true;
      await post.save();
  
      res.status(200).json({ message: 'Post pinned successfully', post });
    } catch (error) {
      console.error('Error pinning post:', error);
      res.status(500).json({ message: 'Error pinning post', error });
    }
  };
  
  exports.unpinPost = async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      post.pinned = false;
      await post.save();
  
      res.status(200).json({ message: 'Post unpinned successfully', post });
    } catch (error) {
      console.error('Error unpinning post:', error);
      res.status(500).json({ message: 'Error unpinning post', error });
    }
  };
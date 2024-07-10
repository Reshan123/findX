const userSchema = require("../models/user.models");
const jwt = require('jsonwebtoken');
const Post = require('../models/posts.model');
const validator = require('validator')

const bcrypt = require('bcrypt');

exports.validateUser = async (req, res) => {
    try{
        const userId = req.user.id;
        const user = await userSchema.findById(userId);
        if(!user){
            throw Error("Invalid User")
        }
        res.status(200).json({
            status: 'success',
            message: 'User Valid!',
        });
    } catch(error){
        console.log(error.message);
        res.status(500).json({
            status: 'Fail',
            message: 'User Invalid!',
            error: error.message
        });
    }
}

exports.registerUsers = async(req, res) => {
    try {
        const { userInfo } = req.body;
        console.log(userInfo)

        if(validator.isEmpty(userInfo.password) || validator.isEmpty(userInfo.email) || validator.isEmpty(userInfo.first_name) || validator.isEmpty(userInfo.last_name) || validator.isEmpty(userInfo.contact_no)){
            return res.status(400).json({
                status: 'Fail',
                message: 'Fill All Input Fields!'
            });
        }

        // Check if the user name is already in use
        const existingUsername = await userSchema.findOne({ user_name: userInfo.user_name });
        if(existingUsername !== null){
            console.log("User name already in use");
            return res.status(400).json({
                status: 'Fail',
                message: 'User name already in use!'
            });
        }

        const existingUserEmail = await userSchema.findOne({ email: userInfo.email });
        if(existingUserEmail !== null){
            console.log("User name already in use");
            return res.status(400).json({
                status: 'Fail',
                message: 'Email already in use!'
            });
        }

        if(!validator.isMobilePhone(userInfo.contact_no, ['si-LK'])){
            return res.status(400).json({
                status: 'Fail',
                message: 'Not a valid Phone number!'
            });
        }

        if(!validator.isEmail(userInfo.email)){
            return res.status(400).json({
                status: 'Fail',
                message: 'Not a valid Email!'
            });
        }

        if(!validator.isStrongPassword(userInfo.password)){
            return res.status(400).json({
                status: 'Fail',
                message: 'Password not strong'
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(userInfo.password, 10);

        // Create the user with the hashed password
        const createdUser = await userSchema.create({
            ...userInfo,
            password: hashedPassword
        });

        // Respond with success message
        res.status(200).json({
            status: 'Success',
            message: 'User created!',
            user: createdUser
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            status: 'Fail',
            message: 'Server error occurred!',
            error: error.message
        });
    }
}



exports.signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userSchema.findOne({ email });

        if (user) {
            // Compare the provided password with the hashed password in the database
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (passwordMatch) {
                const id = user._id;
                const role = user.role; // Assuming the role is stored in the user document
                const token = jwt.sign({ id, role }, process.env.JWT_SECRET_KEY, { expiresIn: '500m' }); // Change expiration to 1 minute

                // Optionally, you can nullify the password field before sending the user object
                user.password = null;

                res.status(202).json({
                    status: "Success",
                    message: "Signed-in Successfully",
                    user: user,
                    token: token
                });
            } else {
                res.status(401).json({
                    status: 'Fail',
                    message: 'Invalid password!',
                });
            }
        } else {
            res.status(401).json({
                status: 'Fail',
                message: 'Invalid email!',
            });
        }
    } catch (error) {
        console.log(error, error.message);
        res.status(500).json({
            status: 'Fail',
            message: 'Server error occurred!',
            error: error
        });
    }
};


exports.getAllUsers = async (req, res) => {
    try {
        const users = await userSchema.find({}, { password: 0 }); // Exclude password from the result

        res.status(200).json({
            status: 'Success',
            message: 'All users retrieved successfully',
            users: users
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            status: 'Fail',
            message: 'Server error occurred!',
            error: error.message
        });
    }
}

exports.getUserProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        
        
        const user = await userSchema.findById(userId, { password: 0 }); // Exclude password from the result

        if (user) {
            res.status(200).json({
                status: 'Success',
                message: 'User profile retrieved successfully',
                user: user
            });
        } else {
            res.status(404).json({
                status: 'Fail',
                message: 'User not found!'
            });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            status: 'Fail',
            message: 'Server error occurred!',
            error: error.message
        });
    }
}

exports.updateUserProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const { email, password, ...updatedInfo } = req.body; // Exclude email and password from the update

        const updatedUser = await userSchema.findByIdAndUpdate(
            userId,
            { $set: updatedInfo },
            { new: true, runValidators: true, select: '-password' } // Return the updated document and exclude the password
        );

        if (updatedUser) {
            res.status(200).json({
                status: 'Success',
                message: 'User profile updated successfully',
                user: updatedUser
            });
        } else {
            res.status(404).json({
                status: 'Fail',
                message: 'User not found!'
            });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            status: 'Fail',
            message: 'Server error occurred!',
            error: error.message
        });
    }
}


exports.deleteUserAccount = async (req, res) => {
    try {
        const userId = req.user.id;

        const deletedUser = await userSchema.findByIdAndDelete(userId);

        if (deletedUser) {
            res.status(200).json({
                status: 'Success',
                message: 'User account deleted successfully'
            });
        } else {
            res.status(404).json({
                status: 'Fail',
                message: 'User not found!'
            });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            status: 'Fail',
            message: 'Server error occurred!',
            error: error.message
        });
    }
}



//controllers for liking and uliking a post ------

exports.likePost = async (req, res) => {
  const { postId } = req.params;
  const { userId } = req.user.id;

  try {
    // Check if the user has already liked the post
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (post.likes.includes(userId)) {
      return res.status(400).json({ message: 'Post already liked by this user' });
    }

    // Add user to the likes array
    post.likes.push(userId);
    await post.save();

    res.status(200).json({ message: 'Post liked successfully' });
  } catch (error) {
    console.error('Error liking post:', error);
    res.status(500).json({ message: 'Error liking post', error });
  }
};

exports.unlikePost = async (req, res) => {
  const { postId } = req.params;
  const { userId } = req.user.id;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Filter out the userId from the likes array
    post.likes = post.likes.filter(like => like.toString() !== userId);

    await post.save();

    res.status(200).json({ message: 'Post unliked successfully' });
  } catch (error) {
    console.error('Error unliking post:', error);
    res.status(500).json({ message: 'Failed to unlike post', error });
  }
};
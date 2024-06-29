const userSchema = require("../models/user.models");
const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');

exports.registerUsers = async(req, res) => {
    try {
        const { userInfo } = req.body;

        // Check if the user name is already in use
        const existingUser = await userSchema.findOne({ user_name: userInfo.user_name });
        if(existingUser !== null){
            console.log("User name already in use");
            return res.status(400).json({
                status: 'Fail',
                message: 'User name already in use!'
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
                const token = jwt.sign({ id, role }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

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

exports.likeUser = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming req.user.id is populated by the auth middleware
        const likedUserId = req.params.id;

        // Check if the liked user exists
        const likedUser = await User.findById(likedUserId);
        if (!likedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Add the liked user to the current user's likes if not already liked
        const user = await User.findById(userId);
        if (!user.likes.includes(likedUserId)) {
            user.likes.push(likedUserId);
            await user.save();
        }

        res.status(200).json({ message: 'User liked successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


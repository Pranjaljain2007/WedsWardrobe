const User = require('../models/User');

/**
 * Register a new user in the backend after Firebase authentication.
 * stores only uid, Name, and email.
 * req → the request coming from the client (contains data like uid, email, name).
 * res → the response we will send back to the client
 */

const registerUser = async (req, res) => {
    const { uid, email, name } = req.body;

    // console.log("Signup request body:", req.body);


    // Validate required fields
    if (!uid || !email || !name) {
        return res.status(400).json({ message: 'UID, Name, and Email are required' });
    }

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ uid });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Save new user in the database
        const newUser = new User({
            uid,
            email,
            name
        });

        await newUser.save();

        res.status(201).json({
            message: 'User registered successfully',
            user: newUser
        });
    } catch (error) {
        console.error('MongoDB save error:', error);
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { registerUser };


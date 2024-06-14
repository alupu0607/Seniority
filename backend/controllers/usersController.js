const User = require('../models/User');
exports.getUserByEmail = async (req, res) => {
    try {
        const { email } = req.params;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user by email:', error);
        res.status(500).json({ message: 'Error fetching user by email' });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findOne({ where: { id } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user by email:', error);
        res.status(500).json({ message: 'Error fetching user by email' });
    }
};

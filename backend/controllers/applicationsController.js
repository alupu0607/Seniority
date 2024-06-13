
const Application = require('../models/Application');
const User = require('../models/User');

exports.postApplication = async (req, res) => {
    try {
        const { idRetirementHome, idUser } = req.body;

        const existingApplication = await Application.findOne({
            where: { idUser }
        });

        if (existingApplication) {
            return res.status(409).json({ message: 'User has already made an application' });
        }

        const newApplication = await Application.create({
            idRetirementHome,
            idUser,
            application_status: 'PENDING'
        });
        res.status(201).json(newApplication);
    } catch (error) {
        console.error('Error creating application:', error);
        res.status(500).json({ message: 'Error creating application' });
    }
};

exports.getApplicationsByUserEmail = async (req, res) => {
    try {
        const { email } = req.params;
        console.log(email)
        const user = await User.findOne({
            where: { email }
        });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const applications = await Application.findAll({
            where: { idUser: user.id }
        });

        res.status(200).json(applications);
    } catch (error) {
        console.error('Error fetching applications by email:', error);
        res.status(500).json({ message: 'Error fetching applications' });
    }
};


exports.deleteApplicationsByUserEmail = async (req, res) => {
    try {
        const { email } = req.params;

        const user = await User.findOne({
            where: { email }
        });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        await Application.destroy({
            where: { idUser: user.id }
        });

        res.status(200).json({ message: 'Applications deleted successfully' });
    } catch (error) {
        console.error('Error deleting applications by email:', error);
        res.status(500).json({ message: 'Error deleting applications' });
    }
};
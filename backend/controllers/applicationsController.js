
const Application = require('../models/Application');
const RetirementHome = require('../models/RetirementHome');
const User = require('../models/User');

exports.postApplication = async (req, res) => {
    try {
        const { idRetirementHome, idUser } = req.body;

        const existingApplication = await Application.findOne({
            where: { idUser}
        });

        if (existingApplication) {
            return res.status(409).json({ message: 'User has already made an application which was approved' });
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


exports.deleteApplicationsByApplicationId = async (req, res) => {
    try {
        const { applicationId } = req.params;

        await Application.destroy({
            where: { id: applicationId }
        });

        res.status(200).json({ message: 'Applications deleted successfully' });
    } catch (error) {
        console.error('Error deleting applications by email:', error);
        res.status(500).json({ message: 'Error deleting applications' });
    }
};


exports.putRejectApplicationByApplicationId = async (req, res) => {
    try {
        const { applicationId } = req.params;

        const application = await Application.findByPk(applicationId);

        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

        await application.update({ application_status: 'REJECTED' });

        res.status(200).json({ message: 'Application status updated to REJECTED' });
    } catch (error) {
        console.error('Error rejecting application:', error);
        res.status(500).json({ message: 'Error rejecting application' });
    }
};

exports.getApplicationsByRetirementHomeId = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id)
        const retirementHome = await RetirementHome.findOne({
            where: { id }
        });
        if (!retirementHome) {
            return res.status(404).json({ message: 'Retirement home not found' });
        }
        const applications = await Application.findAll({
            where: { idRetirementHome: retirementHome.id }
        });

        res.status(200).json(applications);
    } catch (error) {
        console.error('Error fetching applications by email:', error);
        res.status(500).json({ message: 'Error fetching applications' });
    }
};



exports.putApplicationByApplicationId = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        console.log(id)
        const application = await Application.findOne({
            where: { id }
        });
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }
        application.application_status = status;
        await application.save();
        res.status(200).json({
            message: 'Application updated successfully',
            application
        });
    } catch (error) {
        console.error('Error fetching applications by email:', error);
        res.status(500).json({ message: 'Error fetching applications' });
    }
};
const Application = require('../models/Application');

exports.postApplication = async (req, res) => {
    try {
        console.log('request body', req);
        console.log('response body', res);
        const { idRetirementHome, idUser } = req.body;

        const newApplication = await Application.create({
            idRetirementHome,
            idUser,
            application_status: 'PENDING'
        });

        res.status(200).json(newApplication);
    } catch (error) {
        console.error('Error creating application:', error);
        res.status(500).json({ message: 'Error creating application' });
    }
};

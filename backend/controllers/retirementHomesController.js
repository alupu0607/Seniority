const RetirementHome = require('../models/RetirementHome');
exports.getRetirementHomes = async (req, res) => {
    try {
        const retirementHomes = await RetirementHome.findAll();
        res.status(200).json(retirementHomes);
    } catch (error) {
        console.error('Error fetching retirement homes:', error);
        res.status(500).json({ message: 'Error fetching retirement homes' });
    }
};

exports.getRetirementHome = async (req, res) => {
    try {
        const { id } = req.params;

        const retirementHome = await RetirementHome.findByPk(id);

        if (!retirementHome) {
            return res.status(404).json({ message: 'Retirement home not found' });
        }

        res.status(200).json(retirementHome);
    } catch (error) {
        console.error('Error fetching retirement home:', error);
        res.status(500).json({ message: 'Error fetching retirement home' });
    }
};
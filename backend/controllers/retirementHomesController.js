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
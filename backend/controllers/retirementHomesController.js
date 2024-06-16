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

exports.putRetirementHomeStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        if (!status) {
            return res.status(400).json({ message: 'Status is required' });
        }
        const retirementHome = await RetirementHome.findByPk(id);

        if (!retirementHome) {
            return res.status(404).json({ message: 'RetirementHome not found' });
        }
        retirementHome.status = status;
        await retirementHome.save();
        res.status(200).json(retirementHome);
    } catch (error) {
        console.error('Error updating retirement home status:', error);
        res.status(500).json({ message: 'Error updating retirement home status' });
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
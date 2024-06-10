const RetirementHome = require("../models/RetirementHome");

const postButtonRetirementPage = async (req, res) => {
    try {
        const { email, name, rating, phone, website, city, latitude, longitude } = req.body;

        const existingRetirementHome = await RetirementHome.findOne({
            where: { email }
        });

        if (!existingRetirementHome) {
            return res.status(404).render('auth/verify-retirement-home', { 
                email: email, 
                name: name,
                rating: rating, 
                phone: phone,
                website: website,
                city: city,
                latitude: latitude,
                longitude: longitude,
                message: 'Fail. Retirement home not found.' 
            });
        }

        if (existingRetirementHome.isVerified) {
            return res.status(200).render('auth/verify-retirement-home', { 
                email: email, 
                name: name,
                rating: rating, 
                phone: phone,
                website: website,
                city: city,
                latitude: latitude,
                longitude: longitude,
                message: 'Success. Retirement home is already verified.' 
            });
        }

        existingRetirementHome.isVerified = true;
        await existingRetirementHome.save();

        console.log('Retirement home verified:', email);

        return res.status(200).render('auth/verify-retirement-home', { 
            email: email, 
            name: name,
            rating: rating, 
            phone: phone,
            website: website,
            city: city,
            latitude: latitude,
            longitude: longitude,
            message: 'Success. Retirement home verified successfully.' 
        });
    } catch (error) {
        console.error('Error verifying retirement home:', error);
        return res.status(500).render('auth/verify-retirement-home', { 
            email: email, 
            name: name,
            rating: rating, 
            phone: phone,
            website: website,
            city: city,
            latitude: latitude,
            longitude: longitude,
            message: 'Fail. An error occurred while verifying retirement home.' 
        });
    }
};

module.exports = postButtonRetirementPage;

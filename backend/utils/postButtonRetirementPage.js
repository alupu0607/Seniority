const RetirementHome = require("../models/RetirementHome");

const formatRetirementHomeDetails = (details) => {
    return {
        name: details.name,
        rating: details.rating || 'N/A',
        phone_number: details.formatted_phone_number || 'N/A',
        website: details.website ||  'N/A',
        url: details.url || 'N/A',
        latitude: details.geometry.location.lat,
        longitude: details.geometry.location.lng,
        photos: null  // Placeholder for photos
    };
};

const appendToRetirementHomesFile = (data) => {
    try {
        const existingData = JSON.parse(fs.readFileSync('../../retirement_homes.json', 'utf-8'));
        existingData.push(data);
        fs.writeFileSync('retirements_homes.json', JSON.stringify(existingData, null, 2));
        console.log('Retirement home added to retirements_homes.json');
    } catch (error) {
        console.error('Error appending to retirements_homes.json:', error);
    }
};


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

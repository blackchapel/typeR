const User = require('../models/user.schema');

const createClubAccount = async (req, res) => {
    try {
        let newClub = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            thumbnail: req.body.thumbnail,
            role: 'CLUB',
            loginProvider: 'TYPE R',
            isActivated: true
        });
        console.log(newClub);

        await newClub.save();

        res.status(200).json({
            meesage: 'New Club account created successfully!',
            data: newClub
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    createClubAccount
};

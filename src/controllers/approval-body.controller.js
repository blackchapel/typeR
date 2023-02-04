const User = require('../models/user.schema');
const Event = require('../models/event.schema');

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

const raiseQuery = async (req, res) => {
    try {
        const event = await Event.findById(req.body.eventId);

        if (!event) {
            res.status(404).json({
                message: 'event not found & raise query failed'
            });
        } else {
            const queryObj = {
                id: req.user.id,
                content: req.body.content
            };

            event.approval.forEach((item) => {
                if (item.id == req.user.id) {
                    item.query.push(queryObj);
                }
                return item;
            });
            await event.save();

            res.status(200).json({
                message: 'query raised',
                data: event
            });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    createClubAccount,
    raiseQuery
};

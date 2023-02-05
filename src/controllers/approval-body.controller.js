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

const approveEvent = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            res.status(404).json({
                message: 'user not found & approval failed'
            });
        } else {
            const event = await Event.findById(req.body.eventId);

            if (!event) {
                res.status(404).json({
                    message: 'event not found & approval failed'
                });
            } else {
                user.approvalsRequested.forEach((item) => {
                    if (item.id == req.body.eventId) {
                        item.isApproved = true;
                    }
                    return item;
                });
                await user.save();

                let approveCount = 0;
                event.approval.forEach((item) => {
                    if (item.id == req.user.id) {
                        item.isApproved = true;
                        approveCount++;
                    } else if (item.isApproved == true) {
                        approveCount++;
                    }
                    return item;
                });

                if (approveCount == event.approval.length) {
                    event.isPending = false;
                    event.isInReview = false;
                    event.isApproved = true;
                } else if (approveCount < event.approval.length) {
                    event.isPending = false;
                    event.isInReview = true;
                    event.isApproved = false;
                }

                await event.save();

                res.status(200).json({
                    message: 'Event approved',
                    data: event
                });
            }
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: error.message
        });
    }
};

const eventList = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            res.status(404).json({
                message: 'User not found & fetch event list failed'
            });
        } else {
            let events = [];
            for (const item of user.approvalsRequested) {
                if (item.id == req.query.clubId) {
                    let event = await Event.findById(item.id);
                    events.push(event);
                }
            }

            let approvedEvents = [];
            let approvalPendingEvents = [];
            events.forEach((item) => {
                user.approvalsRequested.forEach((itemInception) => {
                    if (itemInception.id == item._id) {
                        if (itemInception.isApproved == true) {
                            approvedEvents.push(item);
                        } else {
                            approvalPendingEvents.push(item);
                        }
                    }
                });
            });

            res.status(200).json({
                message: 'Events list',
                data: {
                    approvedEvents,
                    approvalPendingEvents
                }
            });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: error.message
        });
    }
};

const clubList = async (req, res) => {
    try {
        const clubs = await User.find({ role: 'CLUB' });

        res.status(200).json({
            message: 'club list',
            data: clubs
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    createClubAccount,
    raiseQuery,
    approveEvent,
    eventList,
    clubList
};

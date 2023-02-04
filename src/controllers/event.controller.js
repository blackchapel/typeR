const Event = require('./../models/event.schema');
const User = require('./../models/user.schema');
const { sendEmail } = require('./../utilities/utils');
const fs = require('fs');

const createEvent = async (req, res) => {
    try {
        const event = new Event({
            parent: {
                id: req.user.id,
                name: req.user.name,
                thumbnail: req.user.thumbnail
            },
            name: req.body.name,
            description: req.body.description,
            thumbnail: req.body.thumbnail ? req.body.thumbnail : null,
            date: req.body.date,
            isSelection: req.body.isSelection,
            payment: {
                isPayment: req.body.isPayment,
                amount: req.body.isPayment ? req.body.amount : 0
            },
            approval: req.body.approval,
            isPending: true
        });

        await event.save();

        // Add event to parent club (eventsCreated)
        let eventCreatedObj = {
            id: event._id,
            name: event.name,
            thumbnail: event.thumbnail,
            status: 'PENDING',
            isApproved: false
        };

        const clubUser = await User.findById(req.user.id);
        clubUser.eventsCreated.push(eventCreatedObj);
        await clubUser.save();

        // Add event to approval body (approvalsRequested)
        let approvalsArray = req.body.approval;
        console.log(approvalsArray);
        for (const iterator of approvalsArray) {
            let approvalBodyUser = await User.findByIdAndUpdate(iterator.id);
            approvalBodyUser.approvalsRequested.push(eventCreatedObj);
            await approvalBodyUser.save();
        }

        // Send email to approval body
        for (const iterator of approvalsArray) {
            const approval = await User.findById(iterator.id);
            const approvalEmail = approval.email;
            const eventName = req.body.name;
            const clubName = req.user.name;
            const subject = 'New Approval Requested';
            const body = `Respected maam/sir, \n You have received a new approval request for the following: \n Event: ${eventName} \n Club: ${clubName}`;
            await sendEmail(approvalEmail, subject, body);
        }

        res.status(200).json({
            meesage: 'Event created successfully!',
            data: event
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: error.message
        });
    }
};

const getEventList = async (req, res) => {
    try {
        const events = await Event.find({ 'parent.id': req.user.id });

        let approvalPending = [];
        let approved = [];
        let published = [];
        events.forEach((event) => {
            if (event.isPublished) {
                published.push(event);
            } else if (event.isApproved) {
                approved.push(event);
            } else if (!event.isApproved) {
                approvalPending.push(event);
            }
        });

        res.status(200).json({
            message: 'Events list',
            data: {
                published,
                approved,
                approvalPending
            }
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: error.message
        });
    }
};

const getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            res.status(404).json({
                message: 'event not found'
            });
        } else {
            res.status(200).json({
                message: 'event found',
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

const updateEvent = async (req, res) => {
    try {
        const event = await Event.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                description: req.body.description,
                thumbnail: req.body.thumbnail,
                date: req.body.date,
                isSelection: req.body.isSelection,
                payment: {
                    isPayment: req.body.isPayment,
                    amount: req.body.isPayment ? req.body.amount : 0
                }
            },
            { new: true }
        );

        if (!event) {
            res.status(404).json({
                message: 'event not found & updation failed'
            });
        } else {
            res.status(200).json({
                message: 'event updated',
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

const respondQuery = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            res.status(404).json({
                message: 'event not found & updation failed'
            });
        } else {
            event.approval.forEach((item) => {
                if (item.id == req.body.approvalId) {
                    item.query.forEach((itemInception) => {
                        if (itemInception._id == req.body.queryId) {
                            itemInception.response = req.body.response;
                            itemInception.isResponded = true;
                        }
                        return itemInception;
                    });
                    return item;
                }
            });

            await event.save();

            res.status(200).json({
                message: 'response recorded',
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
    createEvent,
    getEventList,
    getEventById,
    updateEvent,
    respondQuery
};

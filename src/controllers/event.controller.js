const Event = require('./../models/event.schema');
const User = require('./../models/user.schema');
const { sendEmail } = require('./../utilities/utils');

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
            isSelection: req.body.isSelection,
            payment: {
                isPayment: req.body.isPayment,
                amount: req.body.isPayment ? req.body.amount : 0
            },
            approval: req.body.approval,
            isPending: true,
            noOfVolunteers: req.body.noOfVolunteers,
            estimatedBudget: req.body.estimatedBudget,
            sponsorsAcquired: req.body.sponsorsAcquired,
            eventWebsite: req.body.eventWebsite,
            startDate: req.body.date,
            endDate: req.body.endDate
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
                isSelection: req.body.isSelection,
                payment: {
                    isPayment: req.body.isPayment,
                    amount: req.body.isPayment ? req.body.amount : 0
                },
                noOfVolunteers: req.body.noOfVolunteers,
                estimatedBudget: req.body.estimatedBudget,
                sponsorsAcquired: req.body.sponsorsAcquired,
                eventWebsite: req.body.eventWebsite,
                startDate: req.body.date,
                endDate: req.body.endDate
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

const shortListing = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            res.status(404).json({
                message: 'event not found & shortlisting failed'
            });
        } else {
            for (const item of event.rsvp) {
                req.body.shortListed.forEach((itemInception) => {
                    if (item.id == itemInception) {
                        item.isSelected = true;
                    }
                });

                let user = await User.findById(item);
                user.registeredEvents.forEach((itemInception) => {
                    if (req.params.id == itemInception.id) {
                        itemInception = true;
                    }
                    return itemInception;
                });
                await user.save();

                const eventName = event.name;
                const clubName = req.user.name;
                const subject = `You're Shortlisted!`;
                const body = `Dear participant, \n Congratulations! You have been shortlisted for ${eventName} organised by ${clubName}`;
                await sendEmail(user.email, subject, body);

                return item;
            }
            await event.save();

            res.status(200).json({
                message: 'shortlisting successful',
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

const publishEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            res.status(404).json({
                message: 'event not found & publishing failed'
            });
        } else {
            if (!event.isApproved) {
                res.status(400).json({
                    message: 'approval pending'
                });
            } else {
                event.isPublished = true;
                await event.save();

                res.status(200).json({
                    message: 'event published',
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

module.exports = {
    createEvent,
    getEventList,
    getEventById,
    updateEvent,
    respondQuery,
    shortListing,
    publishEvent
};

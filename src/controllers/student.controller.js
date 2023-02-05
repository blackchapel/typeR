const User = require('../models/user.schema');
const Event = require('../models/event.schema');

const rsvpForStudents = async (req, res) => {
    try {
        // rsvp in event schema
        const event = await Event.findById(req.body.eventId);

        if (!event) {
            res.status(404).json({
                message: 'event not found & rsvp failed'
            });
        } else {
            if (!event.isPublished) {
                res.status(400).json({
                    message: 'event not published'
                });
            }
            const queryObj = {
                id: req.user.id,
                name: req.user.name,
                email: req.user.emails
            };
            event.rsvp.push(queryObj);

            await event.save();
        }

        // append to registered events in student user
        const user = await User.findById(req.user.id);

        if (!user) {
            res.status(404).json({
                message: 'user not found & updation in registeredEvents failed'
            });
        } else {
            const eventQueryObj = {
                id: event._id,
                name: event.name,
                thumbnail: event.thumbnail
            };
            user.registeredEvents.push(eventQueryObj);

            await user.save();
        }
        res.status(200).json({
            message: 'RSVP successful',
            data: {
                event,
                user
            }
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            result: {
                message: error.message
            }
        });
    }
};

const eventsList = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            res.status(404).json({
                message: 'user not found & events fetch failed'
            });
        } else {
            const events = await Event.find({ isPublished: true });

            let upcomingEvents = [];
            let registeredEvents = [];
            if (events.length) {
                events.forEach((item) => {
                    user.registeredEvents.forEach((itemInception) => {
                        if (
                            itemInception.id.toString() === item._id.toString()
                        ) {
                            registeredEvents.push(item);
                        }
                    });

                    registeredEvents.forEach((itemInception) => {
                        if (itemInception._id !== item._id) {
                            upcomingEvents.push(item);
                        }
                    });
                });
            }
            res.status(200).json({
                message: 'Events list',
                data: {
                    upcomingEvents,
                    registeredEvents
                }
            });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            result: {
                message: error.message
            }
        });
    }
};

module.exports = {
    rsvpForStudents,
    eventsList
};

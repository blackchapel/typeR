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
            const queryObj = {
                id: req.user.id,
                name: req.user.name
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
            data: event
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

module.exports = {
    rsvpForStudents
};

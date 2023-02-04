const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
    {
        parent: {
            type: {
                id: {
                    type: String
                },
                name: {
                    type: String
                },
                thumbnail: {
                    type: String
                }
            }
        },
        name: {
            type: String
        },
        description: {
            type: String
        },
        thumbnail: {
            type: String
        },
        date: {
            type: String
        },
        rsvp: {
            type: [
                {
                    id: {
                        type: String
                    },
                    name: {
                        type: String
                    },
                    isSelected: {
                        type: Boolean
                    }
                }
            ]
        },
        isSelection: {
            type: Boolean
        },
        payment: {
            type: {
                isPayment: Boolean,
                amount: String
            }
        },
        approval: [
            {
                type: {
                    id: {
                        type: String
                    },
                    name: {
                        type: String
                    },
                    isApproved: {
                        type: String
                    },
                    query: [
                        {
                            type: {
                                content: {
                                    type: String
                                },
                                response: {
                                    type: String
                                },
                                isResponded: {
                                    type: String
                                }
                            }
                        }
                    ]
                }
            }
        ],
        status: {
            type: ['PENDING', 'IN REVIEW', 'APPROVED']
        },
        isPublish: {
            type: Boolean
        }
    },
    { timestamps: true }
);

const Event = mongoose.model('event', eventSchema);

module.exports = Event;

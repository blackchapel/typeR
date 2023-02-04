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
        isPending: {
            type: Boolean,
            default: false
        },
        isInReview: {
            type: Boolean,
            default: false
        },
        isApproved: {
            type: Boolean,
            default: false
        },
        isPublish: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);

const Event = mongoose.model('event', eventSchema);

module.exports = Event;

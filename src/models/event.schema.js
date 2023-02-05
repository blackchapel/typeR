const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
    {
        parent: {
            type: {
                id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User'
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
        rsvp: {
            type: [
                {
                    id: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'User'
                    },
                    name: {
                        type: String
                    },
                    email: {
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
        isPublished: {
            type: Boolean,
            default: false
        },
        noOfVolunteers: {
            type: Number
        },
        estimatedBudget: {
            type: Number
        },
        resourcesRequired: {
            type: String
        },
        sponsorsAcquired: {
            type: String
        },
        eventWebsite: {
            type: String
        },
        startDate: {
            type: String
        },
        endDate: {
            type: String
        }
    },
    { timestamps: true }
);

const Event = mongoose.model('event', eventSchema);

module.exports = Event;

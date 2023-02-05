const mongoose = require('mongoose');
const Event = require('./event.schema');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            unique: true
        },
        password: {
            type: String,
            trim: true
        },
        thumbnail: {
            type: String
        },
        websiteUrl: {
            type: String
        },
        socialUrl: {
            type: String
        },
        role: {
            type: String,
            enum: ['APPROVAL BODY', 'CLUB', 'STUDENT']
        },
        loginProvider: {
            type: String,
            enum: ['GOOGLE', 'TYPE R']
        },
        isActivated: {
            type: Boolean,
            default: false
        },
        isdeleted: {
            type: Boolean,
            default: false
        },
        // Student
        registeredEvents: [
            {
                type: {
                    id: {
<<<<<<< HEAD
                        type: String
=======
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'Event'
>>>>>>> 2ab4c92378f0fa35536db0ab24b99003ee876cc8
                    },
                    name: {
                        type: String
                    },
                    thumbnail: {
                        type: String
                    },
                    isSelected: {
                        type: Boolean
                    }
                }
            }
        ],
        // Approval Body
        approvalsRequested: [
            {
                type: {
                    id: {
                        type: String
                    },
                    name: {
                        type: String
                    },
                    thumbnail: {
                        type: String
                    },
                    status: {
                        type: String,
                        enum: ['PENDING', 'IN REVIEW', 'APPROVED'],
                        default: 'PENDING'
                    },
                    isApproved: {
                        type: Boolean,
                        default: false
                    }
                }
            }
        ],
        // Club
        eventsCreated: [
            {
                type: {
                    id: {
                        type: String
                    },
                    name: {
                        type: String
                    },
                    thumbnail: {
                        type: String
                    },
                    status: {
                        type: String,
                        enum: ['PENDING', 'IN REVIEW', 'APPROVED'],
                        default: 'PENDING'
                    },
                    isApproved: {
                        type: Boolean,
                        default: false
                    }
                }
            }
        ]
    },
    { timestamps: true }
);

const User = mongoose.model('user', userSchema);

module.exports = User;

const express = require('express');
const auth = require('./../middlewares/auth.middleware');
const {
    createEvent,
    getEventList,
    getEventById,
    updateEvent
} = require('../controllers/event.controller');
const upload = require('./../utilities/multer');

// Initializing router
const router = express.Router();

router.post(
    '/',
    [auth.verifyJwt],
    [auth.accountActivatedTrue],
    [auth.roleClub],
    createEvent
);

router.get(
    '/',
    [auth.verifyJwt],
    [auth.accountActivatedTrue],
    [auth.roleClub],
    getEventList
);

router.get(
    '/:id',
    [auth.verifyJwt],
    [auth.accountActivatedTrue],
    [auth.roleClub],
    getEventById
);

router.put(
    '/',
    [auth.verifyJwt],
    [auth.accountActivatedTrue],
    [auth.roleClub],
    updateEvent
);

module.exports = router;

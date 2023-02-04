const express = require('express');
const auth = require('./../middlewares/auth.middleware');
const {
    createEvent,
    getEventList,
    getEventById,
    updateEvent,
    respondQuery,
    shortListing
} = require('../controllers/event.controller');
const upload = require('./../utilities/multer');

// Initializing router
const router = express.Router();

router.post(
    '/',
    [auth.verifyJwt, auth.accountActivatedTrue, auth.roleClub],
    createEvent
);

router.get(
    '/',
    [auth.verifyJwt, auth.accountActivatedTrue, auth.roleClub],
    getEventList
);

router.get(
    '/:id',
    [auth.verifyJwt, auth.accountActivatedTrue, auth.roleClub],
    getEventById
);

router.put(
    '/',
    [auth.verifyJwt, auth.accountActivatedTrue, auth.roleClub],
    updateEvent
);

router.post(
    '/query-response/:id',
    [auth.verifyJwt, auth.accountActivatedTrue, auth.roleClub],
    respondQuery
);

router.post(
    '/shortlist/:id',
    [auth.verifyJwt, auth.accountActivatedTrue, auth.roleClub],
    shortListing
);

module.exports = router;

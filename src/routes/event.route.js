const express = require('express');
const auth = require('./../middlewares/auth.middleware');
const {
    createEvent,
    getEventList,
    getEventListNoAuth,
    getEventById,
    updateEvent,
    respondQuery,
    shortListing,
    publishEvent,
    sendCertificates
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
    '/:id',
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

router.patch(
    '/publish/:id',
    [auth.verifyJwt, auth.accountActivatedTrue, auth.roleClub],
    publishEvent
);

router.post(
    '/send-certificates/:id',
    [auth.verifyJwt, auth.accountActivatedTrue, auth.roleClub],
    sendCertificates
);

router.get('/list/no-auth', getEventListNoAuth);

module.exports = router;

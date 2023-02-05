const express = require('express');
const auth = require('./../middlewares/auth.middleware');
const {
    rsvpForStudents,
    eventsList
} = require('../controllers/student.controller');

// Initializing router
const router = express.Router();

router.post(
    '/rsvp',
    [auth.verifyJwt, auth.accountActivatedTrue, auth.roleStudent],
    rsvpForStudents
);

router.get(
    '/event-list',
    [auth.verifyJwt, auth.accountActivatedTrue, auth.roleStudent],
    eventsList
);

module.exports = router;

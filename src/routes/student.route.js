const express = require('express');
const auth = require('./../middlewares/auth.middleware');
const { rsvpForStudents } = require('../controllers/student.controller');

// Initializing router
const router = express.Router();

router.post(
    '/rsvp',
    [auth.verifyJwt, auth.accountActivatedTrue, auth.roleStudent],
    rsvpForStudents
);

module.exports = router;

const express = require('express');
const auth = require('./../middlewares/auth.middleware');
const {
    createClubAccount,
    raiseQuery
} = require('../controllers/approval-body.controller');

// Initializing router
const router = express.Router();

router.post(
    '/create-club-account',
    [auth.verifyJwt, auth.accountActivatedTrue, auth.roleApprovalBody],
    createClubAccount
);

router.post(
    '/raise-query',
    [auth.verifyJwt, auth.accountActivatedTrue, auth.roleApprovalBody],
    raiseQuery
);

module.exports = router;

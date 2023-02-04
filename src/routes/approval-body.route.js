const express = require('express');
const auth = require('./../middlewares/auth.middleware');
const {
    createClubAccount,
    raiseQuery,
    approveEvent,
    eventList,
    clubList
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

router.post(
    '/approve',
    [auth.verifyJwt, auth.accountActivatedTrue, auth.roleApprovalBody],
    approveEvent
);

router.get(
    '/event-list',
    [auth.verifyJwt, auth.accountActivatedTrue, auth.roleApprovalBody],
    eventList
);

router.get(
    '/club',
    [auth.verifyJwt, auth.accountActivatedTrue, auth.roleApprovalBody],
    clubList
);

module.exports = router;

const express = require('express');
const auth = require('./../middlewares/auth.middleware');
const {
    createClubAccount
} = require('../controllers/approval-body.controller');

// Initializing router
const router = express.Router();

router.post(
    '/create-club-account',
    [auth.verifyJwt],
    [auth.accountActivatedTrue],
    [auth.roleApprovalBody],
    createClubAccount
);

module.exports = router;

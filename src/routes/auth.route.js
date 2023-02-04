const express = require('express');
const auth = require('./../middlewares/auth.middleware');
const {
    googleSignIn,
    signUp,
    login,
    verifyOtp,
    sendOtpEmail,
    setUsername
} = require('./../controllers/auth.controller');

// Initializing router
const router = express.Router();

router.post('/google/signin', googleSignIn);

// router.post(
//     '/google/set-username',
//     [auth.verifyJwt, auth.accountActivatedFalse, auth.loginProviderGoogle],
//     setUsername
// );

router.post('/typer/signup', signUp);

router.post('/typer/signin', login);

router.post(
    '/typer/verify-otp',
    [auth.verifyJwt, auth.accountActivatedFalse, auth.loginProviderTypeR],
    verifyOtp
);

router.post(
    '/typer/send-otp-email',
    [auth.verifyJwt, auth.accountActivatedFalse, auth.loginProviderTypeR],
    sendOtpEmail
);

module.exports = router;

const express = require('express');
const auth = require('./../middlewares/auth.middleware');
const { getUserById, uploadFile } = require('../controllers/user.controller');
const upload = require('./../utilities/multer');

// Initializing router
const router = express.Router();

router.get('/:id', [auth.verifyJwt, auth.accountActivatedTrue], getUserById);

router.post(
    '/upload/:id',
    [auth.verifyJwt, auth.accountActivatedTrue],
    upload.single('file'),
    uploadFile
);

module.exports = router;

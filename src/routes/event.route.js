const express = require('express');
const auth = require('./../middlewares/auth.middleware');
const { createEvent } = require('../controllers/event.controller');
const upload = require('./../utilities/multer');

// Initializing router
const router = express.Router();

router.post('/', [auth.verifyJwt], upload.single('thumbnail'), createEvent);

module.exports = router;

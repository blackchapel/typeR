const cloudinary = require('cloudinary');
const dotenv = require('dotenv');

cloudinary.config({
    cloud_name: 'sihblackwing',
    api_key: '831834391741665',
    api_secret: '-rNdgW8t9MPlnG5K79H8OwDs5uk'
});

module.exports = cloudinary;

const User = require('../models/user.schema');
const { cloudinary } = require('./../utilities/utils');

const getUserById = async (req, res) => {
    try {
        let user = await User.findById(req.params.id);

        if (!user) {
            res.status(404).json({
                message: 'User not found'
            });
        }

        res.status(200).json({
            message: 'User found!',
            data: user
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: error.message
        });
    }
};

const uploadFile = async (req, res) => {
    try {
        let fileUrl;
        if (req.file) {
            fileUrl = await cloudinary.uploader.upload(req.file.path, {
                public_id: 'home/public/uploads/' + req.file.filename
            });
        }

        const user = await User.findByIdAndUpdate(
            req.params.id,
            {
                file: fileUrl.url
            },
            { new: true }
        );

        fs.unlinkSync(req.file.path);

        if (!user) {
            res.status(404).json({
                message: 'User not found'
            });
        }

        res.status(200).json({
            message: 'User updated!',
            data: user
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            result: {
                message: error.message
            }
        });
    }
};

const getApprovalBodies = async (req, res) => {
    try {
        const approvalBodies = await User.find({ role: 'APPROVAL BODY' });

        if (!approvalBodies) {
            res.status(404).json({
                message: 'No approval bodies available'
            });
        }

        res.status(200).json({
            message: 'Approval bodies found',
            data: approvalBodies
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            result: {
                message: error.message
            }
        });
    }
};

module.exports = {
    getUserById,
    uploadFile,
    getApprovalBodies
};

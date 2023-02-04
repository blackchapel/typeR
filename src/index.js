const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const fs = require('fs');
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const dotenv = require('dotenv').config();
const db = require('./configs/connection');
// Swagger

// Importing Routes
const authRoutes = require('./routes/auth.route');
const paymentRoutes = require('./routes/payment.router');
const userRoutes = require('./routes/user.route');
const eventRoutes = require('./routes/event.route');
const approvalBodyRoutes = require('./routes/approval-body.route');
const studentRoutes = require('./routes/student.route');

// Initializing an express app
const app = express();

// Server Port
const PORT = process.env.PORT;

// Formatting incoming data and allowing cross origin requests
app.use(cors({ origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging incoming requests
app.use(morgan('dev'));

// API documentations
const swaggerJSDocs = YAML.load('./docs.yaml');
app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerJSDocs));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/user', userRoutes);
app.use('/api/event', eventRoutes);
app.use('/api/approval-body', approvalBodyRoutes);
app.use('/api/student', studentRoutes);

// Test API
app.get('/api', (req, res) => {
    res.status(200).json({
        name: `${process.env.APP_NAME}`,
        apiVersion: JSON.parse(fs.readFileSync('./package.json').toString())
            .version
    });
});

// Listening on the port
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

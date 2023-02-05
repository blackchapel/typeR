import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
// const axios = require('axios');
import PDFDocument from 'pdfkit';
// import * as cloudinary from './config';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './config.js';

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

app.post('/api/pdf/certificate', async (req, res) => {
    try {
        const doc = new PDFDocument({
            layout: 'landscape',
            size: 'A4'
        });

        // Helper to move to next line
        function jumpLine(doc, lines) {
            for (let index = 0; index < lines; index++) {
                doc.moveDown();
            }
        }

        const bottomHeight = doc.page.height - 123;

        // async function fetchImage(src) {
        //     const image = await axios.get(src, {
        //         responseType: 'arraybuffer'
        //     });
        //     return image.data;
        // }

        // const logo = await fetchImage(
        //     'https://firebasestorage.googleapis.com/v0/b/xreventi.appspot.com/o/images%2Fwall.png%20%2B?alt=media&token=f55e2076-368d-463e-8e2c-ed1c87594bfd'
        // );

        doc.pipe(fs.createWriteStream('output.pdf'));

        doc.rect(0, 0, doc.page.width, doc.page.height).fill('#E0FBFC');

        doc.fontSize(10);

        // Margin
        const distanceMargin = 18;

        doc.fillAndStroke('#3D5A80')
            .lineWidth(20)
            .lineJoin('round')
            .rect(
                distanceMargin,
                distanceMargin,
                doc.page.width - distanceMargin * 2,
                doc.page.height - distanceMargin * 2
            )
            .stroke();

        // Header
        const maxWidth = 140;
        const maxHeight = 70;

        doc.image(
            'assets/logo_transparent.png',
            doc.page.width / 2 - maxWidth / 2,
            60,
            {
                fit: [maxWidth, maxHeight],
                align: 'center'
            }
        );

        jumpLine(doc, 4);

        doc.font('fonts/NotoSansJP-Bold.otf')
            .fontSize(18)
            .fill('#021c27')
            .text('Internship Fair', {
                align: 'center'
            });

        jumpLine(doc, 1);

        // Content
        doc.font('fonts/NotoSansJP-Regular.otf')
            .fontSize(16)
            .fill('#021c27')
            .text('CERTIFICATE OF PARTICIPATION', {
                align: 'center'
            });

        jumpLine(doc, 1);

        doc.font('fonts/NotoSansJP-Light.otf')
            .fontSize(10)
            .fill('#021c27')
            .text('presented to', {
                align: 'center'
            });

        jumpLine(doc, 2);

        doc.font('fonts/NotoSansJP-Bold.otf')
            .fontSize(24)
            .fill('#021c27')
            .text(req.body.name, {
                align: 'center'
            });

        jumpLine(doc, 1);

        doc.font('fonts/NotoSansJP-Light.otf')
            .fontSize(10)
            .fill('#021c27')
            .text('who successfully participated in the Internship Fair.', {
                align: 'center'
            });

        jumpLine(doc, 12);

        doc.lineWidth(1);

        // Signatures
        const lineSize = 174;
        const signatureHeight = 390;

        doc.fillAndStroke('#021c27');
        doc.strokeOpacity(0.2);

        const startLine1 = 128;
        const endLine1 = 128 + lineSize;
        doc.moveTo(startLine1, signatureHeight)
            .lineTo(endLine1, signatureHeight)
            .stroke();

        const startLine2 = endLine1 + 32;
        const endLine2 = startLine2 + lineSize;
        doc.moveTo(startLine2, signatureHeight)
            .lineTo(endLine2, signatureHeight)
            .stroke();

        const startLine3 = endLine2 + 32;
        const endLine3 = startLine3 + lineSize;
        doc.moveTo(startLine3, signatureHeight)
            .lineTo(endLine3, signatureHeight)
            .stroke();

        doc.font('fonts/NotoSansJP-Bold.otf')
            .fontSize(10)
            .fill('#021c27')
            .text('John Doe', startLine1, signatureHeight + 10, {
                columns: 1,
                columnGap: 0,
                height: 40,
                width: lineSize,
                align: 'center'
            });

        doc.font('fonts/NotoSansJP-Light.otf')
            .fontSize(10)
            .fill('#021c27')
            .text('Associate Professor', startLine1, signatureHeight + 25, {
                columns: 1,
                columnGap: 0,
                height: 40,
                width: lineSize,
                align: 'center'
            });

        doc.font('fonts/NotoSansJP-Bold.otf')
            .fontSize(10)
            .fill('#021c27')
            .text('Student Name', startLine2, signatureHeight + 10, {
                columns: 1,
                columnGap: 0,
                height: 40,
                width: lineSize,
                align: 'center'
            });

        doc.font('fonts/NotoSansJP-Light.otf')
            .fontSize(10)
            .fill('#021c27')
            .text('Student', startLine2, signatureHeight + 25, {
                columns: 1,
                columnGap: 0,
                height: 40,
                width: lineSize,
                align: 'center'
            });

        doc.font('fonts/NotoSansJP-Bold.otf')
            .fontSize(10)
            .fill('#021c27')
            .text('Jane Doe', startLine3, signatureHeight + 10, {
                columns: 1,
                columnGap: 0,
                height: 40,
                width: lineSize,
                align: 'center'
            });

        doc.font('fonts/NotoSansJP-Light.otf')
            .fontSize(10)
            .fill('#021c27')
            .text('Director', startLine3, signatureHeight + 25, {
                columns: 1,
                columnGap: 0,
                height: 40,
                width: lineSize,
                align: 'center'
            });

        jumpLine(doc, 4);

        // Validation link
        // const link =
        //   'https://validate-your-certificate.hello/validation-code-here';

        // const linkWidth = doc.widthOfString(link);
        // const linkHeight = doc.currentLineHeight();

        // doc
        //   .underline(
        //     doc.page.width / 2 - linkWidth / 2,
        //     448,
        //     linkWidth,
        //     linkHeight,
        //     { color: '#021c27' },
        //   )
        //   .link(
        //     doc.page.width / 2 - linkWidth / 2,
        //     448,
        //     linkWidth,
        //     linkHeight,
        //     link,
        //   );

        // doc
        // .font('fonts/NotoSansJP-Light.otf')
        // .fontSize(10)
        // .fill('#021c27')
        // .text(
        //   link,
        //   doc.page.width / 2 - linkWidth / 2,
        //   448,
        //   linkWidth,
        //   linkHeight
        // );

        // Footer

        // doc.image(logo, 0, 200);
        doc.image(
            'assets/red-bull.png',
            doc.page.width / 2 - 30,
            bottomHeight + 5,
            {
                fit: [80, 60],
                align: 'center'
            }
        );

        doc.image(
            'assets/digital-ocean.png',
            doc.page.width / 4 - 30,
            bottomHeight,
            {
                fit: [80, 60],
                align: 'left'
            }
        );

        doc.image(
            'assets/oculus.png',
            doc.page.width / 4 + 360,
            bottomHeight + 16,
            {
                fit: [120, 60],
                align: 'right'
            }
        );

        doc.end();

        const file = fs.readFileSync('./output.pdf');
        const imageRef = ref(
            storage,
            `${req.body._id}/certificates/output.pdf`
        );
        const snapshot = await uploadBytes(imageRef, file);
        const url = await getDownloadURL(snapshot.ref);

        res.status(201).json({
            message: 'certificate generated',
            data: {
                url: url
            }
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: error.message
        });
    }
});

// csi spit
// mudra
// sports club
// sparks
// rotract
// ecell

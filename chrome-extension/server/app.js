const express = require('express');
const fs = require('fs');
const csvParser = require('csv-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

let spamList = [];

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (HTML, CSS, JS) from the parent directory
app.use(express.static(path.join(__dirname, '..')));

// Load spam data from CSV
fs.createReadStream(path.join(__dirname, 'spam.csv'))
    .pipe(csvParser())
    .on('data', (row) => {
        spamList.push(row.SpamContent.toLowerCase());
    })
    .on('end', () => {
        console.log('Spam list loaded.');
    });

// Endpoint to check SMS content
app.post('/check-sms', (req, res) => {
    const smsContent = req.body.smsContent.toLowerCase();
    const isSpam = spamList.some(spam => smsContent.includes(spam));

    res.json({ isSpam });
});

// Endpoint to check URL content
app.post('/check-url', (req, res) => {
    const urlContent = req.body.urlContent.toLowerCase();
    const isSpam = spamList.some(spam => urlContent.includes(spam));

    res.json({ isSpam });
});

// Serve popup.html at the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'popup.html')); // Corrected path
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

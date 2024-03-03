const express = require('express');
require('dotenv').config();
const pool = require('../controllers/listingController');
const router = express.Router();

const AWS = require('aws-sdk');

// Configure AWS to use your credentials
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  });

const s3 = new AWS.S3();


// Routes

// Fetch listings
router.get('/listings', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM schools');
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Add listing
router.post('/listings', async (req, res) => {
    try {
        const { schoolName, about, imageUrl } = req.body; // 'imageUrl' will be sent from the frontend
        const result = await pool.query(
            'INSERT INTO schools (name, about, image_url) VALUES ($1, $2, $3) RETURNING *',
            [schoolName, about, imageUrl]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;


// Update listing
router.put('/listings/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { schoolName, about, imageUrl } = req.body; // Assuming the image URL is sent as part of the request
        
        // Update the listing in the database
        const result = await pool.query(
            'UPDATE schools SET name = $1, about = $2, image_url = $3 WHERE id = $4 RETURNING *',
            [schoolName, about, imageUrl, id]
        );

        if (result.rows.length > 0) {
            res.json(result.rows[0]); // Send back the updated listing
        } else {
            res.status(404).json({ message: 'Listing not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});  

// Route to fetch a single listing by its ID
router.get('/listings/:id', async (req, res) => {
    try {
        const { id } = req.params; // Extract the ID from the route parameter
        const queryResult = await pool.query('SELECT * FROM schools WHERE id = $1', [id]);

        if (queryResult.rows.length === 0) {
            return res.status(404).json({ message: 'Listing not found' });
        }

        res.json(queryResult.rows[0]); // Send back the found listing
    } catch (error) {
        console.error(`Error fetching listing by ID ${id}:`, error);
        res.status(500).json({ message: 'Server Error' });
    }
});

router.delete('/listings/:id', async (req, res) => {
    try {
        const { id } = req.params;
        // Retrieve the listing to get the image URL
        const listingResult = await pool.query('SELECT image_url FROM schools WHERE id = $1', [id]);
        
        if (listingResult.rows.length === 0) {
            return res.status(404).json({ message: 'Listing not found' });
        }

        const imageUrl = listingResult.rows[0].image_url;
        // Extract the key from the URL
        const keyRegex = /amazonaws\.com\/(.*)/;
        const match = imageUrl.match(keyRegex);
        const filename = match ? match[1] : null;

        if (filename) {
            // Delete the image from S3
            const s3DeleteParams = {
                Bucket: process.env.S3_BUCKET_NAME, // Make sure this is set in your environment variables
                Key: filename,
            };
            await s3.deleteObject(s3DeleteParams).promise();
        }

        // Then, delete the listing from the database
        await pool.query('DELETE FROM schools WHERE id = $1', [id]);

        res.json({ message: 'Listing and associated image deleted successfully' });
    } catch (error) {
        console.error(`Error deleting listing by ID ${id}:`, error);
        res.status(500).json({ message: 'Server Error' });
    }
});


module.exports = router;

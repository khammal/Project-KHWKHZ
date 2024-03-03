const { Pool } = require('pg');
require('dotenv').config();

// Set up PostgreSQL connection
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    // ssl: {
    //     rejectUnauthorized: false // Required for Heroku in production server
    // }
});

// // Controller functions
// exports.getAllListings = async (req, res) => {
//     try {
//         const client = await pool.connect();
//         const result = await client.query('SELECT * FROM listings');
//         client.release();
//         res.json(result.rows);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server Error' });
//     }
// };

// exports.createListing = async (req, res) => {
//     try {
//         const { schoolName, about, image } = req.body;
//         const client = await pool.connect();
//         const result = await client.query('INSERT INTO listings (school_name, about, image) VALUES ($1, $2, $3) RETURNING *', [schoolName, about, image]);
//         client.release();
//         res.status(201).json(result.rows[0]);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server Error' });
//     }
// };

// exports.updateListing = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { schoolName, about, image } = req.body;
//         const client = await pool.connect();
//         const result = await client.query('UPDATE listings SET school_name = $1, about = $2, image = $3 WHERE id = $4 RETURNING *', [schoolName, about, image, id]);
//         client.release();
//         res.json(result.rows[0]);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server Error' });
//     }
// };

module.exports = pool
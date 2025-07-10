// Import necessary modules
import express from 'express';
import { createClient } from '@supabase/supabase-js';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// --- DIAGNOSTIC LOGGING ---
// Let's log the environment variables to make sure they are loaded correctly.
console.log("--- Checking Environment Variables ---");
console.log("SUPABASE_URL:", process.env.SUPABASE_URL);
// We'll only log a small part of the key for security.
console.log("SUPABASE_ANON_KEY (first 10 chars):", process.env.SUPABASE_ANON_KEY ? process.env.SUPABASE_ANON_KEY.substring(0, 10) : "Not Found");
console.log("------------------------------------");


// Initialize the Express app
const app = express();
const port = process.env.PORT || 3001;

// --- Middleware ---
// Enable Cross-Origin Resource Sharing (CORS) for all routes
app.use(cors());
// Enable the Express app to parse JSON formatted request bodies
app.use(express.json());


// --- Supabase Initialization ---
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

// Check if Supabase credentials are provided
if (!supabaseUrl || !supabaseAnonKey) {
  console.error("FATAL ERROR: Supabase URL and Anon Key were not found in the environment variables. Please check your .env file and restart the server.");
  process.exit(1); // Exit the process with an error code
}

// Create a single Supabase client for interacting with your database
const supabase = createClient(supabaseUrl, supabaseAnonKey);


// --- API Routes ---

/**
 * @route POST /feedback
 * @description Receives feedback data and inserts it into the Supabase 'Feedback' table.
 * @body { name: string, email: string, phone?: string, message: string }
 */
app.post('/feedback', async (req, res) => {
  console.log('Received feedback submission:', req.body);
  const { name, email, phone, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Bad Request: Missing required fields (name, email, message).' });
  }

  try {
    const { data, error } = await supabase
      .from('Feedback')
      .insert([
        { name, email, phone, message },
      ])
      .select();

    if (error) {
      console.error('Supabase error:', error.message);
      // Also log the full error object for more details
      console.error('Full Supabase error object:', error);
      return res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }

    console.log('Successfully inserted data:', data);
    res.status(201).json({ message: 'Feedback submitted successfully!', data: data });

  } catch (err) {
    console.error('Unexpected server error:', err.message);
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
});


// --- Start the Server ---
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
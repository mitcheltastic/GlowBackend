Feedback Backend Server
This is a simple Express.js backend server designed to receive feedback submissions and store them in a Supabase database.

Features
A single API endpoint /feedback to accept new submissions.

Integration with Supabase for data storage.

Configuration via environment variables for security.

Ready for deployment on Vercel.

Getting Started
Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

Prerequisites
Node.js (v16 or later recommended)

npm

A free Supabase account

A free Vercel account (for deployment)

1. Installation
Clone the repository:

git clone <your-repository-url>
cd <your-repository-name>

Install dependencies:

npm install

2. Environment Variables
This project uses a .env file to manage secret keys.

Create a file named .env in the root of your project.

Copy the contents of .env.example (if you have one) or add the following variables:

# Get these from your Supabase project's API settings
SUPABASE_URL="YOUR_SUPABASE_PROJECT_URL"
SUPABASE_ANON_KEY="YOUR_SUPABASE_ANON_KEY"

Find your credentials in your Supabase project under Project Settings > API.

3. Supabase Table Setup
Ensure you have a table in Supabase named Feedback with the following columns:

id (int8, primary key)

created_at (timestamptz)

name (varchar)

email (varchar)

phone (varchar, optional)

message (text)

4. Running the Server
Development Mode: To run the server with nodemon (which automatically restarts on file changes):

npm run dev

Production Mode: To run the server normally:

npm start

The server will be running on http://localhost:3001.

API Endpoint
POST /feedback
Accepts a JSON object to create a new feedback entry.

Request Body:

{
  "name": "string (required)",
  "email": "string (required)",
  "phone": "string (optional)",
  "message": "string (required)"
}

Example curl Request:

curl -X POST http://localhost:3001/feedback \
-H "Content-Type: application/json" \
-d '{"name": "Jane Doe", "email": "jane.doe@example.com", "message": "The service was amazing!"}'

Success Response (201):

{
    "message": "Feedback submitted successfully!",
    "data": [
        {
            "id": 1,
            "created_at": "2025-07-10T07:55:00.123456+00:00",
            "name": "Jane Doe",
            "email": "jane.doe@example.com",
            "phone": null,
            "message": "The service was amazing!"
        }
    ]
}

Deployment to Vercel
This project is configured for easy deployment to Vercel.

Push your code to a GitHub repository.

Import the repository on your Vercel dashboard.

Crucially, add your SUPABASE_URL and SUPABASE_ANON_KEY as Environment Variables in the Vercel project settings.

Click Deploy. Vercel will handle the rest.
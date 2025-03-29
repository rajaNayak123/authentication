# RESTful API for User Profile Management

## Overview
This project is a RESTful API for user profile management, built with Express.js and MongoDB. It supports user registration, profile retrieval, and profile updates, with authentication handled using JWT.

## Features
- User registration and profile creation
- User authentication using JWT
- Profile retrieval
- Profile update
- Secure password hashing
- Protected routes (users can only access their own profiles)
- Error handling

## Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Authentication:** JWT (JSON Web Token)

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo.git
   cd your-repo
2. Install dependencies:
   ```sh
   npm install
3. Create a .env file in the root directory and add the following variables:
   ```sh
   MONGODB_URL =""
    PORT =
   
    TOKEN_SECRET =""
    TOKEN_EXPIRY=""

    CLOUDINARY_NAME = ""
    API_KEY = ""
    API_SECRET = ""
4. Start the server:
   ```sh
   npm start



API Endpoints
User Registration

POST /api/users/register

    Body:

    {
      "name": "John Doe",
      "email": "john@example.com",
      "password": "securepassword",
      "bio":"your bio"
      "address": "123 Main St"
      "avatar":"upload file"
    }

Response:

    {
      "message": "User registered successfully",
      "token": "jwt_token"
    }

User Login

POST /api/users/login

    Body:
    {
    "email": "john@example.com",
    "password": "securepassword"
    }

Response:

    {
      "token": "jwt_token"
    }

Get User Profile

GET /api/users/profile

    Headers:

    {
      "Authorization": "Bearer jwt_token"
    }

Response:

    {
      "name": "John Doe",
      "email": "john@example.com",
      "address": "123 Main St",
      "bio": "Software Developer",
      "profilePicture": "https://example.com/profile.jpg"
    }

Update User Profile

PUT /api/users/profile

    Headers:

    {
      "Authorization": "Bearer jwt_token"
    }

Body: (Optional fields can be updated)

    {
      "name": "John Updated",
      "address": "456 New St",
      "bio": "Senior Developer"
    }

Response:

    {
      "message": "Profile updated successfully"
    }

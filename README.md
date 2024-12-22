## Overview

This project is a full-stack web application built using modern technologies. The frontend is developed with React, while the backend leverages Node.js, Express.js, Prisma, and Supabase for efficient and scalable operations.

## Tech Stack

### Frontend

- **React**: A JavaScript library for building user interfaces.

### Backend

- **Node.js**: A runtime environment for executing JavaScript on the server.
- **Express.js**: A web application framework for Node.js to create APIs and server-side logic.
- **Prisma**: An ORM (Object-Relational Mapping) tool for database management.
- **Supabase**: A backend-as-a-service platform used for database and authentication.

## Features

- **Dynamic and Responsive UI**: Built with React to ensure a smooth user experience.
- **RESTful API**: Powered by Express.js for efficient communication between frontend and backend.
- **Database Management**: Prisma and Supabase handle data operations seamlessly.
- **Authentication**: User authentication.
- **Search and Filtering**: Users can search for posts by title, or ID.
- **Pagination**: Efficiently handle large datasets by implementing pagination in the backend and frontend.
- **Crud Operations**: Implemented crud operations related to posts.

## Installation

### Prerequisites

- Node.js (>= 14.x)
- npm (>= 6.x)

### Backend Setup

1.  Clone the repository:

    
    git clone https://github.com/geetam-das-binani/assignment-instinctive-studio
    cd backend
    

2.  Install dependencies:

  
    npm install
   

3.  Set up environment variables: Create a `.env` file in the backend root directory with the following keys:

   
    DATABASE_URL=<supabase_database_url>
    JWT_SECRET= <jwt_secret>
    PORT= <PORT>
   

4.  Apply Prisma migrations:

   
    npx prisma migrate dev
   

5.  Start the backend server:

   
    npm run dev
   

### Frontend Setup

1.  Navigate to the frontend folder:

   
    cd frontend
   
2. Set up environment variables: Create a `.env` file in the frontend  root directory with the following keys:

    VITE_BASE_URL= <local backend url>

3.  Install dependencies:

   
    npm install
   

4.  Start the development server:

   
    npm run dev
   

## Usage

1.  Open the application in your browser at `http://localhost:5173`.
2.  Use the search bar to filter posts by title, or ID.
3.  Authenticate via login/signup
4.  Navigate through posts with pagination.

## Folder Structure

```
project-root/
|-- backend/
|   |-- prisma/            # Prisma schema and migrations
|   |-- routes/            # API route handlers
|    |-- middleware/       # Middleware handler
|    |-- db/               #Prisma Client handler
|   |-- index.mjs          # Main backend server entry point
|
|-- frontend/
    |-- public/            # Public assets
    |-- src/               # React application source code
    |-- package.json       # Frontend dependencies
```

## API Endpoints

### GET `/api/v1/get-all-posts`

Fetches a paginated list of posts, with optional search functionality.

- **Query Parameters**:

  - `search` (optional): Search term for filtering posts by title, content, or ID.
  - `page_no` (optional): Page number for pagination.

### POST `/api/v1/create-post`

### PUT `/api/v1/update-post/:id`

### GET `/api/v1/get-post/:id`

### DELETE `/api/v1/delete-post/:id`

### POST `/api/v1/logout-user`

### POST `/api/v1/login-user`

### POST `/api/v1/register-user`

### PUT `/api/v1/update-user`

### GET `/api/v1/me`

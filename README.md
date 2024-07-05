# Movie Reviews Web App

This is a full-stack Movie Reviews Web App built with Express.js for the backend and React.js for the frontend. The application allows users to view, add, update, and delete reviews for various movies.

## Features

- View a list of movies with their details.
- Search for movies by title and rating.
- User authentication (login and logout).
- Add, update, and delete reviews for movies.

## Technologies

### Backend

- Node.js
- Express.js
- MongoDB
- dotenv

### Frontend

- React.js
- React Router
- Bootstrap

## Setup

### Prerequisites

- Node.js and npm installed
- MongoDB database

### Installation 

1. **Clone the repository:**

    ```bash
    git clone https://github.com/e-avi/Movie-Reviews-Web-App.git
    cd Movie-Reviews-Web-App
    ```

2. **Setup backend:**

    ```bash
    cd backend
    npm install
    ```

3. **Setup frontend:**

    ```bash
    cd ../frontend
    npm install
    ```

### Environment Variables

Create a `.env` file in the `backend` directory and add the following environment variables:

```
MOVIEREVIEWS_DB_URI=<your-mongodb-connection-string>
PORT=<your-port-number>
```


## Usage

### Running the Backend Locally

1. **Navigate to the `backend` directory:**

    ```bash
    cd backend
    ```

2. **Start the server:**

    ```bash
    npm start
    ```

3. **The backend server will run on the specified port (default is 8000).**

### Running the Frontend Locally

1. **Navigate to the `frontend` directory:**

    ```bash
    cd frontend
    ```

2. **Start the frontend development server:**

    ```bash
    npm start
    ```

3. **The frontend will be accessible at `http://localhost:3000`.**

## Refrence

Coded this website inspired by the book Beginning MERN Stack of Greg Lim. Here you can find the book: https://www.amazon.in/Beginning-MERN-Stack-Development-Greg/dp/9811815526

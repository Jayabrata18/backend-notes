# Notes Website Backend System Assigment of Speer

Hi, I am Jayabrata. This repository contains the backend system for a notes website. The system is built using Express.js as the web framework, MongoDB as the database, and Redis for caching. Below are the details explaining the choice of frameworks, databases, and third-party tools.

## Technology Stack

- **Express.js**: A fast, unopinionated, minimalist web framework for Node.js. Chosen for its simplicity and robust features for building web applications.

- **MongoDB**: A NoSQL database for storing data in a flexible, JSON-like format. MongoDB is scalable and provides quick and efficient access to data.

- **Redis**: An in-memory data structure store used as a caching layer to improve the performance of frequently accessed data.

## Dependencies

The project relies on the following dependencies:

- **bcryptjs**: For hashing and salting passwords securely.
- **cookie-parser**: Middleware to parse cookies from incoming requests.
- **cors**: Middleware to enable Cross-Origin Resource Sharing.
- **dotenv**: To load environment variables from a .env file.
- **express-rate-limit**: Middleware to limit repeated requests from the same IP.
- **express-slow-down**: Middleware to slow down requests after a certain limit.
- **ioredis**: A Redis client for Node.js.
- **jsonwebtoken**: For generating and verifying JSON Web Tokens.
- **mongoose**: An Object Data Modeling (ODM) library for MongoDB and Node.js.

## Environment Variables

Ensure you have a `.env` file in the project root with the following variables:

<!-- ## Third-Party Tools

- **Puppeteer:** A headless browser automation tool. It is used for taking screenshots, generating previews, or any other browser-related automation tasks. -->

```env
PORT=5000
MONGO_URL=mongodb+srv://your-mongo-db-url
NODE_ENV=development
REDIS_URL=your-redis-url

<!-- JWT_PRIVATE_KEY=your-jwt-private-key -->
ACCESS_TOKEN=your-access-token-secret
REFRESH_TOKEN=your-refresh-token-secret

ACCESS_TOKEN_EXPIRE=5
REFRESH_TOKEN_EXPIRE=3
```

Setup and Installation

To start the project first you should clone the repository.

```
https://github.com/Jayabrata18/backend-notes
```

1. go to maindirectory and `npm i` to install all dependencies.
2. make a `.env` file in root directory and add all necessary dependencies.
3. now run `npm start` to start the project. It will run in `port 5000`. You can change in env file.
4. for testing purposes you should run `npm test` .

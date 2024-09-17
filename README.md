# ARIAS - Automated Recruitment Intelligence and Analytics Systems

## Overview
ARIAS is designed to streamline the recruitment process by automating tasks like resume parsing, extracting relevant information, ranking candidates, and scheduling interviews. This repository contains the server-side setup and configuration for ARIAS.

## Features
- **Resume Parsing**: Automatically extracts significant details from resumes.
- **Summarization**: Provides a concise summary of candidates' key qualifications.
- **Ranking**: Ranks candidates based on predefined criteria.
- **Automated Interview Scheduling**: Schedules interviews based on availability.

## Key Tools and Libraries
- **Sequelize**: Object-relational mapping (ORM) for interacting with the database. This project uses Sequelize to define models and synchronize the database schema.
- **Morgan**: HTTP request logger middleware for Node.js. Morgan provides detailed logging during development and production.
- **Helmet**: Middleware that secures your Express.js app by setting various HTTP headers, improving security.
- **Nodemon**: A tool that automatically restarts the Node.js application when file changes are detected, improving the developer experience.
- **ESLint**: A linting utility for JavaScript and Node.js code to enforce consistent style and catch potential errors.
- **Prettier**: A code formatting tool to ensure consistent code style throughout the project.

## Project Structure
The following is the structure of the server setup:

    /configs
      ├── config.js               # General configuration settings
      ├── cors.config.js          # CORS setup
      ├── db.config.js            # Database configuration (Sequelize)
      ├── error.config.js         # Centralized error handling middleware
      ├── routes.config.js        # Route configuration for the API
    
    /controllers
      ├── user_controller.js      # User-related API endpoints
    
    /middlewares
      ├── error_middleware.js     # General error middleware for handling exceptions
      ├── rate_limiting_middleware.js # Middleware for rate-limiting API requests
    
    /models
      ├── users.js                # Sequelize model for user data
    
    /repositories
      ├── user_repo.js            # Repository layer for database operations related to users
    
    /routes
      ├── user_routes.js          # API routes for user-related operations
    
    /services
      ├── user_service.js         # Business logic for user operations
    
    /validators
      ├── user_validator.js       # Validation for user input
    
    index.js                      # Entry point to start the server and initialize Sequelize
    
    .env                           # Environment variables for database, API keys, etc.

## Installation and Setup
### 1. Prerequisites
Before you begin, ensure you have the following installed:
- **Node.js**: v14.x or higher
- **NPM**: v6.x or higher
- **Database**: PostgreSQL v16.x or higher.
  
### 2. Clone the repository:
    git clone https://github.com/yourusername/arias-backend.git
### 3. Install dependencies:
    npm install
### 4. Set up environment variables:
    Create a .env file in the root directory and set up your environment variables.
### 5. Run the server
    nodemon index.js
### 6. Linting and Code Formatting
**ESLint**: To check for code issues.
    
    npm run lint

**Prettier**: To format the code.
    
    npm run prettier


## Error Handling and Rate Limiting
This server implements centralized error handling and rate limiting through the following middlewares:
- **Error Middleware**: Catches and handles all application-level errors and returns appropriate responses to the client.
- **Rate Limiting Middleware**: Protects the server from too many requests by limiting the number of requests a user can make within a certain time frame.

## Database Configuration
The server uses Sequelize to manage interactions with the database. Make sure your database is properly configured in the .env file, and run the app to synchronize the database schema using the sequelize.sync() method.

## Contributions
Contributions to ARIAS are welcome! Feel free to open a pull request or submit issues for any bugs or feature requests.

## License
This project is licensed under the MIT License.


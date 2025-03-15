# Planning Poker Backend

## Overview

A lightweight and efficient backend server for Planning Poker, built with Node.js, Express, and TypeScript. This server provides real-time room management and voting capabilities for agile estimation sessions.

## Features

- **Room Management:**
  - Create custom rooms with configurable vote options
  - Auto-generated or custom room IDs
  - First user automatically becomes room host
  - Prevent duplicate usernames in the same room

- **Voting System:**
  - Configurable voting options (default: 0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, ?)
  - Real-time vote tracking
  - Vote reveal/hide functionality
  - Round reset capability

- **User Management:**
  - Unique user IDs per session
  - Username validation
  - Host privileges

## Tech Stack

- Node.js
- Express.js
- TypeScript
- Swagger UI for API documentation
- CORS enabled for cross-origin requests

## Project Structure

```
src/
├── config/                 # Configuration files
│   └── index.ts           # Central configuration exports
│
├── controllers/           # Request handlers
│   └── room.controller.ts # Room and voting controllers
│
├── middleware/           # Custom middleware
│   ├── error.middleware.ts    # Error handling middleware
│   └── validation.middleware.ts # Request validation
│
├── models/              # Data models/interfaces
│   ├── room.model.ts   # Room interface/model
│   └── user.model.ts   # User interface/model
│
├── routes/             # Route definitions
│   ├── index.ts        # Route aggregator
│   └── room.routes.ts  # Room and voting routes
│
├── services/           # Business logic
│   └── room.service.ts # Room and voting operations
│
├── utils/             # Utility functions
│   └── errors.ts     # Custom error classes
│
├── serverState.ts     # In-memory state management
└── index.ts          # Application entry point
```

This structure follows the separation of concerns principle and makes the application more maintainable and scalable.

## API Endpoints

### Room Management

#### Create Room
- **POST** `/rooms`
- **Body:**
  ```json
  {
    "roomId": "string (optional)",
    "voteOptions": "string[] (optional)"
  }
  ```
- **Response:** 
  ```json
  {
    "roomId": "string",
    "voteOptions": "string[]"
  }
  ```
- **Status Codes:**
  - `201`: Room created successfully
  - `400`: Room ID already exists
  - `500`: Internal server error

#### Get Room Info
- **GET** `/rooms/:roomId`
- **Response:**
  ```json
  {
    "users": "Record<string, User>",
    "showVotes": "boolean",
    "host": "string",
    "votes": "Record<string, string> (only if showVotes is true)"
  }
  ```
- **Status Codes:**
  - `200`: Success
  - `404`: Room not found

#### Delete Room
- **DELETE** `/rooms/:roomId`
- **Response:**
  ```json
  {
    "message": "Room deleted successfully"
  }
  ```
- **Status Codes:**
  - `200`: Room deleted successfully
  - `404`: Room not found
  - `500`: Internal server error

#### Join Room
- **POST** `/rooms/:roomId/join`
- **Body:**
  ```json
  {
    "username": "string"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Joined room",
    "userId": "string"
  }
  ```
- **Status Codes:**
  - `200`: Successfully joined
  - `400`: Username already taken
  - `404`: Room not found

#### Submit Vote
- **POST** `/rooms/:roomId/vote`
- **Body:**
  ```json
  {
    "username": "string",
    "vote": "string"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Vote recorded"
  }
  ```
- **Status Codes:**
  - `200`: Vote recorded
  - `404`: Room or user not found

#### Get Vote Options
- **GET** `/rooms/:roomId/vote-options`
- **Response:**
  ```json
  string[]  // Array of available vote options
  ```
- **Status Codes:**
  - `200`: Success
  - `404`: Room not found

#### Reveal Votes
- **POST** `/rooms/:roomId/reveal`
- **Response:**
  ```json
  {
    "message": "Votes revealed"
  }
  ```
- **Status Codes:**
  - `200`: Votes revealed successfully
  - `404`: Room not found

#### Reset Round
- **POST** `/rooms/:roomId/reset`
- **Response:**
  ```json
  {
    "message": "Round reset"
  }
  ```
- **Status Codes:**
  - `200`: Round reset successfully
  - `404`: Room not found

## Data Structures

### Room
```typescript
interface Room {
  id: string;
  users: Record<string, User>;
  votes: Record<string, string>;
  showVotes: boolean;
  host: string;
  voteOptions: string[];
}
```

### User
```typescript
interface User {
  username: string;
}
```

## Setup and Installation

1. **Prerequisites:**
   - Node.js (v14 or higher)
   - npm or yarn

2. **Installation:**
   ```bash
   # Clone the repository
   git clone <repository-url>
   cd planning-poker-backend

   # Install dependencies
   npm install
   ```

3. **Environment Setup:**
   - Default port: 3222 (configurable via PORT environment variable)

4. **Running the Server:**
   ```bash
   # Development
   npm run dev

   # Production
   npm run build
   npm start
   ```

5. **API Documentation:**
   - Once the server is running, visit `http://localhost:3222/api-docs` to view the Swagger documentation.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details. 

P.S. this project is fully created by Cursor + Claude with almost 0 human lines of code
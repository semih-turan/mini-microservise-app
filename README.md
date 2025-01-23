# 🚀 Mini Microservices Blog Application

A modern blog application built with microservices architecture to demonstrate event-driven communication between services.

## 📋 Overview

This project is a simple blog application that allows users to create posts and add comments. The interesting part is its architecture - it's built using microservices pattern with event-based communication.

## 🏗️ Architecture

The application consists of the following services:

### Services
- **Posts Service** (Port 4000) 
  - Handles post creation
  - Emits events when posts are created

- **Comments Service** (Port 4001)
  - Manages comments for posts
  - Handles comment moderation status
  - Emits events for comment creation/updates

- **Query Service** (Port 4002)
  - Consolidates data from posts and comments
  - Provides unified data to the frontend
  - Implements event sync mechanism for data recovery

- **Moderation Service** (Port 4003)
  - Moderates comments
  - Approves/rejects comments based on content
  - Emits moderation events

- **Event Bus** (Port 4005)
  - Handles event distribution between services
  - Stores event history
  - Enables event replay functionality

### Frontend
- **React Client** (Port 5173)
  - Built with React + TypeScript
  - Provides UI for creating posts and comments
  - Shows moderation status for comments

## 🔄 Event Flow

1. User creates a post/comment
2. Service emits an event to Event Bus
3. Event Bus broadcasts to all services
4. Services process events and update their state
5. Query service consolidates data
6. UI reflects the changes

## 🛠️ Technologies Used

- Node.js
- Express
- React
- TypeScript
- Axios
- CORS
- Event-Driven Architecture
- Microservices Pattern

## 🚦 Comment Moderation Flow

Comments go through the following states:
- **Pending** ⏳: Initial state when created
- **Approved** ✅: Comment passes moderation
- **Rejected** ❌: Comment fails moderation (contains blocked words)

## 🏃‍♂️ Running the Application

1. Install dependencies in each service:
 ```bash 
cd posts && npm install
cd comments && npm install
cd query && npm install
cd moderation && npm install
cd event-bus && npm install
cd client && npm install
```

2. Start the services:
```bash
cd posts && npm start
cd comments && npm start
cd query && npm start
cd moderation && npm start
cd event-bus && npm start
cd client && npm start
```

## 🎯 Key Features

- Event-Driven Architecture
- Data Consistency across Services
- Comment Moderation System
- Automatic Data Recovery
- Real-time Updates
- TypeScript Support
- Error Handling
- CORS Configuration

## 📐 Project Structure
├── client/ # React frontend
├── posts/ # Posts service
├── comments/ # Comments service
├── query/ # Query service
├── moderation/ # Moderation service
└── event-bus/ # Event distribution service


## 🔍 Implementation Details

- Uses async/await for event handling
- Implements event sourcing pattern
- Handles service failures gracefully
- Provides data sync mechanism
- Ensures type safety with TypeScript

## 🤝 Contributing

Feel free to contribute to this project by submitting issues and/or pull requests.

## 📝 License

This project is licensed under the MIT License.
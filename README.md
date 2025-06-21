# 📝 Task Management App

A cross-platform task management mobile application built using **React Native** for the frontend and **NestJS (TypeScript)** for the backend. This app allows users to manage their daily tasks effectively — from signing up and logging in to adding, editing, viewing, and deleting tasks.

Demo video in Youtube : https://youtube.com/shorts/TCYlh9c9sKE?si=-hfmn6yHYYsUXnNI

## 🚀 Features

- 🔐 User Authentication (Login & Sign Up)
- ➕ Add New Tasks
- 📋 View All Tasks
- ✏️ Edit Existing Tasks
- 🗑️ Delete Tasks
- 🗃️ MongoDB for scalable and flexible data storage

## 🛠️ Tech Stack

### 💻 Frontend (Mobile App)
- **React Native** – Framework for building native apps using React.
- **React Navigation** – Handles navigation between different app screens.

### 🧠 Backend (API Server)
- **NestJS (TypeScript)** – A powerful Node.js framework for building scalable server-side applications.
- **MongoDB + Mongoose** – NoSQL database for flexible data modeling, with Mongoose for schema-based data validation.
- **JWT (JSON Web Token)** – Used for stateless and secure authentication.
- **RESTful API Design** – Clear separation of concerns and HTTP method conventions for all endpoints.


- ## 🔧 Setup Instructions

### 1. Clone the Repository

```bash
git clone git@github.com:AdharvAdharv/Task-Management.git
cd Task-Management

cd server
npm install
# Configure your .env file
npm run start:dev

cd client
npm install
npm start

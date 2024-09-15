<h1 align="center">
  <br>
  <a href="https://nebula9-ai-cook-it-up.onrender.com"><img src="https://github.com/arham202/nebula9.ai-cook-it-up/blob/73a2d5c9e1b1ba25c71dbe442ba31b5252c044bb/client/src/assets/logo.png" alt="Cook It Up !" width="200"></a>
  <br>
  Cook It Up !
  <br>
</h1>

<h4 align="center">The Custom Recipe Generator is a web application that creates personalized recipes based on user dietary preferences and available ingredients.</h4>
<p align="center">
  <a href="#deployed-version">Demo</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#project-structure">Project Structure</a> •
  <a href="#installation-guide">Installation Guide</a> •
  <a href="#api-endpoints">API Endpoints</a> •
  <a href="#database-setup">Database Setup</a> •
  <a href="#authentication">Authentication</a> •
  <a href="#deployment-guide">Deployment Guide</a>
</p>

## Deployed Version

Live demo 👉 : https://nebula9-ai-cook-it-up.onrender.com/

API Documentation 👉 : https://documenter.getpostman.com/view/36250312/2sAXqp83Ne#f2ff27e3-0299-4410-ad7b-077487aaa515

**Note:** Since the application is hosted on a free-tier server, it may take some time to load when you first visit. Please be patient, and if it doesn't load right away, try reloading the page after 1-2 minutes.

## Tech Stack

- **Frontend:**
  - [React.js](https://reactjs.org/)
  - [Vite](https://vitejs.dev/) for development and build
  - [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) for styling

- **Backend:**
  - [Express.js](https://expressjs.com/) for server-side logic
  - [PostgreSQL](https://www.postgresql.org/) for database management
  - [JWT](https://jwt.io/) for authentication

- **Generative AI:**
  - [Gemini AI](https://ai.google.dev/) for generating recipes (replace with actual service if applicable)

- **Deployment:**
  - [Render](https://render.com) for deployment

## Project Structure
  ``` bash
  /project
  ├── /client
  │   ├── /dist                 # Production build files
  │   ├── /node_modules         # Installed dependencies
  │   ├── /public               # Static assets
  │   └── /src                  # Source code
  │       ├── /assets           # Images, fonts, and other static assets
  │       ├── /components       # React components
  │       ├── /context          # Context API for state management
  │       ├── /utils            # Utility functions
  │       ├── App.css           # Main CSS for the app
  │       ├── App.jsx           # Root component
  │       ├── index.css         # Global styles
  │       ├── main.jsx          # Entry point for the React app
  │       ├── .gitignore        # Files to ignore in version control
  │       ├── eslint.config.js  # ESLint configuration
  │       ├── index.html        # HTML template
  │       ├── package.json      # Dependencies and scripts
  │       ├── package-lock.json # Lockfile for package versions
  │       ├── README.md         # Project documentation
  │       └── vite.config.js    # Vite configuration
  ├── /server
  │   ├── /config              # Configuration files
  │   ├── /controllers         # API controllers
  │   ├── /node_modules        # Installed dependencies
  │   ├── /routes              # API routes
  │   ├── /utils               # Utility functions
  │   ├── app.js               # Express app setup
  │   ├── config.env           # Environment variables
  │   ├── db.js                # Database connection setup
  │   ├── server.js            # Entry point for the server
  │   ├── .gitignore           # Files to ignore in version control
  │   ├── package.json         # Dependencies and scripts
  │   └── package-lock.json    # Lockfile for package versions
  ```

## Installation Guide

This project is divided into two main components: a **React.js** application (`client`) and an **Express.js** server (`server`). It uses **PostgreSQL** for the database.

### Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 18 or higher)
- [PostgreSQL](https://www.postgresql.org/download/) (version 12 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) (for managing packages)

### Setup Instructions

#### 1. Clone the Repository

```bash
git clone <repository-url>
cd <project-folder>
```

#### 2. Setting Up the Server
#### Navigate to the server directory:
```bash
cd server
```
#### Install the server dependencies:
```bash
npm install
```
#### Configure the environment variables:
```bash
# PostgreSQL database configuration
USER
HOST
DATABASE
PASSWORD

# Gemini API key configuration
APIKEY
```

#### Start the server:
  ```bash
  npm start
  ```


#### 3. Setting Up the Client
#### Navigate to the client directory:
```bash
cd ../client
```
#### Install the client dependencies:
```bash
npm install
```
#### Start the client application:
```bash
npm run dev
```


#### 4. Setting Up the Database
#### Ensure PostgreSQL is running.
#### Create a new PostgreSQL database for your application.
#### Update the ```config.env``` file in the ```server``` directory with your database connection details.

## API Endpoints

This section describes the available API endpoints for the application.

### Authentication Endpoints

- **POST /api/auth/signup**
  - Register a new user.

- **POST /api/auth/signin**
  - Sign in an existing user.

### Generative AI Endpoints

- **POST /api/generative-ai/generate**
  - Generate a response using the Generative AI model.

### Prompt Endpoints

- **POST /api/v1/prevPrompts**
  - Get previous prompts.

- **POST /api/v1/storePrompt**
  - Store a new prompt.

- **POST /api/v1/prompts/:id**
  - Delete a prompt by ID.

### User Endpoints

- **POST /api/v1/user**
  - Get user information.

- **POST /api/v1/set-user**
  - Create or update user information.
    
### Notifications Endpoints

- **POST /notifications/:username**
  - Get notifications for a specific user.

- **POST /send-notification**
  - Send a notification to a user.
  - Inserts a new notification into the database and emits it via WebSocket.

### Protected Route

- **GET /api/protected**
  - A protected route that requires authentication.

### Routing

- Authentication Routes: `app.use("/api/auth", authRoutes);`
- Prompt Routes: `app.use("/api/v1/", promptRoutes);`
- User Routes: `app.use("/api/v1/", userRoutes);`
- Generative AI Routes: `app.use("/api/generative-ai", generativeAIRoutes);`

## Client-Side Routes

### Routes Configuration

- **Home Route (`/`)**
  - **Component:** `<Form />`
  - **Description:** Redirects authenticated users to the dashboard. Otherwise, displays the form for login or registration.
  - **Redirect:** If a valid token is present in cookies, users are redirected to `/dashboard`.

- **Logout Route (`/logout`)**
  - **Component:** `<Logout />`
  - **Description:** Handles user logout functionality.

- **Dashboard Route (`/dashboard`)**
  - **Component:** `<Dashboard />`
  - **Description:** Displays the main dashboard. Protected by `ProtectedRoute` to ensure only authenticated users can access it.
  - **Access Control:** Users are redirected to the login form if they are not authenticated.

- **Catch-All Route (`*`)**
  - **Component:** `<Navigate to="/" />`
  - **Description:** Redirects any undefined routes to the home page.
 
## Database Setup

To set up the PostgreSQL database for the project, follow these steps:

1. **Ensure PostgreSQL is Running:**
   Make sure your PostgreSQL server is up and running.

2. **Create a New Database:**
   Create a new database using the following SQL command:

   ```sql
   CREATE DATABASE <your_database_name>;
   ```
3. **`users` Table**
   ```sql
   CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
    );

4. **`user_preferences` Table**
    ```sql
   CREATE TABLE user_preferences (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    country VARCHAR(255),
    fav_cuisine VARCHAR(255),
    dietary VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW()
    );

5. **`prompts` Table**
   ```sql
   CREATE TABLE prompts (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    prompt_text TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
    );

6. **`notifications ` Table**
   ```sql
   CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    notification_text TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
    );

## Authentication

The application uses token-based authentication to secure API endpoints. Here’s a brief overview of how authentication is handled:

### User Registration and Sign-In

- **Sign-Up:** Create a new user account.
- **Sign-In:** Authenticate users and issue JWT tokens.

### Token Verification

Middleware is used to verify tokens and protect routes. For example, `authController.verifyToken` ensures that only authenticated users can access certain routes.

### Protected Routes

Routes such as `/dashboard` are protected using the `ProtectedRoute` component to ensure that only authenticated users can access them.

## Deployment Guide

The application is deployed on Render. Below are the steps and considerations for deploying the application to Render.

### 1. Set Up Render Account

- **Create an Account:** Sign up for a Render account at [Render](https://render.com).
- **Create a New Web Service:** Navigate to the Render dashboard and create a new web service.

### 2. Deploy

- **Connect Your Repository:** Connect your GitHub or GitLab repository where both your React application and Express.js server code are stored.
- **Configure Build and Start Commands:**
   - **Build Command:** `npm run build`
   - **Start Command:** `npm run start`

   Ensure that your `package.json` scripts are properly configured to handle both the client and server build and start processes.

- **Environment Variables:**
   - Add any required environment variables in the Render dashboard under the "Environment" settings. This includes API keys, database connection details, and other configuration settings.

- **Deploy:**
   - Click the "Deploy" button to start the deployment process. Render will build and deploy your application.

### 3. Configure Database

- **Set Up Database:**
   - If using Render's managed PostgreSQL service, set up a new PostgreSQL instance from the Render dashboard.

- **Update Environment Variables:**
   - Ensure that the database connection details (e.g., `USER`, `HOST`, `DATABASE`, `PASSWORD`) are correctly set in your environment variables.

### 4. Monitor and Maintain

- **Monitor Logs:**
   - Use Render's logging features to monitor the application and server logs for any issues.

- **Automatic Deployments:**
   - Configure automatic deployments for continuous integration. Render supports automatic redeployments when you push changes to your repository.

- **Scaling and Performance:**
   - Adjust scaling settings and resources as needed based on your application's performance and traffic requirements.

- **WebSocket Support:**
   - If deploying to other services, ensure that they support WebSocket servers if your application uses WebSocket for real-time communication.















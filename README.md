# Task Management App

A full-stack Task Management web application built with React (Vite) on the frontend and Express + MongoDB on the backend.

---

## Live Demo

> Not yet deployed. See setup instructions below to run locally.

---

## Test Account

> No pre-seeded accounts. Register directly on the /register page.
> Example test credentials:
> - Email: test@example.com
> - Password: password123

---

## Implemented Features

- Authentication: Register and Login with JWT (auto-login on registration)
- Password Confirmation: Validated on both client and server sides
- Task CRUD: Create, Read, Update (status/priority/due date), Delete tasks
- Search: Live search by task title
- Filter: Filter tasks by Status (To Do, In Progress, Done) and Priority (Low, Medium, High)
- Task Stats: Live count cards for total, to-do, in-progress, and done tasks
- Protected Routes: Tasks page requires auth; redirects to login otherwise
- Custom UI Components: Reusable CustomInput, SelectBox, and CustomButton with react-hook-form
- Dark Mode Support via Tailwind and shadcn/ui

---

## Project Structure

`
react+node/
backend/
  controller/
    authController.js   # register, login, protectUserLogin
    taskController.js   # createTask, getAllTasks, updateTask, deleteTask
    errorController.js  # Global error handler
  models/
    User.js             # name, email, password, confirmPassword
    Task.js             # title, description, status, priority, due_date, user ref
  routes/
    authRouter.js       # POST /auth/register, POST /auth/login
    taskRouter.js       # GET+POST /tasks, PATCH+DELETE /tasks/:id
  utils/
    db.js               # MongoDB connection
    AppError.js         # Custom error class
    catchAsync.js       # Async error wrapper
  app.js                # Express setup
  server.js             # Entry point
  .env.example          # Environment template

frontend/src/
  Pages/
    Login.jsx
    Register.jsx
  components/Tasks/
    Tasks.jsx           # Main dashboard
    Task.jsx            # Task card
    TaskHeader.jsx      # Header + logout
    TaskStatics.jsx     # Stats cards
    SearchFilter.jsx
    FilterStatusTask.jsx
    FilterPriorityTask.jsx
    LoadingTasks.jsx
    EmptyTasks.jsx
    ErrorTasks.jsx
  customs/
    CustomButton.jsx    # Button with loading/icon support
    CustomInput.jsx     # text/email/password/date/textarea
    SelectBox.jsx       # Select dropdown
  modals/
    TaskModal.jsx       # Create/Edit modal
  services/
    services.js         # Axios client + helpers
  store/
    token-store.js      # Zustand auth token
    modals-store.js     # Zustand modal state
  App.jsx               # Routes + auth guards
  main.jsx              # Entry point
  .env.example          # Environment template
`

---

## Main API Endpoints

### Auth

| Method | Endpoint        | Description                       | Auth |
|--------|-----------------|-----------------------------------|------|
| POST   | /auth/register  | Register a new user (returns JWT) | No   |
| POST   | /auth/login     | Log in (returns JWT)              | No   |

Register body: { name, email, password, confirmPassword }
Login body: { email, password }

### Tasks (all require Authorization: Bearer token)

| Method | Endpoint      | Description                              |
|--------|---------------|------------------------------------------|
| GET    | /tasks        | Get all tasks for authenticated user     |
| POST   | /tasks        | Create a new task                        |
| PATCH  | /tasks/:id    | Update a task by ID                      |
| DELETE | /tasks/:id    | Delete a task by ID                      |

Task body: { title, description, status, priority, due_date }

---

## Prerequisites

- Node.js v18+
- npm v9+
- MongoDB (local or Atlas)

---

## Setup Instructions

### 1. Clone the repository

`ash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO
`

### 2. Backend Setup

`ash
cd backend
npm install
cp .env.example config.env
# Edit config.env with your values
npm start
`

Server runs on http://localhost:8000 by default.

### 3. Frontend Setup

`ash
cd ../frontend
npm install
cp .env.example .env
# Edit .env with your values
npm run dev
`

App runs on http://localhost:5173 by default.

---

## Environment Variables

### Backend (backend/config.env)

| Variable        | Description                       | Example                          |
|-----------------|-----------------------------------|----------------------------------|
| PORT            | Express server port               | 8000                             |
| MONGO_URI       | MongoDB connection string         | mongodb://localhost:27017/taskdb |
| JWT_SECRET      | Secret key for JWT signing        | supersecretrandomstring          |
| JWT_EXPIRES_IN  | JWT expiry                        | 7d                               |

### Frontend (frontend/.env)

| Variable       | Description                 | Example                 |
|----------------|-----------------------------|-------------------------|
| VITE_API_URL   | Backend API base URL        | http://localhost:8000   |

---

## Known Issues and Incomplete Items

- [ ] No email verification after registration
- [ ] No password reset / forgot password flow
- [ ] No server-side pagination
- [ ] No task categories or tags
- [ ] No deployment / live demo URL
- [ ] CORS is fully open — restrict in production
- [ ] No refresh token — JWT in localStorage only
- [ ] No automated tests
- [ ] server.js starts listening before DB is ready (race condition)

---

## Tech Stack

### Backend: express, mongoose, bcryptjs, jsonwebtoken, cors, dotenv, nodemon
### Frontend: React 18 + Vite, react-router-dom, @tanstack/react-query, react-hook-form, zustand, axios, shadcn/ui, lucide-react, react-toastify, tailwindcss

---

## License

This project is for educational and portfolio purposes.
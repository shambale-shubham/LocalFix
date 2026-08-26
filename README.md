# Service Local - MongoDB Full Stack

## Structure
- backend/.env -> MongoDB connection and admin credentials
- frontend/.env -> backend API URL

## Backend .env
PORT=5001
MONGO_URI=mongodb://localhost:27017/localfix
JWT_SECRET=localfix-development-secret-change-before-deploy
JWT_EXPIRES_IN=1d
CLIENT_URL=http://localhost:5173
ADMIN_NAME=Super Admin
ADMIN_EMAIL=admin@localfix.com
ADMIN_PASSWORD=Admin@123

## Run backend
cd backend
npm install
npm run dev

## Run frontend (new terminal)
cd frontend
npm install
npm run dev

Frontend: http://localhost:5173
Backend: http://localhost:5001

Make sure MongoDB is running locally.

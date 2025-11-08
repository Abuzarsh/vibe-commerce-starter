 Vibe Commerce — Full Stack Mock E-Commerce Cart
 Overview

A simple full-stack shopping cart app built for the Vibe Commerce Internship Assignment.
Includes working backend APIs (Node + Express + MongoDB) and a partially completed React frontend with Tailwind styling.

--Tech Stack

Frontend: React, Axios

Backend: Node.js, Express.js

Database: MongoDB (Mongoose ODM)

-- Setup
Backend
cd backend
npm install


Create .env file:

PORT=5000
MONGO_URI=mongodb://localhost:27017/vibecommerce


Start server:

node server.js


Runs on http://localhost:5000

Frontend
cd frontend
npm install
npm run dev


Runs on http://localhost:5173

 API Endpoints
 Products

GET /api/products — Get all products

POST /api/products/seed — Seed mock items

--Cart

POST /api/cart — Add item { productId, qty }

GET /api/cart — Get cart with total

DELETE /api/cart/:id — Remove item

 --Checkout

POST /api/cart/checkout — Mock checkout and return receipt

-- Status

Backend APIs — Fully functional
Frontend UI — Partially complete (due to time constraints or other emergency)

# SheCraft 💍✨ (React + Express + MySQL)

SheCraft is a full-stack jewelry web application built with:
- **Frontend:** React (`http://localhost:3000`)
- **Backend:** Node.js + Express (`http://localhost:5000`)
- **Database:** MySQL (`jewelry`)

The backend also serves product images from:
- `http://localhost:5000/images/...`

---

## Table of Contents
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Database Setup](#database-setup)
  - [1) Create Schema](#1-create-schema)
  - [2) Seed Data](#2-seed-data)
- [Backend Setup (Port 5000)](#backend-setup-port-5000)
- [Frontend Setup (Port 3000)](#frontend-setup-port-3000)
- [Environment Variables](#environment-variables)
- [API Routes](#api-routes)
- [Static Images](#static-images)
- [Health Check](#health-check)
- [Troubleshooting](#troubleshooting)
- [Contributors](#contributors)

---

## Project Structure

DB_SHECRAFT/
│
├─ BackEnd/
│ ├─ shecraft-backend/
│ │ ├─ controllers/
│ │ ├─ models/
│ │ ├─ routes/
│ │ ├─ config/
│ │ ├─ middleware/
│ │ ├─ public/
│ │ │ └─ images/
│ │ ├─ app.js
│ │ └─ package.json
│ │
│ ├─ sql/
│ │ ├─ Database jewelry.sql
│ │ └─ Seed Data.sql
│ │
│ └─ .env (NOT committed)
│
└─ FrontEnd/
└─ shecraft-frontend/
├─ src/
│ ├─ api/ (client.js)
│ ├─ context/
│ ├─ hooks/
│ └─ pages/
└─ package.json

yaml
Copier le code

---

## Tech Stack
- **Frontend:** React
- **Backend:** Node.js, Express
- **Database:** MySQL (MySQL 8+ recommended)
- **Other:** CORS enabled for `http://localhost:3000`

---

## Prerequisites
Install:
- Node.js (LTS recommended) + npm
- MySQL Server (running)

---

## Quick Start

### 1) Database
- Import schema
- Import seed data

### 2) Backend (5000)
```bash
cd BackEnd/shecraft-backend
npm install
npm run dev
3) Frontend (3000)
bash
Copier le code
cd FrontEnd/shecraft-frontend
npm install
npm start
Database Setup
Your SQL scripts are located here:

BackEnd/sql/Database jewelry.sql (schema + tables + constraints)

BackEnd/sql/Seed Data.sql (seed inserts/updates)

1) Create Schema
Run:

bash
Copier le code
mysql -u root -p < "BackEnd/sql/Database jewelry.sql"
✅ This script creates the database jewelry (if not exists) and creates all tables.

2) Seed Data
Run:

bash
Copier le code
mysql -u root -p jewelry < "BackEnd/sql/Seed Data.sql"
✅ Notes:

Seed uses ON DUPLICATE KEY UPDATE / INSERT IGNORE, so rerunning is generally safe.

Your image URLs in the DB are stored like /images/..., which matches backend static hosting.

Backend Setup (Port 5000)
bash
Copier le code
cd BackEnd/shecraft-backend
npm install
Create a .env file inside BackEnd/shecraft-backend/:

env
Copier le code
PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=jewelry

JWT_SECRET=your_secret
Run backend:

bash
Copier le code
npm run dev
Backend runs on:

http://localhost:5000

Frontend Setup (Port 3000)
bash
Copier le code
cd FrontEnd/shecraft-frontend
npm install
npm start
Frontend runs on:

http://localhost:3000

Environment Variables
Backend .env example
env
Copier le code
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=jewelry
JWT_SECRET=your_secret
✅ Do NOT commit .env. Commit .env.example instead.

API Routes
Base URL:

http://localhost:5000/api

Routes registered in BackEnd/shecraft-backend/app.js:

Route Prefix	Purpose
/api/auth	Authentication routes
/api/customers	Customer routes
/api/accessories	Accessories routes
/api/orders	Orders routes
/api/designers	Designers routes
/api/charms	Charms routes
/api/materials	Materials routes
/api/stones	Stones routes
/api/accessory-instance	Accessory instance routes

Static Images
Backend serves images from:

Folder: BackEnd/shecraft-backend/public/images

URL: http://localhost:5000/images/...

Example:

http://localhost:5000/images/Charms/colorful/A001.jpg

Health Check
Database health endpoint:

GET http://localhost:5000/api/health/db

Expected response:

json
Copier le code
{ "db": "up" }
Troubleshooting
Frontend cannot fetch backend
Confirm backend runs on 5000

Confirm frontend runs on 3000

Confirm your frontend API base URL points to http://localhost:5000

CORS is already configured in backend to allow http://localhost:3000

DB connection errors
Confirm MySQL is running

Confirm .env credentials are correct

Confirm the schema script ran successfully

Images not loading
Confirm images exist under BackEnd/shecraft-backend/public/images

Confirm DB photoURL values start with /images/...

Contributors
Lana Fliti
Michelle Baalbaky
Rajaa Ghanem
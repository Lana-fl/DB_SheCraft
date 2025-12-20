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
│ ├─ api/
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
- Node.js (LTS recommended)
- npm
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
bash
Copier le code
mysql -u root -p < "BackEnd/sql/Database jewelry.sql"
✅ This script creates the jewelry database (if not exists) and all tables.

2) Seed Data
bash
Copier le code
mysql -u root -p jewelry < "BackEnd/sql/Seed Data.sql"
✅ Notes:

Seed uses ON DUPLICATE KEY UPDATE and INSERT IGNORE

Safe to rerun

Image paths use /images/... which matches backend static hosting

Backend Setup (Port 5000)
bash
Copier le code
cd BackEnd/shecraft-backend
npm install
Create a .env file in BackEnd/shecraft-backend/:

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
✅ Do NOT commit .env. Use .env.example.

API Routes
Base URL:

http://localhost:5000/api

Route Prefix	Purpose
/api/auth	Authentication
/api/customers	Customers
/api/accessories	Accessories
/api/orders	Orders
/api/designers	Designers
/api/charms	Charms
/api/materials	Materials
/api/stones	Stones
/api/accessory-instance	Custom accessory builds

Static Images
Folder: BackEnd/shecraft-backend/public/images

URL: http://localhost:5000/images/...

Example:

bash
Copier le code
http://localhost:5000/images/Charms/colorful/A001.jpg
Health Check
Database health endpoint:

http
Copier le code
GET http://localhost:5000/api/health/db
Response:

json
Copier le code
{ "db": "up" }
Troubleshooting
Frontend cannot fetch backend
Backend running on 5000

Frontend running on 3000

API base URL points to http://localhost:5000

CORS allows http://localhost:3000

Database errors
MySQL is running

.env credentials are correct

Schema script executed successfully

Images not loading
Images exist in public/images

DB photoURL starts with /images/

Contributors
Lana Fliti

Michelle Baalbaky

Rajaa Ghanem
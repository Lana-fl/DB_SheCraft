# SheCraft 💍✨
## Full-Stack Jewelry Web Application

SheCraft is a full-stack jewelry web application built with modern web technologies.

---

## Live Development Ports 🌐
- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:5000
- **Database:** MySQL (`jewelry`)
- **Images:** http://localhost:5000/images/...

---

## 📚 Table of Contents
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Database Setup](#database-setup)
- [Backend Setup (Port 5000)](#backend-setup-port-5000)
- [Frontend Setup (Port 3000)](#frontend-setup-port-3000)
- [Environment Variables](#environment-variables)
- [API Routes](#api-routes)
- [Static Images](#static-images)
- [Health Check](#health-check)
- [Troubleshooting](#troubleshooting)
- [Contributors](#contributors)

---

## Project Structure📁 


```text
DB_SHECRAFT/
├─ BackEnd/
│  ├─ shecraft-backend/
│  │  ├─ controllers/
│  │  ├─ models/
│  │  ├─ routes/
│  │  ├─ config/
│  │  ├─ middleware/
│  │  ├─ public/
│  │  │  └─ images/
│  │  ├─ app.js
│  │  └─ package.json
│  │
│  ├─ sql/
│  │  ├─ Database jewelry.sql
│  │  └─ Seed Data.sql
│  │
│  └─ .env (NOT committed)
│
└─ FrontEnd/
   └─ shecraft-frontend/
      ├─ src/
      │  ├─ api/
      │  ├─ context/
      │  ├─ hooks/
      │  └─ pages/
      └─ package.json
```

## Tech Stack🛠 
- **Frontend:** React
- **Backend:** Node.js, Express
- **Database:** MySQL (8+)
- **Security:** JWT Authentication
- **Other:** CORS enabled for `http://localhost:3000`

---

## Prerequisites✅
- Node.js (LTS)
- npm
- MySQL Server (running)

---

## Quick Start

### 1️⃣ Database
- Import schema
- Import seed data

### 2️⃣ Backend (Port 5000)

```bash
cd BackEnd/shecraft-backend
npm install
npm run dev
```
### 3️⃣ Frontend (Port 3000)
```bash
cd FrontEnd/shecraft-frontend
npm install
npm start
```
## Database Setup🗄
SQL scripts location:

- BackEnd/sql/Database jewelry.sql
- BackEnd/sql/Seed Data.sql

Create Schema
```bash
mysql -u root -p < "BackEnd/sql/Database jewelry.sql"
```
Seed Data
```bash
Copier le code
mysql -u root -p jewelry < "BackEnd/sql/Seed Data.sql"
```
✔ Safe to rerun
✔ Uses ON DUPLICATE KEY UPDATE and INSERT IGNORE

## Backend Setup (Port 5000)🔌
Create a .env file inside BackEnd/shecraft-backend/:
```bash
env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=jewelry
JWT_SECRET=your_secret
```

Run the backend:

```bash
npm i
npm run dev
```
Backend URL:
http://localhost:5000

## Frontend Setup (Port 3000)🖥 
```bash
cd FrontEnd/shecraft-frontend
npm install
npm start
```
Frontend URL:

http://localhost:3000
## Environment Variables🔐
❌ Never commit .env

✅ Use .env.example

## API Routes🔗
Base URL:
## 🔗 API Routes

**Base URL:**  
`http://localhost:5000/api`

| Route                     | Description                |
|---------------------------|----------------------------|
| `/api/auth`               | Authentication             |
| `/api/customers`          | Customers                  |
| `/api/accessories`        | Accessories                |
| `/api/orders`             | Orders                     |
| `/api/designers`          | Designers                  |
| `/api/charms`             | Charms                     |
| `/api/materials`          | Materials                  |
| `/api/stones`             | Stones                     |
| `/api/accessory-instance` | Custom accessory builds    |

## Static Images🖼 
Images are served from:

```swift
BackEnd/shecraft-backend/public/images
```
Example:

```bash
http://localhost:5000/images/Charms/colorful/A001.jpg
```
## Health Check
### Endpoint
```http
GET http://localhost:5000/api/health/db
```

Response:

```json
{ "db": "up" }
```
## Troubleshooting🧯

#### Frontend cannot reach backend
- Backend running on port 5000
- Frontend running on port 3000
- Correct API base URL
- CORS enabled

#### Database errors
- MySQL server running
- Correct .env credentials
- Schema imported successfully

#### Images not loading
- Images exist in ```bash public/images```
- Database paths start with ```bash /images/ ```

## Contributors 
- **Lana Fliti** — [@Lana-fl](https://github.com/Lana-fl)
- **Michelle Baalbaky** — [@michelle-baalbaky](https://github.com/michelle-baalbaky)
- **Rajaa Ghanem** — [@RDGH5825825](https://github.com/RDGH5825825)

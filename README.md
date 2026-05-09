# School Management API

Node.js REST APIs for managing schools, built with **Express.js** and **MySQL**.

---

## 🚀 Quick Start

### 1. Clone / Download this project
```bash
git clone <your-repo-url>
cd school-management-api
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up MySQL Database
Open MySQL and run:
```bash
mysql -u root -p < setup.sql
```
Or paste the contents of `setup.sql` into MySQL Workbench / phpMyAdmin.

### 4. Configure environment variables
```bash
cp .env.example .env
```
Edit `.env` and fill in your MySQL credentials:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=school_management
PORT=3000
```

### 5. Start the server
```bash
# Production
npm start

# Development (auto-restart)
npm run dev
```

Server runs at: **http://localhost:3000**

---

## 📌 API Endpoints

### POST /addSchool
Add a new school to the database.

**Request Body:**
```json
{
  "name": "Delhi Public School",
  "address": "Mathura Road, New Delhi",
  "latitude": 28.5355,
  "longitude": 77.2410
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "School added successfully",
  "data": {
    "id": 1,
    "name": "Delhi Public School",
    "address": "Mathura Road, New Delhi",
    "latitude": 28.5355,
    "longitude": 77.241
  }
}
```

**Validation Error (400):**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": ["name is required and must be a non-empty string"]
}
```

---

### GET /listSchools
Get all schools sorted by distance from your location.

**Query Parameters:**
| Param | Type | Required | Description |
|-------|------|----------|-------------|
| latitude | float | ✅ | Your current latitude |
| longitude | float | ✅ | Your current longitude |

**Example:**
```
GET /listSchools?latitude=28.6139&longitude=77.2090
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Schools fetched and sorted by proximity",
  "user_location": { "latitude": 28.6139, "longitude": 77.209 },
  "count": 3,
  "data": [
    {
      "id": 4,
      "name": "St. Columba School",
      "address": "Ashok Place, New Delhi",
      "latitude": 28.6353,
      "longitude": 77.209,
      "distance_km": 2.38
    }
  ]
}
```

---

## 🌐 Deployment (Railway - Free)

1. Go to [railway.app](https://railway.app) and sign up
2. Click **New Project → Deploy from GitHub repo**
3. Add a **MySQL** plugin inside Railway
4. Copy the MySQL connection details into Railway's environment variables
5. Railway auto-detects `npm start` and deploys!

---

## 🧪 Postman Testing

1. Open Postman
2. Click **Import**
3. Select `SchoolManagement.postman_collection.json`
4. Change `base_url` variable to your hosted URL when deployed
5. Run all requests!

---

## 📁 Project Structure

```
school-management-api/
├── src/
│   ├── index.js      # Express app entry point
│   ├── routes.js     # API route handlers
│   └── db.js         # MySQL connection pool
├── setup.sql         # Database & table creation script
├── .env.example      # Environment variables template
├── package.json
├── SchoolManagement.postman_collection.json
└── README.md
```

---

## 🔑 Key Concepts Used

- **Express.js** — HTTP server and routing
- **mysql2** — MySQL driver with Promise support
- **Connection Pool** — Efficient DB connections
- **Haversine Formula** — Calculate real-world distance between coordinates
- **Input Validation** — All fields validated before DB insertion
- **dotenv** — Secure environment variable management

-- ================================================
-- School Management Database Setup
-- Run this in MySQL before starting the server
-- ================================================

-- Step 1: Create the database
CREATE DATABASE IF NOT EXISTS school_management;

-- Step 2: Use the database
USE school_management;

-- Step 3: Create the schools table
CREATE TABLE IF NOT EXISTS schools (
  id        INT AUTO_INCREMENT PRIMARY KEY,
  name      VARCHAR(255)  NOT NULL,
  address   VARCHAR(500)  NOT NULL,
  latitude  FLOAT         NOT NULL,
  longitude FLOAT         NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Step 4 (Optional): Insert sample data for testing
INSERT INTO schools (name, address, latitude, longitude) VALUES
  ('Delhi Public School',    'Mathura Road, New Delhi',         28.5355, 77.2410),
  ('Kendriya Vidyalaya',     'Sector 8, R.K. Puram, New Delhi', 28.5700, 77.1800),
  ('Ryan International',     'Sector 40, Gurgaon',              28.4595, 77.0266),
  ('St. Columba School',     'Ashok Place, New Delhi',          28.6353, 77.2090),
  ('Modern School',          'Barakhamba Road, New Delhi',      28.6290, 77.2274);

-- Verify data
SELECT * FROM schools;

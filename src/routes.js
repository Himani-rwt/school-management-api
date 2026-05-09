const express = require("express");
const router = express.Router();
const db = require("./db");

// ─────────────────────────────────────────────
// Helper: Haversine Formula
// Calculates distance (in km) between two lat/lng points
// ─────────────────────────────────────────────
function haversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in km
  const toRad = (deg) => (deg * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
}

// ─────────────────────────────────────────────
// POST /addSchool
// Adds a new school to the database
// ─────────────────────────────────────────────
router.post("/addSchool", async (req, res) => {
  try {
    const { name, address, latitude, longitude } = req.body;

    // --- Validation ---
    const errors = [];

    if (!name || typeof name !== "string" || name.trim() === "") {
      errors.push("name is required and must be a non-empty string");
    }

    if (!address || typeof address !== "string" || address.trim() === "") {
      errors.push("address is required and must be a non-empty string");
    }

    if (latitude === undefined || latitude === null || latitude === "") {
      errors.push("latitude is required");
    } else if (isNaN(parseFloat(latitude)) || parseFloat(latitude) < -90 || parseFloat(latitude) > 90) {
      errors.push("latitude must be a valid number between -90 and 90");
    }

    if (longitude === undefined || longitude === null || longitude === "") {
      errors.push("longitude is required");
    } else if (isNaN(parseFloat(longitude)) || parseFloat(longitude) < -180 || parseFloat(longitude) > 180) {
      errors.push("longitude must be a valid number between -180 and 180");
    }

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors,
      });
    }

    // --- Insert into DB ---
    const [result] = await db.execute(
      "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)",
      [name.trim(), address.trim(), parseFloat(latitude), parseFloat(longitude)]
    );

    return res.status(201).json({
      success: true,
      message: "School added successfully",
      data: {
        id: result.insertId,
        name: name.trim(),
        address: address.trim(),
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
      },
    });
  } catch (err) {
    console.error("Error in /addSchool:", err.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
});

// ─────────────────────────────────────────────
// GET /listSchools
// Returns all schools sorted by proximity to user
// ─────────────────────────────────────────────
router.get("/listSchools", async (req, res) => {
  try {
    const { latitude, longitude } = req.query;

    // --- Validation ---
    const errors = [];

    if (latitude === undefined || latitude === "") {
      errors.push("latitude query parameter is required");
    } else if (isNaN(parseFloat(latitude)) || parseFloat(latitude) < -90 || parseFloat(latitude) > 90) {
      errors.push("latitude must be a valid number between -90 and 90");
    }

    if (longitude === undefined || longitude === "") {
      errors.push("longitude query parameter is required");
    } else if (isNaN(parseFloat(longitude)) || parseFloat(longitude) < -180 || parseFloat(longitude) > 180) {
      errors.push("longitude must be a valid number between -180 and 180");
    }

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors,
      });
    }

    const userLat = parseFloat(latitude);
    const userLon = parseFloat(longitude);

    // --- Fetch all schools ---
    const [schools] = await db.execute("SELECT * FROM schools");

    if (schools.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No schools found",
        data: [],
      });
    }

    // --- Sort by distance using Haversine ---
    const schoolsWithDistance = schools.map((school) => ({
      ...school,
      distance_km: parseFloat(
        haversineDistance(userLat, userLon, school.latitude, school.longitude).toFixed(2)
      ),
    }));

    schoolsWithDistance.sort((a, b) => a.distance_km - b.distance_km);

    return res.status(200).json({
      success: true,
      message: "Schools fetched and sorted by proximity",
      user_location: { latitude: userLat, longitude: userLon },
      count: schoolsWithDistance.length,
      data: schoolsWithDistance,
    });
  } catch (err) {
    console.error("Error in /listSchools:", err.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
});

module.exports = router;

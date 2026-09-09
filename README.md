## 🔴 Live Demo Status

This project was previously deployed on Railway. Railway's free trial has since expired, so the hosted link is no longer live.

The API is fully functional and verified working locally — all endpoints (`POST /addSchool`, `GET /listSchools`) have been tested end-to-end with real data, correct validation, and correct Haversine-based distance sorting.

**To run it locally:**
1. Clone the repo and run `npm install`
2. Set up MySQL locally and run `setup.sql`
3. Copy `.env.example` to `.env` and fill in your local DB credentials
4. Run `npm start`
5. Test using the included Postman collection (`SchoolManagement.postman_collection.json`) with `base_url` set to `http://localhost:3000`

Happy to walk through a live demo on request.

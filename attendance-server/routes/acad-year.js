require("dotenv").config();
const express = require("express");
const router = express.Router();
const pool = require("../db/database");

router.get("/", async (req, res) =>{
    const result = await pool.query("SELECT academic_year FROM semesters WHERE is_closed = false LIMIT 1");

    const year = result.rows[0].academic_year;
    
    res.json({
        academicYear: year
 });
});

module.exports = router;
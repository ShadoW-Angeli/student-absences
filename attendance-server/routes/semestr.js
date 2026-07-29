require("dotenv").config();
const express = require("express");
const router = express.Router();
const pool = require("../db/database");

router.get("/:semesterNumber", async (req, res) =>{
    const number = req.params.semesterNumber;
    const result = await pool.query("SELECT month_number FROM months WHERE semester_id = $1", [number]);
    res.json(result.rows);
});

module.exports = router;
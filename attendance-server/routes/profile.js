require("dotenv").config();
const express = require("express");
const router = express.Router();
const pool = require("../db/database");
const { route } = require("./students");

router.get("/", async (req, res) =>{
    const result = await pool.query(
        "SELECT u.username, r.role_name, g.group_name, s.academic_year FROM users AS u JOIN roles AS r ON u.role_id = r.id JOIN groups AS g ON u.group_id = g.id JOIN semesters AS s ON s.is_closed = false WHERE u.id = $1 LIMIT 1", [3]
    );
    const profile = result.rows[0];
    res.json(profile);
});

module.exports = router;
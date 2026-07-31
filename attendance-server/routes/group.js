require("dotenv").config();
const express = require("express");
const router = express.Router();
const pool = require("../db/database");
const { route } = require("./students");

router.get("/", async (req, res) =>{
    const result = await pool.query("SELECT * FROM students WHERE group_id = $1", [1]);
    const students = result.rows;
    res.json(students);
});

module.exports = router;
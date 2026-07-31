require("dotenv").config();
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const pool = require("../db/database");

router.get("/:monthId", async(req, res) =>{
    const id = req.params.monthId;
    const result = await pool.query("SELECT * FROM months WHERE id = $1", [id]);
    const month = result.rows[0];
    res.json(month);
});

module.exports = router;
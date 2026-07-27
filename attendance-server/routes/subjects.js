require("dotenv").config();
const express = require("express");
const router = express.Router();
const pool = require("../db/database");
router.get("/", (req, res) =>{
    pool.query("SELECT id, subject_name FROM subjects")
    .then(result =>{
        res.json(result.rows);
    })
    .catch(err =>{
        console.error(err);
        res.status(500).json({
            message: "помилка сервера"
        });
    });
});

module.exports = router;
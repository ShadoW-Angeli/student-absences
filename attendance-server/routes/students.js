require("dotenv").config();
const express = require("express");
const router = express.Router();
const pool = require("../db/database");
router.get("/", (req, res) =>{
    pool.query("SELECT * FROM students")
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
router.post("/", (req, res) =>{
    console.log(req.body);
});
router.get("/:id", (req, res)=>{
    pool.query("SELECT * FROM students WHERE id =$1", [req.params.id])
    .then(result =>{
        if(result.rows.length === 0){
            res.status(404).json({
                message: "Не знайдено"
            })
        };
        res.json(result.rows[0]);
    })
    .catch(err =>{
        console.error(err);
        res.status(500).json({
        message: "помилка сервера"
    });
    })
});

module.exports = router;
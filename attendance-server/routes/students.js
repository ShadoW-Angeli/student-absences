require("dotenv").config();
const express = require("express");
const router = express.Router();
const pool = require("../db/database");

router.get("/", async (req, res) =>{
    try{
        const q = req.query.q || "";

        const result =  await pool.query("SELECT * FROM students WHERE surname ILIKE $1 OR name ILIKE $1 ORDER BY surname",
        [`%${q}%`]
    );
    res.json(result.rows);

    } catch(err) {
    console.error(err);
    res.status(500).json({
        message: "помилка сервера"
    });
};
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
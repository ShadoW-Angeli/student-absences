require("dotenv").config();
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const pool = require("../db/database");
const fs = require("fs");
const path = require("path");

router.get("/:dayId", async (req, res)=>{
    try{
        const { dayId } = req.params;

        const result = await pool.query("SELECT * FROM documents WHERE attendance_day_id = $1 ORDER BY upload_date DESC",
            [dayId]
        );

         res.json(result.rows);

    }catch(err){
        console.error(err)
        res.status(500).json({ message: "Помилка сервера" });
    }
})

router.delete("/:documentId", async (req, res) =>{
    console.log("DELETE route", req.params.documentId);
    try{
        const { documentId } = req.params;

        const result = await pool.query(
            "SELECT * FROM documents WHERE id = $1",
            [documentId]
        );

        if(result.rows.length === 0){
            return res.status(404).json({
                message: "Документ не знайдено"
             });
            }

            const document = result.rows[0];
            const filePath = path.join(__dirname, "..", document.file_path);

            try{
                await fs.promises.unlink(filePath);
            }catch(err){
                 console.log("Файл не знайдено, видаляю тільки запис із БД");
            }
            
          await pool.query("DELETE FROM documents WHERE id = $1", [documentId]
            );

        res.json({
            message: "документ видалено"
        })
    }catch(err){
        console.error(err)
        res.status(500).json({ message: "Помилка сервера" });
    }
})

module.exports = router;
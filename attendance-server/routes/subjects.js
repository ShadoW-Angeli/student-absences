require("dotenv").config();
const express = require("express");
const router = express.Router();
const pool = require("../db/database");

router.get("/", async (req, res) =>{
    try{
        const q = req.query.q || "";

       const result = await pool.query("SELECT id, subject_name FROM subjects WHERE subject_name ILIKE $1 ORDER BY subject_name",
        [`%${q}%`]
       );

       res.json(result.rows);
    } catch(err){
        console.error(err);
        res.status(500).json({
            message: "помилка сервера"
        });
    }
});

router.post("/schedule", async (req, res) =>{
    try{
        const { attendanceDayId, lessonNumber, subjectId } = req.body;

        const check = await pool.query("SELECT id FROM day_schedules WHERE attendance_day_id = $1 AND lesson_number = $2", 
            [attendanceDayId, lessonNumber]
        );

        let result;

        if(check.rows.length === 0){
            result = await pool.query("INSERT INTO day_schedules (attendance_day_id, lesson_number, subject_id) VALUES ($1,$2,$3) RETURNING *", 
                [attendanceDayId, lessonNumber, subjectId]
            );
        } else {
            result = await pool.query("UPDATE day_schedules SET subject_id = $1 WHERE id = $2 RETURNING *",
                [subjectId, check.rows[0].id]
            );
        }

        res.json(result.rows[0]);
    } catch(err){
        console.error(err);
        res.status(500).json({
            message: "помилка сервера"
        });
    }
})

module.exports = router;
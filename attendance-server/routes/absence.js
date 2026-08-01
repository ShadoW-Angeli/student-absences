require("dotenv").config();
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const pool = require("../db/database");

router.delete("/:studentId/:dayId", async (req, res) =>{
    try{
        const { studentId, dayId } = req.params;
        const result = await pool.query("DELETE FROM absences WHERE student_id = $1 AND day_schedule_id IN (SELECT id FROM day_schedules WHERE attendance_day_id = $2)", [studentId, dayId]);

        res.json({
            message: "Пропуск видалено"
        });
    } catch(err){
        console.error(err);
        res.status(500).json({ message: "Помилка сервера" });
    }
});

router.post("/", async (req, res) =>{
    try{
        const { studentId, dayScheduleId } = req.body;
        await pool.query("INSERT INTO absences(student_id, day_schedule_id) VALUES ($1, $2)", [studentId, dayScheduleId]);

        res.json({
            message: "Пропуск додано"
        });
    } catch(err){
         console.error(err);
        res.status(500).json({ message: "Помилка сервера" });
    }
})

router.delete("/", async (req, res) =>{
    try{
        const { studentId, dayScheduleId } = req.body;
        await pool.query("DELETE FROM absences WHERE student_id = $1 AND day_schedule_id = $2", 
            [studentId, dayScheduleId]
        );

        res.json({
            message: "Пропуск видалено"
        })
    } catch(err){
        console.error(err);
        res.status(500).json({ message: "Помилка сервера" });
    }
})

module.exports = router;
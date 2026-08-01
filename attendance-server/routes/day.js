require("dotenv").config();
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const pool = require("../db/database");

router.get("/:date", async (req, res) =>{
   try{ const date = req.params.date;
    const day = await pool.query("SELECT * FROM attendance_days WHERE day_date = $1", [date]);
    const groupId = day.rows[0].group_id;

    const students = await pool.query("SELECT * FROM students WHERE group_id =$1", [groupId]);

    const schedule = await pool.query("SELECT ds.id, ds.lesson_number, s.subject_name, s.id AS subject_id FROM day_schedules ds JOIN subjects s ON ds.subject_id = s.id WHERE ds.attendance_day_id = $1 ORDER BY ds.lesson_number;", [day.rows[0].id]);

    const absences = await pool.query("SELECT * FROM absences AS a JOIN day_schedules AS ds ON a.day_schedule_id = ds.id WHERE ds.attendance_day_id = $1",
        [day.rows[0].id]
    );

    res.json({
        day: day.rows[0],
        students: students.rows,
        schedule: schedule.rows,
        absences: absences.rows
    });
   } 
   catch(err){
    console.error(err);
        res.status(500).json({ message: "Помилка сервера" });
   }
});

module.exports = router;
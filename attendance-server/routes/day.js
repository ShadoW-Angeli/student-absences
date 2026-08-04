require("dotenv").config();
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const pool = require("../db/database");

router.get("/:date", async (req, res) =>{
   try{
     const date = req.params.date;

     const userId = req.query.userId;
     const user = await pool.query("SELECT group_id FROM users WHERE id = $1",
        [userId]
    );

    const groupId = user.rows[0].group_id;

    const dayNumber = new Date(date).getDate();
    const weekNumber = Math.ceil(dayNumber / 7);

    const month = await pool.query("SELECT id FROM months WHERE $1 BETWEEN start_date AND end_date", 
        [date]
    );

    let day = await pool.query("SELECT * FROM attendance_days WHERE day_date = $1 AND group_id = $2", 
        [date, groupId]);

        if (day.rows.length === 0) {
        const newDay = await pool.query(
            `
            INSERT INTO attendance_days(day_date, group_id, month_id, week_number)
            VALUES($1,$2, $3,$4)
            RETURNING *
            `,
            [date, groupId, month.rows[0].id, weekNumber] 
            
        );
    day = newDay;
}

    const students = await pool.query("SELECT * FROM students WHERE group_id =$1", [groupId]);

    const schedule = await pool.query("SELECT ds.id, ds.lesson_number, s.subject_name, s.id AS subject_id FROM day_schedules ds JOIN subjects s ON ds.subject_id = s.id WHERE ds.attendance_day_id = $1 ORDER BY ds.lesson_number;", [day.rows[0].id]);

    const absences = await pool.query("SELECT * FROM absences AS a JOIN day_schedules AS ds ON a.day_schedule_id = ds.id WHERE ds.attendance_day_id = $1",
        [day.rows[0].id]
    );

    const documents = await pool.query("SELECT * FROM documents WHERE attendance_day_id = $1",
            [day.rows[0].id]
         );

    res.json({
        day: day.rows[0],
        students: students.rows,
        schedule: schedule.rows,
        absences: absences.rows,
        documents: documents.rows
    });
   } 
   catch(err){
    console.error(err);
        res.status(500).json({ message: "Помилка сервера" });
   }
});

module.exports = router;
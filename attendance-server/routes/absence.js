require("dotenv").config();
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const pool = require("../db/database");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "uploads/");
    },

    filename: function(req, file, cb){
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({
    storage
});

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

router.patch("/reason", async (req, res) =>{
    try{
    const { studentId, dayId, isValidReason } = req.body;

    await pool.query("UPDATE absences SET is_valid_reason =$3 WHERE student_id = $1 AND day_schedule_id IN(SELECT id FROM day_schedules WHERE attendance_day_id = $2)",
        [studentId, dayId, isValidReason]
    );

    res.json({
        message: "Причина змінена"
    });
} catch(err){
    console.error(err);
        res.status(500).json({ message: "Помилка сервера" });
}
})

router.patch("/note", async (req, res) =>{
    try{
        const { studentId, dayId, note} = req.body;

        await pool.query("UPDATE absences SET note = $3 WHERE student_id = $1 AND day_schedule_id IN(SELECT id FROM day_schedules WHERE attendance_day_id = $2)",
            [studentId, dayId, note]
         );

         res.json({
            message: "примітку оновлено"
         });
    } catch(err){
        console.error(err);
        res.status(500).json({ message: "Помилка сервера" });
    }
})

router.post("/file", upload.single("file"), async (req, res) =>{
    try{
        const { dayId } = req.body;
        await pool.query("INSERT INTO documents (attendance_day_id, file_name, file_path) VALUES($1, $2, $3)",
            [dayId, req.file.originalname, req.file.path.replaceAll("\\", "/")]
        );

        const result = await pool.query("SELECT * FROM documents");
        console.log(result.rows);

        res.json({
        message: "Файл отримано"
    });
    }catch(err){
        console.error(err);
        res.status(500).json({ message: "Помилка сервера" });
    }
})

module.exports = router;
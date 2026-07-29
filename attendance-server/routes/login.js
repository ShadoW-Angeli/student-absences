require("dotenv").config();
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const pool = require("../db/database");

router.post("/", async (req, res) =>{
    try{
    const { login, password } = req.body;

    const result = await pool.query("SELECT * FROM users WHERE username = $1", 
        [login]);

    if(result.rows.length === 0){
        return res.status(401).json({
            success: false,
            message: "Неправильний логін або пароль"
    });
    } 

    const user = result.rows[0];

    const isMatch = await bcrypt.compare(
        password,
        user.password_hash
    );

        if(!isMatch){
            return res.status(401).json({
                success: false,
                 message: "Неправильний логін або пароль"
            });
        }
        res.json({
                success: true,
                user:{
                    role: user.role_id,
                    userId: user.id,
                    username: user.username
                }
            });
    }
    catch(err){
        console.log(err);

        res.status(500).json({
            success: false,
            message: "Помилка сервера"
        });
    }
});

module.exports = router;
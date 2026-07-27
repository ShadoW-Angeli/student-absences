require("dotenv").config();
const express = require("express");
const router = express.Router();
const pool = require("../db/database");
router.post("/", async (req, res) =>{
    const { login, password } = req.body;
    const result = await pool.query("SELECT * FROM users WHERE username = $1", 
        [login]);
    const user = result.rows[0];
    if(result.rows.length === 0){
        res.status(401).json({
            success: false,
            message: "Неправильний логін або пароль"
    });
    } else {
        if(user.password_hash === password){
            res.json({
                success: true,
                role: user.role_id
            });
        } else {
            res.status(401).json({
                success: false,
                 message: "Неправильний логін або пароль"
            });
        }
    }
    
});

module.exports = router;
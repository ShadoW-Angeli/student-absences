require("dotenv").config();
const path = require("path");
const express = require("express");
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

const studRouter = require("./routes/students");
app.use("/students", studRouter);

const subjectsRouter = require("./routes/subjects");
app.use("/subject", subjectsRouter);

const loginRouter = require("./routes/login");
app.use("/login", loginRouter);
app.listen(3000);
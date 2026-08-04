require("dotenv").config();
const path = require("path");
const express = require("express");
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const studRouter = require("./routes/students");
app.use("/students", studRouter);

const subjectsRouter = require("./routes/subjects");
app.use("/subject", subjectsRouter);

const loginRouter = require("./routes/login");
app.use("/login", loginRouter);

const yearRouter = require("./routes/acad-year");
app.use("/year", yearRouter);

const semestrRouter = require("./routes/semestr");
app.use("/semestr", semestrRouter);

const groupRouter = require("./routes/group");
app.use("/group", groupRouter);

const profRouter = require("./routes/profile");
app.use("/profile", profRouter);

const monthRouter = require("./routes/month");
app.use("/month", monthRouter);

const dayRouter = require("./routes/day");
app.use("/day", dayRouter);

const absenceRouter = require("./routes/absence");
app.use("/absence", absenceRouter);

const documentsRouter = require("./routes/document");
app.use("/documents", documentsRouter);
app.listen(3000);
require('module-alias/register');
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const studentRoutes = require("./routes/auth/student.route");
const teacherRoutes = require("./routes/auth/teacher.route");
const experimentsRoutes = require("./routes/experiment/experiment.route");
const app = express();

app.use(cors());
app.use(express.json());

//DB CONNECTION

const conn = require("./database/conn");
conn();

app.listen(3010, () => {
  console.log("Server started on port 3010");
});
app.get("/", (req, res) => {
  res.send("Servidor rodando!");
});


app.use(studentRoutes);
app.use(teacherRoutes);
app.use(experimentsRoutes);
const express = require("express");
const router = express.Router();
const studentController = require("./../../controllers/auth/studentAuth.controller");

router.post("/students", studentController.createStudent);
router.get("/students/:pin", studentController.getStudentByPin);

module.exports = router;

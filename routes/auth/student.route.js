const express = require("express");
const router = express.Router();
const studentController = require("./../../controllers/auth/studentAuth.controller");

router.post("/students", studentController.createStudent);
router.get("/students/:pin", studentController.getStudentByPin);
router.post("/students/answer/:id", studentController.updateStudentAnswers);
router.get('/students/:id', studentController.findById);

module.exports = router;

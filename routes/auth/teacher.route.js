const express = require("express");
const router = express.Router();
const teacherAuthController = require("./../../controllers/auth/teacherAuth.controller");

router.post("/registerTeacher", teacherAuthController.register);

router.post("/loginTeacher", teacherAuthController.login);

module.exports = router;

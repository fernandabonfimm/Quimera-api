const Teacher = require("./../../models/userSchema/teacher.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;

exports.register = async (req, res) => {
  try {
    const teacher = new Teacher(req.body);
    await teacher.save();
    res.status(201).send({ message: "Usuário criado com sucesso." });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Erro ao criar usuário." });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const teacher = await Teacher.findOne({ email });
    if (!teacher) throw new Error("Usuário não encontrado.");
    if (!password) throw new Error("informe a senha.");

    const token = jwt.sign({ _id: teacher._id, userType: teacher.userType }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.send({ token });
  } catch (err) {
    console.error(err);
    res.status(401).send({ message: "Falha na autenticação." });
  }
};

const logger = require("@/logger/logger");
const Teacher = require("@/models/userSchema/teacher.model");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

exports.register = async (req, res) => {
  try {
    const teacher = new Teacher(req.body);
    await teacher.save();
    res.status(201).send({ message: "Usuário criado com sucesso." });
  } catch (err) {
    logger.error(err);
    res.status(500).send({ message: "Erro ao criar usuário." });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const teacher = await Teacher.findOne({ email, password });
    if (!teacher) throw new Error("Usuário não encontrado.");

    const token = jwt.sign({ _id: teacher._id, userType: teacher.userType }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.send({ token, name: teacher.name , email: teacher.email, userType: teacher.userType, _id: teacher._id});
  } catch (err) {
    logger.error(err);
    res.status(401).send({ message: "Falha na autenticação." });
  }
};

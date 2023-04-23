const Student = require("./../../models/userSchema/student.model");
const Experiment = require("./../../models/experiment/experiment.model");

exports.createStudent = async (req, res) => {
  try {
    const { name, pin } = req.body;
    
    const experiment = await Experiment.findOne({ pin });
    if (!experiment) {
      throw new Error("PIN inválido.");
    }

    const student = new Student({ name, pin });
    await student.save();
    res.status(201).send({ message: "Estudante criado com sucesso." });
  } catch (err) {
    console.error(err);
    if (err.message === "PIN inválido.") {
      res.status(400).send({ message: "PIN inválido." });
    } else {
      res.status(500).send({ message: "Erro ao criar estudante." });
    }
  }
};

exports.getStudentByPin = async (req, res) => {
  try {
    const pin = req.params.pin;
    const students = await Student.find({ pin });
    if (!students || students.length === 0) throw new Error("Estudante não encontrado.");
    res.send(students);
  } catch (err) {
    console.error(err);
    res.status(404).send({ message: "Estudante não encontrado." });
  }
};

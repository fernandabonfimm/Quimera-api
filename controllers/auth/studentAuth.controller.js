const Student = require("./../../models/userSchema/student.model");
const Experiment = require("./../../models/experiment/experiment.model");

exports.createStudent = async (req, res) => {
  try {
    const { name, pin } = req.body;

    const experiment = await Experiment.findOne({ pin });
    if (!experiment) {
      throw new Error("PIN inválido.");
    }

    const student = new Student({ name, pin, answerOne: null, answerTwo: null });
    await student.save();

    res.status(201).send({
      message: "Estudante criado com sucesso.",
      student: { _id: student._id, name: student.name, pin: student.pin, answerOne: student.answerOne, answerTwo: student.answerTwo }
    });
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
exports.updateStudentAnswers = async (req, res) => {
  try {
    const { answerOne, answerTwo } = req.body;
    const studentId = req.params.id;

    const updatedStudent = await Student.findByIdAndUpdate(
      studentId,
      { answerOne, answerTwo },
      { new: true } // Opção para retornar o documento atualizado
    );

    if (!updatedStudent) {
      throw new Error("Estudante não encontrado.");
    }

    res.status(200).send({
      message: "Respostas do estudante atualizadas com sucesso.",
      student: { _id: updatedStudent._id, name: updatedStudent.name, pin: updatedStudent.pin, answerOne: updatedStudent.answerOne, answerTwo: updatedStudent.answerTwo }
    });
  } catch (err) {
    console.error(err);
    if (err.message === "Estudante não encontrado.") {
      res.status(404).send({ message: "Estudante não encontrado." });
    } else {
      res.status(500).send({ message: "Erro ao atualizar respostas do estudante." });
    }
  }
};

exports.findById = async (id) => {
  try {
    const student = await Student.findById(id);
    if (!student) {
      throw new Error("Estudante não encontrado.");
    }
    return student;
  } catch (err) {
    throw new Error(err.message);
  }
};
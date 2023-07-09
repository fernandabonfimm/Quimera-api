const StudentModel = require("../../models/userSchema/student.model");
const Experiment = require("./../../models/experiment/experiment.model");
const crypto = require("crypto");
const Student = require("@/controllers/auth/studentAuth.controller.js");
const options = require("./options").default;

module.exports = {
  async create(req, res) {
    try {
      const randomBytes = crypto.randomBytes(2);
      const randomNum = parseInt(randomBytes.toString("hex"), 16);
  
      const { title, description } = req.body;
  
      const teacherId = req.params.teacherId;
  
      const experiment = await Experiment.create({
        pin: ("0000" + randomNum).slice(-4), 
        title,
        description,
        teacher: teacherId,
      });
  
      return res.status(201).json({ experiment });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: "Error creating experiment" });
    }
  },  

  async getExperimentsByTeacherId(req, res) {
    try {
      const teacherId = req.params.teacherId;
  
      const experiments = await Experiment.find({ teacher: teacherId });
  
      return res.status(200).json({ experiments });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: "Error fetching experiments" });
    }
  }, 

  async getExperimentByTeacherAndExperimentId(req, res) {
    try {
      const teacherId = req.params.teacherId;
      const experimentId = req.params.experimentId;
  
      const experiment = await Experiment.findOne({
        _id: experimentId,
        teacher: teacherId
      });
  
      if (!experiment) {
        return res.status(404).json({ error: "Experiment not found" });
      }
  
      return res.status(200).json({ experiment });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: "Error fetching experiment" });
    }
  },

  async findByPin(req, res) {
    try {
      const { pin } = req.params;

      const experiment = await Experiment.findByPin(pin);

      if (!experiment) {
        return res.status(404).json({ error: "Experiment not found" });
      }

      return res.json({ experiment });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: "Error finding experiment" });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { pin, title, description } = req.body;

      const experiment = await Experiment.findByIdAndUpdate(
        id,
        {
          pin,
          title,
          description,
        },
        { new: true }
      );

      return res.json({ experiment });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: "Error updating experiment" });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;

      await Experiment.findByIdAndDelete(id);

      return res.status(204).send();
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: "Error deleting experiment" });
    }
  },

  async getPhaseOne(req, res) {
    const data = require("./result_tables/0_420");
    res.json({ data });
  },

  async getOptions(req, res) {
    const [optionsOne, optionsTwo] = require("./options").default;
    res.json({ optionsOne, optionsTwo });
  },

  async getGrahpic(req, resp) {
    const student = await Student.findById(req.params.id);

    const [optionsOne, optionsTwo] = require("./options").default;
    let valueAnswer = 0;

    for (let option of optionsOne) {
      if (student.answerOne === option.label) {
        valueAnswer += option.valueAnswer;
      }
    }

    for (let option of optionsTwo) {
      if (student.answerTwo === option.label) {
        valueAnswer += option.valueAnswer;
      }
    }

    const initial = require("./result_tables/0_420");
    const answer = require(`./result_tables/420_1440_${valueAnswer * 100}`);
    const _correct = require("./result_tables/420_1440_100");

    resp.json({
      correct: [...initial.concat(_correct.slice(420))],
      answerStudent: [...initial.concat(answer.slice(420))],
    });
  },

  async getCorrectGraphic(req, resp) {
    const _correct = require("./result_tables/420_1440_100");
    resp.json({
      correct: [..._correct],
    });
  },
};

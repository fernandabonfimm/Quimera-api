const Experiment = require("./../../models/experiment/experiment.model");
const crypto = require("crypto");
const Student = require("@/controllers/auth/studentAuth.controller.js")
const options = require("./options");

module.exports = {
  async create(req, res) {
    try {
      const randomBytes = crypto.randomBytes(2);
      const randomNum = parseInt(randomBytes.toString("hex"), 16);

      const {
        pin = ("0000" + randomNum).slice(-4),
        title,
        description
      } = req.body;

      const experiment = await Experiment.create({
        pin,
        title,
        description
      });

      return res.status(201).json({ experiment });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: "Error creating experiment" });
    }
  },

  async findById(req, res) {
    try {
      const { id } = req.params;

      const experiment = await Experiment.findById(id);

      return res.json({ experiment });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: "Error finding experiment" });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const {
        pin,
        title,
        description
      } = req.body;

      const experiment = await Experiment.findByIdAndUpdate(
        id,
        {
          pin,
          title,
          description
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

  async findAll(req, res) {
    try {
      const experiments = await Experiment.find();

      return res.json({ experiments });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: "Error finding experiments" });
    }
  },

  async getPhaseOne(req, res) {
    const data = require("./result_tables/0_420");
    res.json({ data });
  },

  async getOptions(req, res) {
    const [ optionsOne, optionsTwo ] = require('./options'); 
    res.json({ optionsOne, optionsTwo });
  },

  async getGrahpic(req, resp) {
    const student = await Student.findById(req.params.id);
  
    const [optionsOne, optionsTwo] = require('./options'); 
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
    
    const initial = require('./result_tables/0_420');
    const answer = require(`./result_tables/420_1440_${valueAnswer * 100}`);
    const _correct = require('./result_tables/420_1440_100');
  
    resp.json({
      correct: [...initial.concat(_correct.slice(420))],
      answerStudent: [...initial.concat(answer.slice(420))]
    });
  },
};


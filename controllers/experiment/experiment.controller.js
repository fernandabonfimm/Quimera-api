const StudentModel = require("../../models/userSchema/student.model");
const Experiment = require("./../../models/experiment/experiment.model");
const crypto = require("crypto");

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
    const options = require("./options");
    res.json({ options });
  },

  async getGrahpic(req, resp) {
    // const student = StudentModel.findById(req.params.id);
    const options = require("./options");
    const student = {
      answerOne: 'B-HB1',
      answerTwo: 'I-HB2'
    };
    let valueAnswer = 0;

    for (opt of  options.options) {
      for (_optn of opt) {
        if (_optn.value == student.answerOne || _optn.value == student.answerTwo) {
          valueAnswer += _optn.weigth;
        }
      }
    }
    const initial = require('./result_tables/0_420');
    const answer = require(`./result_tables/420_1440_${valueAnswer * 100}`);
    const _correct = require('./result_tables/420_1440_100');

    resp.json({
      correct: [ ...initial.concat(_correct.slice(420)) ],
      answerStudent: [ ...initial.concat(answer.slice(420)) ]
    });
  },

};

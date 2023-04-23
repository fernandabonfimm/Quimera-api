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
        initialValue,
        expectedVariation,
        unattendedVariation,
      } = req.body;

      const experiment = await Experiment.create({
        pin,
        title,
        initialValue,
        expectedVariation,
        unattendedVariation,
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
        initialValue,
        expectedVariation,
        unattendedVariation,
      } = req.body;

      const experiment = await Experiment.findByIdAndUpdate(
        id,
        {
          pin,
          title,
          initialValue,
          expectedVariation,
          unattendedVariation,
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

};

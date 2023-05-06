const Experiment = require("./../../models/experiment/experiment.model");
const crypto = require("crypto");
const excel = require("exceljs");

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
      const experiments = await this.findAll();

      return res.json({ experiments });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: "Error finding experiments" });
    }
  },

  async exportExcel(req, res) {
    try {
      const experiments = await Experiment.findAll();

      const workbook = new excel.Workbook();
      const worksheet = workbook.addWorksheet("Experiments");

      worksheet.columns = [
        { header: "ID", key: "_id", width: 10 },
        { header: "Pin", key: "pin", width: 10 },
        { header: "Title", key: "title", width: 32 },
        { header: "Initial Value", key: "initialValue", width: 15 },
        { header: "Expected Variation", key: "expectedVariation", width: 20 },
        {
          header: "Unattended Variation",
          key: "unattendedVariation",
          width: 20,
        },
      ];

      experiments.forEach((experiment) => {
        worksheet.addRow({
          _id: experiment._id.toString(),
          pin: experiment.pin.toString(),
          title: experiment.title.toString(),
          initialValue: experiment.initialValue.toString(),
          expectedVariation: experiment.expectedVariation.toString(),
          unattendedVariation: experiment.unattendedVariation.toString(),
        });
      });

      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=" + "experiments.xlsx"
      );
      await workbook.xlsx.write(res);
      return res.status(200).end();
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: "Error exporting experiments" });
    }
  },
};

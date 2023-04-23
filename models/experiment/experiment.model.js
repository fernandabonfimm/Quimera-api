const mongoose = require('mongoose');

const ExperimentSchema = new mongoose.Schema({
  pin: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  initialValue: {
    type: Number,
    required: true,
  },
  expectedVariation: {
    type: Number,
    required: true,
  },
  unattendedVariation: {
    type: Number,
    required: true,
  },
});

ExperimentSchema.statics.findByPin = async function(pin) {
  const experiment = await this.findOne({ pin });
  return experiment;
};

const Experiment = mongoose.model('Experiment', ExperimentSchema);

module.exports = Experiment;

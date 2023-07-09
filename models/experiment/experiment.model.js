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
  description:{
    type: String,
    required: true,
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

ExperimentSchema.statics.findByPin = async function(pin) {
  const experiment = await this.findOne({ pin });
  return experiment;
};

const Experiment = mongoose.model('Experiment', ExperimentSchema);

module.exports = Experiment;


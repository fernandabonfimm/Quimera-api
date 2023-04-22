const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    default: 'teacher',
    required: false,
  },
});

teacherSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) return next();
  next();
});

module.exports = mongoose.model('teacher', teacherSchema);

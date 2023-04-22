const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
  },
});

teacherSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) return next();

  const hash = await bcrypt.hash(user.password, 20);
  user.password = hash;
  next();
});

teacherSchema.methods.checkPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('teacher', teacherSchema);

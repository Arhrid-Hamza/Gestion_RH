const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: Number,
  name: String,
  email: String,
  role: String,
  password: String,
});

const employeeSchema = new mongoose.Schema({
  id: Number,
  name: String,
  mail: String,
  password: String,
  role: {
    type: String,
    enum: ['admin', 'employee'],
    default: 'employee'
  },
  department: String,
});

const departmentSchema = new mongoose.Schema({
  id: Number,
  name: String,
  description: String,
});

const projectSchema = new mongoose.Schema({
  id: Number,
  name: String,
  description: String,
  departmentResponsible: Number,
  startDate: Date,
  endDate: Date,
  employeeResponsible: Number,
});

const reportSchema = new mongoose.Schema({
  id: Number,
  title: String,
  generatedBy: String,
  date: Date,
  content: String,
});

const User = mongoose.model('User', userSchema);
const Employee = mongoose.model('Employee', employeeSchema);
const Department = mongoose.model('Department', departmentSchema);
const Project = mongoose.model('Project', projectSchema);
const Report = mongoose.model('Report', reportSchema);

module.exports = {
  User,
  Employee,
  Department,
  Project,
  Report,
};

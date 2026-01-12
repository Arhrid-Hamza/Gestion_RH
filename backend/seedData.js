const mongoose = require('mongoose');
const { User, Employee, Department, Project, Report } = require('./models');

mongoose.connect('mongodb://localhost:27017/rh_management', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(async () => {
  console.log('Connected to MongoDB for seeding data');

  // Clear existing data
  await User.deleteMany({});
  await Employee.deleteMany({});
  await Department.deleteMany({});
  await Project.deleteMany({});
  await Report.deleteMany({});

  // Sample departments
  const departments = [
    { id: 1, name: 'HR', description: 'Human Resources' },
    { id: 2, name: 'IT', description: 'Information Technology' },
  ];
  await Department.insertMany(departments);

  // Sample employees/users
  const employees = [
    { id: 1, name: 'Admin User', department: 'HR', email: 'admin@example.com', password: 'admin123', role: 'admin' },
    { id: 2, name: 'John Doe', department: 'IT', email: 'john@example.com', password: 'john123', role: 'user' },
  ];
  await Employee.insertMany(employees);

  // Users collection mirrors employees who can login
  const users = employees.map(emp => ({
    id: emp.id,
    name: emp.name,
    email: emp.email,
    role: emp.role,
    password: emp.password, // In production, hash passwords!
  }));
  await User.insertMany(users);

  // Sample projects
  const projects = [
    { id: 1, name: 'Project A', description: 'Project A Description', department: 'IT', startDate: new Date(), endDate: new Date() },
  ];
  await Project.insertMany(projects);

  // Sample reports
  const reports = [
    { id: 1, title: 'Report 1', content: 'Report content here', authorId: 1, date: new Date(), employeeResponsible: 2 },
  ];
  await Report.insertMany(reports);

  console.log('Sample data inserted');
  mongoose.connection.close();
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

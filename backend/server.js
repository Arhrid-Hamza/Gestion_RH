const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/rh_management', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(async () => {
  console.log('Connected to MongoDB');
  // Migrate users from employees to users table
  await syncUsersWithEmployees();
  console.log('Users migrated from employees to users table');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

const { User, Employee, Department, Project } = require('./models');

async function syncUsersWithEmployees() {
  const employees = await Employee.find({});
  for (const emp of employees) {
    const existingUser = await User.findOne({ id: emp.id });
    if (!existingUser) {
      const newUser = new User({
        id: emp.id,
        name: emp.name,
        email: emp.mail,
        role: emp.role,
        password: emp.password,
      });
      await newUser.save();
    } else {
      // Update existing user data if changed
      let updated = false;
      if (existingUser.name !== emp.name) {
        existingUser.name = emp.name;
        updated = true;
      }
      if (existingUser.email !== emp.mail) {
        existingUser.email = emp.mail;
        updated = true;
      }
      if (existingUser.role !== emp.role) {
        existingUser.role = emp.role;
        updated = true;
      }
      if (existingUser.password !== emp.password) {
        existingUser.password = emp.password;
        updated = true;
      }
      if (updated) {
        await existingUser.save();
      }
    }
  }
}

// API routes for users
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// API routes for employees
app.get('/api/employees', async (req, res) => {
  try {
    const employees = await Employee.find({});
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch employees' });
  }
});

// API routes for departments
app.get('/api/departments', async (req, res) => {
  try {
    const departments = await Department.find({});
    res.json(departments);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch departments' });
  }
});

// API routes for projects
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find({});
    // Fetch employees and departments to map names
    const employees = await Employee.find({});
    const departments = await Department.find({});

    // Map employee and department IDs to names
    const employeeMap = {};
    employees.forEach(emp => {
      employeeMap[emp.id] = emp.name;
    });
    const departmentMap = {};
    departments.forEach(dep => {
      departmentMap[dep.id] = dep.name;
    });

    // Add employeeResponsibleName and departmentResponsibleName to each project
    const projectsWithNames = projects.map(project => {
      return { 
        ...project.toObject(),
        employeeResponsibleName: employeeMap[project.employeeResponsible] || '',
        departmentResponsibleName: departmentMap[project.departmentResponsible] || '',
      };
    });

    res.json(projectsWithNames);
  } catch (err) {
    console.error('Failed to fetch projects:', err);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// Get project by id
app.get('/api/projects/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const project = await Project.findOne({ id: id })
      .populate('employeeResponsible')
      .populate('departmentResponsible');
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(project);
  } catch (err) {
    console.error('Failed to fetch project:', err);
    res.status(500).json({ error: 'Failed to fetch project' });
  }
});

// Update project by id
app.put('/api/projects/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const updatedProject = await Project.findOneAndUpdate({ id: id }, req.body, { new: true })
      .populate('employeeResponsible')
      .populate('departmentResponsible');
    if (!updatedProject) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(updatedProject);
  } catch (err) {
    console.error('Failed to update project:', err);
    res.status(500).json({ error: 'Failed to update project' });
  }
});

// Create new project
app.post('/api/projects', async (req, res) => {
  try {
    if (req.body.id) {
      req.body.id = Number(req.body.id);
    }
    const newProject = new Project(req.body);
    await newProject.save();
    res.json(newProject);
  } catch (err) {
    console.error('Failed to add project:', err);
    res.status(500).json({ error: 'Failed to add project' });
  }
});

// Delete project by id
app.delete('/api/projects/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const deletedProject = await Project.findOneAndDelete({ id: id });
    if (!deletedProject) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json({ message: 'Project deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

// Update user and sync role to employee with authorization checks
app.put('/api/users/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const currentUser = req.currentUser;

    // Check if role update is attempted
    if (req.body.role) {
      // Only admins can update roles
      if (currentUser.role !== 'admin') {
        // If user tries to update their own role, deny
        if (currentUser.id === id) {
          res.status(403).json({ error: 'Users cannot update their own role' });
          return;
        }
        // Non-admins cannot update others' roles
        res.status(403).json({ error: 'Only admins can update user roles' });
        return;
      }
    }

    const updatedUser = await User.findOneAndUpdate({ id: id }, req.body, { new: true });
    if (!updatedUser) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    // Sync role to employee
    if (req.body.role) {
      const employeeRole = req.body.role.toLowerCase() === 'user' ? 'employee' : req.body.role.toLowerCase();
      await Employee.findOneAndUpdate({ id: id }, { role: employeeRole });
    }
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// Update employee and sync role to user with authorization checks
app.put('/api/employees/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const currentUser = req.currentUser;

    // Check if role update is attempted
    if (req.body.role) {
      // Only admins can update roles
      if (currentUser.role !== 'admin') {
        // If user tries to update their own role, deny
        if (currentUser.id === id) {
          res.status(403).json({ error: 'Users cannot update their own role' });
          return;
        }
        // Non-admins cannot update others' roles
        res.status(403).json({ error: 'Only admins can update employee roles' });
        return;
      }
    }

    // Validate department if provided
    if (req.body.department) {
      const departmentExists = await Department.findOne({ id: Number(req.body.department) });
      if (!departmentExists) {
        res.status(400).json({ error: 'Invalid department id' });
        return;
      }
    }

    const updatedEmployee = await Employee.findOneAndUpdate({ id: id }, req.body, { new: true });
    if (!updatedEmployee) {
      res.status(404).json({ error: 'Employee not found' });
      return;
    }
    // Sync role to user
    if (req.body.role) {
      const userRole = req.body.role.toLowerCase() === 'employee' ? 'user' : req.body.role.toLowerCase();
      await User.findOneAndUpdate({ id: id }, { role: userRole });
    }
    await syncUsersWithEmployees();
    res.json(updatedEmployee);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update employee' });
  }
});

// Sync users from employees endpoint (optional, keep or update as needed)
app.get('/api/sync-users', async (req, res) => {
  try {
    const employees = await Employee.find({});
    for (const emp of employees) {
      const existingUser = await User.findOne({ id: emp.id });
      if (!existingUser) {
        const newUser = new User({
          id: emp.id,
          name: emp.name,
          email: emp.mail,
          role: emp.role,
          password: emp.password,
        });
        await newUser.save();
      } else {
        // Update existing user data if changed
        let updated = false;
        if (existingUser.name !== emp.name) {
          existingUser.name = emp.name;
          updated = true;
        }
        if (existingUser.email !== emp.mail) {
          existingUser.email = emp.mail;
          updated = true;
        }
        if (existingUser.role !== emp.role) {
          existingUser.role = emp.role;
          updated = true;
        }
        if (existingUser.password !== emp.password) {
          existingUser.password = emp.password;
          updated = true;
        }
        if (updated) {
          await existingUser.save();
        }
      }
    }
    res.json({ message: 'Users synced from employees successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to sync users from employees' });
  }
});

// POST routes for creating new documents

app.post('/api/users', async (req, res) => {
  try {
    if (!req.body.id) {
      const maxUser = await User.findOne().sort({ id: -1 });
      req.body.id = maxUser ? maxUser.id + 1 : 1;
    } else {
      req.body.id = Number(req.body.id);
    }
    const newUser = new User(req.body);
    await newUser.save();
    res.json(newUser);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add user' });
  }
});

app.post('/api/employees', async (req, res) => {
  try {
    if (!req.body.id) {
      const maxEmployee = await Employee.findOne().sort({ id: -1 });
      req.body.id = maxEmployee ? maxEmployee.id + 1 : 1;
    } else {
      req.body.id = Number(req.body.id);
    }
    const newEmployee = new Employee(req.body);
    await newEmployee.save();
    await syncUsersWithEmployees();
    res.json(newEmployee);
  } catch (err) {
    console.error('Error adding employee:', err);
    res.status(500).json({ error: 'Failed to add employee' });
  }
});

app.post('/api/departments', async (req, res) => {
  try {
    if (!req.body.id) {
      const maxDepartment = await Department.findOne().sort({ id: -1 });
      req.body.id = maxDepartment ? maxDepartment.id + 1 : 1;
    } else {
      req.body.id = Number(req.body.id);
    }
    const newDepartment = new Department(req.body);
    await newDepartment.save();
    res.json(newDepartment);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add department' });
  }
});

app.post('/api/projects', async (req, res) => {
  try {
    if (req.body.id) {
      req.body.id = Number(req.body.id);
    }
    const newProject = new Project(req.body);
    await newProject.save();
    res.json(newProject);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add project' });
  }
});

// DELETE routes for deleting documents by id

app.delete('/api/users/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const deletedUser = await User.findOneAndDelete({ id: id });
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    // Delete corresponding employee
    await Employee.findOneAndDelete({ id: id });
    res.json({ message: 'User and corresponding employee deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

app.delete('/api/employees/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);

    // Remove employeeResponsible from projects referencing this employee
    await Project.updateMany(
      { employeeResponsible: id },
      { $unset: { employeeResponsible: "" } }
    );

    const deletedEmployee = await Employee.findOneAndDelete({ id: id });
    if (!deletedEmployee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    // Delete corresponding user
    await User.findOneAndDelete({ id: id });
    await syncUsersWithEmployees();
    res.json({ message: 'Employee and corresponding user deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete employee' });
  }
});

app.delete('/api/departments/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    // Check if any employee is assigned to this department
    const employeeAssigned = await Employee.findOne({ department: id });
    if (employeeAssigned) {
      return res.status(400).json({ error: 'Cannot delete department: employees are assigned to this department' });
    }
    const deletedDepartment = await Department.findOneAndDelete({ id: id });
    if (!deletedDepartment) {
      return res.status(404).json({ error: 'Department not found' });
    }
    res.json({ message: 'Department deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete department' });
  }
});

app.delete('/api/projects/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const deletedProject = await Project.findOneAndDelete({ id: id });
    if (!deletedProject) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json({ message: 'Project deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    const user = await User.findOne({ email: email, password: password });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    res.json({ id: user.id, email: user.email, role: user.role, name: user.name });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './composants/Home';
import Login from './composants/Login';
import UserDashboard from './composants/UserDashboard';
import AdminDashboard from './composants/AdminDashboard';
import AddUser from './composants/AddUser';
import UpdateUser from './composants/UpdateUser';
import AddDepartment from './composants/AddDepartment';
import UpdateDepartment from './composants/UpdateDepartment';
import DepartmentList from './composants/DepartmentList';
import AddEmployee from './composants/AddEmployee';
import EmployeeList from './composants/EmployeeList';
import AddProject from './composants/AddProject';
import ProjectList from './composants/ProjectList';
import UpdateProject from './composants/UpdateProject';
import AddReport from './composants/AddReport';
import Reports from './composants/Reports';
import UpdateEmployee from './composants/UpdateEmployee';
import Profile from './composants/Profile';
import UserList from './composants/UserList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        {/* Removed Settings route as per user request */}
        <Route path="/add-user" element={<AddUser />} />
        <Route path="/update-user/:id" element={<UpdateUser />} />
        <Route path="/add-department" element={<AddDepartment />} />
        <Route path="/update-department/:id" element={<UpdateDepartment />} />
        <Route path="/departments" element={<DepartmentList />} />
        <Route path="/add-employee" element={<AddEmployee />} />
        <Route path="/employees" element={<EmployeeList />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/add-project" element={<AddProject />} />
        <Route path="/projects" element={<ProjectList />} />
        <Route path="/update-project/:id" element={<UpdateProject />} />
        <Route path="/add-report" element={<AddReport />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/update-employee/:id" element={<UpdateEmployee />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;

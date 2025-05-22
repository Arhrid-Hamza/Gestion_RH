import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects, fetchEmployees, fetchDepartments } from '../config/action';
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

function UserDashboard() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const users = useSelector(state => state.users);
    const projects = useSelector(state => state.projects);
    const employees = useSelector(state => state.employees);
    const departments = useSelector(state => state.departments);

    const [currentUserName, setCurrentUserName] = useState('');
    const [currentUserEmail, setCurrentUserEmail] = useState('');
    const [currentUserEmployeeId, setCurrentUserEmployeeId] = useState(null);

    useEffect(() => {
        dispatch(fetchProjects());
        dispatch(fetchEmployees());
        dispatch(fetchDepartments());

        const userEmail = localStorage.getItem('userEmail');
        setCurrentUserEmail(userEmail || '');

        if (userEmail && users.length > 0) {
            const currentUser = users.find(user => user.email === userEmail);
            if (currentUser) {
                setCurrentUserName(currentUser.name);
            }
        }

        if (userEmail && employees.length > 0) {
            const currentEmployee = employees.find(emp => emp.mail === userEmail);
            if (currentEmployee) {
                setCurrentUserEmployeeId(currentEmployee.id);
            }
        }
    }, [dispatch, users, employees]);

    const handleLogout = () => {
        localStorage.removeItem('userToken');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userRole');
        navigate('/login');
    };

    // Filter projects assigned to current user by employeeResponsible id
    const assignedProjects = projects.filter(project => project.employeeResponsible === currentUserEmployeeId);

    // Prepare data for charts: aggregate employees count per department
    const employeeCountByDepartment = departments.map(dept => {
        const count = employees.filter(emp => emp.department === dept.name).length;
        return { name: dept.name, value: count };
    });

    // If no employees or departments, fallback to empty array
    const employeeData = employeeCountByDepartment.length > 0 ? employeeCountByDepartment : [{ name: 'No Data', value: 1 }];

    const styles = {
        container: {
            padding: '30px',
            backgroundColor: '#f9f9f9',
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            minHeight: '100vh',
        },
        navbar: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#ffffff',
            color: '#2e7d32',
            padding: '15px 30px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            borderRadius: '8px',
        },
        title: {
            fontSize: '1.8em',
            fontWeight: '700',
            color: '#2e7d32',
        },
        navLink: {
            color: '#2e7d32',
            textDecoration: 'none',
            margin: '0 20px',
            fontWeight: '600',
            transition: 'color 0.3s',
        },
        navLinkHover: {
            color: '#81c784',
        },
        welcomeMessage: {
            marginTop: '30px',
            fontSize: '1.4em',
            color: '#2e7d32',
            fontWeight: '600',
        },
        section: {
            marginTop: '40px',
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        },
        sectionTitle: {
            fontSize: '1.2em',
            fontWeight: '700',
            marginBottom: '20px',
            color: '#2e7d32',
        },
        projectList: {
            listStyleType: 'none',
            paddingLeft: 0,
        },
        projectItem: {
            padding: '10px 0',
            borderBottom: '1px solid #ddd',
        },
    };

    return (
        <div style={styles.container}>
            <div style={styles.navbar}>
                <div style={styles.title}>User Dashboard</div>
                <div>
                    <Link to="/profile" style={styles.navLink} onMouseOver={e => e.currentTarget.style.color = styles.navLinkHover.color} onMouseOut={e => e.currentTarget.style.color = styles.navLink.color}>Profile</Link>
                    <Link to="/" onClick={handleLogout} style={styles.navLink} onMouseOver={e => e.currentTarget.style.color = styles.navLinkHover.color} onMouseOut={e => e.currentTarget.style.color = styles.navLink.color}>Log Out</Link>
                </div>
            </div>
            <h2 style={styles.welcomeMessage}>Welcome user {currentUserName}</h2>

            <div style={styles.section}>
                <div style={styles.sectionTitle}>Your Assigned Projects</div>
                {assignedProjects.length > 0 ? (
                    <ul style={styles.projectList}>
                        {assignedProjects.map(project => (
                            <li key={project.id} style={styles.projectItem}>
                                <strong>{project.name}</strong><br />
                                <em>{project.description}</em><br />
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No projects assigned to you.</p>
                )}
            </div>

            <div style={styles.section}>
                <div style={styles.sectionTitle}>Statistics</div>
                <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
                    <div style={{ width: 300, height: 300 }}>
                        <h4>Employees per Department</h4>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={employeeData}
                                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="value" fill="#82ca9d" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            <div style={styles.section}>
                <div style={styles.sectionTitle}>All Employees</div>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#eee' }}>
                            <th style={{ padding: '10px', border: '1px solid #ccc' }}>Employee ID</th>
                            <th style={{ padding: '10px', border: '1px solid #ccc' }}>Name</th>
                            <th style={{ padding: '10px', border: '1px solid #ccc' }}>Email</th>
                            <th style={{ padding: '10px', border: '1px solid #ccc' }}>Department</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.length > 0 ? (
                            employees.map(emp => (
                                <tr key={emp.id}>
                                    <td style={{ padding: '10px', border: '1px solid #ccc' }}>{emp.id}</td>
                                    <td style={{ padding: '10px', border: '1px solid #ccc' }}>{emp.name}</td>
                                    <td style={{ padding: '10px', border: '1px solid #ccc' }}>{emp.mail}</td>
                                    <td style={{ padding: '10px', border: '1px solid #ccc' }}>{emp.department}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" style={{ padding: '10px', border: '1px solid #ccc' }}>No employees available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default UserDashboard;

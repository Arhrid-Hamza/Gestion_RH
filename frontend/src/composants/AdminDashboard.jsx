import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { FaUsers, FaUserTie, FaBuilding, FaProjectDiagram } from 'react-icons/fa';

function AdminDashboard() {
  const navigate = useNavigate();
  const employees = useSelector(state => state.employees);
  const departments = useSelector(state => state.departments);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const data = [
    { name: 'Employees', value: employees.length },
    { name: 'Departments', value: departments.length }
  ];

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
      marginBottom: '30px',
    },
    title: {
      fontSize: '2em',
      fontWeight: '700',
      color: '#2e7d32',
    },
    navLink: {
      color: '#2e7d32',
      textDecoration: 'none',
      margin: '0 15px',
      fontWeight: '600',
    },
    navLinkContainer: {
      display: 'flex',
      gap: '15px',
    },
    dashboardContainer: {
      marginTop: '20px',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
      gap: '25px',
    },
    card: {
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
      padding: '25px',
      textAlign: 'center',
      transition: 'transform 0.3s',
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    icon: {
      fontSize: '3em',
      color: '#2e7d32',
      marginBottom: '15px',
    },
    cardTitle: {
      fontSize: '1.6em',
      marginBottom: '10px',
      color: '#2e7d32',
      fontWeight: '700',
    },
    cardButton: {
      padding: '10px 16px',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      backgroundColor: '#2e7d32',
      color: 'white',
      fontWeight: '600',
    },
    chartTitle: {
      textAlign: 'center',
      marginTop: '50px',
      fontSize: '1.8em',
      fontWeight: '700',
      color: '#2e7d32',
    },
    chartContainer: {
      maxWidth: '900px',
      margin: '30px auto',
      backgroundColor: '#ffffff',
      padding: '30px',
      borderRadius: '15px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      height: '300px',
    },
  };

  const cards = [
    {
      title: 'Users',
      icon: <FaUsers style={styles.icon} />,
      text: 'Manage all user accounts and permissions.',
      link: '/users',
    },
    {
      title: 'Employees',
      icon: <FaUserTie style={styles.icon} />,
      text: 'Manage employee records and details.',
      link: '/employees',
    },
    {
      title: 'Departments',
      icon: <FaBuilding style={styles.icon} />,
      text: 'Organize and manage departments.',
      link: '/departments',
    },
    {
      title: 'Projects',
      icon: <FaProjectDiagram style={styles.icon} />,
      text: 'Track and manage ongoing projects.',
      link: '/projects',
    },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.navbar}>
        <div style={styles.title}>Admin Dashboard</div>
        <div style={styles.navLinkContainer}>
          <Link to="/users" style={styles.navLink}>Manage Users</Link>
          <Link to="/employees" style={styles.navLink}>Manage Employees</Link>
          <Link to="/departments" style={styles.navLink}>Manage Departments</Link>
          <Link to="/projects" style={styles.navLink}>Manage Projects</Link>
          <Link to="/" onClick={handleLogout} style={styles.navLink}>Log Out</Link>
        </div>
      </div>

      <h2 style={styles.chartTitle}>Management Overview</h2>

      <div style={styles.dashboardContainer}>
        {cards.map((card, index) => (
          <div
            key={index}
            style={styles.card}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            {card.icon}
            <h3 style={styles.cardTitle}>{card.title}</h3>
            <p>{card.text}</p>
            <Link to={card.link}>
              <button
                style={styles.cardButton}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1b4d23'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2e7d32'}
              >
                View {card.title}
              </button>
            </Link>
          </div>
        ))}
      </div>

      <div style={styles.chartContainer}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#2e7d32" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default AdminDashboard;

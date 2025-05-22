import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    const handleLoginRedirect = () => {
        navigate('/login');
    };

    const styles = {
        container: {
            textAlign: 'center',
            padding: '50px',
            backgroundColor: '#f9f9f9',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        },
        title: {
            fontSize: '2.5em',
            marginBottom: '20px',
            color: '#333',
        },
        description: {
            fontSize: '1.2em',
            marginBottom: '30px',
            color: '#555',
            maxWidth: '600px',
        },
        button: {
            padding: '10px 20px',
            fontSize: '1em',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            backgroundColor: '#4CAF50',
            color: 'white',
            transition: 'background-color 0.3s',
        },
        buttonHover: {
            backgroundColor: '#45a049',
        },
        featureList: {
            listStyleType: 'none',
            padding: 0,
            margin: '20px 0',
            textAlign: 'left',
            display: 'inline-block',
        },
        featureItem: {
            margin: '10px 0',
            fontSize: '1.1em',
            color: '#333',
        },
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Welcome to the HR Management System</h1>
            <p style={styles.description}>
                Your one-stop solution for managing human resources efficiently and effectively. 
                This application allows you to manage users, employees, departments, projects, and reports seamlessly.
            </p>
            <ul style={styles.featureList}>
                <li style={styles.featureItem}>✔️ Manage Users and Employees</li>
                <li style={styles.featureItem}>✔️ Organize Departments and Projects</li>
                <li style={styles.featureItem}>✔️ Generate and View Reports</li>
                <li style={styles.featureItem}>✔️ User-Friendly Interface</li>
                <li style={styles.featureItem}>✔️ Secure Authentication</li>
            </ul>
            <button 
                style={styles.button} 
                onClick={handleLoginRedirect}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.button.backgroundColor}
            >
                Go to Login
            </button>
        </div>
    );
}

export default Home;

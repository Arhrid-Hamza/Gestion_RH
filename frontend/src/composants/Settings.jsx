import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Settings() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        // Retrieve user data from local storage
        const user = JSON.parse(localStorage.getItem('utilisateurs'))?.[0];
        if (user) {
            setEmail(user.email); // Set the email from local storage
        }
    }, []);

    const handleSave = () => {
        // Here you would typically save the settings to local storage or send them to a server
        const userSettings = {
            email,
            password,
        };
        localStorage.setItem('userSettings', JSON.stringify(userSettings)); // Save settings to local storage
        alert('Settings saved!'); // Notify the user
        navigate('/user-dashboard'); // Redirect to the dashboard
    };

    const styles = {
        container: {
            padding: '20px',
            backgroundColor: '#f9f9f9',
            fontFamily: 'Arial, sans-serif',
        },
        title: {
            fontSize: '1.5em',
            marginBottom: '20px',
        },
        label: {
            fontWeight: 'bold',
            marginBottom: '10px',
        },
        input: {
            width: '100%',
            padding: '10px',
            marginBottom: '20px',
            border: '1px solid #ccc',
            borderRadius: '4px',
        },
        button: {
            padding: '10px 15px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            backgroundColor: '#4CAF50',
            color: 'white',
        },
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Settings</h2>
            <div>
                <label style={styles.label}>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={styles.input}
                    required
                />
                <label style={styles.label}>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={styles.input}
                    required
                />
            </div>
            <button style={styles.button} onClick={handleSave}>Save Settings</button>
        </div>
    );
}

export default Settings;

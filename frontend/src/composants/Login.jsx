import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log('Login attempt with email:', email);

        try {
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            console.log('Response status:', response.status);

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Login error:', errorData);
                setError(errorData.error || 'Login failed');
                return;
            }

            const user = await response.json();
            console.log('Login success, user:', user);
            localStorage.setItem('userRole', user.role);
            localStorage.setItem('userEmail', user.email);

            if (user.role === 'admin') {
                navigate('/admin-dashboard');
            } else {
                navigate('/user-dashboard');
            }
        } catch (err) {
            console.error('Login exception:', err);
            setError('Login failed. Please try again.');
        }
    };

    const styles = {
        container: {
            maxWidth: '400px',
            margin: '40px auto',
            padding: '30px',
            borderRadius: '12px',
            backgroundColor: '#ffffff',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        },
        heading: {
            color: '#2e7d32',
            fontSize: '2em',
            fontWeight: '700',
            marginBottom: '20px',
            textAlign: 'center',
        },
        button: {
            width: '100%',
            padding: '12px 15px',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '16px',
            backgroundColor: '#2e7d32',
            color: 'white',
            fontWeight: '600',
            transition: 'background-color 0.3s',
        },
        buttonHover: {
            backgroundColor: '#1b4d23',
        },
        input: {
            width: '100%',
            padding: '12px',
            margin: '12px 0',
            border: '1px solid #ccc',
            borderRadius: '6px',
            fontSize: '16px',
            boxSizing: 'border-box',
        },
        error: {
            color: 'red',
            marginBottom: '10px',
            textAlign: 'center',
        },
        label: {
            fontWeight: '600',
            color: '#2e7d32',
        },
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Login</h2>
            {error && <div style={styles.error}>{error}</div>}
            <form onSubmit={handleLogin}>
                <label style={styles.label}>Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={styles.input}
                    required
                />
                <label style={styles.label}>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={styles.input}
                    required
                />
                <button
                    type="submit"
                    style={styles.button}
                    onMouseOver={e => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor}
                    onMouseOut={e => e.currentTarget.style.backgroundColor = styles.button.backgroundColor}
                >
                    Login
                </button>
            </form>
        </div>
    );
}

export default Login;

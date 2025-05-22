import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../config/action';

function Profile() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const users = useSelector(state => state.users);

    useEffect(() => {
        if (users.length === 0) {
            dispatch(fetchUsers());
        }
    }, [dispatch, users.length]);

    const userEmail = localStorage.getItem('userEmail');
    const user = users.find(u => u.email === userEmail) || {};

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
        value: {
            marginBottom: '20px',
        },
        button: {
            padding: '10px 15px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            backgroundColor: '#4CAF50',
            color: 'white',
            marginTop: '20px',
            marginRight: '10px',
        },
        buttonContainer: {
            marginTop: '20px',
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Profile</h2>
            <div>
                <div style={styles.label}>ID:</div>
                <div style={styles.value}>{user.id || 'N/A'}</div>
                <div style={styles.label}>Name:</div>
                <div style={styles.value}>{user.name || 'N/A'}</div>
                <div style={styles.label}>Email:</div>
                <div style={styles.value}>{user.email || 'N/A'}</div>
                <div style={styles.label}>Role:</div>
                <div style={styles.value}>{user.role || 'N/A'}</div>
            </div>
            <div style={styles.buttonContainer}>
                <button
                    style={styles.button}
                    onClick={() => navigate(`/update-user/${user.id}`)}
                    disabled={!user.id}
                >
                    Edit Profile
                </button>
                <button
                    style={styles.button}
                    onClick={() => navigate('/user-dashboard')}
                >
                    Back to Dashboard
                </button>
            </div>
        </div>
    );
}

export default Profile;

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UpdateUserAction, UpdateEmployeeAction, fetchUsers, fetchDepartments } from "../config/action";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

function UpdateUser () {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.users.find((u) => u.id === parseInt(id)));
    const employees = useSelector(state => state.employees);
    const departments = useSelector(state => state.departments);

    const [idValue, setIdValue] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('user');
    const [password, setPassword] = useState('');
    const [departmentId, setDepartmentId] = useState('');

    // Get current logged in user email from localStorage
    const currentUserEmail = localStorage.getItem('userEmail');
    const currentUser = useSelector(state => state.users.find(u => u.email === currentUserEmail));

    const isOwnProfile = currentUser && user && currentUser.id === user.id;

    useEffect(() => {
            if (!user) {
                dispatch(fetchUsers());
            }
            if (departments.length === 0) {
                dispatch(fetchDepartments());
            }
            if (user && employees.length > 0 && departments.length > 0) {
                setIdValue(user.id);
                setName(user.name);
                setEmail(user.email);
                setRole(user.role);
                setPassword(user.password);

                // Find employee to get department
                const employee = employees.find(emp => emp.id === user.id);
                if (employee) {
                    setDepartmentId(employee.department ? String(employee.department) : '');
                } else {
                    setDepartmentId('');
                }
            }
    }, [user, dispatch, employees, departments]);

    useEffect(() => {
        if (departments.length === 0) {
            dispatch(fetchDepartments());
        }
    }, [departments, dispatch]);

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            // Prepare update payload
            const updatePayload = {
                email,
                password,
            };
            // Only admins or others can update name and role
            if (!isOwnProfile) {
                updatePayload.name = name;
                updatePayload.role = role;
            }
            await dispatch(UpdateUserAction(idValue, updatePayload));
            // Also update corresponding employee
            const employeePayload = {
                mail: email,
                password,
            };
            if (!isOwnProfile) {
                employeePayload.name = name;
                employeePayload.role = role;
                employeePayload.department = departmentId;
            }
            await dispatch(UpdateEmployeeAction(idValue, employeePayload));
            Swal.fire({
                title: 'User Updated!',
                text: 'The user details have been updated successfully.',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                navigate('/user-dashboard');
            });
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: 'Failed to update user.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    const styles = {
        container: {
            maxWidth: '400px',
            margin: '50px auto',
            padding: '20px',
            border: '1px solid #ccc',
            borderRadius: '8px',
            backgroundColor: '#f9f9f9',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        },
        title: {
            textAlign: 'center',
            marginBottom: '20px',
            fontSize: '1.5em',
            color: '#333',
        },
        label: {
            display: 'block',
            marginBottom: '8px',
            fontWeight: 'bold',
            color: '#555',
        },
        input: {
            width: '100%',
            padding: '10px',
            marginBottom: '20px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '1em',
        },
        button: {
            width: '100%',
            padding: '10px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '1em',
            backgroundColor: '#4CAF50',
            color: 'white',
            transition: 'background-color 0.3s',
        },
        buttonHover: {
            backgroundColor: '#45a049',
        },
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Update User</h2>
            <form onSubmit={handleClick}>
                <label style={styles.label}>ID</label>
                <input
                    type="text"
                    value={idValue}
                    onChange={(e) => setIdValue(e.target.value)}
                    required
                    style={styles.input}
                    disabled
                />
                <label style={styles.label}>Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    style={styles.input}
                    disabled={isOwnProfile}
                />
                <label style={styles.label}>Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={styles.input}
                />
                { !isOwnProfile && (
                <>
                <label style={styles.label}>Role</label>
                <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                    style={styles.input}
                >
                    <option value="employee">Employee</option>
                    <option value="admin">Admin</option>
                </select>
                </>
                )}
                <label style={styles.label}>Department</label>
                {currentUser && currentUser.role === 'admin' ? (
                    <select
                        value={departmentId}
                        onChange={(e) => setDepartmentId(e.target.value)}
                        required
                        style={styles.input}
                    >
                        <option value="">Select Department</option>
                        {departments.map((dept) => (
                            <option key={dept.id} value={String(dept.id)}>
                                {dept.name}
                            </option>
                        ))}
                    </select>
                ) : (
                    <input
                        type="text"
                        value={departments.find(d => String(d.id) === departmentId)?.name || ''}
                        style={styles.input}
                        disabled
                    />
                )}
                <label style={styles.label}>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={styles.input}
                />
                <button
                    type="submit"
                    style={styles.button}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.button.backgroundColor}
                >
                    Update User
                </button>
            </form>
        </div>
    );
}
export default UpdateUser;

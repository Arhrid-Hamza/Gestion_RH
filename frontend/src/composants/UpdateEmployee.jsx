import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import { useSelector, useDispatch } from "react-redux";
import { UpdateEmployeeAction, fetchEmployees, fetchDepartments } from "../config/action";

function UpdateEmployee() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const navigate = useNavigate();
    const employee = useSelector(state => state.employees.find(emp => emp.id === parseInt(id)));
    const departments = useSelector(state => state.departments);

    const [name, setName] = useState('');
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');
    const [department, setDepartment] = useState('');

    useEffect(() => {
        if (!employee) {
            dispatch(fetchEmployees());
        }
        if (!departments || departments.length === 0) {
            dispatch(fetchDepartments());
        }
        if (employee && departments.length > 0) {
            setName(employee.name);
            setMail(employee.mail);
            setPassword(employee.password);
            setRole(employee.role);
            // Set department id based on department name or id
            if (employee.department) {
                const isId = !isNaN(Number(employee.department));
                if (isId) {
                    setDepartment(employee.department.toString());
                } else {
                    const dept = departments.find(d => d.name === employee.department);
                    setDepartment(dept ? dept.id.toString() : '');
                }
            } else {
                setDepartment('');
            }
        }
    }, [employee, departments, dispatch]);

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await dispatch(UpdateEmployeeAction(parseInt(id), { name, mail, password, role: role === 'user' ? 'employee' : role, department }));
            await dispatch(fetchEmployees()); // Refresh employees after update
            Swal.fire({
                title: 'Employee Updated!',
                text: 'The employee details have been updated successfully.',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                navigate('/employees');
            });
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: 'Failed to update employee.',
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
        select: {
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
            <h2 style={styles.title}>Update Employee</h2>
            <form onSubmit={handleClick}>
                <label style={styles.label}>Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    style={styles.input}
                />
                <label style={styles.label}>Mail</label>
                <input
                    type="email"
                    value={mail}
                    onChange={(e) => setMail(e.target.value)}
                    required
                    style={styles.input}
                />
                <label style={styles.label}>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={styles.input}
                />
                <label style={styles.label}>Role</label>
                <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                    style={styles.select}
                >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
                <label style={styles.label}>Department</label>
                <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    required
                    style={styles.select}
                >
                    <option value="">Select a department</option>
                    {departments && departments.map((dep) => (
                        <option key={dep.id} value={dep.id.toString()}>{dep.name}</option>
                    ))}
                </select>
                <button
                    type="submit"
                    style={styles.button}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.button.backgroundColor}
                >
                    Update Employee
                </button>
            </form>
        </div>
    );
}

export default UpdateEmployee;

import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from "react-redux";
import { UpdateProjectAction, fetchProjects, fetchEmployees, fetchDepartments } from "../config/action";

function UpdateProject() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const project = useSelector(state => state.projects.find(proj => proj.id === parseInt(id)));
    const employees = useSelector(state => state.employees);
    const departments = useSelector(state => state.departments);

    const [name, setName] = useState('');
    const [employeeResponsible, setEmployeeResponsible] = useState(''); // single employee id
    const [departmentResponsible, setDepartmentResponsible] = useState(''); // department id

    useEffect(() => {
        if (!project) {
            dispatch(fetchProjects());
        } else {
            setName(project.name);
            setEmployeeResponsible(project.employeeResponsible ? String(project.employeeResponsible) : '');
            setDepartmentResponsible(project.departmentResponsible);
        }
        if (!employees || employees.length === 0) {
            dispatch(fetchEmployees());
        }
        if (!departments || departments.length === 0) {
            dispatch(fetchDepartments());
        }
    }, [project, employees, departments, dispatch]);

    const handleEmployeeChange = (e) => {
        setEmployeeResponsible(e.target.value);
    };

    const handleDepartmentChange = (e) => {
        setDepartmentResponsible(parseInt(e.target.value));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await dispatch(UpdateProjectAction(parseInt(id), { name, employeeResponsible: parseInt(employeeResponsible), departmentResponsible }));
            Swal.fire({
                title: 'Project Updated!',
                text: 'The project details have been updated successfully.',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                navigate('/projects');
            });
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: 'Failed to update project.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    const styles = {
        container: {
            maxWidth: '500px',
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
            fontSize: '1.8em',
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
            <h2 style={styles.title}>Update Project</h2>
            <form onSubmit={handleClick}>
                <label style={styles.label}>Project Name</label>
                <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                    style={styles.input}
                />
                <label style={styles.label}>Employee Responsible</label>
                <select
                    value={employeeResponsible.length > 0 ? String(employeeResponsible[0]) : ''}
                    onChange={(e) => setEmployeeResponsible([parseInt(e.target.value)])}
                    required
                    style={styles.select}
                >
                    <option value="">Select an employee</option>
                    {employees && employees.map(emp => (
                        <option key={emp.id} value={emp.id}>{emp.name}</option>
                    ))}
                </select>
                <label style={styles.label}>Department Responsible</label>
                <select
                    value={departmentResponsible ? String(departmentResponsible) : ''}
                    onChange={handleDepartmentChange}
                    required
                    style={styles.select}
                >
                    <option value="">Select a department</option>
                    {departments && departments.map(dep => (
                        <option key={dep.id} value={dep.id}>{dep.name}</option>
                    ))}
                </select>
                <button 
                    type="submit" 
                    style={styles.button}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.button.backgroundColor}
                >
                    Update Project
                </button>
            </form>
        </div>
    );
}

export default UpdateProject;

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addProjectAction, fetchEmployees, fetchDepartments } from "../config/action";
import Swal from "sweetalert2";

function AddProject() {
    const [name, setName] = useState("");
    const [employeeResponsible, setEmployeeResponsible] = useState(""); // single employee id
    const [departmentResponsible, setDepartmentResponsible] = useState(""); // department id
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const employees = useSelector(state => state.employees);
    const departments = useSelector(state => state.departments);

    useEffect(() => {
        if (!employees || employees.length === 0) {
            dispatch(fetchEmployees());
        }
        if (!departments || departments.length === 0) {
            dispatch(fetchDepartments());
        }
    }, [dispatch, employees, departments]);

    const handleEmployeeChange = (e) => {
        setEmployeeResponsible(e.target.value);
    };

    const handleDepartmentChange = (e) => {
        setDepartmentResponsible(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newProject = {
            id: Date.now(),
            name,
            employeeResponsible: employeeResponsible,
            departmentResponsible: departmentResponsible
        };
        dispatch(addProjectAction(newProject));
        setName("");
        setEmployeeResponsible("");
        setDepartmentResponsible("");
        Swal.fire({
            title: 'Project Added!',
            text: 'The project has been added successfully.',
            icon: 'success',
            confirmButtonText: 'OK'
        }).then(() => {
            navigate('/projects');
        });
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
            <h2 style={styles.title}>Add Project</h2>
            <form onSubmit={handleSubmit}>
                <label style={styles.label}>Project Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    style={styles.input}
                />
                <label style={styles.label}>Employee Responsible:</label>
                <select
                    value={employeeResponsible}
                    onChange={handleEmployeeChange}
                    required
                    style={styles.select}
                >
                    <option value="">Select an employee</option>
                    {employees && employees.map((employee) => (
                        <option key={employee.id} value={employee.id}>{employee.name}</option>
                    ))}
                </select>
                <label style={styles.label}>Department Responsible:</label>
                <select
                    value={departmentResponsible}
                    onChange={handleDepartmentChange}
                    required
                    style={styles.select}
                >
                    <option value="">Select a department</option>
                    {departments && departments.map((department) => (
                        <option key={department.id} value={department.id}>{department.name}</option>
                    ))}
                </select>
                <button
                    type="submit"
                    style={styles.button}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.button.backgroundColor}
                >
                    Add Project
                </button>
            </form>
        </div>
    );
}

export default AddProject;

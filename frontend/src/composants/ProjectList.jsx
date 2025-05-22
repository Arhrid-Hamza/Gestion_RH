import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DeleteProjectAction, fetchProjects, fetchEmployees, fetchDepartments } from "../config/action";
import Swal from "sweetalert2";
import { useEffect } from "react";

function ProjectList() {
    const projects = useSelector(state => state.projects);
    const employees = useSelector(state => state.employees);
    const departments = useSelector(state => state.departments);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchProjects());
        dispatch(fetchEmployees());
        dispatch(fetchDepartments());
    }, [dispatch]);

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(DeleteProjectAction(id));
                Swal.fire(
                    'Deleted!',
                    'The project has been deleted.',
                    'success'
                );
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    'Cancelled',
                    'The project is safe :)',
                    'error'
                );
            }
        });
    };

    // Remove getEmployeeNames and getDepartmentName as we will use populated data directly


    const styles = {
        container: {
            maxWidth: '800px',
            margin: '20px auto',
            padding: '20px',
            border: '1px solid #ccc',
            borderRadius: '8px',
            backgroundColor: '#f9f9f9',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        },
        buttonContainer: {
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '20px',
        },
        button: {
            padding: '10px 15px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
            backgroundColor: '#4CAF50',
            color: 'white',
        },
        returnButton: {
            backgroundColor: '#4CAF50',
        },
        table: {
            width: '100%',
            borderCollapse: 'collapse',
            marginTop: '20px',
        },
        th: {
            backgroundColor: '#f2f2f2',
            border: '1px solid #ddd',
            padding: '8px',
            textAlign: 'left',
        },
        td: {
            border: '1px solid #ddd',
            padding: '8px',
            textAlign: 'left',
        },
        editButton: {
            padding: '5px 10px',
            marginRight: '10px',
            backgroundColor: '#2196F3',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
        },
        deleteButton: {
            padding: '5px 10px',
            marginRight: '5px',
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
        },
    };

    return (
        <div style={styles.container}>
            <div style={styles.buttonContainer}>
                <Link to="/add-project">
                    <button style={styles.button}>Add Project</button>
                </Link>
                <button 
                    onClick={() => navigate('/admin-dashboard')} 
                    style={{ ...styles.button, ...styles.returnButton }}
                >
                    Return to Admin Dashboard
                </button>
            </div>
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.th}>ID</th>
                        <th style={styles.th}>Project Name</th>
                        <th style={styles.th}>Employee Responsible</th>
                        <th style={styles.th}>Department Responsible</th>
                        <th style={styles.th}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map((project, index) => (
                        <tr key={index}>
                            <td style={styles.td}>{index + 1}</td>
                            <td style={styles.td}>{project.name}</td>
                            <td style={styles.td}>{project.employeeResponsibleName || ''}</td>
                            <td style={styles.td}>{project.departmentResponsibleName || ''}</td>
                            <td>
                                <Link to={`/update-project/${project.id}`}>
                                    <button style={styles.editButton}>Edit</button>
                                </Link>
                                <button style={styles.deleteButton} onClick={() => handleDelete(project.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ProjectList;

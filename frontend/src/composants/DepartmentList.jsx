import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DeleteDepartmentAction, fetchDepartments } from "../config/action";
import Swal from 'sweetalert2';
import { useEffect } from "react";

function DepartmentList() {
    const departments = useSelector(state => state.departments);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
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
                    dispatch(DeleteDepartmentAction(id))
                        .then(() => {
                            Swal.fire(
                                'Deleted!',
                                'The department has been deleted.',
                                'success'
                            );
                        })
                        .catch((error) => {
                            if (error.response && error.response.data && error.response.data.error && error.response.data.error.includes('employees are assigned')) {
                                Swal.fire(
                                    'Error!',
                                    'The department is full. Cannot delete because employees are assigned.',
                                    'error'
                                );
                            } else {
                                Swal.fire(
                                    'Error!',
                                    error.response && error.response.data && error.response.data.error
                                        ? error.response.data.error
                                        : 'Failed to delete department.',
                                    'error'
                                );
                            }
                        });
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    Swal.fire(
                        'Cancelled',
                        'The department is safe :)',
                        'error'
                    );
                }
            });
    };

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
            color: 'white',
        },
        returnButton: {
            backgroundColor: '#4CAF50',
        },
        addButton: {
            backgroundColor: '#4CAF50',
            color: 'white',
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
            marginLeft: '10px',
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
                <Link to="/add-department">
                    <button style={{ ...styles.button, ...styles.addButton }}>Add Department</button>
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
                        <th style={styles.th}>Department ID</th>
                        <th style={styles.th}>Name</th>
                        <th style={styles.th}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {departments.map((department) => (
                        <tr key={department.id}>
                            <td style={styles.td}>{department.id}</td>
                            <td style={styles.td}>{department.name}</td>
                            <td>
                                <Link to={`/update-department/${department.id}`}>
                                    <button style={styles.editButton}>Edit</button>
                                </Link>
                                <button style={styles.deleteButton} onClick={() => handleDelete(department.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default DepartmentList;

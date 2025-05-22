import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DeleteEmployeeAction, fetchEmployees } from "../config/action";
import Swal from 'sweetalert2';
import axios from "axios";

function EmployeesList() {
    const employees = useSelector(state => state.employees);
    const departments = useSelector(state => state.departments);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchEmployees());
    }, [dispatch]);

    const handleDelete = (id) => {
        // Remove the check that prevents deleting employee if department exists
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
                    axios.delete(`http://localhost:5000/api/employees/${id}`)
                        .then(() => {
                            dispatch(DeleteEmployeeAction(id));
                            dispatch(fetchEmployees()); // Refresh employees after deletion
                            Swal.fire(
                                'Deleted!',
                                'The employee has been deleted.',
                                'success'
                            );
                        })
                        .catch(error => {
                            console.error('Failed to delete employee', error);
                            Swal.fire(
                                'Error!',
                                'Failed to delete employee.',
                                'error'
                            );
                        });
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    Swal.fire(
                        'Cancelled',
                        'The employee is safe :)',
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
                <Link to="/add-employee">
                    <button style={{ ...styles.button, ...styles.addButton }}>Add Employee</button>
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
                        <th style={styles.th}>Employee ID</th>
                        <th style={styles.th}>Name</th>
                        <th style={styles.th}>Department</th>
                        <th style={styles.th}>Action</th>
                    </tr>
                </thead>
                <tbody>{employees.map((employee) => (
                    <tr key={employee.id}>
                        <td style={styles.td}>{employee.id}</td>
                        <td style={styles.td}>{employee.name}</td>
                        <td style={styles.td}>
                            {(() => {
                                const dept = departments.find(dep => dep.id.toString() === employee.department.toString());
                                return dept ? dept.name : employee.department;
                            })()}
                        </td>
                        <td>
                            <Link to={`/update-employee/${employee.id}`}>
                                <button style={styles.editButton}>Edit</button>
                            </Link>
                            <button style={styles.deleteButton} onClick={() => handleDelete(employee.id)}>Delete</button>
                        </td>
                    </tr>
                ))}</tbody>
            </table>
        </div>
    );
}

export default EmployeesList;

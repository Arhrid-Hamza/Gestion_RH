    import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DeleteUserAction, fetchUsers, fetchEmployees } from "../config/action";
import Swal from "sweetalert2";
import { useEffect } from "react";

function UserList() {
    const users = useSelector(state => state.users);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchUsers());
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
                    dispatch(DeleteUserAction(id));
                    dispatch(fetchEmployees()); // Refresh employees after user deletion
                    Swal.fire(
                        'Deleted!',
                        'The user has been deleted.',
                        'success'
                    );
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    Swal.fire(
                        'Cancelled',
                        'The user is safe :)',
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
        addButton: {
            padding: '10px 15px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
            backgroundColor: '#4CAF50',  // Green color to match other buttons
            color: 'white',
        },
    };

    return (
        <div style={styles.container}>
            <div style={styles.buttonContainer}>
                <button 
                    onClick={() => navigate('/add-user')} 
                    style={styles.addButton}
                >
                    Add User
                </button>
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
                        <th style={styles.th}>Id</th>
                        <th style={styles.th}>Name</th>
                        <th style={styles.th}>Email</th>
                        <th style={styles.th}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td style={styles.td}>{user.id}</td>
                            <td style={styles.td}>{user.name}</td>
                            <td style={styles.td}>{user.email}</td>
                            <td>
                                <Link to={`/update-user/${user.id}`}>
                                    <button style={styles.editButton}>Edit</button>
                                </Link>
                                <button style={styles.deleteButton} onClick={() => handleDelete(user.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UserList;

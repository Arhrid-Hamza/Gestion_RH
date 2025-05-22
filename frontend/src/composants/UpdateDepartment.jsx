import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from "react-redux";
import { UpdateDepartmentAction, fetchDepartments } from "../config/action";

function UpdateDepartment() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const department = useSelector(state => state.departments.find(dep => dep.id === parseInt(id)));

    const [name, setName] = useState('');

    useEffect(() => {
        if (!department) {
            dispatch(fetchDepartments());
        } else {
            setName(department.name);
        }
    }, [department, dispatch]);

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await dispatch(UpdateDepartmentAction({ id: parseInt(id), name }));
            Swal.fire({
                title: 'Department Updated!',
                text: 'The department has been updated successfully.',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                navigate('/departments');
            });
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: 'Failed to update department.',
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
            <h2 style={styles.title}>Update Department</h2>
            <form onSubmit={handleClick}>
                <label style={styles.label}>Department Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    style={styles.input}
                />
                <button
                    type="submit"
                    style={styles.button}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.button.backgroundColor}
                >
                    Update Department
                </button>
            </form>
        </div>
    );
}

export default UpdateDepartment;

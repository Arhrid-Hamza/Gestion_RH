import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { AddReportAction } from "../config/action"; // Ensure this matches your action file

function AddReport() {
    const [title, setTitle] = useState("");
    const [generatedBy, setGeneratedBy] = useState(""); // State for the person generating the report
    const [date, setDate] = useState(""); // State for the report date
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Initialize useNavigate

    const handleSubmit = (e) => {
        e.preventDefault();
        const newReport = {
            id: Date.now(), // Use a unique ID based on the current timestamp
            title,
            content: "", // Add content if needed
            // eslint-disable-next-line no-undef
            authorId: parseInt(authorId),
            date: new Date(date),
            employeeResponsible: null, // Add if needed
        };
        dispatch(AddReportAction(newReport)); // Dispatch the action to add the report
        // Reset form
        setTitle("");
        // eslint-disable-next-line no-undef
        setAuthorId("");
        setDate("");
        // Redirect to the reports list page
        navigate('/reports'); // Change this to the correct path for your reports list
    }

    // Inline styles
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
            <h2 style={styles.title}>Add Report</h2>
            <form onSubmit={handleSubmit}>
                <label style={styles.label}>Report Title:</label>
                <input 
                    type="text" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    required 
                    style={styles.input}
                />
                <label style={styles.label}>Author ID:</label>
                <input
                    type="number"
                    // eslint-disable-next-line no-undef
                    value={authorId}
                    // eslint-disable-next-line no-undef
                    onChange={(e) => setAuthorId(e.target.value)}
                    required
                    style={styles.input}
                />
                <label style={styles.label}>Date:</label>
                <input 
                    type="date" 
                    value={date} 
                    onChange={(e) => setDate(e.target.value)} 
                    required 
                    style={styles.input}
                />
                <button 
                    type="submit" 
                    style={styles.button}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.button.backgroundColor}
                >
                    Add Report
                </button>
            </form>
        </div>
    );
}

export default AddReport;

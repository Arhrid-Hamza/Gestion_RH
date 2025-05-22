import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchReports, fetchEmployees } from "../config/action";
import { Link, useNavigate } from "react-router-dom";
import jsPDF from 'jspdf';

function Reports() {
    const reports = useSelector(state => state.reports);
    const employees = useSelector(state => state.employees);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchReports());
        dispatch(fetchEmployees());
    }, [dispatch]);

    const getEmployeeName = (employeeId) => {
        const emp = employees.find(e => e.id === employeeId);
        return emp ? emp.name : employeeId;
    };

    const styles = {
        container: {
            maxWidth: '900px',
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

    const generatePDF = (report) => {
        const doc = new jsPDF();

        doc.setFontSize(18);
        doc.text(report.title, 10, 20);

        doc.setFontSize(12);
        const description = report.content || '';
        doc.text(description, 10, 30);

        doc.save(`${report.title}.pdf`);
    };

    return (
        <div style={styles.container}>
            <div style={styles.buttonContainer}>
                <Link to="/add-report">
                    <button style={styles.button}>Add Report</button>
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
                        <th style={styles.th}>Title</th>
                        <th style={styles.th}>Content</th>
                        <th style={styles.th}>Author ID</th>
                        <th style={styles.th}>Date</th>
                        <th style={styles.th}>Employee Responsible</th>
                        <th style={styles.th}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {reports.map((report) => (
                        <tr key={report.id}>
                            <td style={styles.td}>{report.id}</td>
                            <td style={styles.td}>{report.title}</td>
                            <td style={styles.td}>{report.content}</td>
                            <td style={styles.td}>{report.authorId}</td>
                            <td style={styles.td}>{report.date ? new Date(report.date).toLocaleDateString() : ''}</td>
                            <td style={styles.td}>{getEmployeeName(report.employeeResponsible)}</td>
                            <td>
                                <Link to={`/update-report/${report.id}`}>
                                    <button style={styles.editButton}>Edit</button>
                                </Link>
                                <button
                                    style={{ ...styles.editButton, marginLeft: '10px', backgroundColor: '#007bff' }}
                                    onClick={() => generatePDF(report)}
                                >
                                    Generate PDF
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Reports;

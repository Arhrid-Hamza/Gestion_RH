import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchReportById, updateReport } from '../config/action';

function UpdateReport() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const report = useSelector(state => 
        state.reports.find(r => r.id === parseInt(id))
    );

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [authorId, setAuthorId] = useState('');
    const [date, setDate] = useState('');
    const [employeeResponsible, setEmployeeResponsible] = useState('');

    useEffect(() => {
        if (!report) {
            dispatch(fetchReportById(id));
        } else {
            setTitle(report.title || '');
            setContent(report.content || '');
            setAuthorId(report.authorId || '');
            setDate(report.date ? new Date(report.date).toISOString().substr(0,10) : '');
            setEmployeeResponsible(report.employeeResponsible || '');
        }
    }, [dispatch, id, report]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedReport = {
            id: parseInt(id),
            title,
            content,
            authorId,
            date: new Date(date),
            employeeResponsible,
        };
        dispatch(updateReport(updatedReport));
        navigate('/reports');
    };

    return (
        <div style={{ maxWidth: '600px', margin: '20px auto', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
            <h2>Update Report</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '10px' }}>
                    <label>Title:</label><br />
                    <input type="text" value={title} onChange={e => setTitle(e.target.value)} required style={{ width: '100%', padding: '8px' }} />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Content:</label><br />
                    <textarea value={content} onChange={e => setContent(e.target.value)} required style={{ width: '100%', padding: '8px', height: '100px' }} />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Author ID:</label><br />
                    <input type="number" value={authorId} onChange={e => setAuthorId(e.target.value)} required style={{ width: '100%', padding: '8px' }} />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Date:</label><br />
                    <input type="date" value={date} onChange={e => setDate(e.target.value)} required style={{ width: '100%', padding: '8px' }} />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Employee Responsible (ID):</label><br />
                    <input type="text" value={employeeResponsible} onChange={e => setEmployeeResponsible(e.target.value)} required style={{ width: '100%', padding: '8px' }} />
                </div>
                <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#2e7d32', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                    Update Report
                </button>
                <button type="button" onClick={() => navigate('/reports')} style={{ marginLeft: '10px', padding: '10px 20px', backgroundColor: '#888', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                    Cancel
                </button>
            </form>
        </div>
    );
}

export default UpdateReport;

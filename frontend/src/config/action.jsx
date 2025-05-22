import axios from 'axios';

// User Actions
export const fetchUsers = () => async (dispatch) => {
    try {
        const response = await axios.get('http://localhost:5000/api/users');
        dispatch({ type: 'FETCH_USERS', payload: response.data });
    } catch (error) {
        console.error('Failed to fetch users:', error);
    }
};

export const AddUserAction = (user) => async (dispatch) => {
    try {
        const response = await axios.post('http://localhost:5000/api/users', user);
        dispatch({ type: 'ADD_USER', payload: response.data });
    } catch (error) {
        console.error('Failed to add user:', error);
    }
};

export const DeleteUserAction = (id) => async (dispatch) => {
    try {
        await axios.delete(`http://localhost:5000/api/users/${id}`);
        dispatch({ type: 'DELETE_USER', payload: id });
    } catch (error) {
        console.error('Failed to delete user:', error);
    }
};

export const UpdateUserAction = (id, user) => async (dispatch) => {
    try {
        const response = await axios.put(`http://localhost:5000/api/users/${id}`, user);
        dispatch({ type: 'UPDATE_USER', payload: response.data });
    } catch (error) {
        console.error('Failed to update user:', error);
    }
};

// Department Actions
export const fetchDepartments = () => async (dispatch) => {
    try {
        const response = await axios.get('http://localhost:5000/api/departments');
        dispatch({ type: 'FETCH_DEPARTMENTS', payload: response.data });
    } catch (error) {
        console.error('Failed to fetch departments:', error);
    }
};

export const AddDepartmentAction = (department) => async (dispatch) => {
    try {
        const response = await axios.post('http://localhost:5000/api/departments', department);
        dispatch({ type: 'ADD_DEPARTMENT', payload: response.data });
    } catch (error) {
        console.error('Failed to add department:', error);
    }
};

export const DeleteDepartmentAction = (id) => async (dispatch) => {
    try {
        await axios.delete(`http://localhost:5000/api/departments/${id}`);
        dispatch({ type: 'DELETE_DEPARTMENT', payload: id });
    } catch (error) {
        console.error('Failed to delete department:', error);
    }
};

export const UpdateDepartmentAction = (id, department) => async (dispatch) => {
    try {
        const response = await axios.put(`http://localhost:5000/api/departments/${id}`, department);
        dispatch({ type: 'UPDATE_DEPARTMENT', payload: response.data });
    } catch (error) {
        console.error('Failed to update department:', error);
    }
};

// Employee Actions
export const fetchEmployees = () => async (dispatch) => {
    try {
        const response = await axios.get('http://localhost:5000/api/employees');
        dispatch({ type: 'FETCH_EMPLOYEES', payload: response.data });
    } catch (error) {
        console.error('Failed to fetch employees:', error);
    }
};

export const AddEmployeeAction = (employee) => async (dispatch) => {
    try {
        const response = await axios.post('http://localhost:5000/api/employees', employee);
        dispatch({ type: 'ADD_EMPLOYEE', payload: response.data });
    } catch (error) {
        console.error('Failed to add employee:', error);
    }
};

export const DeleteEmployeeAction = (id) => async (dispatch) => {
    try {
        await axios.delete(`http://localhost:5000/api/employees/${id}`);
        dispatch({ type: 'DELETE_EMPLOYEE', payload: id });
    } catch (error) {
        console.error('Failed to delete employee:', error);
    }
};

export const UpdateEmployeeAction = (id, employee) => async (dispatch) => {
    try {
        // Get user info from localStorage for headers
        const userId = localStorage.getItem('userId');
        const userRole = localStorage.getItem('userRole');

        const response = await axios.put(
            `http://localhost:5000/api/employees/${id}`,
            employee,
            {
                headers: {
                    'x-user-id': userId,
                    'x-user-role': userRole,
                },
            }
        );
        dispatch({ type: 'UPDATE_EMPLOYEE', payload: response.data });
    } catch (error) {
        console.error('Failed to update employee:', error);
    }
};

// Project Actions
export const fetchProjects = () => async (dispatch) => {
    try {
        const response = await axios.get('http://localhost:5000/api/projects');
        dispatch({ type: 'FETCH_PROJECTS', payload: response.data });
    } catch (error) {
        console.error('Failed to fetch projects:', error);
    }
};

export const addProjectAction = (project) => async (dispatch) => {
    try {
        const response = await axios.post('http://localhost:5000/api/projects', project);
        dispatch({ type: 'ADD_PROJECT', payload: response.data });
    } catch (error) {
        console.error('Failed to add project:', error);
    }
};

export const DeleteProjectAction = (id) => async (dispatch) => {
    try {
        await axios.delete(`http://localhost:5000/api/projects/${id}`);
        dispatch({ type: 'DELETE_PROJECT', payload: id });
    } catch (error) {
        console.error('Failed to delete project:', error);
    }
};

export const UpdateProjectAction = (id, project) => async (dispatch) => {
    try {
        const response = await axios.put(`http://localhost:5000/api/projects/${id}`, project);
        dispatch({ type: 'UPDATE_PROJECT', payload: response.data });
    } catch (error) {
        console.error('Failed to update project:', error);
    }
};

// Report Actions
export const fetchReports = () => async (dispatch) => {
    try {
        const response = await axios.get('http://localhost:5000/api/reports');
        dispatch({ type: 'FETCH_REPORTS', payload: response.data });
    } catch (error) {
        console.error('Failed to fetch reports:', error);
    }
};

export const AddReportAction = (report) => async (dispatch) => {
    try {
        const response = await axios.post('http://localhost:5000/api/reports', report);
        dispatch({ type: 'ADD_REPORT', payload: response.data });
    } catch (error) {
        console.error('Failed to add report:', error);
    }
};

export const DeleteReportAction = (id) => async (dispatch) => {
    try {
        await axios.delete(`http://localhost:5000/api/reports/${id}`);
        dispatch({ type: 'DELETE_REPORT', payload: id });
    } catch (error) {
        console.error('Failed to delete report:', error);
    }
};

export const UpdateReportAction = (id, report) => async (dispatch) => {
    try {
        const response = await axios.put(`http://localhost:5000/api/reports/${id}`, report);
        dispatch({ type: 'UPDATE_REPORT', payload: response.data });
    } catch (error) {
        console.error('Failed to update report:', error);
    }
};

// Authentication Actions
export const loginSuccess = (user) => ({
    type: 'LOGIN_SUCCESS',
    payload: user,
});

export const logout = () => ({
    type: 'LOGOUT',
});

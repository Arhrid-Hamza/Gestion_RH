import axios from 'axios';

export const fetchUsers = () => async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:5000/api/users');
    dispatch({ type: 'FETCH_USERS', payload: response.data });
  } catch (error) {
    console.error('Failed to fetch users (mobile):', error);
  }
};

export const fetchEmployees = () => async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:5000/api/employees');
    dispatch({ type: 'FETCH_EMPLOYEES', payload: response.data });
  } catch (error) {
    console.error('Failed to fetch employees (mobile):', error);
  }
};

export const fetchProjects = () => async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:5000/api/projects');
    dispatch({ type: 'FETCH_PROJECTS', payload: response.data });
  } catch (error) {
    console.error('Failed to fetch projects (mobile):', error);
  }
};

export const fetchDepartments = () => async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:5000/api/departments');
    dispatch({ type: 'FETCH_DEPARTMENTS', payload: response.data });
  } catch (error) {
    console.error('Failed to fetch departments (mobile):', error);
  }
};

export const fetchReports = () => async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:5000/api/reports');
    dispatch({ type: 'FETCH_REPORTS', payload: response.data });
  } catch (error) {
    console.error('Failed to fetch reports (mobile):', error);
  }
};

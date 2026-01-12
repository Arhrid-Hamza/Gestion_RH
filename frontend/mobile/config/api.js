// API Configuration for Mobile App
// Update the LOCAL_IP with your computer's IP address to connect from your phone

// TO FIND YOUR LOCAL IP ADDRESS:
// Windows: Run 'ipconfig' in PowerShell (look for IPv4 Address)
// Mac: Run 'ifconfig | grep inet' in Terminal  
// Linux: Run 'hostname -I' in Terminal

// IMPORTANT: Your phone and computer must be on the same WiFi network!

// UPDATE THIS WITH YOUR LOCAL IP ADDRESS
const LOCAL_IP = 'localhost'; // Change to your IP, e.g., '192.168.1.100'
const PORT = '5000';

// Determine API base URL based on environment
const API_BASE_URL = __DEV__ 
  ? `http://${LOCAL_IP}:${PORT}/api`
  : 'https://your-production-api.com/api'; // Update for production

// API Endpoints
export const API_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/login`,
  USERS: `${API_BASE_URL}/users`,
  EMPLOYEES: `${API_BASE_URL}/employees`,
  DEPARTMENTS: `${API_BASE_URL}/departments`,
  PROJECTS: `${API_BASE_URL}/projects`,
  REPORTS: `${API_BASE_URL}/reports`,
};

// Helper function to build full URL
export const getApiUrl = (endpoint) => {
  return API_ENDPOINTS[endpoint] || `${API_BASE_URL}/${endpoint}`;
};

// Export base URL for custom requests
export { API_BASE_URL };

// Usage example:
// import { API_ENDPOINTS } from './config/api';
// fetch(API_ENDPOINTS.LOGIN, { method: 'POST', ... });

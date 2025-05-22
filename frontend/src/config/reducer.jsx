const initialState = {
    users: [],
    departments: [],
    employees: [],
    projects: [],
    reports: [],
};

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'FETCH_USERS':
            return { ...state, users: action.payload };
        case 'ADD_USER':
            return { ...state, users: [...state.users, action.payload] };
        case 'UPDATE_USER':
            return {
                ...state,
                users: state.users.map(user =>
                    user.id === action.payload.id ? action.payload : user
                ),
            };
        case 'DELETE_USER':
            return {
                ...state,
                users: state.users.filter(user => user.id !== action.payload),
            };

        case 'FETCH_DEPARTMENTS':
            return { ...state, departments: action.payload };
        case 'ADD_DEPARTMENT':
            return { ...state, departments: [...state.departments, action.payload] };
        case 'UPDATE_DEPARTMENT':
            return {
                ...state,
                departments: state.departments.map(dept =>
                    dept.id === action.payload.id ? action.payload : dept
                ),
            };
        case 'DELETE_DEPARTMENT':
            return {
                ...state,
                departments: state.departments.filter(dept => dept.id !== action.payload),
            };

        case 'FETCH_EMPLOYEES':
            return { ...state, employees: action.payload };
        case 'ADD_EMPLOYEE':
            return { ...state, employees: [...state.employees, action.payload] };
        case 'UPDATE_EMPLOYEE':
            return {
                ...state,
                employees: state.employees.map(emp =>
                    emp.id === action.payload.id ? action.payload : emp
                ),
            };
        case 'DELETE_EMPLOYEE':
            return {
                ...state,
                employees: state.employees.filter(emp => emp.id !== action.payload),
            };

        case 'FETCH_PROJECTS':
            return { ...state, projects: action.payload };
        case 'ADD_PROJECT':
            return { ...state, projects: [...state.projects, action.payload] };
        case 'UPDATE_PROJECT':
            return {
                ...state,
                projects: state.projects.map(proj =>
                    proj.id === action.payload.id ? action.payload : proj
                ),
            };
        case 'DELETE_PROJECT':
            return {
                ...state,
                projects: state.projects.filter(proj => proj.id !== action.payload),
            };

        case 'FETCH_REPORTS':
            return { ...state, reports: action.payload };
        case 'ADD_REPORT':
            return { ...state, reports: [...state.reports, action.payload] };
        case 'UPDATE_REPORT':
            return {
                ...state,
                reports: state.reports.map(rep =>
                    rep.id === action.payload.id ? action.payload : rep
                ),
            };
        case 'DELETE_REPORT':
            return {
                ...state,
                reports: state.reports.filter(rep => rep.id !== action.payload),
            };

        default:
            return state;
    }
}

export default rootReducer;

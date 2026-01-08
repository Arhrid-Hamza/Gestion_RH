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
        users: state.users.map((user) => (user.id === action.payload.id ? action.payload : user)),
      };
    case 'DELETE_USER':
      return { ...state, users: state.users.filter((user) => user.id !== action.payload) };

    case 'FETCH_DEPARTMENTS':
      return { ...state, departments: action.payload };
    case 'FETCH_EMPLOYEES':
      return { ...state, employees: action.payload };
    case 'FETCH_PROJECTS':
      return { ...state, projects: action.payload };
    case 'FETCH_REPORTS':
      return { ...state, reports: action.payload };

    default:
      return state;
  }
}

export default rootReducer;

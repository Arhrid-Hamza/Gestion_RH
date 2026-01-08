import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider, AuthContext } from './auth/AuthContext';
import { Provider } from 'react-redux';
import store from './store/store';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import AdminDashboard from './screens/AdminDashboard';
import UserDashboard from './screens/UserDashboard';
import UserList from './screens/UserList';
import EmployeeList from './screens/EmployeeList';
import ProjectList from './screens/ProjectList';
import DepartmentList from './screens/DepartmentList';
import ReportsScreen from './screens/ReportsScreen';
import SettingsScreen from './screens/SettingsScreen';
import AddUser from './screens/AddUser';
import AddEmployee from './screens/AddEmployee';
import AddProject from './screens/AddProject';
import AddDepartment from './screens/AddDepartment';
import AddReport from './screens/AddReport';
import UpdateUser from './screens/UpdateUser';
import UpdateEmployee from './screens/UpdateEmployee';
import UpdateProject from './screens/UpdateProject';
import UpdateDepartment from './screens/UpdateDepartment';
import UpdateReport from './screens/UpdateReport';

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
}

function AppStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
      <Stack.Screen name="UserDashboard" component={UserDashboard} />
      <Stack.Screen name="UserList" component={UserList} />
      <Stack.Screen name="EmployeeList" component={EmployeeList} />
      <Stack.Screen name="ProjectList" component={ProjectList} />
      <Stack.Screen name="DepartmentList" component={DepartmentList} />
      <Stack.Screen name="Reports" component={ReportsScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="AddUser" component={AddUser} />
      <Stack.Screen name="AddEmployee" component={AddEmployee} />
      <Stack.Screen name="AddProject" component={AddProject} />
      <Stack.Screen name="AddDepartment" component={AddDepartment} />
      <Stack.Screen name="AddReport" component={AddReport} />
      <Stack.Screen name="UpdateUser" component={UpdateUser} />
      <Stack.Screen name="UpdateEmployee" component={UpdateEmployee} />
      <Stack.Screen name="UpdateProject" component={UpdateProject} />
      <Stack.Screen name="UpdateDepartment" component={UpdateDepartment} />
      <Stack.Screen name="UpdateReport" component={UpdateReport} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <NavigationContainer>
          <AuthContext.Consumer>
            {({ user }) => (user ? <AppStack /> : <AuthStack />)}
          </AuthContext.Consumer>
        </NavigationContainer>
      </AuthProvider>
    </Provider>
  );
}

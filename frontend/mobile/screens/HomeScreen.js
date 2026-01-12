import React, { useContext } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { AuthContext } from '../auth/AuthContext';
import { useTheme } from '../context/ThemeContext';

export default function HomeScreen({ navigation }) {
  const { user, signOut } = useContext(AuthContext);
  const { theme } = useTheme();

  const handleLogout = async () => {
    await signOut();
    navigation.replace('Login');
  };

  const features = [
    '✔️ Manage Users and Employees',
    '✔️ Organize Departments and Projects',
    '✔️ Generate and View Reports',
    '✔️ User-Friendly Interface',
    '✔️ Secure Authentication',
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.secondary }]}>
      <View style={[styles.navbar, { backgroundColor: theme.colors.card }]}>
        <Text style={[styles.title, { color: theme.colors.primary }]}>HR Management</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={[styles.logoutBtn, { color: theme.colors.primary }]}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={[styles.mainTitle, { color: theme.colors.text }]}>Welcome to the HR Management System</Text>
        <Text style={[styles.description, { color: theme.colors.textLight }]}>
          Your one-stop solution for managing human resources efficiently and effectively. This application allows you to manage users, employees, departments, projects, and reports seamlessly.
        </Text>

        <View style={styles.featureList}>
          {features.map((feature, index) => (
            <Text key={index} style={[styles.featureItem, { color: theme.colors.text }]}>
              {feature}
            </Text>
          ))}
        </View>

        <View style={styles.dashboardButtons}>
          {user?.role === 'admin' ? (
            <>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: theme.colors.primary }]}
                onPress={() => navigation.navigate('AdminDashboard')}
              >
                <Text style={styles.buttonText}>📊 Admin Dashboard</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.secondaryButton, { backgroundColor: theme.colors.card, borderColor: theme.colors.primary }]}
                onPress={() => navigation.navigate('UserDashboard')}
              >
                <Text style={[styles.secondaryButtonText, { color: theme.colors.primary }]}>👤 User Dashboard</Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity
              style={[styles.button, { backgroundColor: theme.colors.primary }]}
              onPress={() => navigation.navigate('UserDashboard')}
            >
              <Text style={styles.buttonText}>👤 User Dashboard</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navbar: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  logoutBtn: {
    fontWeight: '600',
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  mainTitle: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 15,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  featureList: {
    marginBottom: 20,
  },
  featureItem: {
    fontSize: 14,
    marginVertical: 10,
  },
  dashboardButtons: {
    width: '100%',
    gap: 15,
    marginTop: 20,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
  },
  secondaryButton: {
    borderWidth: 2,
  },
  secondaryButtonText: {
    fontWeight: '600',
    fontSize: 16,
  },
});

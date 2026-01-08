import React, { useContext } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { AuthContext } from '../auth/AuthContext';
import { theme } from '../theme';

export default function HomeScreen({ navigation }) {
  const { user, signOut } = useContext(AuthContext);

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
    <ScrollView style={styles.container}>
      <View style={styles.navbar}>
        <Text style={styles.title}>HR Management</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.logoutBtn}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.mainTitle}>Welcome to the HR Management System</Text>
        <Text style={styles.description}>
          Your one-stop solution for managing human resources efficiently and effectively. This application allows you to manage users, employees, departments, projects, and reports seamlessly.
        </Text>

        <View style={styles.featureList}>
          {features.map((feature, index) => (
            <Text key={index} style={styles.featureItem}>
              {feature}
            </Text>
          ))}
        </View>

        <View style={styles.dashboardButtons}>
          {user?.role === 'admin' ? (
            <>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('AdminDashboard')}
              >
                <Text style={styles.buttonText}>📊 Admin Dashboard</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.secondaryButton]}
                onPress={() => navigation.navigate('UserDashboard')}
              >
                <Text style={styles.secondaryButtonText}>👤 User Dashboard</Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity
              style={styles.button}
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
    backgroundColor: theme.colors.secondary,
  },
  navbar: {
    backgroundColor: theme.colors.white,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: theme.colors.primary,
  },
  logoutBtn: {
    color: theme.colors.primary,
    fontWeight: '600',
  },
  content: {
    padding: theme.spacing.lg,
    alignItems: 'center',
  },
  mainTitle: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: theme.spacing.md,
    color: theme.colors.text,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: theme.colors.textLight,
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
    lineHeight: 22,
  },
  featureList: {
    marginBottom: theme.spacing.lg,
  },
  featureItem: {
    fontSize: 14,
    marginVertical: theme.spacing.sm,
    color: theme.colors.text,
  },
  dashboardButtons: {
    width: '100%',
    gap: theme.spacing.md,
    marginTop: theme.spacing.lg,
  },
  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
  },
  buttonText: {
    color: theme.colors.white,
    fontWeight: '600',
    fontSize: 16,
  },
  secondaryButton: {
    backgroundColor: theme.colors.white,
    borderWidth: 2,
    borderColor: theme.colors.primary,
  },
  secondaryButtonText: {
    color: theme.colors.primary,
    fontWeight: '600',
    fontSize: 16,
  },
});

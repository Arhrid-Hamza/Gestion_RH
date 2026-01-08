import React, { useContext } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { AuthContext } from '../auth/AuthContext';
import { theme } from '../theme';

const DashboardCard = ({ title, description, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <Text style={styles.cardTitle}>{title}</Text>
    <Text style={styles.cardDescription}>{description}</Text>
  </TouchableOpacity>
);

export default function AdminDashboard({ navigation }) {
  const { signOut } = useContext(AuthContext);

  const handleLogout = async () => {
    await signOut();
    navigation.replace('Login');
  };

  const cards = [
    {
      title: 'Users',
      description: 'Manage all user accounts and permissions.',
      onPress: () => navigation.navigate('UserList'),
    },
    {
      title: 'Employees',
      description: 'Manage employee records and details.',
      onPress: () => navigation.navigate('EmployeeList'),
    },
    {
      title: 'Departments',
      description: 'Organize and manage departments.',
      onPress: () => navigation.navigate('DepartmentList'),
    },
    {
      title: 'Projects',
      description: 'Track and manage ongoing projects.',
      onPress: () => navigation.navigate('ProjectList'),
    },
    {
      title: 'Reports',
      description: 'Generate and view reports.',
      onPress: () => navigation.navigate('Reports'),
    },
    {
      title: 'Settings',
      description: 'Manage system settings and preferences.',
      onPress: () => navigation.navigate('Settings'),
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.navbar}>
        <Text style={styles.navTitle}>Admin Dashboard</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.logoutBtn}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.contentPadding}>
        <View style={styles.cardGrid}>
          {cards.map((card, index) => (
            <DashboardCard
              key={index}
              title={card.title}
              description={card.description}
              onPress={card.onPress}
            />
          ))}
        </View>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('AddUser')}
        >
          <Text style={styles.addButtonText}>+ Add New User</Text>
        </TouchableOpacity>
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
    marginBottom: theme.spacing.lg,
  },
  navTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: theme.colors.primary,
  },
  logoutBtn: {
    color: theme.colors.primary,
    fontWeight: '600',
    fontSize: 14,
  },
  contentPadding: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.lg,
  },
  cardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.primary,
    marginBottom: theme.spacing.sm,
  },
  cardDescription: {
    fontSize: 13,
    color: theme.colors.textLight,
    lineHeight: 18,
  },
  addButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    marginTop: theme.spacing.lg,
  },
  addButtonText: {
    color: theme.colors.white,
    fontWeight: '600',
    fontSize: 16,
  },
});

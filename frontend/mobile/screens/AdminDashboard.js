import React, { useContext } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { AuthContext } from '../auth/AuthContext';
import { useTheme, theme as staticTheme } from '../context/ThemeContext';

const DashboardCard = ({ title, description, onPress, theme }) => (
  <TouchableOpacity style={[styles.card, { backgroundColor: theme.colors.card, shadowColor: theme.colors.shadow }]} onPress={onPress}>
    <Text style={[styles.cardTitle, { color: theme.colors.primary }]}>{title}</Text>
    <Text style={[styles.cardDescription, { color: theme.colors.textLight }]}>{description}</Text>
  </TouchableOpacity>
);

export default function AdminDashboard({ navigation }) {
  const { signOut } = useContext(AuthContext);
  const { theme } = useTheme();

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
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.secondary }]}>
      <View style={[styles.navbar, { backgroundColor: theme.colors.card }]}>
        <Text style={[styles.navTitle, { color: theme.colors.primary }]}>Admin Dashboard</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={[styles.logoutBtn, { color: theme.colors.primary }]}>Logout</Text>
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
              theme={theme}
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
    backgroundColor: staticTheme.colors.secondary,
  },
  navbar: {
    backgroundColor: staticTheme.colors.card,
    paddingVertical: staticTheme.spacing.md,
    paddingHorizontal: staticTheme.spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: staticTheme.colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: staticTheme.spacing.lg,
  },
  navTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: staticTheme.colors.primary,
  },
  logoutBtn: {
    color: staticTheme.colors.primary,
    fontWeight: '600',
    fontSize: 14,
  },
  contentPadding: {
    paddingHorizontal: staticTheme.spacing.lg,
    paddingBottom: staticTheme.spacing.lg,
  },
  cardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: staticTheme.colors.card,
    borderRadius: staticTheme.borderRadius.lg,
    padding: staticTheme.spacing.lg,
    marginBottom: staticTheme.spacing.lg,
    shadowColor: staticTheme.colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: staticTheme.colors.primary,
    marginBottom: staticTheme.spacing.sm,
  },
  cardDescription: {
    fontSize: 13,
    color: staticTheme.colors.textLight,
    lineHeight: 18,
  },
  addButton: {
    backgroundColor: staticTheme.colors.primary,
    paddingVertical: staticTheme.spacing.md,
    paddingHorizontal: staticTheme.spacing.lg,
    borderRadius: staticTheme.borderRadius.md,
    alignItems: 'center',
    marginTop: staticTheme.spacing.lg,
  },
  addButtonText: {
    color: staticTheme.colors.white,
    fontWeight: '600',
    fontSize: 16,
  },
});

import React, { useContext } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { AuthContext } from '../auth/AuthContext';
import { theme } from '../theme';

const DashboardOption = ({ title, description, onPress }) => (
  <TouchableOpacity style={styles.optionCard} onPress={onPress}>
    <Text style={styles.optionTitle}>{title}</Text>
    <Text style={styles.optionDescription}>{description}</Text>
  </TouchableOpacity>
);

export default function UserDashboard({ navigation }) {
  const { signOut, user } = useContext(AuthContext);

  const handleLogout = async () => {
    await signOut();
    navigation.replace('Login');
  };

  const options = [
    {
      title: 'My Profile',
      description: 'View and edit your profile information.',
      onPress: () => navigation.navigate('Profile'),
    },
    {
      title: 'Projects',
      description: 'View all projects and assignments.',
      onPress: () => navigation.navigate('ProjectList'),
    },
    {
      title: 'Reports',
      description: 'View and download your reports.',
      onPress: () => navigation.navigate('Reports'),
    },
    {
      title: 'Settings',
      description: 'Manage your account settings.',
      onPress: () => navigation.navigate('Settings'),
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.navbar}>
        <Text style={styles.navTitle}>User Dashboard</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.logoutBtn}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.greeting}>
          <Text style={styles.greetingText}>Welcome, {user?.name || 'User'}!</Text>
        </View>

        <View style={styles.optionsGrid}>
          {options.map((option, index) => (
            <DashboardOption
              key={index}
              title={option.title}
              description={option.description}
              onPress={option.onPress}
            />
          ))}
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
  content: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.lg,
  },
  greeting: {
    backgroundColor: theme.colors.white,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.lg,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  greetingText: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.primary,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  optionCard: {
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
  optionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.primary,
    marginBottom: theme.spacing.sm,
  },
  optionDescription: {
    fontSize: 13,
    color: theme.colors.textLight,
    lineHeight: 18,
  },
});

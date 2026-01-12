import React, { useContext } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { AuthContext } from '../auth/AuthContext';
import { useTheme, theme as staticTheme } from '../context/ThemeContext';

const DashboardOption = ({ title, description, onPress, theme }) => (
  <TouchableOpacity style={[styles.optionCard, { backgroundColor: theme.colors.card, shadowColor: theme.colors.shadow }]} onPress={onPress}>
    <Text style={[styles.optionTitle, { color: theme.colors.primary }]}>{title}</Text>
    <Text style={[styles.optionDescription, { color: theme.colors.textLight }]}>{description}</Text>
  </TouchableOpacity>
);

export default function UserDashboard({ navigation }) {
  const { signOut, user } = useContext(AuthContext);
  const { theme } = useTheme();

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
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.secondary }]}>
      <View style={[styles.navbar, { backgroundColor: theme.colors.card }]}>
        <Text style={[styles.navTitle, { color: theme.colors.primary }]}>User Dashboard</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={[styles.logoutBtn, { color: theme.colors.primary }]}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={[styles.greeting, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.greetingText, { color: theme.colors.text }]}>Welcome, {user?.name || 'User'}!</Text>
        </View>

        <View style={styles.optionsGrid}>
          {options.map((option, index) => (
            <DashboardOption
              key={index}
              title={option.title}
              description={option.description}
              onPress={option.onPress}
              theme={theme}
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
  content: {
    paddingHorizontal: staticTheme.spacing.lg,
    paddingBottom: staticTheme.spacing.lg,
  },
  greeting: {
    backgroundColor: staticTheme.colors.card,
    padding: staticTheme.spacing.lg,
    borderRadius: staticTheme.borderRadius.lg,
    marginBottom: staticTheme.spacing.lg,
    shadowColor: staticTheme.colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  greetingText: {
    fontSize: 18,
    fontWeight: '700',
    color: staticTheme.colors.primary,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  optionCard: {
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
  optionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: staticTheme.colors.primary,
    marginBottom: staticTheme.spacing.sm,
  },
  optionDescription: {
    fontSize: 13,
    color: staticTheme.colors.textLight,
    lineHeight: 18,
  },
});

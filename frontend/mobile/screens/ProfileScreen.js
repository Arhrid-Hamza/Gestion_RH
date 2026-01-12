import React, { useContext, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { AuthContext } from '../auth/AuthContext';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../store/actions';
import { useTheme, theme as staticTheme } from '../context/ThemeContext';

export default function ProfileScreen({ navigation }) {
  const { theme } = useTheme();
  const { user, signOut } = useContext(AuthContext);
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users || []);

  useEffect(() => {
    if (users.length === 0) {
      dispatch(fetchUsers());
    }
  }, [dispatch, users.length]);

  const userEmail = user?.email;
  const userProfile = users.find((u) => u.email === userEmail) || user || {};

  const handleLogout = async () => {
    await signOut();
    navigation.replace('Login');
  };

  const handleEditProfile = () => {
    if (userProfile.id) {
      navigation.navigate('UpdateUser', { userId: userProfile.id });
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.secondary }]}>
      <View style={[styles.header, { backgroundColor: theme.colors.card, shadowColor: theme.colors.shadow }]}>
        <Text style={[styles.headerTitle, { color: theme.colors.primary }]}>Profile</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={[styles.logoutBtn, { color: theme.colors.primary }]}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={[styles.profileCard, { backgroundColor: theme.colors.card, shadowColor: theme.colors.shadow }]}>
          <View style={[styles.avatarContainer, { backgroundColor: theme.colors.primary }]}>
            <Text style={[styles.avatar, { color: theme.colors.white }]}>{userProfile.name?.[0] || 'U'}</Text>
          </View>

          <View style={styles.profileInfo}>
            <Text style={[styles.profileName, { color: theme.colors.text }]}>{userProfile.name || 'N/A'}</Text>
            <Text style={[styles.profileEmail, { color: theme.colors.textLight }]}>{userProfile.email || 'N/A'}</Text>
          </View>
        </View>

        <View style={[styles.detailsContainer, { backgroundColor: theme.colors.card, shadowColor: theme.colors.shadow }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>Account Details</Text>

          <View style={[styles.detailRow, { borderBottomColor: theme.colors.border }]}>
            <Text style={[styles.detailLabel, { color: theme.colors.primary }]}>ID</Text>
            <Text style={[styles.detailValue, { color: theme.colors.text }]}>{userProfile.id || 'N/A'}</Text>
          </View>

          <View style={[styles.detailRow, { borderBottomColor: theme.colors.border }]}>
            <Text style={[styles.detailLabel, { color: theme.colors.primary }]}>Name</Text>
            <Text style={[styles.detailValue, { color: theme.colors.text }]}>{userProfile.name || 'N/A'}</Text>
          </View>

          <View style={[styles.detailRow, { borderBottomColor: theme.colors.border }]}>
            <Text style={[styles.detailLabel, { color: theme.colors.primary }]}>Email</Text>
            <Text style={[styles.detailValue, { color: theme.colors.text }]}>{userProfile.email || 'N/A'}</Text>
          </View>

          <View style={[styles.detailRow, { borderBottomColor: theme.colors.border }]}>
            <Text style={[styles.detailLabel, { color: theme.colors.primary }]}>Role</Text>
            <View style={[styles.roleContainer, { backgroundColor: theme.colors.primary }]}>
              <Text style={[styles.roleText, { color: theme.colors.white }]}>{userProfile.role || 'N/A'}</Text>
            </View>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, { backgroundColor: theme.colors.primary }]} onPress={handleEditProfile}>
            <Text style={[styles.buttonText, { color: theme.colors.white }]}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.backButton, { backgroundColor: theme.colors.border }]} onPress={() => navigation.goBack()}>
            <Text style={[styles.backButtonText, { color: theme.colors.primary }]}>Back</Text>
          </TouchableOpacity>
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
  header: {
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
  headerTitle: {
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
  profileCard: {
    backgroundColor: staticTheme.colors.card,
    borderRadius: staticTheme.borderRadius.lg,
    padding: staticTheme.spacing.lg,
    marginBottom: staticTheme.spacing.lg,
    alignItems: 'center',
    shadowColor: staticTheme.colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: staticTheme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: staticTheme.spacing.md,
  },
  avatar: {
    fontSize: 36,
    fontWeight: '700',
    color: staticTheme.colors.white,
  },
  profileInfo: {
    alignItems: 'center',
  },
  profileName: {
    fontSize: 22,
    fontWeight: '700',
    color: staticTheme.colors.text,
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: staticTheme.colors.textLight,
  },
  detailsContainer: {
    backgroundColor: staticTheme.colors.card,
    borderRadius: staticTheme.borderRadius.lg,
    padding: staticTheme.spacing.lg,
    marginBottom: staticTheme.spacing.lg,
    shadowColor: staticTheme.colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: staticTheme.colors.primary,
    marginBottom: staticTheme.spacing.md,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: staticTheme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: staticTheme.colors.primary,
  },
  detailValue: {
    fontSize: 14,
    color: staticTheme.colors.text,
  },
  roleContainer: {
    backgroundColor: staticTheme.colors.primary,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  roleText: {
    color: staticTheme.colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: staticTheme.spacing.md,
  },
  button: {
    flex: 1,
    backgroundColor: staticTheme.colors.primary,
    paddingVertical: staticTheme.spacing.md,
    borderRadius: staticTheme.borderRadius.md,
    alignItems: 'center',
  },
  backButton: {
    backgroundColor: staticTheme.colors.border,
  },
  buttonText: {
    color: staticTheme.colors.white,
    fontWeight: '600',
    fontSize: 14,
  },
  backButtonText: {
    color: staticTheme.colors.primary,
    fontWeight: '600',
    fontSize: 14,
  },
});

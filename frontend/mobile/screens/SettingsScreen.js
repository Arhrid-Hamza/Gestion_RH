import React, { useContext } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import { AuthContext } from '../auth/AuthContext';
import { useTheme } from '../context/ThemeContext';

const SettingRow = ({ label, value, onPress, theme }) => (
  <TouchableOpacity style={[styles.settingRow, { borderBottomColor: theme.colors.border }]} onPress={onPress}>
    <Text style={[styles.settingLabel, { color: theme.colors.text }]}>{label}</Text>
    <Text style={[styles.settingValue, { color: theme.colors.textLight }]}>{value}</Text>
  </TouchableOpacity>
);

export default function SettingsScreen({ navigation }) {
  const { user, signOut } = useContext(AuthContext);
  const { theme, isDarkMode, toggleDarkMode } = useTheme();
  const [notifications, setNotifications] = React.useState(true);

  const handleLogout = async () => {
    await signOut();
    navigation.replace('Login');
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.secondary }]}>
      <View style={[styles.header, { backgroundColor: theme.colors.card, shadowColor: theme.colors.shadow }]}>
        <Text style={[styles.headerTitle, { color: theme.colors.primary }]}>Settings</Text>
      </View>

      <View style={styles.content}>
        <View style={[styles.section, { backgroundColor: theme.colors.card, shadowColor: theme.colors.shadow }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>Account</Text>
          <SettingRow label="Email" value={user?.email || 'N/A'} onPress={() => {}} theme={theme} />
          <SettingRow label="Role" value={user?.role || 'N/A'} onPress={() => {}} theme={theme} />
          <TouchableOpacity
            style={[styles.settingRow, { borderBottomColor: theme.colors.border }]}
            onPress={() => navigation.navigate('Profile')}
          >
            <Text style={[styles.settingLabel, { color: theme.colors.text }]}>Edit Profile</Text>
            <Text style={[styles.settingAction, { color: theme.colors.textLight }]}>→</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.section, { backgroundColor: theme.colors.card, shadowColor: theme.colors.shadow }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>Preferences</Text>
          <View style={[styles.switchRow, { borderBottomColor: theme.colors.border }]}>
            <Text style={[styles.settingLabel, { color: theme.colors.text }]}>Notifications</Text>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: '#ccc', true: theme.colors.primary }}
              thumbColor={notifications ? theme.colors.primary : '#f4f3f4'}
            />
          </View>
          <View style={[styles.switchRow, { borderBottomColor: theme.colors.border }]}>
            <Text style={[styles.settingLabel, { color: theme.colors.text }]}>Dark Mode</Text>
            <Switch
              value={isDarkMode}
              onValueChange={toggleDarkMode}
              trackColor={{ false: '#ccc', true: theme.colors.primary }}
              thumbColor={isDarkMode ? theme.colors.primary : '#f4f3f4'}
            />
          </View>
        </View>

        <View style={[styles.section, { backgroundColor: theme.colors.card, shadowColor: theme.colors.shadow }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>Security</Text>
          <TouchableOpacity style={[styles.settingRow, { borderBottomColor: theme.colors.border }]} onPress={() => {}}>
            <Text style={[styles.settingLabel, { color: theme.colors.text }]}>Change Password</Text>
            <Text style={[styles.settingAction, { color: theme.colors.textLight }]}>→</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.settingRow, { borderBottomColor: theme.colors.border }]} onPress={() => {}}>
            <Text style={[styles.settingLabel, { color: theme.colors.text }]}>Two-Factor Authentication</Text>
            <Text style={[styles.settingValue, { color: theme.colors.textLight }]}>Disabled</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  section: {
    borderRadius: 12,
    marginBottom: 20,
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 10,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomWidth: 1,
  },
  settingLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  settingValue: {
    fontSize: 14,
  },
  settingAction: {
    fontSize: 18,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomWidth: 1,
  },
  logoutButton: {
    backgroundColor: '#f44336',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
  },
});


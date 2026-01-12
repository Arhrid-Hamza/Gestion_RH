import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { showSuccessAlert, showErrorAlert } from '../utils/alerts';
import { useTheme, theme as staticTheme } from '../context/ThemeContext';

export default function AddUser({ navigation }) {
  const { theme } = useTheme();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    if (!name || !email || !password) {
      showErrorAlert('Validation Error', 'Please fill all fields');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role }),
      });

      if (response.ok) {
        showSuccessAlert('Success', 'User added successfully', () => {
          navigation.goBack();
        });
      } else {
        showErrorAlert('Error', 'Failed to add user');
      }
    } catch (error) {
      showErrorAlert('Error', 'Could not reach server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Add New User</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter user name"
            value={name}
            onChangeText={setName}
            placeholderTextColor={theme.colors.textLight}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter email address"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            placeholderTextColor={theme.colors.textLight}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholderTextColor={theme.colors.textLight}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Role</Text>
          <View style={styles.roleButtons}>
            {['user', 'admin'].map((r) => (
              <TouchableOpacity
                key={r}
                style={[styles.roleButton, role === r && styles.roleButtonActive]}
                onPress={() => setRole(r)}
              >
                <Text style={[styles.roleButtonText, role === r && styles.roleButtonTextActive]}>
                  {r.charAt(0).toUpperCase() + r.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={[styles.button, styles.submitButton, loading && styles.buttonDisabled]}
            onPress={handleAdd}
            disabled={loading}
          >
            <Text style={styles.submitButtonText}>{loading ? 'Adding...' : 'Add User'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => navigation.goBack()}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
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
  form: {
    paddingHorizontal: staticTheme.spacing.lg,
    paddingBottom: staticTheme.spacing.lg,
  },
  formGroup: {
    marginBottom: staticTheme.spacing.lg,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: staticTheme.colors.primary,
    marginBottom: staticTheme.spacing.sm,
  },
  input: {
    borderWidth: 1,
    borderColor: staticTheme.colors.border,
    padding: 12,
    borderRadius: staticTheme.borderRadius.md,
    fontSize: 14,
    color: staticTheme.colors.text,
    backgroundColor: staticTheme.colors.card,
  },
  roleButtons: {
    flexDirection: 'row',
    gap: staticTheme.spacing.md,
  },
  roleButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: staticTheme.borderRadius.md,
    borderWidth: 2,
    borderColor: staticTheme.colors.border,
    alignItems: 'center',
  },
  roleButtonActive: {
    borderColor: staticTheme.colors.primary,
    backgroundColor: staticTheme.colors.primary,
  },
  roleButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: staticTheme.colors.textLight,
  },
  roleButtonTextActive: {
    color: staticTheme.colors.white,
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: staticTheme.spacing.md,
    marginTop: staticTheme.spacing.lg,
  },
  button: {
    flex: 1,
    paddingVertical: staticTheme.spacing.md,
    borderRadius: staticTheme.borderRadius.md,
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: staticTheme.colors.primary,
  },
  submitButtonText: {
    color: staticTheme.colors.white,
    fontWeight: '600',
    fontSize: 14,
  },
  cancelButton: {
    backgroundColor: staticTheme.colors.border,
  },
  cancelButtonText: {
    color: staticTheme.colors.text,
    fontWeight: '600',
    fontSize: 14,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
});

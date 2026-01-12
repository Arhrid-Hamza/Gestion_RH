import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useSelector } from 'react-redux';
import { showSuccessAlert, showErrorAlert } from '../utils/alerts';
import { useTheme, theme as staticTheme } from '../context/ThemeContext';

export default function UpdateEmployee({ navigation, route }) {  const { theme } = useTheme();  const { employeeId } = route.params;
  const employees = useSelector((state) => state.employees || []);
  const employee = employees.find((e) => e.id === employeeId);

  const [name, setName] = useState('');
  const [mail, setMail] = useState('');
  const [role, setRole] = useState('employee');
  const [department, setDepartment] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (employee) {
      setName(employee.name || '');
      setMail(employee.mail || '');
      setRole(employee.role || 'employee');
      setDepartment(employee.department ? String(employee.department) : '');
    }
  }, [employee]);

  const handleUpdateEmployee = async () => {
    if (!name.trim() || !mail.trim()) {
      showErrorAlert('Validation Error', 'Name and email are required');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/employees/${employeeId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          mail: mail.trim(),
          role,
          department: department ? Number(department) : null,
        }),
      });

      if (response.ok) {
        showSuccessAlert('Success', 'Employee updated successfully', () => {
          navigation.goBack();
        });
      } else {
        showErrorAlert('Error', 'Failed to update employee');
      }
    } catch (error) {
      showErrorAlert('Error', 'Could not reach server');
    } finally {
      setLoading(false);
    }
  };

  if (!employee) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={styles.errorText}>Employee not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Update Employee</Text>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Name *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter employee name"
            value={name}
            onChangeText={setName}
            editable={!loading}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Email *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter email"
            value={mail}
            onChangeText={setMail}
            keyboardType="email-address"
            editable={!loading}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Role</Text>
          <View style={styles.roleButtons}>
            {['employee', 'admin'].map((r) => (
              <TouchableOpacity
                key={r}
                style={[styles.roleButton, role === r && styles.roleButtonActive]}
                onPress={() => setRole(r)}
                disabled={loading}
              >
                <Text style={[styles.roleButtonText, role === r && styles.roleButtonTextActive]}>
                  {r.charAt(0).toUpperCase() + r.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Department ID</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter department ID"
            value={department}
            onChangeText={setDepartment}
            keyboardType="numeric"
            editable={!loading}
          />
        </View>

        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={[styles.cancelBtn, loading && styles.disabledBtn]}
            onPress={() => navigation.goBack()}
            disabled={loading}
          >
            <Text style={styles.cancelBtnText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.submitBtn, loading && styles.disabledBtn]}
            onPress={handleUpdateEmployee}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={theme.colors.white} />
            ) : (
              <Text style={styles.submitBtnText}>Update Employee</Text>
            )}
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
  content: {
    padding: staticTheme.spacing.lg,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: staticTheme.colors.primary,
    marginBottom: staticTheme.spacing.lg,
  },
  formGroup: {
    marginBottom: staticTheme.spacing.lg,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: staticTheme.colors.text,
    marginBottom: staticTheme.spacing.sm,
  },
  input: {
    backgroundColor: staticTheme.colors.card,
    borderWidth: 1,
    borderColor: staticTheme.colors.border,
    borderRadius: staticTheme.borderRadius.md,
    paddingVertical: 12,
    paddingHorizontal: staticTheme.spacing.md,
    fontSize: 14,
    color: staticTheme.colors.text,
  },
  roleButtonGroup: {
    flexDirection: 'row',
    gap: staticTheme.spacing.md,
  },
  roleButton: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: staticTheme.colors.card,
    borderWidth: 1,
    borderColor: staticTheme.colors.border,
    borderRadius: staticTheme.borderRadius.md,
    alignItems: 'center',
  },
  roleButtonActive: {
    backgroundColor: staticTheme.colors.primary,
    borderColor: staticTheme.colors.primary,
  },
  roleButtonText: {
    fontSize: 14,
    color: staticTheme.colors.text,
    fontWeight: '600',
  },
  roleButtonTextActive: {
    color: staticTheme.colors.white,
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: staticTheme.spacing.md,
    marginTop: staticTheme.spacing.xl,
  },
  cancelBtn: {
    flex: 1,
    paddingVertical: 14,
    backgroundColor: staticTheme.colors.lightGray,
    borderRadius: staticTheme.borderRadius.md,
  },
  submitBtn: {
    flex: 1,
    paddingVertical: 14,
    backgroundColor: staticTheme.colors.primary,
    borderRadius: staticTheme.borderRadius.md,
  },
  cancelBtnText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    color: staticTheme.colors.text,
  },
  submitBtnText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    color: staticTheme.colors.white,
  },
  disabledBtn: {
    opacity: 0.6,
  },
  errorText: {
    fontSize: 16,
    color: staticTheme.colors.error,
  },
});

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
import { theme } from '../theme';

export default function UpdateEmployee({ navigation, route }) {
  const { employeeId } = route.params;
  const employees = useSelector((state) => state.employees || []);
  const employee = employees.find((e) => e.id === employeeId);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [position, setPosition] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (employee) {
      setName(employee.name || '');
      setEmail(employee.email || '');
      setPosition(employee.position || '');
    }
  }, [employee]);

  const handleUpdateEmployee = async () => {
    if (!name.trim() || !email.trim()) {
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
          email: email.trim(),
          position: position.trim(),
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
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            editable={!loading}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Position</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter position"
            value={position}
            onChangeText={setPosition}
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
    backgroundColor: theme.colors.secondary,
  },
  content: {
    padding: theme.spacing.lg,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: theme.colors.primary,
    marginBottom: theme.spacing.lg,
  },
  formGroup: {
    marginBottom: theme.spacing.lg,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  input: {
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.md,
    paddingVertical: 12,
    paddingHorizontal: theme.spacing.md,
    fontSize: 14,
    color: theme.colors.text,
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    marginTop: theme.spacing.xl,
  },
  cancelBtn: {
    flex: 1,
    paddingVertical: 14,
    backgroundColor: theme.colors.lightGray,
    borderRadius: theme.borderRadius.md,
  },
  submitBtn: {
    flex: 1,
    paddingVertical: 14,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
  },
  cancelBtnText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
  },
  submitBtnText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.white,
  },
  disabledBtn: {
    opacity: 0.6,
  },
  errorText: {
    fontSize: 16,
    color: theme.colors.error,
  },
});

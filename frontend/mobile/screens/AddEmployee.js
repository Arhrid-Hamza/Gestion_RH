import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { showSuccessAlert, showErrorAlert } from '../utils/alerts';
import { theme } from '../theme';

export default function AddEmployee({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [position, setPosition] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    if (!name || !email || !position) {
      showErrorAlert('Validation Error', 'Please fill all fields');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/employees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, position }),
      });

      if (response.ok) {
        showSuccessAlert('Success', 'Employee added successfully', () => {
          navigation.goBack();
        });
      } else {
        showErrorAlert('Error', 'Failed to add employee');
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
        <Text style={styles.headerTitle}>Add New Employee</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter employee name"
            value={name}
            onChangeText={setName}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Position</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter position"
            value={position}
            onChangeText={setPosition}
          />
        </View>

        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={[styles.button, styles.submitButton, loading && styles.buttonDisabled]}
            onPress={handleAdd}
            disabled={loading}
          >
            <Text style={styles.submitButtonText}>{loading ? 'Adding...' : 'Add Employee'}</Text>
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
  container: { flex: 1, backgroundColor: theme.colors.secondary },
  header: {
    backgroundColor: theme.colors.white,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: theme.spacing.lg,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: theme.colors.primary,
  },
  form: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.lg,
  },
  formGroup: {
    marginBottom: theme.spacing.lg,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.primary,
    marginBottom: theme.spacing.sm,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: 12,
    borderRadius: theme.borderRadius.md,
    fontSize: 14,
    color: theme.colors.text,
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    marginTop: theme.spacing.lg,
  },
  button: {
    flex: 1,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: theme.colors.primary,
  },
  submitButtonText: {
    color: theme.colors.white,
    fontWeight: '600',
    fontSize: 14,
  },
  cancelButton: {
    backgroundColor: theme.colors.border,
  },
  cancelButtonText: {
    color: theme.colors.text,
    fontWeight: '600',
    fontSize: 14,
  },
  buttonDisabled: { opacity: 0.6 },
});

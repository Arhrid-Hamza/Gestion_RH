import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { showSuccessAlert, showErrorAlert } from '../utils/alerts';
import { theme } from '../theme';

export default function AddDepartment({ navigation }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddDepartment = async () => {
    if (!name.trim()) {
      showErrorAlert('Validation Error', 'Department name is required');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/departments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          description: description.trim(),
        }),
      });

      if (response.ok) {
        showSuccessAlert('Success', 'Department added successfully', () => {
          navigation.goBack();
        });
      } else {
        showErrorAlert('Error', 'Failed to add department');
      }
    } catch (error) {
      showErrorAlert('Error', 'Could not reach server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Add New Department</Text>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Department Name *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter department name"
            value={name}
            onChangeText={setName}
            editable={!loading}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Enter department description"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
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
            onPress={handleAddDepartment}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={theme.colors.white} />
            ) : (
              <Text style={styles.submitBtnText}>Add Department</Text>
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
  textArea: {
    paddingVertical: theme.spacing.md,
    height: 120,
    textAlignVertical: 'top',
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
});

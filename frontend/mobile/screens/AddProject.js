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

export default function AddProject({ navigation }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [status, setStatus] = useState('Active');
  const [loading, setLoading] = useState(false);

  const handleAddProject = async () => {
    if (!name.trim()) {
      showErrorAlert('Validation Error', 'Project name is required');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          description: description.trim(),
          startDate,
          endDate,
          status,
        }),
      });

      if (response.ok) {
        showSuccessAlert('Success', 'Project added successfully', () => {
          navigation.goBack();
        });
      } else {
        showErrorAlert('Error', 'Failed to add project');
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
        <Text style={styles.title}>Add New Project</Text>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Project Name *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter project name"
            value={name}
            onChangeText={setName}
            editable={!loading}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Enter project description"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            editable={!loading}
          />
        </View>

        <View style={styles.rowContainer}>
          <View style={[styles.formGroup, { flex: 1 }]}>
            <Text style={styles.label}>Start Date</Text>
            <TextInput
              style={styles.input}
              placeholder="YYYY-MM-DD"
              value={startDate}
              onChangeText={setStartDate}
              editable={!loading}
            />
          </View>

          <View style={[styles.formGroup, { flex: 1, marginLeft: theme.spacing.md }]}>
            <Text style={styles.label}>End Date</Text>
            <TextInput
              style={styles.input}
              placeholder="YYYY-MM-DD"
              value={endDate}
              onChangeText={setEndDate}
              editable={!loading}
            />
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Status</Text>
          <View style={styles.statusButtons}>
            {['Active', 'Inactive', 'Completed'].map((s) => (
              <TouchableOpacity
                key={s}
                style={[
                  styles.statusBtn,
                  status === s && styles.statusBtnActive,
                ]}
                onPress={() => setStatus(s)}
              >
                <Text
                  style={[
                    styles.statusBtnText,
                    status === s && styles.statusBtnTextActive,
                  ]}
                >
                  {s}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
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
            onPress={handleAddProject}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={theme.colors.white} />
            ) : (
              <Text style={styles.submitBtnText}>Add Project</Text>
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
  rowContainer: {
    flexDirection: 'row',
  },
  statusButtons: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
    flexWrap: 'wrap',
  },
  statusBtn: {
    flex: 1,
    minWidth: '30%',
    paddingVertical: 10,
    paddingHorizontal: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.white,
  },
  statusBtnActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  statusBtnText: {
    textAlign: 'center',
    fontSize: 13,
    fontWeight: '600',
    color: theme.colors.text,
  },
  statusBtnTextActive: {
    color: theme.colors.white,
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

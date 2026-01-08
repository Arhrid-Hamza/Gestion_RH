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

export default function UpdateReport({ navigation, route }) {
  const { reportId } = route.params;
  const reports = useSelector((state) => state.reports || []);
  const report = reports.find((r) => r.id === reportId);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('General');
  const [status, setStatus] = useState('Pending');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (report) {
      setTitle(report.title || '');
      setDescription(report.description || '');
      setType(report.type || 'General');
      setStatus(report.status || 'Pending');
    }
  }, [report]);

  const handleUpdateReport = async () => {
    if (!title.trim()) {
      showErrorAlert('Validation Error', 'Report title is required');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/reports/${reportId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim(),
          type,
          status,
        }),
      });

      if (response.ok) {
        showSuccessAlert('Success', 'Report updated successfully', () => {
          navigation.goBack();
        });
      } else {
        showErrorAlert('Error', 'Failed to update report');
      }
    } catch (error) {
      showErrorAlert('Error', 'Could not reach server');
    } finally {
      setLoading(false);
    }
  };

  if (!report) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={styles.errorText}>Report not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Update Report</Text>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Report Title *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter report title"
            value={title}
            onChangeText={setTitle}
            editable={!loading}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Enter report description"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            editable={!loading}
          />
        </View>

        <View style={styles.rowContainer}>
          <View style={[styles.formGroup, { flex: 1 }]}>
            <Text style={styles.label}>Type</Text>
            <View style={styles.selectButtons}>
              {['General', 'Financial', 'HR', 'Technical'].map((t) => (
                <TouchableOpacity
                  key={t}
                  style={[
                    styles.selectBtn,
                    type === t && styles.selectBtnActive,
                  ]}
                  onPress={() => setType(t)}
                >
                  <Text
                    style={[
                      styles.selectBtnText,
                      type === t && styles.selectBtnTextActive,
                    ]}
                  >
                    {t}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Status</Text>
          <View style={styles.statusButtons}>
            {['Pending', 'In Progress', 'Completed'].map((s) => (
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
            onPress={handleUpdateReport}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={theme.colors.white} />
            ) : (
              <Text style={styles.submitBtnText}>Update Report</Text>
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
  selectButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  selectBtn: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.white,
  },
  selectBtnActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  selectBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.text,
  },
  selectBtnTextActive: {
    color: theme.colors.white,
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
  errorText: {
    fontSize: 16,
    color: theme.colors.error,
  },
});

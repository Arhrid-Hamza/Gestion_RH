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
import { useDispatch, useSelector } from 'react-redux';
import { fetchDepartments, fetchEmployees, fetchProjects } from '../store/actions';
import { showSuccessAlert, showErrorAlert } from '../utils/alerts';
import { useTheme, theme as staticTheme } from '../context/ThemeContext';

export default function AddProject({ navigation }) {
  const { theme } = useTheme();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [status, setStatus] = useState('Active');
  const [departmentResponsible, setDepartmentResponsible] = useState(null);
  const [employeeResponsible, setEmployeeResponsible] = useState(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const departments = useSelector((state) => state.departments || []);
  const employees = useSelector((state) => state.employees || []);

  useEffect(() => {
    dispatch(fetchDepartments());
    dispatch(fetchEmployees());
  }, [dispatch]);

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
          departmentResponsible: departmentResponsible ? Number(departmentResponsible) : null,
          employeeResponsible: employeeResponsible ? Number(employeeResponsible) : null,
        }),
      });

      if (response.ok) {
        showSuccessAlert('Success', 'Project added successfully', () => {
          dispatch(fetchProjects());
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
          <Text style={styles.label}>Department Responsible</Text>
          {departments.length === 0 ? (
            <Text style={styles.helperText}>No departments available</Text>
          ) : (
            <View style={styles.selector}>
              {departments.map((d) => (
                <TouchableOpacity
                  key={d.id}
                  style={[styles.selectorItem, departmentResponsible == d.id && styles.selectorItemActive]}
                  onPress={() => setDepartmentResponsible(d.id)}
                >
                  <Text style={[styles.selectorText, departmentResponsible == d.id && styles.selectorTextActive]}>{d.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Employee Responsible</Text>
          {employees.length === 0 ? (
            <Text style={styles.helperText}>No employees available</Text>
          ) : (
            <View style={styles.selector}>
              {employees.map((e) => (
                <TouchableOpacity
                  key={e.id}
                  style={[styles.selectorItem, employeeResponsible == e.id && styles.selectorItemActive]}
                  onPress={() => setEmployeeResponsible(e.id)}
                >
                  <Text style={[styles.selectorText, employeeResponsible == e.id && styles.selectorTextActive]}>{e.name || e.fullName || e.mail}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
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
  textArea: {
    paddingVertical: staticTheme.spacing.md,
    height: 120,
    textAlignVertical: 'top',
  },
  rowContainer: {
    flexDirection: 'row',
  },
  statusButtons: {
    flexDirection: 'row',
    gap: staticTheme.spacing.sm,
    flexWrap: 'wrap',
  },
  statusBtn: {
    flex: 1,
    minWidth: '30%',
    paddingVertical: 10,
    paddingHorizontal: staticTheme.spacing.md,
    borderWidth: 1,
    borderColor: staticTheme.colors.border,
    borderRadius: staticTheme.borderRadius.md,
    backgroundColor: staticTheme.colors.card,
  },
  statusBtnActive: {
    backgroundColor: staticTheme.colors.primary,
    borderColor: staticTheme.colors.primary,
  },
  statusBtnText: {
    textAlign: 'center',
    fontSize: 13,
    fontWeight: '600',
    color: staticTheme.colors.text,
  },
  statusBtnTextActive: {
    color: staticTheme.colors.white,
  },
  selector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: staticTheme.spacing.sm,
  },
  selectorItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: staticTheme.borderRadius.md,
    borderWidth: 1,
    borderColor: staticTheme.colors.border,
    backgroundColor: staticTheme.colors.card,
    marginRight: staticTheme.spacing.sm,
    marginBottom: staticTheme.spacing.sm,
  },
  selectorItemActive: {
    backgroundColor: staticTheme.colors.primary,
    borderColor: staticTheme.colors.primary,
  },
  selectorText: {
    color: staticTheme.colors.text,
  },
  selectorTextActive: {
    color: staticTheme.colors.white,
  },
  helperText: {
    color: staticTheme.colors.text,
    fontStyle: 'italic',
    fontSize: 13,
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
});

import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects, fetchDepartments, fetchEmployees } from '../store/actions';
import { showConfirmationAlert, showSuccessAlert, showErrorAlert } from '../utils/alerts';
import { theme } from '../theme';

const ProjectItem = ({ project, departmentName, employeeName, onEdit, onDelete }) => (
  <View style={styles.projectCard}>
    <View style={styles.projectInfo}>
      <Text style={styles.projectName}>{project.name || 'Untitled Project'}</Text>
      <Text style={styles.projectDescription}>{project.description || 'No description'}</Text>
      {departmentName ? <Text style={styles.assignedText}>Department: {departmentName}</Text> : null}
      {employeeName ? <Text style={styles.assignedText}>Responsible: {employeeName}</Text> : null}
      <View style={styles.statusContainer}>
        <Text style={styles.statusText}>{project.status || 'Active'}</Text>
      </View>
    </View>
    <View style={styles.buttonGroup}>
      <TouchableOpacity style={styles.editBtn} onPress={() => onEdit(project.id)}>
        <Text style={styles.editBtnText}>✏️ Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteBtn} onPress={() => onDelete(project)}>
        <Text style={styles.deleteBtnText}>🗑️ Delete</Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default function ProjectList({ navigation }) {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects || []);
  const departments = useSelector((state) => state.departments || []);
  const employees = useSelector((state) => state.employees || []);

  useEffect(() => {
    dispatch(fetchProjects());
    dispatch(fetchDepartments());
    dispatch(fetchEmployees());
  }, [dispatch]);

  const handleEdit = (id) => {
    navigation.navigate('UpdateProject', { projectId: id });
  };

  const handleDelete = (project) => {
    showConfirmationAlert(
      'Delete Project',
      `Are you sure you want to delete "${project.name}"? This action cannot be undone.`,
      async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/projects/${project.id}`, {
            method: 'DELETE',
          });

          if (response.ok) {
            showSuccessAlert('Success', 'Project deleted successfully', () => {
              dispatch(fetchProjects());
            });
          } else {
            showErrorAlert('Error', 'Failed to delete project');
          }
        } catch (error) {
          showErrorAlert('Error', 'Could not reach server');
        }
      }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Projects</Text>
        <TouchableOpacity onPress={() => navigation.navigate('AddProject')} style={styles.addBtn}>
          <Text style={styles.addBtnText}>+ Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={projects}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => {
          const dept = departments.find((d) => d.id === item.departmentResponsible);
          const emp = employees.find((e) => e.id === item.employeeResponsible);
          return (
            <ProjectItem
              project={item}
              departmentName={dept ? dept.name : null}
              employeeName={emp ? (emp.name || emp.fullName || emp.mail || emp.email) : null}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          );
        }}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.secondary,
  },
  header: {
    backgroundColor: theme.colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  addBtn: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: theme.borderRadius.md,
  },
  addBtnText: {
    color: theme.colors.white,
    fontWeight: '600',
    fontSize: 14,
  },
  listContent: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.lg,
  },
  projectCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  projectInfo: {
    marginBottom: theme.spacing.md,
  },
  projectName: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 4,
  },
  projectDescription: {
    fontSize: 13,
    color: theme.colors.textLight,
    marginBottom: 8,
  },
  assignedText: {
    fontSize: 13,
    color: theme.colors.text,
    marginBottom: 6,
  },
  statusContainer: {
    backgroundColor: theme.colors.success,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  statusText: {
    color: theme.colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  editBtn: {
    flex: 1,
    backgroundColor: theme.colors.info,
    paddingVertical: 8,
    borderRadius: theme.borderRadius.sm,
    alignItems: 'center',
  },
  editBtnText: {
    color: theme.colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
  deleteBtn: {
    flex: 1,
    backgroundColor: theme.colors.error,
    paddingVertical: 8,
    borderRadius: theme.borderRadius.sm,
    alignItems: 'center',
  },
  deleteBtnText: {
    color: theme.colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
});

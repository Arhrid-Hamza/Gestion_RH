import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDepartments } from '../store/actions';
import { showConfirmationAlert, showSuccessAlert, showErrorAlert } from '../utils/alerts';
import { theme } from '../theme';

const DepartmentItem = ({ department, onEdit, onDelete }) => (
  <View style={styles.departmentCard}>
    <View style={styles.departmentInfo}>
      <Text style={styles.departmentName}>{department.name || 'Unnamed Department'}</Text>
      <Text style={styles.departmentDescription}>{department.description || 'No description'}</Text>
    </View>
    <View style={styles.buttonGroup}>
      <TouchableOpacity style={styles.editBtn} onPress={() => onEdit(department.id)}>
        <Text style={styles.editBtnText}>✏️ Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteBtn} onPress={() => onDelete(department)}>
        <Text style={styles.deleteBtnText}>🗑️ Delete</Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default function DepartmentList({ navigation }) {
  const dispatch = useDispatch();
  const departments = useSelector((state) => state.departments || []);

  useEffect(() => {
    dispatch(fetchDepartments());
  }, [dispatch]);

  const handleEdit = (id) => {
    navigation.navigate('UpdateDepartment', { departmentId: id });
  };

  const handleDelete = (department) => {
    showConfirmationAlert(
      'Delete Department',
      `Are you sure you want to delete "${department.name}"? This action cannot be undone.`,
      async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/departments/${department.id}`, {
            method: 'DELETE',
          });

          if (response.ok) {
            showSuccessAlert('Success', 'Department deleted successfully', () => {
              dispatch(fetchDepartments());
            });
          } else {
            showErrorAlert('Error', 'Failed to delete department');
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
        <Text style={styles.headerTitle}>Departments</Text>
        <TouchableOpacity onPress={() => navigation.navigate('AddDepartment')} style={styles.addBtn}>
          <Text style={styles.addBtnText}>+ Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={departments}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <DepartmentItem
            department={item}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
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
  departmentCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  departmentInfo: {
    flex: 1,
  },
  departmentName: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 4,
  },
  departmentDescription: {
    fontSize: 13,
    color: theme.colors.textLight,
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  editBtn: {
    backgroundColor: theme.colors.info,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: theme.borderRadius.sm,
  },
  editBtnText: {
    color: theme.colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
  deleteBtn: {
    backgroundColor: theme.colors.error,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: theme.borderRadius.sm,
  },
  deleteBtnText: {
    color: theme.colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
});

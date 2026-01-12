import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDepartments } from '../store/actions';
import { showConfirmationAlert, showSuccessAlert, showErrorAlert } from '../utils/alerts';
import { useTheme, theme as staticTheme } from '../context/ThemeContext';

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
  const { theme } = useTheme();
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
    backgroundColor: staticTheme.colors.secondary,
  },
  header: {
    backgroundColor: staticTheme.colors.card,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  addBtn: {
    backgroundColor: staticTheme.colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: staticTheme.borderRadius.md,
  },
  addBtnText: {
    color: staticTheme.colors.white,
    fontWeight: '600',
    fontSize: 14,
  },
  listContent: {
    paddingHorizontal: staticTheme.spacing.lg,
    paddingBottom: staticTheme.spacing.lg,
  },
  departmentCard: {
    backgroundColor: staticTheme.colors.card,
    borderRadius: staticTheme.borderRadius.md,
    padding: staticTheme.spacing.md,
    marginBottom: staticTheme.spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: staticTheme.colors.shadow,
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
    color: staticTheme.colors.text,
    marginBottom: 4,
  },
  departmentDescription: {
    fontSize: 13,
    color: staticTheme.colors.textLight,
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: staticTheme.spacing.sm,
  },
  editBtn: {
    backgroundColor: staticTheme.colors.info,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: staticTheme.borderRadius.sm,
  },
  editBtnText: {
    color: staticTheme.colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
  deleteBtn: {
    backgroundColor: staticTheme.colors.error,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: staticTheme.borderRadius.sm,
  },
  deleteBtnText: {
    color: staticTheme.colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
});

import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../store/actions';
import { showConfirmationAlert, showSuccessAlert, showErrorAlert } from '../utils/alerts';
import { useTheme, theme as staticTheme } from '../context/ThemeContext';

const UserItem = ({ user, onEdit, onDelete }) => (
  <View style={styles.userCard}>
    <View style={styles.userInfo}>
      <Text style={styles.userName}>{user.name || user.email || user.username}</Text>
      <Text style={styles.userEmail}>{user.email}</Text>
      <View style={styles.roleContainer}>
        <Text style={styles.roleText}>{user.role}</Text>
      </View>
    </View>
    <View style={styles.buttonGroup}>
      <TouchableOpacity style={styles.editBtn} onPress={() => onEdit(user.id)}>
        <Text style={styles.editBtnText}>✏️ Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteBtn} onPress={() => onDelete(user)}>
        <Text style={styles.deleteBtnText}>🗑️ Delete</Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default function UserList({ navigation }) {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users || []);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleEdit = (id) => {
    navigation.navigate('UpdateUser', { userId: id });
  };

  const handleDelete = (user) => {
    showConfirmationAlert(
      'Delete User',
      `Are you sure you want to delete ${user.name || user.email}? This action cannot be undone.`,
      async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/users/${user.id}`, {
            method: 'DELETE',
          });

          if (response.ok) {
            showSuccessAlert('Success', 'User deleted successfully', () => {
              dispatch(fetchUsers());
            });
          } else {
            showErrorAlert('Error', 'Failed to delete user');
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
        <Text style={styles.headerTitle}>Users</Text>
        <TouchableOpacity onPress={() => navigation.navigate('AddUser')} style={styles.addBtn}>
          <Text style={styles.addBtnText}>➕ Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={users}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <UserItem
            user={item}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<Text style={styles.emptyText}>No users found</Text>}
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
  userCard: {
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
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: staticTheme.colors.text,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 13,
    color: staticTheme.colors.textLight,
    marginBottom: 8,
  },
  roleContainer: {
    backgroundColor: staticTheme.colors.primary,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  roleText: {
    color: staticTheme.colors.white,
    fontSize: 12,
    fontWeight: '600',
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
  emptyText: {
    textAlign: 'center',
    color: staticTheme.colors.textLight,
    marginTop: 40,
    fontSize: 16,
  },
});

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDepartments, fetchEmployees } from '../store/actions';
import { showSuccessAlert, showErrorAlert } from '../utils/alerts';
import { useTheme, theme as staticTheme } from '../context/ThemeContext';

export default function AddEmployee({ navigation }) {
    const { theme } = useTheme();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('employee');
    const [department, setDepartment] = useState(null);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const departments = useSelector((state) => state.departments || []);

    useEffect(() => {
        dispatch(fetchDepartments());
    }, [dispatch]);

    const handleAdd = async () => {
        if (!name || !email) {
        showErrorAlert('Validation Error', 'Please fill required fields');
        return;
        }

        setLoading(true);
        try {
        const response = await fetch('http://localhost:5000/api/employees', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
            name,
            mail: email,
            role,
            department: department ? Number(department) : null,
            }),
        });

        if (response.ok) {
            showSuccessAlert('Success', 'Employee added successfully', () => {
            dispatch(fetchEmployees());
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
        <ScrollView style={[styles.container, { backgroundColor: theme.colors.secondary }]}>
        <View style={[styles.header, { backgroundColor: theme.colors.card }]}>
            <Text style={[styles.headerTitle, { color: theme.colors.primary }]}>Add New Employee</Text>
        </View>

        <View style={styles.form}>
            <View style={styles.formGroup}>
            <Text style={[styles.label, { color: theme.colors.text }]}>Name</Text>
            <TextInput
                style={[styles.input, { backgroundColor: theme.colors.background, borderColor: theme.colors.border, color: theme.colors.text }]}
                placeholder="Enter employee name"
                placeholderTextColor={theme.colors.textLight}
                value={name}
                onChangeText={setName}
            />
            </View>

            <View style={styles.formGroup}>
            <Text style={[styles.label, { color: theme.colors.text }]}>Email</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            </View>

            <View style={styles.formGroup}>
            <Text style={styles.label}>Role</Text>
            <View style={styles.selectorRow}>
                {['employee', 'admin'].map((r) => (
                <TouchableOpacity
                    key={r}
                    style={[styles.selectorBtn, role === r && styles.selectorBtnActive]}
                    onPress={() => setRole(r)}
                >
                    <Text style={[styles.selectorText, role === r && styles.selectorTextActive]}>{r}</Text>
                </TouchableOpacity>
                ))}
            </View>
            </View>

            <View style={styles.formGroup}>
            <Text style={styles.label}>Department</Text>
            {departments.length === 0 ? (
                <Text style={styles.helperText}>No departments available</Text>
            ) : (
                <View style={styles.selectorRow}>
                {departments.map((d) => (
                    <TouchableOpacity
                    key={d.id}
                    style={[styles.selectorBtn, department === d.id && styles.selectorBtnActive]}
                    onPress={() => setDepartment(d.id)}
                    >
                    <Text style={[styles.selectorText, department === d.id && styles.selectorTextActive]}>{d.name}</Text>
                    </TouchableOpacity>
                ))}
                </View>
            )}
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
    container: { flex: 1, backgroundColor: staticTheme.colors.secondary },
    header: {
        backgroundColor: staticTheme.colors.card,
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
    form: {
        paddingHorizontal: staticTheme.spacing.lg,
        paddingBottom: staticTheme.spacing.lg,
    },
    formGroup: {
        marginBottom: staticTheme.spacing.lg,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: staticTheme.colors.primary,
        marginBottom: staticTheme.spacing.sm,
    },
    input: {
        borderWidth: 1,
        borderColor: staticTheme.colors.border,
        padding: 12,
        borderRadius: staticTheme.borderRadius.md,
        fontSize: 14,
        color: staticTheme.colors.text,
    },
    buttonGroup: {
        flexDirection: 'row',
        gap: staticTheme.spacing.md,
        marginTop: staticTheme.spacing.lg,
    },
    button: {
        flex: 1,
        paddingVertical: staticTheme.spacing.md,
        borderRadius: staticTheme.borderRadius.md,
        alignItems: 'center',
    },
    submitButton: {
        backgroundColor: staticTheme.colors.primary,
    },
    submitButtonText: {
        color: staticTheme.colors.white,
        fontWeight: '600',
        fontSize: 14,
    },
    cancelButton: {
        backgroundColor: staticTheme.colors.border,
    },
    cancelButtonText: {
        color: staticTheme.colors.text,
        fontWeight: '600',
        fontSize: 14,
    },
    buttonDisabled: { opacity: 0.6 },
    selectorRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: staticTheme.spacing.sm,
    },
    selectorBtn: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        backgroundColor: staticTheme.colors.card,
        borderWidth: 1,
        borderColor: staticTheme.colors.border,
        borderRadius: staticTheme.borderRadius.md,
        marginRight: staticTheme.spacing.sm,
        marginBottom: staticTheme.spacing.sm,
    },
    selectorBtnActive: {
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
});

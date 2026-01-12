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
    import { useTheme, theme as staticTheme } from '../context/ThemeContext';

    export default function AddReport({ navigation }) {
    const { theme } = useTheme();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [authorId, setAuthorId] = useState('');
    const [employeeResponsible, setEmployeeResponsible] = useState('');
    const [loading, setLoading] = useState(false);

    const handleAddReport = async () => {
        if (!title.trim()) {
        showErrorAlert('Validation Error', 'Report title is required');
        return;
        }

        setLoading(true);
        try {
        const response = await fetch('http://localhost:5000/api/reports', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
            title: title.trim(),
            content: content.trim(),
            authorId: parseInt(authorId),
            date: new Date(),
            employeeResponsible: parseInt(employeeResponsible) || null,
            }),
        });

        if (response.ok) {
            showSuccessAlert('Success', 'Report added successfully', () => {
            navigation.goBack();
            });
        } else {
            showErrorAlert('Error', 'Failed to add report');
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
            <Text style={styles.title}>Add New Report</Text>

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
            <Text style={styles.label}>Content</Text>
            <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Enter report content"
                value={content}
                onChangeText={setContent}
                multiline
                numberOfLines={4}
                editable={!loading}
            />
            </View>

            <View style={styles.formGroup}>
            <Text style={styles.label}>Author ID</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter author ID"
                value={authorId}
                onChangeText={setAuthorId}
                keyboardType="numeric"
                editable={!loading}
            />
            </View>

            <View style={styles.formGroup}>
            <Text style={styles.label}>Employee Responsible ID</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter employee responsible ID"
                value={employeeResponsible}
                onChangeText={setEmployeeResponsible}
                keyboardType="numeric"
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
                onPress={handleAddReport}
                disabled={loading}
            >
                {loading ? (
                <ActivityIndicator color={theme.colors.white} />
                ) : (
                <Text style={styles.submitBtnText}>Add Report</Text>
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
    selectButtons: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: staticTheme.spacing.sm,
    },
    selectBtn: {
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: staticTheme.colors.border,
        borderRadius: staticTheme.borderRadius.md,
        backgroundColor: staticTheme.colors.card,
    },
    selectBtnActive: {
        backgroundColor: staticTheme.colors.primary,
        borderColor: staticTheme.colors.primary,
    },
    selectBtnText: {
        fontSize: 12,
        fontWeight: '600',
        color: staticTheme.colors.text,
    },
    selectBtnTextActive: {
        color: staticTheme.colors.white,
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

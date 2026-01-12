import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReports } from '../store/actions';
import { useTheme, theme as staticTheme } from '../context/ThemeContext';

const ReportItem = ({ report }) => (
  <View style={styles.reportCard}>
    <View style={styles.reportHeader}>
      <Text style={styles.reportTitle}>{report.title || 'Untitled Report'}</Text>
      <Text style={styles.reportDate}>{report.date || new Date().toLocaleDateString()}</Text>
    </View>
    <Text style={styles.reportDescription}>{report.description || 'No description'}</Text>
    <View style={styles.reportMeta}>
      <Text style={styles.reportType}>{report.type || 'General'}</Text>
      <Text style={styles.reportStatus}>{report.status || 'Draft'}</Text>
    </View>
  </View>
);

export default function ReportsScreen({ navigation }) {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const reports = useSelector((state) => state.reports || []);

  useEffect(() => {
    dispatch(fetchReports());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Reports</Text>
        <TouchableOpacity onPress={() => navigation.navigate('AddReport')} style={styles.addBtn}>
          <Text style={styles.addBtnText}>+ Add</Text>
        </TouchableOpacity>
      </View>

      {reports.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No reports available</Text>
        </View>
      ) : (
        <FlatList
          data={reports}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => <ReportItem report={item} />}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
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
  reportCard: {
    backgroundColor: staticTheme.colors.card,
    borderRadius: staticTheme.borderRadius.md,
    padding: staticTheme.spacing.md,
    marginBottom: staticTheme.spacing.md,
    shadowColor: staticTheme.colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  reportHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: staticTheme.spacing.sm,
  },
  reportTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: staticTheme.colors.text,
    flex: 1,
  },
  reportDate: {
    fontSize: 12,
    color: staticTheme.colors.textLight,
  },
  reportDescription: {
    fontSize: 13,
    color: staticTheme.colors.textLight,
    marginBottom: staticTheme.spacing.md,
  },
  reportMeta: {
    flexDirection: 'row',
    gap: staticTheme.spacing.md,
  },
  reportType: {
    backgroundColor: staticTheme.colors.info,
    color: staticTheme.colors.white,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    fontSize: 11,
    fontWeight: '600',
  },
  reportStatus: {
    backgroundColor: staticTheme.colors.warning,
    color: staticTheme.colors.white,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    fontSize: 11,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: staticTheme.colors.textLight,
  },
});

import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReports } from '../store/actions';
import { theme } from '../theme';

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
  reportCard: {
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
  reportHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.sm,
  },
  reportTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
    flex: 1,
  },
  reportDate: {
    fontSize: 12,
    color: theme.colors.textLight,
  },
  reportDescription: {
    fontSize: 13,
    color: theme.colors.textLight,
    marginBottom: theme.spacing.md,
  },
  reportMeta: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  reportType: {
    backgroundColor: theme.colors.info,
    color: theme.colors.white,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    fontSize: 11,
    fontWeight: '600',
  },
  reportStatus: {
    backgroundColor: theme.colors.warning,
    color: theme.colors.white,
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
    color: theme.colors.textLight,
  },
});

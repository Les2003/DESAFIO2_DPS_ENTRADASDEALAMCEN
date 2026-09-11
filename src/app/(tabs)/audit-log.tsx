import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useAudit } from '../../context/redux/AuditContext';
import { AuditLogItem } from '../../components/AuditLogItem';

export default function AuditLogScreen() {
  const { auditLogs } = useAudit();

  return (
    <View style={styles.container}>
      {auditLogs.length === 0 ? (
        <View style={styles.empty}>
          <Text>No hay entregas registradas en la bitácora.</Text>
        </View>
      ) : (
        <FlatList
          data={auditLogs}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <AuditLogItem entry={item} />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
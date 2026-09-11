import { StyleSheet, Text, View } from 'react-native';
import { LocationMap } from '../../components/LocationMap';
import { useAudit } from '../../context/AuditContext';

export default function MapScreen() {
  const { auditLogs } = useAudit();

  return (
    <View style={styles.container}>
      {auditLogs.length === 0 ? (
        <View style={styles.empty}>
          <Text>No hay marcadores GPS. Registra entregas para verlas en el mapa.</Text>
        </View>
      ) : (
        <LocationMap entries={auditLogs} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
});
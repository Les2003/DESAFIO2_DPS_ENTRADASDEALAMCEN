import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { AuditEntry } from '../types/AuditEntry';

export const LocationMap: React.FC<{ entries: AuditEntry[] }> = ({ entries }) => {
  const defaultRegion = {
    latitude: entries[0]?.location.latitude || 13.6929,
    longitude: entries[0]?.location.longitude || -89.2182,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  return (
    <View style={styles.container}>
      <MapView style={StyleSheet.absoluteFill} initialRegion={defaultRegion}>
        {entries.map((item) => (
          <Marker
            key={item.id}
            coordinate={{ latitude: item.location.latitude, longitude: item.location.longitude }}
            title={item.productTitle}
            description={new Date(item.timestamp).toLocaleTimeString()}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});
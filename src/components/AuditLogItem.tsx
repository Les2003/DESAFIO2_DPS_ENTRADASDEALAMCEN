import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useAudioPlayer } from 'expo-audio';
import { AuditEntry } from '../types/AuditEntry';

export const AuditLogItem: React.FC<{ entry: AuditEntry }> = ({ entry }) => {
  const player = useAudioPlayer(entry.audioNoteUrl || '');

  return (
    <View style={styles.item}>
      <Text style={styles.title}>{entry.productTitle}</Text>
      <Text style={styles.type}>Acción: {entry.actionType}</Text>
      <Text style={styles.time}>{new Date(entry.timestamp).toLocaleString()}</Text>
      <Text style={styles.geo}>
        GPS: {entry.location.latitude.toFixed(4)}, {entry.location.longitude.toFixed(4)}
      </Text>
      {entry.audioNoteUrl && (
        <View style={styles.audioContainer}>
          <Button title="Reproducir Audio" onPress={() => player.play()} color="#0288d1" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  item: { backgroundColor: '#fff', padding: 12, marginVertical: 6, marginHorizontal: 10, borderRadius: 8, elevation: 1 },
  title: { fontWeight: 'bold', fontSize: 15 },
  type: { color: '#0288d1', fontWeight: '600', marginVertical: 2 },
  time: { color: '#666', fontSize: 12 },
  geo: { color: '#444', fontSize: 12, marginTop: 2 },
  audioContainer: { marginTop: 8 },
});
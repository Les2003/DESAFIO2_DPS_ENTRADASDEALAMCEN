import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';

interface CameraScannerProps {
  onBarcodeScanned: (data: string) => void;
}

export const CameraScanner: React.FC<CameraScannerProps> = ({ onBarcodeScanned }) => {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text style={styles.text}>Se requiere permiso de cámara</Text>
        <Button onPress={requestPermission} title="Conceder Permiso" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={StyleSheet.absoluteFill}
        onBarcodeScanned={scanned ? undefined : ({ data }) => {
          setScanned(true);
          onBarcodeScanned(data);
        }}
      />
      {scanned && (
        <View style={styles.overlay}>
          <Button title="Escanear de Nuevo" onPress={() => setScanned(false)} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, height: 300, borderRadius: 12, overflow: 'hidden', margin: 10 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  text: { marginBottom: 10, textAlign: 'center' },
  overlay: { position: 'absolute', bottom: 20, alignSelf: 'center' },
});
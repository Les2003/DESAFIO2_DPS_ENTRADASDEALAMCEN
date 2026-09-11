import * as Location from 'expo-location';
import { useState } from 'react';
import { Alert, Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import { AudioRecorder } from '../../components/AudioRecorder';
import { CameraScanner } from '../../components/CameraScanner';
import { ProductCard } from '../../components/ProductCard';
import { useAudit } from '../../context/redux/AuditContext';
import { Product } from '../../types/Product';

export default function ReceptionScannerScreen() {
  const { findProductByBarcode, addAuditEntry } = useAudit();
  const [scannedProduct, setScannedProduct] = useState<Product | null>(null);
  const [audioUri, setAudioUri] = useState<string | undefined>(undefined);

  const handleBarcodeScanned = (barcode: string) => {
    const product = findProductByBarcode(barcode);
    if (product) {
      setScannedProduct(product);
    } else {
      Alert.alert('No encontrado', `El código ${barcode} no está en las órdenes esperadas.`);
    }
  };

  const handleConfirmReceipt = async () => {
    if (!scannedProduct) return;

    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso denegado', 'Se requiere acceso al GPS para continuar.');
      return;
    }

    const loc = await Location.getCurrentPositionAsync({});

    addAuditEntry({
      productId: scannedProduct.id,
      productTitle: scannedProduct.title,
      actionType: 'STOCK_RECEIPT',
      audioNoteUrl: audioUri,
      location: {
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      },
    });

    Alert.alert('Éxito', 'Entrada de mercancía registrada correctamente en la bitácora.');
    setScannedProduct(null);
    setAudioUri(undefined);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Escanear Carga Recibida</Text>
      <CameraScanner onBarcodeScanned={handleBarcodeScanned} />

      {scannedProduct && (
    <View style={styles.resultContainer}>
    <Text style={styles.subtitle}>Producto Detectado:</Text>
    <ProductCard product={scannedProduct} />
    
    {/* Pasa la clave key unívoca si usas el ID del producto para forzar desmontaje limpio */}
    <AudioRecorder 
      key={scannedProduct.id} 
      onAudioRecorded={(uri) => setAudioUri(uri)} 
    />

    <Button 
      title="Confirmar Recepción (GPS + Log)" 
      onPress={handleConfirmReceipt} 
      color="#0288d1" 
    />
  </View>
)}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  title: { fontSize: 18, fontWeight: 'bold', margin: 10, textAlign: 'center' },
  subtitle: { fontSize: 16, fontWeight: 'bold', marginHorizontal: 10, marginTop: 10 },
  resultContainer: { paddingBottom: 20 },
});
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Product } from '../types/Product';

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => (
  <View style={styles.card}>
    <Image source={{ uri: product.imageUrl }} style={styles.image} />
    <View style={styles.info}>
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.category}>{product.category}</Text>
      <Text style={styles.detail}>Cód: {product.barcode}</Text>
      <Text style={styles.detail}>Esperados: {product.expectedStock} uds.</Text>
      <Text style={styles.price}>${product.unitPrice.toFixed(2)}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: { flexDirection: 'row', backgroundColor: '#fff', padding: 12, marginVertical: 6, marginHorizontal: 10, borderRadius: 8, elevation: 2 },
  image: { width: 70, height: 70, borderRadius: 6, marginRight: 12 },
  info: { flex: 1, justifyContent: 'center' },
  title: { fontWeight: 'bold', fontSize: 16 },
  category: { color: '#666', fontSize: 12 },
  detail: { color: '#444', fontSize: 12, marginTop: 2 },
  price: { fontWeight: 'bold', color: '#2e7d32', marginTop: 4 },
});
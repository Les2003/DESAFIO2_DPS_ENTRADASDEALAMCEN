import { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { ProductCard } from '../../components/ProductCard';
import { SearchBar } from '../../components/SearchBar';
import { useAudit } from '../../context/AuditContext';

export default function InventoryScreen() {
  const { products } = useAudit();
  const [search, setSearch] = useState('');

  const filteredProducts = products.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <SearchBar value={search} onChangeText={setSearch} />
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProductCard product={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
});
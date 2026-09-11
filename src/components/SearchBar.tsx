import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChangeText }) => (
  <View style={styles.container}>
    <TextInput
      style={styles.input}
      placeholder="Buscar por nombre o categoría..."
      value={value}
      onChangeText={onChangeText}
      placeholderTextColor="#888"
    />
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 10, backgroundColor: '#f0f0f0' },
  input: { backgroundColor: '#fff', paddingHorizontal: 15, paddingVertical: 10, borderRadius: 8, borderWidth: 1, borderColor: '#ddd' },
});
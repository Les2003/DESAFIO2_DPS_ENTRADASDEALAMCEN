import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#0288d1' }}>
      <Tabs.Screen name="index" options={{ title: 'Órdenes' }} />
      <Tabs.Screen name="scanner" options={{ title: 'Recepción' }} />
      <Tabs.Screen name="audit-log" options={{ title: 'Bitácora' }} />
      <Tabs.Screen name="map" options={{ title: 'Mapa' }} />
    </Tabs>
  );
}
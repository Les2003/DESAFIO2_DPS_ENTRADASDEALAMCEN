import { Stack } from 'expo-router';
import { AuditProvider } from '../context/AuditContext';

export default function RootLayout() {
  return (
    <AuditProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </AuditProvider>
  );
}

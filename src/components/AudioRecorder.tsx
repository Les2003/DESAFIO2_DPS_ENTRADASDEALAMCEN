import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View, Alert } from 'react-native';
import { 
  useAudioRecorder, 
  useAudioRecorderState,
  useAudioPlayer, 
  RecordingPresets, 
  AudioModule, 
  setAudioModeAsync 
} from 'expo-audio';

interface AudioRecorderProps {
  onAudioRecorded: (uri: string) => void;
}

export const AudioRecorder: React.FC<AudioRecorderProps> = ({ onAudioRecorded }) => {
  const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const recorderState = useAudioRecorderState(audioRecorder);
  const [recordedUri, setRecordedUri] = useState<string | null>(null);
  const player = useAudioPlayer(recordedUri || '');

  useEffect(() => {
    // Configurar el modo de audio global al cargar el componente
    setAudioModeAsync({
      playsInSilentMode: true,
      allowsRecording: true,
    }).catch((err) => console.error('Error al configurar AudioMode:', err));
  }, []);

  const startRecording = async () => {
    try {
      const status = await AudioModule.requestRecordingPermissionsAsync();
      if (!status.granted) {
        Alert.alert('Permiso Denegado', 'Se requiere acceso al micrófono para grabar.');
        return;
      }

      await setAudioModeAsync({
        playsInSilentMode: true,
        allowsRecording: true,
      });

      setRecordedUri(null);
      await audioRecorder.prepareToRecordAsync();
      audioRecorder.record();
    } catch (error) {
      console.error('Error al iniciar grabación:', error);
      Alert.alert('Error', 'No se pudo iniciar la grabación.');
    }
  };

  const stopRecording = async () => {
    try {
      await audioRecorder.stop();
      if (audioRecorder.uri) {
        setRecordedUri(audioRecorder.uri);
        onAudioRecorded(audioRecorder.uri);
      }
    } catch (error) {
      console.error('Error al detener grabación:', error);
    }
  };

  const playAudio = async () => {
    try {
      if (!recordedUri) return;
      await setAudioModeAsync({
        playsInSilentMode: true,
        allowsRecording: true,
      });
      player.play();
    } catch (error) {
      console.error('Error al reproducir audio:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nota de Voz (Opcional):</Text>
      <View style={styles.row}>
        {!recorderState.isRecording ? (
          <Button title="Grabar Audio" onPress={startRecording} color="#d32f2f" />
        ) : (
          <Button title="Detener Grabación" onPress={stopRecording} color="#388e3c" />
        )}
        {recordedUri && !recorderState.isRecording && (
          <Button title="Escuchar Nota" onPress={playAudio} color="#0288d1" />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    marginVertical: 10, 
    padding: 10, 
    backgroundColor: '#fff', 
    borderRadius: 8 
  },
  label: { 
    fontWeight: 'bold', 
    marginBottom: 5 
  },
  row: { 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    alignItems: 'center' 
  },
});
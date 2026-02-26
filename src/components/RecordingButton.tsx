import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native'; // Assuming React Native context for these components
import { Mic, StopCircle } from 'lucide-react-native'; // Assuming React Native context for these icons
import { useI18n } from '@/i18n';

interface RecordingButtonProps {
  isRecording: boolean;
  onPress: () => void;
  disabled?: boolean;
}

export default function RecordingButton({ isRecording, onPress, disabled = false }: RecordingButtonProps) {
  const { isRTL } = useI18n();

  return (
    <TouchableOpacity
      style={[styles.button, isRecording ? styles.recordingButton : styles.idleButton, disabled && styles.disabledButton]}
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={isRecording ? 'Stop recording' : 'Start recording'}
    >
      <View style={[styles.iconContainer, isRTL && styles.rtlIconContainer]}>
        {isRecording ? ( // StopCircle is not a directional icon, no need to mirror
          <StopCircle size={32} color="#FFFFFF" />
        ) : (
          <Mic size={32} color="#FFFFFF" />
        )}
      </View>
      <Text style={styles.buttonText}>
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  idleButton: {
    backgroundColor: '#4CAF50', // Green for start
  },
  recordingButton: {
    backgroundColor: '#F44336', // Red for stop
  },
  disabledButton: {
    backgroundColor: '#B0B0B0', // Grey when disabled
  },
  iconContainer: {
    marginEnd: 10, // Use logical property for margin
  },
  rtlIconContainer: {
    transform: [{ scaleX: -1 }], // Mirror the icon for RTL
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

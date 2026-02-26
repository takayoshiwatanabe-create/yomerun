import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Mic, StopCircle } from 'lucide-react-native';
import { useI18n, useTranslations } from '@/i18n/index'; // Import useTranslations

interface RecordingButtonProps {
  isRecording: boolean;
  onPress: () => void;
  disabled?: boolean;
}

export default function RecordingButton({ isRecording, onPress, disabled = false }: RecordingButtonProps) {
  const { isRTL } = useI18n();
  const t = useTranslations('common'); // Use common translations for button text

  return (
    <TouchableOpacity
      style={[styles.button, isRecording ? styles.recordingButton : styles.idleButton, disabled && styles.disabledButton]}
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={isRecording ? t('stopRecording') : t('startRecording')} // Use translations
    >
      <View style={[styles.iconContainer, isRTL && styles.rtlIconContainer]}>
        {isRecording ? (
          <StopCircle size={32} color="#FFFFFF" />
        ) : (
          <Mic size={32} color="#FFFFFF" />
        )}
      </View>
      <Text style={styles.buttonText}>
        {isRecording ? t('stopRecording') : t('startRecording')} {/* Use translations */}
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
    backgroundColor: '#4CAF50',
  },
  recordingButton: {
    backgroundColor: '#F44336',
  },
  disabledButton: {
    backgroundColor: '#B0B0B0',
  },
  iconContainer: {
    marginEnd: 10,
  },
  rtlIconContainer: {
    // No specific RTL styling needed here for icons unless they are directional
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});



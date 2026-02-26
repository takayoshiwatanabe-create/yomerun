import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslations, useI18n } from '@/i18n';

export default function HomeScreen() {
  const t = useTranslations('home');
  const { isRTL } = useI18n();
  const router = useRouter();

  const handleStart = () => {
    // Navigate to the main app flow, e.g., a dashboard or reading selection
    router.push('/main-dashboard');
  };

  const handleLearnMore = () => {
    // Navigate to an info/about screen
    router.push('/about');
  };

  return (
    <View style={[styles.container, isRTL && styles.rtlContainer]}>
      <Text style={styles.title}>{t('welcomeTitle')}</Text>
      <Text style={[styles.message, isRTL && styles.rtlMessage]}>{t('welcomeMessage')}</Text>

      <TouchableOpacity style={styles.startButton} onPress={handleStart} accessibilityLabel={t('startButton')}>
        <Text style={styles.startButtonText}>{t('startButton')}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.learnMoreButton} onPress={handleLearnMore} accessibilityLabel={t('learnMoreButton')}>
        <Text style={styles.learnMoreButtonText}>{t('learnMoreButton')}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f4f8',
  },
  rtlContainer: {
    direction: 'rtl',
    textAlign: 'right',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center', // Text alignment will be handled by the parent View's direction
  },
  rtlMessage: {
    textAlign: 'right',
  },
  startButton: {
    backgroundColor: '#3498db',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginBottom: 15,
    shadowColor: '#3498db',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  learnMoreButton: {
    backgroundColor: '#2ecc71',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    shadowColor: '#2ecc71',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  learnMoreButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';
import { useNavigation } from 'expo-router';
import { useTranslations, useI18n } from '@/i18n/index';

export default function Header() {
  const t = useTranslations('common');
  const navigation = useNavigation();
  const { isRTL } = useI18n();

  const canGoBack = navigation.canGoBack();

  return (
    <View style={[styles.headerContainer, isRTL && styles.rtlHeaderContainer]}>
      {canGoBack && (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[styles.backButton, isRTL && styles.rtlBackButton]}
          accessibilityLabel={t('back')}
          accessibilityRole="button"
        >
          <ChevronLeft size={24} color="#FFFFFF" style={isRTL ? styles.flipIcon : undefined} />
        </TouchableOpacity>
      )}
      <Text style={styles.headerTitle}>{t('appName')}</Text>
      {/* Placeholder to balance the header if back button is not present or for consistent spacing */}
      {!canGoBack && <View style={styles.rightPlaceholder} />}
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#6200EE',
    paddingTop: 40,
  },
  rtlHeaderContainer: {
    flexDirection: 'row-reverse',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 44,
    minHeight: 44,
    paddingHorizontal: 8,
    paddingVertical: 4,
    width: 44,
    justifyContent: 'center',
  },
  rtlBackButton: {
    flexDirection: 'row-reverse',
  },
  flipIcon: {
    transform: [{ scaleX: -1 }],
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  rightPlaceholder: {
    width: 44,
  },
});



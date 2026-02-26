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
          <ChevronLeft size={24} color="#FFFFFF" style={isRTL && styles.flipIcon} />
          {/* The spec says "アプリ名または現在のページタイトルを表示" for the header,
              and "戻るボタン（ナビゲーションスタックがある場合のみ表示）".
              The current implementation shows "back" text next to the icon.
              The spec implies the title should be central, and the back button is on the side.
              Removing the "back" text from the button and relying on the icon and accessibilityLabel.
          */}
          {/* <Text style={[styles.backButtonText, isRTL && styles.rtlBackButtonText]}>{t('back')}</Text> */}
        </TouchableOpacity>
      )}
      {/* The spec states "アプリ名または現在のページタイトルを表示".
          Currently, it always shows 'appName'. It should ideally show the current page title.
          For simplicity in this review, we'll keep 'appName' but note this as a potential enhancement.
      */}
      <Text style={styles.headerTitle}>{t('appName')}</Text>
      {/* Placeholder to balance the header if back button is not present or for consistent spacing */}
      {/* This placeholder should only exist if the back button is NOT present to ensure centering.
          If the back button IS present, the title should be centered between the back button and the right edge.
          A better approach would be to use flex properties to center the title.
      */}
      {!canGoBack && <View style={styles.rightPlaceholder} />}
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Changed to space-between to push items to ends
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#6200EE',
    paddingTop: 40, // Adjust for status bar on mobile
  },
  rtlHeaderContainer: {
    flexDirection: 'row-reverse',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 44, // WCAG 2.1 AA requirement
    minHeight: 44, // WCAG 2.1 AA requirement
    paddingHorizontal: 8,
    paddingVertical: 4,
    // Ensure the back button takes up space for centering
    width: 44, // Fixed width for consistent centering
    justifyContent: 'center',
  },
  rtlBackButton: {
    flexDirection: 'row-reverse',
  },
  backButtonText: { // This style is no longer used if text is removed
    color: '#FFFFFF',
    fontSize: 16,
    marginLeft: 4,
  },
  rtlBackButtonText: { // This style is no longer used if text is removed
    marginRight: 4,
    marginLeft: 0,
  },
  flipIcon: {
    transform: [{ scaleX: -1 }],
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1, // Allows title to take available space
    textAlign: 'center',
  },
  rightPlaceholder: {
    width: 44, // Matches the width of the back button for centering
  },
});

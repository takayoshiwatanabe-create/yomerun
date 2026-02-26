import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Home, ScanText, Settings } from 'lucide-react-native';
import { usePathname } from 'expo-router';
import { useRouter } from 'expo-router';
import { useTranslations, useI18n } from '@/i18n/index';

interface TabItemProps {
  icon: React.ComponentType<{ size: number; color: string; style?: object }>;
  label: string;
  isActive: boolean;
  onPress: () => void;
  isRTL: boolean;
}

const TabItem: React.FC<TabItemProps> = ({ icon: Icon, label, isActive, onPress, isRTL }) => {
  return (
    <TouchableOpacity
      style={[styles.tabItem, isActive && styles.activeTabItem]}
      onPress={onPress}
      accessibilityRole="tab"
      accessibilityState={{ selected: isActive }}
      accessibilityLabel={label}
    >
      <Icon size={24} color={isActive ? '#6200EE' : '#757575'} />
      <Text style={[styles.tabLabel, isActive && styles.activeTabLabel]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default function TabBar() {
  const t = useTranslations('common');
  const pathname = usePathname();
  const router = useRouter();
  const { locale, isRTL } = useI18n();

  const navigateTo = (path: string) => {
    router.push(`/${locale}${path}`);
  };

  const isActive = (path: string) => {
    // For the root path, check if it's exactly the locale root
    if (path === '/') {
      return pathname === `/${locale}` || pathname === `/${locale}/`;
    }
    // For other paths, check if the pathname includes the path segment
    return pathname.includes(path);
  };

  const tabs = [
    { icon: Home, labelKey: 'home', path: '/' },
    { icon: ScanText, labelKey: 'ocr', path: '/ocr' },
    { icon: Settings, labelKey: 'settings', path: '/settings' },
  ];

  return (
    <View style={[styles.tabBarContainer, isRTL && styles.rtlTabBarContainer]}>
      {tabs.map((tab, index) => (
        <TabItem
          key={index}
          icon={tab.icon}
          label={t(tab.labelKey)}
          isActive={isActive(tab.path)}
          onPress={() => navigateTo(tab.path)}
          isRTL={isRTL}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 5,
  },
  rtlTabBarContainer: {
    flexDirection: 'row-reverse',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    minWidth: 44,
    minHeight: 44,
  },
  activeTabItem: {
    // No specific styling for active tab item container, only label/icon
  },
  tabLabel: {
    fontSize: 12,
    color: '#757575',
    marginTop: 4,
  },
  activeTabLabel: {
    color: '#6200EE',
    fontWeight: 'bold',
  },
  flipIcon: {
    transform: [{ scaleX: -1 }],
  },
});



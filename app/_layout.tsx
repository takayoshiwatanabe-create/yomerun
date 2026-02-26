import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { t } from "@/i18n"; // Removed 'isRTL' as it's not directly used in JSX for global layout
import { View } from "react-native";
import "../global.css"; // Import global CSS for Tailwind

// This is the main layout of the app
// It wraps your pages with the providers they need
export default function RootLayout() {
  return (
    <SafeAreaProvider>
      {/* For RTL layout, typically flexbox properties like `flexDirection: isRTL ? 'row-reverse' : 'row'`
          or `textAlign: isRTL ? 'right' : 'left'` are used on Text components.
          For a global layout direction, you might need a custom component or a library.
          For now, we'll remove the non-standard 'dir' prop to fix the build.
          If RTL layout is critical, a more robust solution is needed.
      */}
      <View style={{ flex: 1 }}>
        <Stack>
          <Stack.Screen name="index" options={{ title: t("common.appName") }} />
          {/* Add other screens here as they are created */}
        </Stack>
        <StatusBar style="auto" />
      </View>
    </SafeAreaProvider>
  );
}

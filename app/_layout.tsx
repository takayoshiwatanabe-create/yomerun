import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { t, isRTL } from "@/i18n"; // Import isRTL for layout adjustments
import { View } from "react-native";
import "../global.css"; // Import global CSS for Tailwind

// This is the main layout of the app
// It wraps your pages with the providers they need
export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <View style={{ flex: 1 }} collapsable={false} dir={isRTL ? "rtl" : "ltr"}> {/* Add collapsable={false} to ensure dir prop works */}
        <Stack>
          <Stack.Screen name="index" options={{ title: t("common.appName") }} />
          {/* Add other screens here as they are created */}
        </Stack>
        <StatusBar style="auto" />
      </View>
    </SafeAreaProvider>
  );
}


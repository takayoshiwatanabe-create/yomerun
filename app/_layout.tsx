import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { t, isRTL, lang } from "@/i18n";
import { View } from "react-native";

// This is the main layout of the app
// It wraps your pages with the providers they need
export default function RootLayout() {
  return (
    <SafeAreaProvider>
      {/* Set the direction for RTL languages */}
      <View style={{ flex: 1 }} dir={isRTL ? "rtl" : "ltr"}>
        <Stack>
          <Stack.Screen name="index" options={{ title: t("common.appName") }} />
          {/* Add other screens here as they are created */}
        </Stack>
        <StatusBar style="auto" />
      </View>
    </SafeAreaProvider>
  );
}

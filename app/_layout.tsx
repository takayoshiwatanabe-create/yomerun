import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ title: "音読フィードバックアプリ：『ヨメルン（Yomerun）』" }} />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}

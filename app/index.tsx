import { Text, View } from "react-native";
import { t } from "@/i18n";

export default function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center p-6 bg-white dark:bg-gray-900">
      <Text className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
        {t("home.welcomeTitle")}
      </Text>
      <Text className="text-lg text-gray-600 dark:text-gray-300">
        {t("home.welcomeSubtitle")}
      </Text>
    </View>
  );
}

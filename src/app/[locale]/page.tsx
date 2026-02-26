"use client"; // Add "use client" directive
import React from 'react'; // Explicitly import React
import { useTranslations } from "next-intl";

export default function HomeScreen() {
  const t = useTranslations("home");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <h1 className="text-5xl font-extrabold mb-6 text-center leading-tight">
        {t("welcomeTitle")}
      </h1>
      <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 text-center max-w-2xl">
        {t("welcomeMessage")}
      </p>
      <div className="flex space-x-4">
        {/* Example buttons - replace with actual navigation */}
        <button className="px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-full shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105">
          {t("startButton")}
        </button>
        <button className="px-8 py-4 bg-green-600 text-white text-lg font-semibold rounded-full shadow-lg hover:bg-green-700 transition duration-300 ease-in-out transform hover:scale-105">
          {t("learnMoreButton")}
        </button>
      </div>
    </div>
  );
}

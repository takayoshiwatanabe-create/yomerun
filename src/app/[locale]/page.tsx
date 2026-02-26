"use client";
import React from 'react';
import { useTranslations } from "next-intl";
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { Button } from '@/components/ui/button';

export default function HomeScreen() {
  const t = useTranslations("home");
  const router = useRouter();
  const locale = useLocale();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <h1 className="text-5xl font-extrabold mb-6 text-center leading-tight">
        {t("welcomeTitle")}
      </h1>
      <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 text-center max-w-2xl">
        {t("welcomeMessage")}
      </p>
      <div className="flex space-x-4">
        <Button
          onClick={() => router.push(`/${locale}/ocr`)}
          className="px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-full shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
          aria-label={t("startButton")}
          style={{ minWidth: "44px", minHeight: "44px" }}
        >
          {t("startButton")}
        </Button>
        <Button
          onClick={() => console.log("Learn More clicked")}
          className="px-8 py-4 bg-green-600 text-white text-lg font-semibold rounded-full shadow-lg hover:bg-green-700 transition duration-300 ease-in-out transform hover:scale-105"
          aria-label={t("learnMoreButton")}
          style={{ minWidth: "44px", minHeight: "44px" }}
        >
          {t("learnMoreButton")}
        </Button>
      </div>
    </div>
  );
}


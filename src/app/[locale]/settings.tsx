```typescript
"use client";

import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronRight, Globe, Lock, Info } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { translations } from "@/i18n/translations"; // Import translations to get locale list

// Manually map labels for the language selector as `settings.selectLanguage` is not a language name
const localeLabels: Record<string, string> = {
  ja: "日本語",
  en: "English",
  zh: "中文",
  ko: "한국어",
  es: "Español",
  fr: "Français",
  de: "Deutsch",
  pt: "Português",
  ar: "العربية",
  hi: "हिन्दी",
};

export default function SettingsScreen() {
  const t = useTranslations("settings");
  const currentLocale = useLocale();
  const router = useRouter();
  const isRTL = currentLocale === 'ar';

  // State for settings (simulated)
  const [dataCollectionEnabled, setDataCollectionEnabled] = useState(true);
  const [marketingEmailsEnabled, setMarketingEmailsEnabled] = useState(false);

  const handleLocaleChange = (newLocale: string) => {
    router.push(`/${newLocale}/settings`);
  };

  const handleLinkClick = (url: string) => {
    window.open(url, "_blank");
  };

  const renderSettingItem = useMemo(() => (
    titleKey: string,
    descriptionKey: string,
    action: React.ReactNode,
    icon: React.ReactNode
  ) => (
    <div className={cn(
      "flex items-center justify-between py-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0",
      isRTL ? 'flex-row-reverse' : 'flex-row'
    )}>
      <div className={cn(
        "flex items-center",
        isRTL ? 'flex-row-reverse' : 'flex-row'
      )}>
        {icon}
        <div className={cn(
          isRTL ? 'mr-4 text-right' : 'ml-4 text-left'
        )}>
          <p className="text-lg font-medium text-gray-800 dark:text-white">{t(titleKey)}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{t(descriptionKey)}</p>
        </div>
      </div>
      {action}
    </div>
  ), [t, isRTL]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 bg-white dark:bg-gray-900">
      <Card className="w-full max-w-lg p-6 shadow-lg rounded-xl bg-white dark:bg-gray-800 border-none">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            {t("settingsTitle")}
          </CardTitle>
          <p className="text-md text-gray-600 dark:text-gray-300">
            {t("settingsSubtitle")}
          </p>
        </CardHeader>
        <CardContent className="mt-6">
          <div className="space-y-6">
            {/* Language Settings */}
            {renderSettingItem(
              "languageSettingTitle",
              "languageSettingDescription",
              <Select onValueChange={handleLocaleChange} defaultValue={currentLocale}>
                <SelectTrigger className={cn(
                  "w-[180px] h-11 text-base",
                  isRTL ? 'text-right' : 'text-left'
                )} style={{ minWidth: "44px", minHeight: "44px" }}>
                  <SelectValue placeholder={t("selectLanguage")} />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(translations).map((localeKey) => (
                    <SelectItem key={localeKey} value={localeKey}>
                      {localeLabels[localeKey]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>,
              <Globe className={cn(
                "h-6 w-6 text-blue-500",
                isRTL ? 'ml-2' : 'mr-2'
              )} />
            )}

            {/* Data Collection Privacy */}
            {renderSettingItem(
              "dataCollectionTitle",
              "dataCollectionDescription",
              <Switch
                checked={dataCollectionEnabled}
                onCheckedChange={setDataCollectionEnabled}
                aria-label={t("dataCollectionTitle")}
                style={{ minWidth: "44px", minHeight: "44px" }}
              />,
              <Lock className={cn(
                "h-6 w-6 text-green-500",
                isRTL ? 'ml-2' : 'mr-2'
              )} />
            )}

            {/* Marketing Emails */}
            {renderSettingItem(
              "marketingEmailsTitle",
              "marketingEmailsDescription",
              <Switch
                checked={marketingEmailsEnabled}
                onCheckedChange={setMarketingEmailsEnabled}
                aria-label={t("marketingEmailsTitle")}
                style={{ minWidth: "44px", minHeight: "44px" }}
              />,
              <Info className={cn(
                "h-6 w-6 text-purple-500",
                isRTL ? 'ml-2' : 'mr-2'
              )} />
            )}

            {/* Parent Information Link */}
            {renderSettingItem(
              "parentInfoTitle",
              "parentInfoDescription",
              <Button
                variant="ghost"
                onClick={() => handleLinkClick("https://yomerun.com/parents")} // Placeholder URL
                className={cn(
                  "text-blue-500 hover:text-blue-600 active:text-blue-700 text-base",
                  isRTL ? 'flex-row-reverse' : 'flex-row'
                )}
                aria-label={t("parentInfoTitle")}
                style={{ minWidth: "44px", minHeight: "44px" }}
              >
                {t("viewDetails")}
                <ChevronRight className={cn(
                  "h-5 w-5",
                  isRTL ? 'mr-1 transform scale-x-[-1]' : 'ml-1' // Flip icon for RTL
                )} />
              </Button>,
              <Info className={cn(
                "h-6 w-6 text-orange-500",
                isRTL ? 'ml-2' : 'mr-2'
              )} />
            )}

            {/* Privacy Policy Link */}
            {renderSettingItem(
              "privacyPolicyTitle",
              "privacyPolicyDescription",
              <Button
                variant="ghost"
                onClick={() => handleLinkClick("https://yomerun.com/privacy")} // Placeholder URL
                className={cn(
                  "text-blue-500 hover:text-blue-600 active:text-blue-700 text-base",
                  isRTL ? 'flex-row-reverse' : 'flex-row'
                )}
                aria-label={t("privacyPolicyTitle")}
                style={{ minWidth: "44px", minHeight: "44px" }}
              >
                {t("viewDetails")}
                <ChevronRight className={cn(
                  "h-5 w-5",
                  isRTL ? 'mr-1 transform scale-x-[-1]' : 'ml-1' // Flip icon for RTL
                )} />
              </Button>,
              <Lock className={cn(
                "h-6 w-6 text-gray-500",
                isRTL ? 'ml-2' : 'mr-2'
              )} />
            )}

            {/* Terms of Service Link */}
            {renderSettingItem(
              "termsOfServiceTitle",
              "termsOfServiceDescription",
              <Button
                variant="ghost"
                onClick={() => handleLinkClick("https://yomerun.com/terms")} // Placeholder URL
                className={cn(
                  "text-blue-500 hover:text-blue-600 active:text-blue-700 text-base",
                  isRTL ? 'flex-row-reverse' : 'flex-row'
                )}
                aria-label={t("termsOfServiceTitle")}
                style={{ minWidth: "44px", minHeight: "44px" }}
              >
                {t("viewDetails")}
                <ChevronRight className={cn(
                  "h-5 w-5",
                  isRTL ? 'mr-1 transform scale-x-[-1]' : 'ml-1' // Flip icon for RTL
                )} />
              </Button>,
              <Info className={cn(
                "h-6 w-6 text-gray-500",
                isRTL ? 'ml-2' : 'mr-2'
              )} />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
```

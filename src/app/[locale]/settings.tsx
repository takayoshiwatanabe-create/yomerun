"use client";

import React from 'react'; // Explicitly import React
import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ChevronRight, Globe, Lock, User, Info } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SettingsScreen() {
  const t = useTranslations("settings");
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [dataSharingConsent, setDataSharingConsent] = useState(false);

  const handleLogout = () => {
    // Implement logout logic
    console.log("Logging out...");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6">
        <CardHeader className="text-center mb-6">
          <CardTitle className="text-3xl font-bold text-gray-900 dark:text-white">
            {t("title")}
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            {t("description")}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Account Settings */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center">
              <User className={cn("h-5 w-5 mr-2", isRTL && "ml-2 mr-0 scale-x-[-1]")} />
              {t("accountSettingsTitle")}
            </h2>
            <Button
              variant="outline"
              className={cn("w-full justify-between py-3 px-4 text-lg", isRTL && "flex-row-reverse")}
              aria-label={t("changePasswordTitle")}
              style={{ minWidth: "44px", minHeight: "44px" }}
            >
              {t("changePasswordTitle")}
              <ChevronRight className={cn(
                "h-5 w-5",
                isRTL ? "ml-2 transform rotate-180" : "mr-2" // Rotate for RTL
              )} />
            </Button>
            <Button
              variant="outline"
              className={cn("w-full justify-between py-3 px-4 text-lg", isRTL && "flex-row-reverse")}
              aria-label={t("manageProfileTitle")}
              style={{ minWidth: "44px", minHeight: "44px" }}
            >
              {t("manageProfileTitle")}
              <ChevronRight className={cn(
                "h-5 w-5",
                isRTL ? "ml-2 transform rotate-180" : "mr-2" // Rotate for RTL
              )} />
            </Button>
          </div>

          {/* Privacy & Security */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center">
              <Lock className={cn("h-5 w-5 mr-2", isRTL && "ml-2 mr-0 scale-x-[-1]")} />
              {t("privacySecurityTitle")}
            </h2>
            <div className={cn("flex items-center justify-between", isRTL && "flex-row-reverse")}>
              <Label htmlFor="data-sharing" className="text-lg">
                {t("dataSharingConsent")}
              </Label>
              <Switch
                id="data-sharing"
                checked={dataSharingConsent}
                onCheckedChange={setDataSharingConsent}
                aria-label={t("dataSharingConsent")}
                style={{ minWidth: "44px", minHeight: "44px" }}
              />
            </div>
            <Button
              variant="outline"
              className={cn("w-full justify-between py-3 px-4 text-lg", isRTL && "flex-row-reverse")}
              aria-label={t("parentInfoTitle")}
              style={{ minWidth: "44px", minHeight: "44px" }}
            > {/* ChevronRight is a directional icon, it should be mirrored in RTL */}
              {t("viewDetails")}
              <ChevronRight className={cn(
                "h-5 w-5",
                isRTL ? "ml-2 transform rotate-180" : "mr-2" // Rotate for RTL
              )} />
            </Button>
          </div>

          {/* General Settings */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center">
              <Globe className={cn("h-5 w-5 mr-2", isRTL && "ml-2 mr-0 scale-x-[-1]")} />
              {t("generalSettingsTitle")}
            </h2>
            <div className={cn("flex items-center justify-between", isRTL && "flex-row-reverse")}>
              <Label htmlFor="notifications" className="text-lg">
                {t("notifications")}
              </Label>
              <Switch
                id="notifications"
                checked={notificationsEnabled}
                onCheckedChange={setNotificationsEnabled}
                aria-label={t("notifications")}
                style={{ minWidth: "44px", minHeight: "44px" }}
              />
            </div>
            {/* Language selection would go here */}
          </div>

          {/* About */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center">
              <Info className={cn("h-5 w-5 mr-2", isRTL && "ml-2 mr-0 scale-x-[-1]")} />
              {t("aboutTitle")}
            </h2>
            <Button
              variant="outline"
              className={cn("w-full justify-between py-3 px-4 text-lg", isRTL && "flex-row-reverse")}
              aria-label={t("privacyPolicyTitle")}
              style={{ minWidth: "44px", minHeight: "44px" }}
            > {/* ChevronRight is a directional icon, it should be mirrored in RTL */}
              {t("viewDetails")}
              <ChevronRight className={cn(
                "h-5 w-5",
                isRTL ? "ml-2 transform rotate-180" : "mr-2" // Rotate for RTL
              )} />
            </Button>
            <Button
              variant="outline"
              className={cn("w-full justify-between py-3 px-4 text-lg", isRTL && "flex-row-reverse")}
              aria-label={t("termsOfServiceTitle")}
              style={{ minWidth: "44px", minHeight: "44px" }}
            > {/* ChevronRight is a directional icon, it should be mirrored in RTL */}
              {t("viewDetails")}
              <ChevronRight className={cn(
                "h-5 w-5",
                isRTL ? "ml-2 transform rotate-180" : "mr-2" // Rotate for RTL
              )} />
            </Button>
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-4">
              {t("version")} 1.0.0
            </p>
          </div>

          {/* Logout Button */}
          <Button
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 text-lg rounded-lg shadow-md"
            aria-label={t("logoutButton")}
            style={{ minWidth: "44px", minHeight: "44px" }}
          >
            {t("logoutButton")}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

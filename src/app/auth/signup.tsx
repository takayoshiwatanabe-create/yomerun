"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useTranslations, useLocale } from "next-intl";
import { cn } from "@/lib/utils";

export default function SignUpPage() {
  const t = useTranslations("signup");
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [parentConsent, setParentConsent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    if (!email || !password || !confirmPassword) {
      setError(t("validation.emptyFields"));
      return false;
    }
    if (password.length < 8) {
      setError(t("validation.passwordTooShort"));
      return false;
    }
    if (password !== confirmPassword) {
      setError(t("validation.passwordsMismatch"));
      return false;
    }
    if (!parentConsent) {
      setError(t("validation.parentConsentRequired"));
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, 2000));

    if (Math.random() > 0.1) {
      console.log("Sign up successful");
      router.push(`/${locale}/auth/login`);
    } else {
      setError(t("error.general"));
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6">
        <CardHeader className="text-center mb-6">
          <CardTitle className="text-3xl font-bold text-gray-900 dark:text-white">
            {t("title")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className={cn("text-lg", isRTL && "text-right")}>
                {t("emailLabel")}
              </Label>
              <Input
                id="email"
                type="email"
                placeholder={t("emailPlaceholder")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="text-lg p-3"
                aria-label={t("emailLabel")}
                style={{ minWidth: "44px", minHeight: "44px" }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className={cn("text-lg", isRTL && "text-right")}>
                {t("passwordLabel")}
              </Label>
              <Input
                id="password"
                type="password"
                placeholder={t("passwordPlaceholder")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="text-lg p-3"
                aria-label={t("passwordLabel")}
                style={{ minWidth: "44px", minHeight: "44px" }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password" className={cn("text-lg", isRTL && "text-right")}>
                {t("confirmPasswordLabel")}
              </Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder={t("confirmPasswordPlaceholder")}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="text-lg p-3"
                aria-label={t("confirmPasswordLabel")}
                style={{ minWidth: "44px", minHeight: "44px" }}
              />
            </div>
            <div className={cn("flex items-center space-x-2", isRTL && "flex-row-reverse space-x-reverse")}>
              <Checkbox
                id="parent-consent"
                checked={parentConsent}
                onCheckedChange={(checked) => setParentConsent(!!checked)}
                aria-label={t("parentConsentLabel")}
                style={{ minWidth: "44px", minHeight: "44px" }}
              />
              <Label htmlFor="parent-consent" className="text-base cursor-pointer">
                {t("parentConsentLabel")}
              </Label>
            </div>
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 text-lg rounded-lg shadow-md"
              disabled={loading}
              aria-label={t("signUpButton")}
              style={{ minWidth: "44px", minHeight: "44px" }}
            >
              {loading ? t("loading") : t("signUpButton")}
            </Button>
          </form>
          <p className={cn("mt-6 text-center text-gray-700 dark:text-gray-300", isRTL && "flex flex-row-reverse justify-center")}>
            {t("alreadyHaveAccountPrompt")}{" "}
            <Button
              variant="link"
              onClick={() => router.push(`/${locale}/auth/login`)}
              className="text-blue-600 dark:text-blue-400 hover:underline p-0 h-auto text-base"
              aria-label={t("loginLink")}
              style={{ minWidth: "44px", minHeight: "44px" }}
            >
              {t("loginLink")}
            </Button>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}


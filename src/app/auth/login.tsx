"use client";

import React, { useState } from "react"; // Explicitly import React
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslations, useLocale } from "next-intl";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const t = useTranslations("login");
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Basic validation
    if (!email || !password) {
      setError(t("validation.emptyFields"));
      setLoading(false);
      return;
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (email === "parent@example.com" && password === "password123") {
      // Successful login
      console.log("Login successful");
      router.push(`/${locale}/`); // Redirect to home page
    } else {
      setError(t("error.invalidCredentials"));
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
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 text-lg rounded-lg shadow-md"
              disabled={loading}
              aria-label={t("loginButton")}
              style={{ minWidth: "44px", minHeight: "44px" }}
            >
              {loading ? t("loading") : t("loginButton")}
            </Button>
          </form>
          <p className={cn("mt-6 text-center text-gray-700 dark:text-gray-300", isRTL && "flex flex-row-reverse justify-center")}>
            {t("noAccountPrompt")}{" "}
            <Button
              variant="link"
              onClick={() => router.push(`/${locale}/auth/signup`)}
              className="text-blue-600 dark:text-blue-400 hover:underline p-0 h-auto text-base"
              aria-label={t("signUpLink")}
              style={{ minWidth: "44px", minHeight: "44px" }}
            >
              {t("signUpLink")}
            </Button>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

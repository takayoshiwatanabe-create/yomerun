```typescript
"use client";

import React, { useState, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Upload, ScanText, CheckCircle, XCircle } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { cn } from "@/lib/utils";

type OCRStatus = "idle" | "uploading" | "processing" | "completed" | "error";

export default function OCRScreen() {
  const t = useTranslations("ocr");
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const [status, setStatus] = useState<OCRStatus>("idle");
  const [progress, setProgress] = useState(0);
  const [ocrResult, setOcrResult] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

  const handleImageChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setImagePreviewUrl(URL.createObjectURL(file));
      setStatus("idle");
      setOcrResult(null);
      setProgress(0);
    }
  }, []);

  const simulateOCRProcess = useCallback(async () => {
    if (!selectedImage) return;

    setStatus("uploading");
    setProgress(0);
    setOcrResult(null);

    // Simulate upload
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setProgress(25);
    setStatus("processing");

    // Simulate OCR processing
    let currentProgress = 25;
    const interval = setInterval(() => {
      currentProgress += 10;
      if (currentProgress >= 90) {
        clearInterval(interval);
        currentProgress = 90;
      }
      setProgress(currentProgress);
    }, 500);

    // OCR処理完了時間: ≤ 8秒（90パーセンタイル）
    // Simulating 5 seconds here, which is within the 8-second target.
    await new Promise((resolve) => setTimeout(resolve, 5000));

    clearInterval(interval);
    setProgress(100);
    setStatus("completed");
    setOcrResult(t("sampleOcrText"));
  }, [selectedImage, t]);

  const renderStatusContent = useMemo(() => {
    switch (status) {
      case "idle":
        return (
          <>
            <Upload className={cn("h-12 w-12 text-blue-500 mb-4", isRTL && "transform scale-x-[-1]")} />
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-4 text-center">
              {selectedImage ? t("imageSelected") : t("selectImagePrompt")}
            </p>
            {selectedImage && (
              <Button
                onClick={simulateOCRProcess}
                className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-bold py-3 px-6 rounded-full text-lg"
                aria-label={t("startOcr")}
                style={{ minWidth: "44px", minHeight: "44px" }}
              >
                <ScanText className={cn("h-5 w-5", isRTL ? "ml-2" : "mr-2")} />
                {t("startOcr")}
              </Button>
            )}
          </>
        );
      case "uploading":
      case "processing":
        return (
          <>
            <ScanText className={cn("h-12 w-12 text-green-500 mb-4 animate-pulse", isRTL && "transform scale-x-[-1]")} />
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-4 text-center">
              {status === "uploading" ? t("uploadingImage") : t("processingImage")}
            </p>
            <Progress value={progress} className="w-full max-w-sm h-3 bg-gray-200 dark:bg-gray-700" />
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{progress}%</p>
          </>
        );
      case "completed":
        return (
          <>
            <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
            <p className="text-lg font-semibold text-gray-800 dark:text-white mb-4 text-center">
              {t("ocrCompleted")}
            </p>
            {ocrResult && (
              <Card className="w-full max-w-md mt-4 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-md text-gray-700 dark:text-gray-200">{t("ocrResultTitle")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-800 dark:text-gray-100 whitespace-pre-wrap">{ocrResult}</p>
                </CardContent>
              </Card>
            )}
            <Button
              onClick={() => {
                setStatus("idle");
                setOcrResult(null);
                setProgress(0);
                setSelectedImage(null);
                setImagePreviewUrl(null);
              }}
              className="mt-6 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-bold py-3 px-6 rounded-full text-lg"
              aria-label={t("processAnotherImage")}
              style={{ minWidth: "44px", minHeight: "44px" }}
            >
              {t("processAnotherImage")}
            </Button>
          </>
        );
      case "error":
        return (
          <>
            <XCircle className="h-12 w-12 text-red-500 mb-4" />
            <p className="text-lg text-red-600 dark:text-red-400 mb-4 text-center">
              {t("ocrError")}
            </p>
            <Button
              onClick={() => setStatus("idle")}
              className="mt-4 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-bold py-3 px-6 rounded-full text-lg"
              aria-label={t("tryAgain")}
              style={{ minWidth: "44px", minHeight: "44px" }}
            >
              {t("tryAgain")}
            </Button>
          </>
        );
      default:
        return null;
    }
  }, [status, progress, ocrResult, selectedImage, simulateOCRProcess, t, isRTL]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 bg-white dark:bg-gray-900">
      <Card className="w-full max-w-lg p-6 shadow-lg rounded-xl bg-white dark:bg-gray-800 border-none">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            {t("ocrScreenTitle")}
          </CardTitle>
          <p className="text-md text-gray-600 dark:text-gray-300">
            {t("ocrScreenSubtitle")}
          </p>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center mt-6">
          <div className="relative w-full max-w-xs h-48 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center overflow-hidden mb-6">
            {imagePreviewUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={imagePreviewUrl}
                alt={t("selectedImageAlt")}
                className="object-contain max-h-full max-w-full"
              />
            ) : (
              <span className="text-gray-500 dark:text-gray-400">{t("noImageSelected")}</span>
            )}
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
              aria-label={t("selectImage")}
              disabled={status === "processing" || status === "uploading"}
            />
          </div>

          <Button
            asChild
            className={cn(
              "bg-purple-500 hover:bg-purple-600 active:bg-purple-700 text-white font-bold py-3 px-6 rounded-full text-lg mb-8",
              (status === "processing" || status === "uploading") && "opacity-50 cursor-not-allowed"
            )}
            disabled={status === "processing" || status === "uploading"}
            style={{ minWidth: "44px", minHeight: "44px" }}
          >
            <label htmlFor="image-upload" className={cn("flex items-center justify-center cursor-pointer", isRTL && "flex-row-reverse")}>
              <Upload className={cn("h-5 w-5", isRTL ? "ml-2 transform scale-x-[-1]" : "mr-2")} />
              {t("selectImage")}
            </label>
          </Button>

          <div className="flex flex-col items-center justify-center w-full">
            {renderStatusContent}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
```

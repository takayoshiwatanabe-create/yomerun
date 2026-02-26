"use client";

import React from 'react';
import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, ScanText, CheckCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

type OCRStatus = "idle" | "uploading" | "processing" | "success" | "error";

export default function OCRScreen() {
  const t = useTranslations("ocr");
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const [status, setStatus] = useState<OCRStatus>("idle");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [ocrResult, setOcrResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(event.target.files[0]);
      setStatus("idle");
      setOcrResult(null);
      setError(null);
    }
  };

  const startOCRProcess = async () => {
    if (!selectedImage) {
      setError(t("noImageSelected"));
      return;
    }

    setStatus("uploading");
    setError(null);
    setOcrResult(null);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate upload time

    setStatus("processing");
    await new Promise((resolve) => setTimeout(resolve, 3000)); // Simulate processing time

    // Simulate success or error
    if (Math.random() > 0.2) {
      setOcrResult(t("sampleOcrResult"));
      setStatus("success");
    } else {
      setError(t("ocrFailed"));
      setStatus("error");
    }
  };

  const renderStatusContent = () => {
    switch (status) {
      case "idle":
        return (
          <>
            <Upload className={cn("h-12 w-12 text-blue-500 mb-4", isRTL && "scale-x-[-1]")} />
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-4 text-center">
              {selectedImage ? t("imageSelected") : t("selectImagePrompt")}
            </p>
            {selectedImage && (
              <Button
                onClick={startOCRProcess}
                className="flex items-center justify-center px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label={t("startOcr")}
                style={{ minWidth: "44px", minHeight: "44px" }}
              >
                <ScanText className={cn("h-5 w-5", isRTL ? "ml-2" : "mr-2", isRTL && "scale-x-[-1]")} />
                {t("startOcr")}
              </Button>
            )}
          </>
        );
      case "uploading":
      case "processing":
        return (
          <>
            <ScanText className={cn("h-12 w-12 text-green-500 mb-4 animate-pulse", isRTL && "scale-x-[-1]")} />
            <p className="text-lg text-gray-600 dark:text-gray-300 text-center">
              {status === "uploading" ? t("uploadingImage") : t("processingImage")}
            </p>
          </>
        );
      case "success":
        return (
          <>
            <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-4 text-center">
              {t("ocrSuccess")}
            </p>
            {ocrResult && (
              <div className="w-full p-4 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-800 dark:text-gray-200 text-sm break-words whitespace-pre-wrap">
                {ocrResult}
              </div>
            )}
            <Button
              onClick={() => {
                setSelectedImage(null);
                setOcrResult(null);
                setStatus("idle");
              }}
              className="mt-4 flex items-center justify-center px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label={t("tryAgain")}
              style={{ minWidth: "44px", minHeight: "44px" }}
            >
              {t("tryAgain")}
            </Button>
          </>
        );
      case "error":
        return (
          <>
            <XCircle className="h-12 w-12 text-red-500 mb-4" />
            <p className="text-lg text-red-600 dark:text-red-400 mb-4 text-center">
              {error || t("ocrFailed")}
            </p>
            <Button
              onClick={() => {
                setSelectedImage(null);
                setOcrResult(null);
                setStatus("idle");
              }}
              className="mt-4 flex items-center justify-center px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label={t("tryAgain")}
              style={{ minWidth: "44px", minHeight: "44px" }}
            >
              {t("tryAgain")}
            </Button>
          </>
        );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6">
        <CardHeader className="text-center mb-6">
          <CardTitle className="text-3xl font-bold text-gray-900 dark:text-white">
            {t("title")}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center">
          {selectedImage && (
            <div className="mb-6 w-full max-w-xs h-48 relative border-2 border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
              <Image
                src={URL.createObjectURL(selectedImage)}
                alt={t("selectedImageAlt")}
                layout="fill"
                objectFit="contain"
                className="rounded-lg"
              />
            </div>
          )}

          <div className="w-full flex flex-col items-center justify-center min-h-[150px]">
            {renderStatusContent()}
          </div>

          <input
            type="file"
            id="image-upload"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
          <Button
            asChild
            className="mt-6 w-full flex items-center justify-center px-6 py-3 text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            aria-label={t("selectImage")}
            style={{ minWidth: "44px", minHeight: "44px" }}
          >
            <label htmlFor="image-upload" className={cn("flex items-center justify-center cursor-pointer", isRTL && "flex-row-reverse")}>
              <Upload className={cn("h-5 w-5", isRTL ? "ml-2 scale-x-[-1]" : "mr-2")} />
              {t("selectImage")}
            </label>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}


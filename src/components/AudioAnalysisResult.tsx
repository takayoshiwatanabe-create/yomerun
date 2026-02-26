```typescript
"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Star, Volume2, Lightbulb } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { cn } from "@/lib/utils";

interface WordAnalysis {
  word: string;
  isCorrect: boolean;
  confidence: number; // 0-100
}

interface AudioAnalysisResultProps {
  analysis: {
    overallScore: number; // 0-100
    words: WordAnalysis[];
    feedbackMessageKey: string; // Key for a positive feedback message
    tipsKey?: string; // Optional key for a tip
  } | null;
  isLoading: boolean;
  error: string | null;
}

export function AudioAnalysisResult({ analysis, isLoading, error }: AudioAnalysisResultProps) {
  const t = useTranslations("audioAnalysis");
  const locale = useLocale();
  const isRTL = locale === 'ar';

  if (isLoading) {
    return (
      <Card className="w-full max-w-md p-6 shadow-lg rounded-xl bg-white dark:bg-gray-800 border-none mt-8">
        <CardContent className="flex flex-col items-center justify-center py-8">
          <Volume2 className="h-12 w-12 text-blue-500 mb-4 animate-bounce" />
          <p className="text-lg text-gray-600 dark:text-gray-300 text-center">
            {t("processingAudio")}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            {t("pleaseWait")}
          </p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full max-w-md p-6 shadow-lg rounded-xl bg-white dark:bg-gray-800 border-none mt-8">
        <CardContent className="flex flex-col items-center justify-center py-8">
          <Lightbulb className="h-12 w-12 text-red-500 mb-4" />
          <p className="text-lg text-red-600 dark:text-red-400 text-center">
            {t("errorMessage")}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            {error}
          </p>
        </CardContent>
      </Card>
    );
  }

  if (!analysis) {
    return null;
  }

  const getWordColor = (isCorrect: boolean, confidence: number) => {
    if (isCorrect && confidence >= 80) return "text-green-600 dark:text-green-400";
    if (isCorrect && confidence >= 50) return "text-yellow-600 dark:text-yellow-400";
    return "text-orange-600 dark:text-orange-400";
  };

  return (
    <Card className="w-full max-w-md p-6 shadow-lg rounded-xl bg-white dark:bg-gray-800 border-none mt-8">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
          {t("analysisTitle")}
        </CardTitle>
        <div className="flex items-center justify-center mb-4">
          <Star className="h-8 w-8 text-yellow-400 fill-yellow-400 mr-2" />
          <p className="text-2xl font-semibold text-gray-800 dark:text-white">
            {t("overallScore", { score: analysis.overallScore })}
          </p>
        </div>
        <p className="text-md text-gray-700 dark:text-gray-300">
          {t(analysis.feedbackMessageKey)}
        </p>
      </CardHeader>
      <CardContent className="mt-6">
        {analysis.words.length > 0 && (
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
              {t("wordBreakdownTitle")}
            </h3>
            <div className={cn(
              "flex flex-wrap gap-2",
              isRTL ? 'flex-row-reverse' : 'flex-row'
            )}>
              {analysis.words.map((item, index) => (
                <span
                  key={index}
                  className={cn(
                    "px-3 py-1 rounded-full text-sm font-medium",
                    item.isCorrect && item.confidence >= 80 ? "bg-green-100 dark:bg-green-900" :
                    item.isCorrect && item.confidence >= 50 ? "bg-yellow-100 dark:bg-yellow-900" :
                    "bg-orange-100 dark:bg-orange-900",
                    getWordColor(item.isCorrect, item.confidence)
                  )}
                  aria-label={`${item.word}: ${item.isCorrect ? t("correct") : t("incorrect")}, ${t("confidence", { confidence: item.confidence })}`}
                >
                  {item.word}
                </span>
              ))}
            </div>
          </div>
        )}

        {analysis.tipsKey && (
          <div className={cn(
            "mt-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg flex items-start",
            isRTL ? 'flex-row-reverse' : 'flex-row'
          )}>
            <Lightbulb className={cn(
              "h-6 w-6 text-blue-600 dark:text-blue-400 mt-1",
              isRTL ? 'ml-3 transform scale-x-[-1]' : 'mr-3' // Flip icon for RTL
            )} />
            <div>
              <h4 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-1">
                {t("tipTitle")}
              </h4>
              <p className="text-blue-700 dark:text-blue-300 text-base">
                {t(analysis.tipsKey)}
              </p>
            </div>
          </div>
        )}

        <div className="mt-8 text-center">
          <CheckCircle className="h-10 w-10 text-green-500 mx-auto mb-2" />
          <p className="text-lg font-semibold text-gray-800 dark:text-white">
            {t("greatJob")}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
```

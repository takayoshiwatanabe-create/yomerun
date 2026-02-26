```typescript
"use client";

import React from "react";
import { Button } from "@/components/ui/button"; // Assuming shadcn/ui Button component
import { Mic, StopCircle } from "lucide-react";
import { useTranslations, useLocale } from "next-intl"; // Import useLocale
import { cn } from "@/lib/utils"; // Utility for conditional class names

interface RecordingButtonProps {
  onStartRecording: () => void;
  onStopRecording: () => void;
  isRecording: boolean;
  disabled?: boolean;
}

export function RecordingButton({
  onStartRecording,
  onStopRecording,
  isRecording,
  disabled = false,
}: RecordingButtonProps) {
  const t = useTranslations("recording");
  const locale = useLocale(); // Get current locale
  const isRTL = locale === 'ar'; // Check if it's an RTL language

  const handleClick = () => {
    if (isRecording) {
      onStopRecording();
    } else {
      onStartRecording();
    }
  };

  return (
    <Button
      onClick={handleClick}
      disabled={disabled}
      className={cn(
        "relative flex items-center justify-center rounded-full p-4 transition-all duration-300 ease-in-out",
        isRecording
          ? "bg-red-500 hover:bg-red-600 active:bg-red-700 w-24 h-24"
          : "bg-blue-500 hover:bg-blue-600 active:bg-blue-700 w-20 h-20",
        disabled && "opacity-50 cursor-not-allowed"
      )}
      aria-label={isRecording ? t("stopRecording") : t("startRecording")}
      style={{
        minWidth: "44px", // WCAG 2.1 AA requirement
        minHeight: "44px", // WCAG 2.1 AA requirement
      }}
    >
      {isRecording ? (
        <>
          <StopCircle className="h-10 w-10 text-white animate-pulse" />
          <span className="sr-only">{t("stopRecording")}</span>
          {/* The animate-ping-slow class needs to be defined in CSS or Tailwind config for the animation to work. */}
          {/* For now, assuming animate-ping is sufficient or animate-ping-slow will be defined. */}
          <div className="absolute inset-0 rounded-full border-4 border-red-300 animate-ping" />
        </>
      ) : (
        <>
          <Mic className={cn("h-8 w-8 text-white", isRTL && "transform scale-x-[-1]")} /> {/* Apply RTL flip */}
          <span className="sr-only">{t("startRecording")}</span>
        </>
      )}
    </Button>
  );
}
```

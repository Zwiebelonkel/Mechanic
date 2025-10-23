"use client";
import dynamic from "next/dynamic";

const CalendarPreview = dynamic(() => import("./calendar-preview"), {
  ssr: false,
});

export default function CalendarPreviewWrapper() {
  return <CalendarPreview />;
}

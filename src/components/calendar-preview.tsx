"use client";

import { useEffect, useState } from "react";
import { Wrench, CalendarDays, Clock, User } from "lucide-react";

export default function CalendarPreview() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiUrl = `${
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
    }/api/calendar/events`;

    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setEvents(data.events);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fehler beim Laden der Kalenderdaten:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="mt-10 border-t pt-6 text-center text-gray-500">
        ⏳ Termine werden geladen ...
      </div>
    );
  }

  return (
    <div className="mt-12 border-t pt-8">
      <h2 className="text-3xl font-semibold mb-6 flex items-center gap-2">
        <CalendarDays className="w-7 h-7 text-orange-600" />
        Kommende Werkstatt-Termine
      </h2>

      {events.length === 0 && (
        <p className="text-gray-500 italic">
          Derzeit sind keine Termine geplant.
        </p>
      )}

      <div className="space-y-4">
        {events.map((e) => {
          const start = new Date(e.start.dateTime || e.start.date);
          const end = new Date(e.end.dateTime || e.end.date);
          const isToday = start.toDateString() === new Date().toDateString();

          return (
            <div
              key={e.id || start.toISOString()}
              className={`p-5 rounded-xl shadow-sm border transition-all ${
                isToday
                  ? "bg-orange-50 border-orange-300"
                  : "bg-white hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Wrench className="w-5 h-5 text-orange-600" />
                  <h3 className="font-semibold text-lg">
                    {e.summary || "Unbenannter Termin"}
                  </h3>
                </div>
                <span
                  className={`text-sm px-3 py-1 rounded-full ${
                    isToday
                      ? "bg-orange-600 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {isToday
                    ? "Heute"
                    : start.toLocaleDateString("de-DE", { weekday: "long" })}
                </span>
              </div>

              <div className="mt-3 text-sm text-gray-600 space-y-1">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {start.toLocaleTimeString("de-DE", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}{" "}
                  –{" "}
                  {end.toLocaleTimeString("de-DE", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
                {e.description && (
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span className="text-gray-700">
                      {extractCustomerName(e.description)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// 🧠 Kleine Hilfsfunktion: extrahiert Kundennamen aus Beschreibung
function extractCustomerName(desc: string) {
  const match = desc.match(/Kunde:\s*(.+)/i);
  return match ? match[1].split("\n")[0] : "Unbekannt";
}

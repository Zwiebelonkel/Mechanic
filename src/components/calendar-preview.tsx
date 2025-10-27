"use client";

import { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wrench, Clock, User, CalendarDays } from "lucide-react";
import { de } from "date-fns/locale";

interface CalendarEvent {
  id: string;
  summary: string;
  description: string;
  start: { dateTime: string; date: string };
  end: { dateTime: string; date: string };
}

export default function CalendarPreview() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );

  useEffect(() => {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || "https://mechanicbackend-bwey.onrender.com"}/api/calendar/events`;

    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setEvents(data.events);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fehler beim Laden der Kalenderdaten:", err);
        setLoading(false);
      });
  }, []);

  const eventDates = events.map(
    (event) => new Date(event.start.dateTime || event.start.date)
  );

  const eventsForSelectedDay = selectedDate
    ? events.filter((event) => {
        const eventDate = new Date(event.start.dateTime || event.start.date);
        return eventDate.toDateString() === selectedDate.toDateString();
      })
    : [];

  // Helper to extract customer name from description
  function extractCustomerName(desc: string) {
    if (!desc) return "Unbekannt";
    const match = desc.match(/Kunde:\s*(.+)/i);
    return match ? match[1].split("\n")[0] : "Unbekannt";
  }

  return (
    <div className="mt-12 border-t pt-8">
      <h2 className="text-3xl font-semibold mb-6 flex items-center gap-2">
        <CalendarDays className="w-7 h-7 text-primary" />
        Werkstatt-Kalender
      </h2>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-muted-foreground">⏳ Termine werden geladen ...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <Card>
            <Calendar
              locale={de}
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="p-0"
              classNames={{
                month: "space-y-4 p-4",
                caption: "relative flex justify-center items-center",
              }}
              modifiers={{
                hasEvent: eventDates,
              }}
              modifiersStyles={{
                hasEvent: {
                  fontWeight: "bold",
                  textDecoration: "underline",
                  textDecorationColor: "hsl(var(--primary))",
                  textUnderlineOffset: "0.2rem",
                },
              }}
            />
          </Card>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">
              Termine für den{" "}
              {selectedDate
                ? selectedDate.toLocaleDateString("de-DE", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "ausgewählten Tag"}
            </h3>
            {eventsForSelectedDay.length > 0 ? (
              eventsForSelectedDay.map((e) => {
                const start = new Date(e.start.dateTime || e.start.date);
                const end = new Date(e.end.dateTime || e.end.date);
                return (
                  <Card key={e.id} className="bg-card/50">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-3">
                        <Wrench className="w-5 h-5 text-primary" />
                        {e.summary || "Unbenannter Termin"}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>
                          {start.toLocaleTimeString("de-DE", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}{" "}
                          –{" "}
                          {end.toLocaleTimeString("de-DE", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <User className="w-4 h-4" />
                        <span>{extractCustomerName(e.description)}</span>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            ) : (
              <p className="text-muted-foreground italic pt-4">
                Für diesen Tag sind keine Termine geplant.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

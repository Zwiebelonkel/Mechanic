"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  appointmentSchema,
  scheduleAppointment,
  type AppointmentData,
} from "@/app/actions";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import { Calendar as CalendarIcon, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

const timeSlots = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];

interface CalendarEvent {
  id: string;
  summary: string;
  description: string;
  start: { dateTime: string; date: string };
  end: { dateTime: string; date: string };
}

export default function AppointmentForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const apiUrl = `${
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
    }/api/calendar/events`;

    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setEvents(data.events);
        }
      })
      .catch((err) => {
        console.error("Fehler beim Laden der Kalenderdaten:", err);
      });
  }, []);

  const form = useForm<AppointmentData>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      issue: "",
    },
  });

  async function onSubmit(data: AppointmentData) {
    setIsSubmitting(true);
    try {
      const result = await scheduleAppointment(data);
      const message = result.success
        ? result.message
        : "Terminvereinbarung fehlgeschlagen. Bitte versuchen Sie es erneut.";

      toast({
        title: result.success ? "Erfolg!" : "Fehler",
        description: message,
        variant: result.success ? "default" : "destructive",
      });

      if (result.success) form.reset();
    } catch (error) {
      toast({
        title: "Ein unerwarteter Fehler ist aufgetreten.",
        description: "Bitte versuchen Sie es später noch einmal.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vollständiger Name</FormLabel>
                <FormControl>
                  <Input placeholder="Max Mustermann" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-Mail-Adresse</FormLabel>
                <FormControl>
                  <Input placeholder="max.mustermann@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefonnummer</FormLabel>
              <FormControl>
                <Input placeholder="+49 123 4567890" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Wunschtermin</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP", { locale: de })
                        ) : (
                          <span>Wählen Sie ein Datum</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      locale={de}
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date < new Date(new Date().setHours(0, 0, 0, 0)) ||
                        date.getDay() === 0 ||
                        date.getDay() === 6
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Wunschuhrzeit</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Wählen Sie eine Uhrzeit" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {timeSlots.map((slot) => {
                      const isBlocked = form.watch("date")
                        ? events.some((event) => {
                            const eventDate = new Date(
                              event.start.dateTime || event.start.date
                            );
                            const selectedDate = form.watch("date");
                            const slotTime = slot.split(":");
                            const slotDate = new Date(selectedDate);
                            slotDate.setHours(
                              parseInt(slotTime[0]),
                              parseInt(slotTime[1]),
                              0,
                              0
                            );

                            return (
                              eventDate.toDateString() ===
                                selectedDate.toDateString() &&
                              eventDate.getHours() === parseInt(slotTime[0])
                            );
                          })
                        : false;

                      return (
                        <SelectItem
                          key={slot}
                          value={slot}
                          disabled={isBlocked}
                          className={cn(
                            isBlocked && "opacity-50 cursor-not-allowed"
                          )}
                        >
                          {slot} Uhr {isBlocked && "(Blockiert)"}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="issue"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kurze Beschreibung des Fahrzeugproblems</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="z.B. seltsames Geräusch beim Rechtsabbiegen, Motorkontrollleuchte an..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full md:w-auto"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Wird gesendet...
            </>
          ) : (
            "Termin anfragen"
          )}
        </Button>
      </form>
    </Form>
  );
}

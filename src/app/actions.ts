import { z } from "zod";
import { de } from "date-fns/locale";
import { format } from "date-fns";

// Define schema (this is okay to export as a constant)
export const appointmentSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Der Name muss mindestens 2 Zeichen lang sein." }),
  email: z
    .string()
    .email({ message: "Bitte geben Sie eine gültige E-Mail-Adresse ein." }),
  phone: z
    .string()
    .min(10, { message: "Bitte geben Sie eine gültige Telefonnummer ein." }),
  date: z.date({ required_error: "Bitte wählen Sie ein Datum." }),
  time: z.string({ required_error: "Bitte wählen Sie eine Uhrzeit." }),
  issue: z
    .string()
    .min(10, {
      message: "Bitte beschreiben Sie das Problem (mind. 10 Zeichen).",
    })
    .max(500, { message: "Die Beschreibung ist zu lang (max. 500 Zeichen)." }),
});

export type AppointmentData = z.infer<typeof appointmentSchema>;

// This async function is correct
export async function scheduleAppointment(data: AppointmentData) {
  const API_URL = "https://mechanicbackend-bwey.onrender.com/api/appointments";
  // const API_URL = "http://localhost:3000/api/appointments";

  try {
    console.log("📤 Sende Termin an Backend:", data);

    // Start- und Endzeit im ISO-Format (Termin dauert 1 Stunde)
    const start = new Date(
      `${format(data.date, "yyyy-MM-dd")}T${data.time}:00`
    );
    const end = new Date(start.getTime() + 60 * 60 * 1000);

    const body = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      service: data.issue,
      start_iso: start.toISOString(),
      end_iso: end.toISOString(),
      notes: "",
    };

    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const result = await res.json();

    if (!res.ok || !result.success) {
      console.error("❌ Backend-Fehler:", result);
      return {
        success: false,
        message:
          result.error ||
          "Terminvereinbarung fehlgeschlagen. Bitte versuchen Sie es erneut.",
      };
    }

    return {
      success: true,
      message: `✅ Termin bestätigt für ${format(data.date, "PPP", {
        locale: de,
      })} um ${data.time}. Eine Bestätigung wurde an ${data.email} gesendet.`,
    };
  } catch (error: any) {
    console.error("⚠️ Netzwerkfehler:", error);
    return {
      success: false,
      message: "Verbindungsfehler. Bitte versuchen Sie es später erneut.",
    };
  }
}

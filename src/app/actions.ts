
'use server';
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

  try {
    console.log("📤 Sende Terminanfrage an Backend:", data);

    const start = new Date(
      `${format(data.date, "yyyy-MM-dd")}T${data.time}:00`
    );
    const end = new Date(start.getTime() + 60 * 60 * 1000);

    // Pack customer details into notes to avoid the attendee invitation error
    const customerNotes = `Kunde: ${data.name}\nE-Mail: ${data.email}\nTelefon: ${data.phone}`;

    const body = {
      name: data.name,
      // Send shop email to avoid inviting the customer, which causes an error.
      // The backend will use this, but since it's the calendar owner, no invite is sent.
      email: "info@automeisterei-seibel.de", 
      phone: data.phone,
      service: `Anfrage: ${data.issue}`, // Mark as a request
      start_iso: start.toISOString(),
      end_iso: end.toISOString(),
      notes: customerNotes, // Pass all customer info in the notes field
    };

    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const result = await res.json();

    if (!res.ok || result.error) {
      console.error("❌ Backend-Fehler:", result);
      return {
        success: false,
        message:
          result.error ||
          "Terminanfrage fehlgeschlagen. Bitte versuchen Sie es erneut.",
      };
    }

    return {
      success: true,
      message: `✅ Terminanfrage erhalten für den ${format(data.date, "PPP", {
        locale: de,
      })} um ${data.time}. Wir prüfen die Verfügbarkeit und senden Ihnen eine separate Bestätigung.`,
    };
  } catch (error: any) {
    console.error("⚠️ Netzwerkfehler:", error);
    return {
      success: false,
      message: "Verbindungsfehler. Bitte versuchen Sie es später erneut.",
    };
  }
}

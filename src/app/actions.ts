"use server";

import { z } from "zod";
import { de } from 'date-fns/locale';
import { format } from "date-fns";

export const appointmentSchema = z.object({
  name: z.string().min(2, { message: "Der Name muss mindestens 2 Zeichen lang sein." }),
  email: z.string().email({ message: "Bitte geben Sie eine gültige E-Mail-Adresse ein." }),
  phone: z.string().min(10, { message: "Bitte geben Sie eine gültige Telefonnummer ein." }),
  date: z.date({ required_error: "Bitte wählen Sie ein Datum." }),
  time: z.string({ required_error: "Bitte wählen Sie eine Uhrzeit." }),
  issue: z.string().min(10, { message: "Bitte beschreiben Sie das Problem (mind. 10 Zeichen)." }).max(500, { message: "Die Beschreibung ist zu lang (max. 500 Zeichen)." }),
});

export type AppointmentData = z.infer<typeof appointmentSchema>;

export async function scheduleAppointment(data: AppointmentData) {
  console.log("Termin wird vereinbart:", data);
  await new Promise(resolve => setTimeout(resolve, 1500));

  if (data.name.toLowerCase().includes('fail')) {
    return {
      success: false,
      message: "Terminvereinbarung fehlgeschlagen. Bitte versuchen Sie es erneut.",
    };
  }

  return {
    success: true,
    message: `Termin bestätigt für ${format(data.date, "PPP", { locale: de })} um ${data.time}. Eine Bestätigung wurde an ${data.email} gesendet.`,
  };
}

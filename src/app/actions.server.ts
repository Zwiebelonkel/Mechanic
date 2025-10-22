"use server";

import type { AppointmentData } from "./actions";
import { de } from "date-fns/locale";
import { format } from "date-fns";

export async function scheduleAppointment(data: AppointmentData) {
  console.log("Termin wird vereinbart:", data);
  await new Promise((resolve) => setTimeout(resolve, 1500));

  if (data.name.toLowerCase().includes("fail")) {
    return {
      success: false,
      message:
        "Terminvereinbarung fehlgeschlagen. Bitte versuchen Sie es erneut.",
    };
  }

  return {
    success: true,
    message: `Termin bestätigt für ${format(data.date, "PPP", {
      locale: de,
    })} um ${data.time} Uhr. Eine Bestätigung wurde an ${data.email} gesendet.`,
  };
}

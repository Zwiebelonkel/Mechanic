import type { AppointmentData } from "./actions";
import { de } from "date-fns/locale";
import { format } from "date-fns";

// Client-side stub for scheduleAppointment used for static deployment.
// When backend is available, replace this with a real fetch to your API/Render service.
export async function scheduleAppointment(data: AppointmentData) {
  console.log("(client) Termin wird vereinbart:", data);
  // simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 800));

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

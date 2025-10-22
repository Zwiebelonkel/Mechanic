"use server";

import { z } from "zod";

export const appointmentSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  date: z.date({ required_error: "Please select a date." }),
  time: z.string({ required_error: "Please select a time." }),
  issue: z.string().min(10, { message: "Please describe the issue (min. 10 characters)." }).max(500, { message: "Description is too long (max. 500 characters)." }),
});

export type AppointmentData = z.infer<typeof appointmentSchema>;

export async function scheduleAppointment(data: AppointmentData) {
  // Here you would integrate with Google Calendar API
  // For demonstration, we'll simulate an API call
  console.log("Scheduling appointment:", data);
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Simulate a potential failure
  if (data.name.toLowerCase().includes('fail')) {
    return {
      success: false,
      message: "Failed to schedule. Please try again.",
    };
  }

  return {
    success: true,
    message: `Appointment confirmed for ${data.date.toLocaleDateString()} at ${data.time}. A confirmation has been sent to ${data.email}.`,
  };
}

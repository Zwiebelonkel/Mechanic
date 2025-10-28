
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AppointmentManager from "@/components/appointment-manager";
import { Loader2 } from "lucide-react";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // Check for authentication status only on the client-side
    const authStatus = sessionStorage.getItem("admin-auth") === "true";
    if (!authStatus) {
      router.replace("/admin");
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  // While checking for authentication, show a loading state
  if (isAuthenticated === null) {
    return (
      <div className="container mx-auto flex min-h-[70vh] items-center justify-center py-12 px-4">
        <div className="flex items-center gap-4 text-muted-foreground">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <span>Authentifizierung wird geprüft...</span>
        </div>
      </div>
    );
  }

  // If authenticated, render the dashboard content
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-headline font-bold">
          Terminverwaltung
        </h1>
        <p className="mt-2 text-muted-foreground">
          Hier können Sie alle anstehenden Termine einsehen und verwalten.
        </p>
      </div>

      <AppointmentManager />

      <div className="mt-16">
        <div className="text-center mb-10">
            <h2 className="text-3xl font-headline font-bold">Kalenderübersicht</h2>
            <p className="mt-2 text-muted-foreground">
                Eine Live-Ansicht Ihres Google Kalenders.
            </p>
        </div>
        <div className="relative h-0 pb-[75%] md:pb-[50%] lg:pb-[40%] overflow-hidden rounded-lg shadow-xl border bg-background">
             <iframe
                src="https://calendar.google.com/calendar/embed?src=b2818272096757279101c7edfb7f75cec60d5a6cde1b5bc51a2cb1cdf41d826b%40group.calendar.google.com&ctz=Europe%2FBerlin"
                className="absolute top-0 left-0 w-full h-full dark:invert dark:hue-rotate-180 transition-all duration-300"
                style={{border: 0}}
                width="800"
                height="600"
                frameBorder="0"
                scrolling="no">
            </iframe>
        </div>
      </div>
    </div>
  );
}


"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AppointmentManager from "@/components/appointment-manager";

export default function AdminDashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem("admin-auth");
    if (isAuthenticated !== "true") {
      router.replace("/admin");
    }
  }, [router]);

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
                className="absolute top-0 left-0 w-full h-full"
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

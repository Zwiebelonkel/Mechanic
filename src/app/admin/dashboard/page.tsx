
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
    </div>
  );
}

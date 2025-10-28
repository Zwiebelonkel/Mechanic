
"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2, RefreshCw, Check, X, Ban, ThumbsUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Google Calendar response statuses
type GCalStatus = "accepted" | "declined" | "tentative" | "needsAction";

interface Appointment {
  id: string;
  summary: string;
  description: string;
  start_iso: string;
  end_iso: string;
  status: GCalStatus;
  attendees: { email: string; responseStatus: GCalStatus }[];
}

// Helper to map GCal status to our desired display status and style
const statusMap: Record<
  GCalStatus,
  { text: string; variant: "default" | "destructive" | "secondary"; icon: React.ElementType }
> = {
  accepted: { text: "Bestätigt", variant: "default", icon: ThumbsUp },
  declined: { text: "Abgelehnt", variant: "destructive", icon: Ban },
  tentative: { text: "Ausstehend", variant: "secondary", icon: Loader2 },
  needsAction: { text: "Ausstehend", variant: "secondary", icon: Loader2 },
};

export default function AppointmentManager() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState<string | null>(null);
  const { toast } = useToast();
  const API_URL = `${
    process.env.NEXT_PUBLIC_API_URL || "https://mechanicbackend-bwey.onrender.com"
  }/api/appointments`;

  const fetchAppointments = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Fehler beim Laden der Termine.");
      const data = await res.json();

      if (!data.success || !Array.isArray(data.events)) {
         throw new Error(data.message || "Ungültige Antwort vom Server.");
      }

      const sortedAppointments = data.events.sort(
        (a: Appointment, b: Appointment) =>
          new Date(a.start_iso).getTime() - new Date(b.start_iso).getTime()
      );
      setAppointments(sortedAppointments);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Fehler",
        description: error.message || "Termine konnten nicht geladen werden.",
      });
      setAppointments([]); // Bei Fehler leeres Array setzen
    } finally {
      setIsLoading(false);
    }
  }, [toast, API_URL]);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  const handleUpdateStatus = async (
    id: string,
    status: "accepted" | "declined"
  ) => {
    setIsUpdating(id);
    try {
      const res = await fetch(`${API_URL}/${id}/status`, {
        method: "PATCH", // Use PATCH as defined in the backend
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        throw new Error(
          result.message || "Terminstatus konnte nicht aktualisiert werden."
        );
      }

      toast({
        title: "Erfolg!",
        description: `Der Termin wurde erfolgreich ${
          status === "accepted" ? "bestätigt" : "abgelehnt"
        }.`,
      });
      // Re-fetch appointments to show the latest status
      await fetchAppointments();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Fehler beim Aktualisieren",
        description: error.message,
      });
    } finally {
      setIsUpdating(null);
    }
  };
  
  // Extracts customer name and email from description
  const parseDescription = (desc: string) => {
    const safeDesc = desc || "";
    const nameMatch = safeDesc.match(/Kunde:\s*(.*)/);
    const emailMatch = safeDesc.match(/E-Mail:\s*(.*)/);
    const phoneMatch = safeDesc.match(/Telefon:\s*(.*)/);

    return {
        name: nameMatch ? nameMatch[1].split('\n')[0].trim() : 'N/A',
        email: emailMatch ? emailMatch[1].split('\n')[0].trim() : 'N/A',
        phone: phoneMatch ? phoneMatch[1].split('\n')[0].trim() : 'N/A',
    };
  }


  const formatDate = (isoString: string) => {
    if (!isoString) return "Ungültiges Datum";
    const date = new Date(isoString);
    return date.toLocaleString("de-DE", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  if (isLoading && appointments.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="ml-4 text-muted-foreground">Termine werden geladen...</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="flex justify-end p-4 border-b">
        <Button
          variant="outline"
          size="sm"
          onClick={fetchAppointments}
          disabled={isLoading}
        >
          <RefreshCw
            className={cn("w-4 h-4 mr-2", isLoading && "animate-spin")}
          />
          Aktualisieren
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Datum & Uhrzeit</TableHead>
            <TableHead>Kunde</TableHead>
            <TableHead>Anliegen</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Aktionen</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appointments.length > 0 ? (
            appointments.map((apt) => {
              const { name, email, phone } = parseDescription(apt.description);
              const displayStatus = statusMap[apt.status] || statusMap.needsAction;
              const service = (apt.summary || '').split('–')[0]?.replace('Werkstatt: ','').trim() || 'Service';

              return (
              <TableRow key={apt.id}>
                <TableCell className="font-medium">
                  {formatDate(apt.start_iso)}
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-semibold">{name}</span>
                    <span className="text-muted-foreground text-sm">{email}</span>
                     <span className="text-muted-foreground text-xs">{phone}</span>
                  </div>
                </TableCell>
                <TableCell>{service}</TableCell>
                <TableCell>
                  <Badge variant={displayStatus.variant}>{displayStatus.text}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  {isUpdating === apt.id ? (
                    <Loader2 className="w-4 h-4 animate-spin ml-auto" />
                  ) : (
                    <div className="flex gap-2 justify-end">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleUpdateStatus(apt.id, "accepted")}
                        disabled={apt.status === "accepted"}
                        title="Bestätigen"
                      >
                        <Check className="w-4 h-4 text-green-500" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleUpdateStatus(apt.id, "declined")}
                        disabled={apt.status === "declined"}
                        title="Ablehnen"
                      >
                        <X className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            )})
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                Keine Termine gefunden.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}


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
import { Loader2, RefreshCw, Check, X, Ban, ThumbsUp, HelpCircle } from "lucide-react";
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
  tentative: { text: "Anfrage", variant: "secondary", icon: HelpCircle },
  needsAction: { text: "Anfrage", variant: "secondary", icon: HelpCircle },
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

  const handleConfirm = async (apt: Appointment) => {
    setIsUpdating(apt.id);
    try {
      // 1. Update status to 'accepted'
      const statusRes = await fetch(`${API_URL}/${apt.id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "accepted" }),
      });
      if (!statusRes.ok) throw new Error("Status konnte nicht aktualisiert werden.");

      // 2. Update summary to remove "Anfrage:"
      const newSummary = apt.summary.replace(/^Anfrage:\s*/, "");
      const summaryRes = await fetch(`${API_URL}/${apt.id}/summary`, {
          method: 'PATCH',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({ summary: newSummary }),
      });
      if (!summaryRes.ok) throw new Error("Titel konnte nicht aktualisiert werden.");

      toast({
        title: "Erfolg!",
        description: `Der Termin wurde erfolgreich bestätigt.`,
      });
      await fetchAppointments();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Fehler beim Bestätigen",
        description: error.message,
      });
    } finally {
      setIsUpdating(null);
    }
  };

  const handleDecline = async (id: string) => {
      setIsUpdating(id);
      try {
          // Instead of patching, we now delete the event
          const res = await fetch(`${API_URL}/${id}`, {
              method: 'DELETE',
          });
          
          const result = await res.json();
          if (!res.ok || !result.success) {
              throw new Error(result.message || 'Terminanfrage konnte nicht gelöscht werden.');
          }

          toast({
              title: 'Anfrage abgelehnt',
              description: 'Die Terminanfrage wurde erfolgreich aus dem Kalender entfernt.',
          });
          await fetchAppointments();
      } catch (error: any) {
          toast({
              variant: 'destructive',
              title: 'Fehler beim Ablehnen',
              description: error.message,
          });
      } finally {
          setIsUpdating(null);
      }
  }

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
              
              const isRequest = apt.summary.startsWith("Anfrage:");
              const effectiveStatus = isRequest ? 'needsAction' : apt.status;
              const displayStatus = statusMap[effectiveStatus] || statusMap.needsAction;
              
              const service = (apt.summary || '').replace(/^Anfrage:\s*/, '').split('–')[0]?.replace('Werkstatt: ','').trim() || 'Service';

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
                      {effectiveStatus === 'needsAction' ? (
                        <>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleConfirm(apt)}
                            title="Bestätigen"
                          >
                            <Check className="w-4 h-4 text-green-500" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDecline(apt.id)}
                            title="Ablehnen & Löschen"
                          >
                            <X className="w-4 h-4 text-destructive" />
                          </Button>
                        </>
                      ) : (
                        <span className="text-sm text-muted-foreground italic">
                           {displayStatus.text}
                        </span>
                      )}
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


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
  { text: string; className: string; icon: React.ElementType }
> = {
  accepted: { text: "Bestätigt", className: "bg-green-500/20 text-green-500 border-green-500/40 hover:bg-green-500/30", icon: ThumbsUp },
  declined: { text: "Abgelehnt", className: "bg-red-500/20 text-red-500 border-red-500/40 hover:bg-red-500/30", icon: Ban },
  tentative: { text: "Anfrage", className: "bg-yellow-500/20 text-yellow-500 border-yellow-500/40 hover:bg-yellow-500/30", icon: HelpCircle },
  needsAction: { text: "Anfrage", className: "bg-yellow-500/20 text-yellow-500 border-yellow-500/40 hover:bg-yellow-500/30", icon: HelpCircle },
};

export default function AppointmentManager() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState<string | null>(null);
  const { toast } = useToast();
  const API_URL = `${
    process.env.NEXT_PUBLIC_API_URL || "https://mechanicbackend-bwey.onrender.com"
  }/api/appointments`;

  const fetchAppointments = useCallback(async (isSilent = false) => {
    if (!isSilent) setIsLoading(true);
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

      // Auto-clean accepted requests that were accepted in Google Calendar directly
      for (const apt of sortedAppointments) {
          if (apt.status === 'accepted' && apt.summary.startsWith("Anfrage:")) {
              console.log(`Auto-updating title for accepted event: ${apt.id}`);
              handleConfirm(apt, true); // Silently confirm to clean up title
          }
      }

    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Fehler",
        description: error.message || "Termine konnten nicht geladen werden.",
      });
      setAppointments([]);
    } finally {
      if (!isSilent) setIsLoading(false);
    }
  }, [toast, API_URL]);


  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  const handleConfirm = async (apt: Appointment, isSilent = false) => {
    setIsUpdating(apt.id);
    try {
      let needsStatusUpdate = apt.status !== 'accepted';
      let needsSummaryUpdate = apt.summary.startsWith("Anfrage:");

      // Update status to 'accepted' if needed
      if (needsStatusUpdate) {
        const statusRes = await fetch(`${API_URL}/${apt.id}/status`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: "accepted" }),
        });
        if (!statusRes.ok) throw new Error("Status konnte nicht aktualisiert werden.");
      }
      
      // Update summary to remove "Anfrage:" prefix if needed
      if (needsSummaryUpdate) {
        const newSummary = apt.summary.replace(/^Anfrage:\s*/, "");
        const summaryRes = await fetch(`${API_URL}/${apt.id}/summary`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ summary: newSummary }),
        });
        if (!summaryRes.ok) throw new Error("Titel konnte nicht aktualisiert werden.");
      }

      if (!isSilent) {
        toast({
            title: "Erfolg!",
            description: `Der Termin wurde erfolgreich bestätigt.`,
        });
      }
      await fetchAppointments(true); // Silent refresh
    } catch (error: any) {
      if (!isSilent) {
        toast({
            variant: "destructive",
            title: "Fehler beim Bestätigen",
            description: error.message,
        });
      } else {
        console.error("Silent update failed:", error.message);
      }
    } finally {
      setIsUpdating(null);
    }
  };

  const handleDecline = async (apt: Appointment) => {
      setIsUpdating(apt.id);
      try {
          // If status is already "declined", just delete.
          // Otherwise, update status first, then delete.
          if (apt.status !== 'declined') {
               const statusRes = await fetch(`${API_URL}/${apt.id}/status`, {
                  method: 'PATCH',
                  headers: {'Content-Type': 'application/json'},
                  body: JSON.stringify({ status: 'declined' }),
              });
              if (!statusRes.ok) throw new Error('Status konnte nicht auf "abgelehnt" gesetzt werden.');
          }

          // Optional: A small delay to allow Google to process the status update before deleting.
          await new Promise(resolve => setTimeout(resolve, 500));

          const deleteRes = await fetch(`${API_URL}/${apt.id}`, {
              method: 'DELETE',
          });
          
          if (!deleteRes.ok) {
              // If deletion fails, it might be because the event is already gone.
              // We can still show success to the user and refresh.
              console.warn(`Could not delete event ${apt.id}, maybe it was already deleted.`);
          }

          toast({
              title: 'Anfrage abgelehnt',
              description: 'Die Terminanfrage wurde erfolgreich entfernt.',
          });
          await fetchAppointments(true); // Silent refresh
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
          onClick={() => fetchAppointments()}
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
              // Treat as 'needsAction' if it's a request, otherwise use the status from Google.
              const effectiveStatus = isRequest ? 'needsAction' : (apt.status || 'tentative');
              const displayStatus = statusMap[effectiveStatus] || statusMap.needsAction;
              
              // Clean up the summary for display
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
                  <Badge className={displayStatus.className}>{displayStatus.text}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  {isUpdating === apt.id ? (
                    <Loader2 className="w-4 h-4 animate-spin ml-auto" />
                  ) : (
                    <div className="flex gap-2 justify-end">
                      {/* Show confirm/decline buttons only for requests */}
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
                            onClick={() => handleDecline(apt)}
                            title="Ablehnen & Löschen"
                          >
                            <X className="w-4 h-4 text-destructive" />
                          </Button>
                        </>
                      ) : (
                         // For confirmed or other statuses, only show a cancel button
                         <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDecline(apt)}
                            title="Termin Stornieren & Löschen"
                          >
                            <X className="w-4 h-4 text-destructive" />
                          </Button>
                      )}
                    </div>
                  )}
                </TableCell>
              </TableRow>
            )})
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center">
                Keine Termine gefunden.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

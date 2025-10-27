
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2, RefreshCw, Check, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type AppointmentStatus = "pending" | "confirmed" | "cancelled";

interface Appointment {
  _id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  start_iso: string;
  end_iso: string;
  status: AppointmentStatus;
}

const API_URL = "https://mechanicbackend-bwey.onrender.com/api/appointments";

export default function AppointmentManager() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchAppointments = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Fehler beim Laden der Termine.");
      const data = await res.json();
      const sortedAppointments = data.sort(
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
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  const handleUpdateStatus = async (
    id: string,
    status: AppointmentStatus
  ) => {
    setIsUpdating(id);
    try {
      const res = await fetch(`${API_URL}/${id}/status`, {
        method: "PUT",
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
          status === "confirmed" ? "bestätigt" : "abgelehnt"
        }.`,
      });
      fetchAppointments();
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

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleString("de-DE", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const statusVariant = (status: AppointmentStatus) => {
    switch (status) {
      case "confirmed":
        return "default";
      case "pending":
        return "secondary";
      case "cancelled":
        return "destructive";
      default:
        return "outline";
    }
  };
    
  const statusText = (status: AppointmentStatus) => {
    switch (status) {
      case "confirmed":
        return "Bestätigt";
      case "pending":
        return "Ausstehend";
      case "cancelled":
        return "Abgelehnt";
      default:
        return "Unbekannt";
    }
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
            className={`w-4 h-4 mr-2 ${isLoading ? "animate-spin" : ""}`}
          />
          Aktualisieren
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Datum & Uhrzeit</TableHead>
            <TableHead>Kunde</TableHead>
            <TableHead>Kontakt</TableHead>
            <TableHead>Anliegen</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Aktionen</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appointments.length > 0 ? (
            appointments.map((apt) => (
              <TableRow key={apt._id}>
                <TableCell className="font-medium">
                  {formatDate(apt.start_iso)}
                </TableCell>
                <TableCell>{apt.name}</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span>{apt.email}</span>
                    <span className="text-muted-foreground">{apt.phone}</span>
                  </div>
                </TableCell>
                <TableCell>{apt.service}</TableCell>
                <TableCell>
                  <Badge variant={statusVariant(apt.status)}>{statusText(apt.status)}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  {isUpdating === apt._id ? (
                    <Loader2 className="w-4 h-4 animate-spin ml-auto" />
                  ) : (
                    <div className="flex gap-2 justify-end">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleUpdateStatus(apt._id, "confirmed")}
                        disabled={apt.status === "confirmed"}
                      >
                        <Check className="w-4 h-4 text-green-500" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleUpdateStatus(apt._id, "cancelled")}
                         disabled={apt.status === "cancelled"}
                      >
                        <X className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))
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

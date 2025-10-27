
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
import { Trash2, Loader2, RefreshCw } from "lucide-react";

interface Appointment {
  _id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  start_iso: string;
  end_iso: string;
}

const API_URL = "https://mechanicbackend-bwey.onrender.com/api/appointments";

export default function AppointmentManager() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchAppointments = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Fehler beim Laden der Termine.");
      const data = await res.json();
      // Sort appointments by start date
      const sortedAppointments = data.sort((a: Appointment, b: Appointment) => new Date(a.start_iso).getTime() - new Date(b.start_iso).getTime());
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

  const handleDelete = async (id: string) => {
    setIsDeleting(id);
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      
      const result = await res.json();

      if (!res.ok || !result.success) {
        throw new Error(result.message || "Termin konnte nicht gelöscht werden.");
      }

      toast({
        title: "Erfolg!",
        description: "Der Termin wurde erfolgreich storniert.",
      });
      // Refresh the list after deletion
      fetchAppointments();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Fehler beim Löschen",
        description: error.message,
      });
    } finally {
      setIsDeleting(null);
    }
  };

  const formatDate = (isoString: string) => {
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
            <Button variant="outline" size="sm" onClick={fetchAppointments} disabled={isLoading}>
                <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
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
                <TableCell className="text-right">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="icon" disabled={isDeleting === apt._id}>
                        {isDeleting === apt._id ? (
                           <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                           <Trash2 className="w-4 h-4 text-destructive" />
                        )}
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Möchten Sie diesen Termin wirklich stornieren?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Diese Aktion kann nicht rückgängig gemacht werden. Der Termin für{" "}
                          <strong>{apt.name}</strong> am{" "}
                          <strong>{formatDate(apt.start_iso)}</strong> wird endgültig gelöscht.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Abbrechen</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(apt._id)} className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">
                          Ja, stornieren
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))
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

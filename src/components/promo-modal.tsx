"use client";

import { useState, useEffect } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";
import Link from "next/link";

export default function PromoModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Open the modal after a short delay when the component mounts
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Neuigkeiten und Sonderangebote</AlertDialogTitle>
          <AlertDialogDescription>
            Bleiben Sie auf dem Laufenden mit unseren neuesten Aktionen und Angeboten, exklusiv für unsere geschätzten Kunden.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="space-y-4 py-4">
            <div className="p-4 rounded-lg border bg-card">
                <h3 className="font-semibold text-primary">20% Rabatt auf den Ölwechsel</h3>
                <p className="text-sm text-muted-foreground mt-1">
                    Buchen Sie diesen Monat einen Ölwechsel und erhalten Sie 20% Rabatt. Halten Sie Ihren Motor in Topform!
                </p>
            </div>
            <div className="p-4 rounded-lg border bg-card">
                <h3 className="font-semibold text-primary">Kostenlose Bremseninspektion</h3>
                <p className="text-sm text-muted-foreground mt-1">
                    Sicherheit geht vor! Kommen Sie für eine kostenlose, unverbindliche Bremseninspektion vorbei.
                </p>
            </div>
        </div>
        <AlertDialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Schließen
          </Button>
          <AlertDialogAction asChild>
            <Link href="/appointments">Termin Buchen</Link>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

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
import promotions from "@/lib/promotions.json";

export default function PromoModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPromotion, setCurrentPromotion] = useState<{ title: string; description: string } | null>(null);

  useEffect(() => {
    // Open the modal after a short delay when the component mounts
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 500);

    // Determine the current promotion
    const currentMonth = new Date().getMonth() + 1; // getMonth() is 0-indexed (0-11)
    const promo = promotions.find(p => p.month === currentMonth);
    
    // Set the promotion, or a default if none is found for the current month
    setCurrentPromotion(promo || { title: "Willkommen bei Anton's Werkstatt", description: "Fragen Sie nach unseren aktuellen Angeboten." });

    return () => clearTimeout(timer);
  }, []);

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Angebot des Monats</AlertDialogTitle>
          {currentPromotion && (
            <AlertDialogDescription>
              Bleiben Sie auf dem Laufenden mit unseren neuesten Aktionen und Angeboten.
            </AlertDialogDescription>
          )}
        </AlertDialogHeader>
        {currentPromotion && (
          <div className="space-y-4 py-4">
              <div className="p-4 rounded-lg border bg-card">
                  <h3 className="font-semibold text-primary">{currentPromotion.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                      {currentPromotion.description}
                  </p>
              </div>
          </div>
        )}
        <AlertDialogFooter className="gap-2 sm:gap-0">
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

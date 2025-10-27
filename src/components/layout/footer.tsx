"use client";

import { Mail, MapPin, Phone, Check } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

type CopyState = "phone" | "email" | "address" | null;

export default function Footer() {
  const { toast } = useToast();
  const [copied, setCopied] = useState<CopyState>(null);

  const contactInfo = {
    phone: "+49 421 1234567",
    email: "info@automeisterei-seibel.de",
    address: "Pürschweg 22, 28757 Bremen"
  };

  const copyToClipboard = (text: string, type: CopyState, label: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: `${label} kopiert!`,
        description: `Die ${label.toLowerCase()} wurde in Ihre Zwischenablage kopiert.`,
      });
      setCopied(type);
      setTimeout(() => setCopied(null), 2000); // Reset after 2 seconds
    }, (err) => {
      toast({
        variant: "destructive",
        title: "Fehler beim Kopieren",
        description: "Der Text konnte nicht kopiert werden.",
      });
      console.error('Could not copy text: ', err);
    });
  };

  return (
    <footer
      id="contact"
      className="bg-secondary/50 text-card-foreground border-t"
    >
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold font-headline mb-6">
            Kontaktieren Sie uns
          </h2>

          <div className="flex flex-col md:flex-row md:space-x-12 space-y-6 md:space-y-0 text-muted-foreground text-lg">
            {/* Telefon */}
            <button
              onClick={() => copyToClipboard(contactInfo.phone, "phone", "Telefonnummer")}
              className="flex items-center justify-center gap-3 hover:text-primary transition-colors cursor-pointer"
            >
              {copied === 'phone' ? <Check className="h-6 w-6 text-green-500" /> : <Phone className="h-6 w-6" />}
              <span>{contactInfo.phone}</span>
            </button>

            {/* E-Mail */}
            <button
              onClick={() => copyToClipboard(contactInfo.email, "email", "E-Mail-Adresse")}
              className="flex items-center justify-center gap-3 hover:text-primary transition-colors cursor-pointer"
            >
              {copied === 'email' ? <Check className="h-6 w-6 text-green-500" /> : <Mail className="h-6 w-6" />}
              <span>{contactInfo.email}</span>
            </button>

            {/* Adresse */}
            <button
              onClick={() => copyToClipboard(contactInfo.address, "address", "Adresse")}
              className="flex items-center justify-center gap-3 hover:text-primary transition-colors cursor-pointer"
            >
              {copied === 'address' ? <Check className="h-6 w-6 text-green-500" /> : <MapPin className="h-6 w-6" />}
              <span>{contactInfo.address}</span>
            </button>
          </div>
        </div>

        <hr className="my-8 border-muted" />

        {/* Copyright + Design Credit */}
        <p className="text-center text-muted-foreground">
          &copy; {new Date().getFullYear()} Automeisterei Seibel. Alle Rechte
          vorbehalten.
          <br />
          <span className="text-sm">
            Designed by{' '}
            <a
              href="https://lucamuellerprod.web.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Luca
            </a>
          </span>
        </p>
      </div>
    </footer>
  );
}

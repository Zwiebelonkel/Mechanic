import { Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-secondary/50 text-card-foreground border-t">
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold font-headline mb-6">Kontaktieren Sie uns</h2>
          <div className="flex flex-col md:flex-row md:space-x-12 space-y-6 md:space-y-0 text-muted-foreground text-lg">
            <div className="flex items-center justify-center gap-3 hover:text-primary transition-colors">
              <Phone className="h-6 w-6" />
              <span>+49 123 4567890</span>
            </div>
            <div className="flex items-center justify-center gap-3 hover:text-primary transition-colors">
              <Mail className="h-6 w-6" />
              <span>kontakt@werkstatt.de</span>
            </div>
            <div className="flex items-center justify-center gap-3 hover:text-primary transition-colors">
              <MapPin className="h-6 w-6" />
              <span>Meisterstraße 1, 10117 Berlin</span>
            </div>
          </div>
        </div>
        <hr className="my-8 border-muted" />
        <p className="text-center text-muted-foreground">
          &copy; {new Date().getFullYear()} Anton's Werkstatt. Alle Rechte vorbehalten.
        </p>
      </div>
    </footer>
  );
}

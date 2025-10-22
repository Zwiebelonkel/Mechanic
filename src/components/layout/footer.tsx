import { Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-card text-card-foreground border-t">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
          <div className="flex flex-col md:flex-row md:space-x-12 space-y-4 md:space-y-0 text-muted-foreground">
            <div className="flex items-center justify-center gap-2">
              <Phone className="h-5 w-5 text-primary" />
              <span>+49 123 4567890</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Mail className="h-5 w-5 text-primary" />
              <span>kontakt@meisterwerkstatt.de</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              <span>Meisterstraße 1, 10117 Berlin, Germany</span>
            </div>
          </div>
        </div>
        <hr className="my-6 border-muted" />
        <p className="text-center text-muted-foreground">
          &copy; {new Date().getFullYear()} Deutsche Meisterwerkstatt. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

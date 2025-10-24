import { Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
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
            <div className="flex items-center justify-center gap-3 hover:text-primary transition-colors">
              <Phone className="h-6 w-6" />
              <span>+49 421 1234567</span>
            </div>

            {/* E-Mail */}
            <div className="flex items-center justify-center gap-3 hover:text-primary transition-colors">
              <Mail className="h-6 w-6" />
              <span>info@automeisterei-seibel.de</span>
            </div>

            {/* Adresse */}
            <div className="flex items-center justify-center gap-3 hover:text-primary transition-colors">
              <MapPin className="h-6 w-6" />
              <span>Industriestraße 8, 28777 Bremen</span>
            </div>
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
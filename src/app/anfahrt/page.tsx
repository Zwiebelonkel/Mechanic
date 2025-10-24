import { MapPin, Car, TramFront } from 'lucide-react';

export default function DirectionsPage() {
  const address = "Pürschweg 22, 28757 Bremen";
  const mapSrc = `https://maps.google.com/maps?width=100%&height=100%&hl=de&q=${encodeURIComponent(address)}&ie=UTF8&t=&z=15&iwloc=B&output=embed`;

  return (
    <div className="container mx-auto max-w-4xl py-12 px-4">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-headline font-bold">Anfahrt</h1>
        <p className="mt-2 text-muted-foreground">
          So finden Sie schnell und einfach zu uns.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-10 items-start">
        {/* Map Section */}
        <div className="relative w-full h-80 md:h-full rounded-lg overflow-hidden shadow-lg border">
          <iframe
            src={mapSrc}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        {/* Address and Directions Section */}
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-headline font-bold flex items-center gap-2">
              <MapPin className="text-primary w-6 h-6" />
              Unsere Adresse
            </h2>
            <p className="text-lg text-muted-foreground mt-2">{address}</p>
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline mt-2 inline-block"
            >
              Route mit Google Maps planen
            </a>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-headline font-semibold flex items-center gap-2">
                <Car className="text-primary w-5 h-5" />
                Mit dem Auto
              </h3>
              <p className="text-muted-foreground mt-1">
                Unsere Werkstatt ist verkehrsgünstig gelegen und leicht zu erreichen. Es stehen kostenlose Kundenparkplätze direkt vor der Tür zur Verfügung.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-headline font-semibold flex items-center gap-2">
                <TramFront className="text-primary w-5 h-5" />
                Öffentliche Verkehrsmittel
              </h3>
              <p className="text-muted-foreground mt-1">
                Die Bushaltestelle "Bremen Pürschweg" befindet sich nur wenige Gehminuten von unserer Werkstatt entfernt und wird von mehreren Linien angefahren.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

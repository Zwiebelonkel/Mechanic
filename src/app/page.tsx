import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { CircleGauge, Search, Wrench, Disc } from 'lucide-react';

const services = [
  {
    icon: Wrench,
    title: 'Allgemeine Reparaturen',
    description: 'Von der Motordiagnose bis zur Bremsenreparatur erledigen wir alles mit Präzision und Sorgfalt.',
  },
  {
    icon: CircleGauge,
    title: 'Geplante Wartung',
    description: 'Halten Sie Ihr Fahrzeug mit unseren umfassenden Wartungsdiensten in Top-Zustand.',
  },
  {
    icon: Search,
    title: 'Inspektionen & Diagnosen',
    description: 'Modernste Ausrüstung zur Diagnose von Problemen und zur Gewährleistung der Verkehrssicherheit Ihres Autos.',
  },
  {
    icon: Disc,
    title: 'Reifenservice',
    description: 'Reifenmontage, Auswuchten und Achsvermessung für eine reibungslose und sichere Fahrt.',
  },
];

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-mechanic');

  return (
    <>
      <section className="relative h-[60vh] md:h-[70vh] w-full flex items-center justify-center text-center text-white">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 p-4 animate-in fade-in slide-in-from-bottom-12 duration-1000">
          <h1 className="text-4xl md:text-6xl font-headline font-bold tracking-tight">
            Präzise deutsche Ingenieurskunst trifft auf fachmännische Sorgfalt
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg md:text-xl text-primary-foreground/80">
            Ihr zuverlässiger Partner für hochwertige Fahrzeugwartung und -reparatur. Wir bringen Leidenschaft und Präzision in jede Arbeit ein.
          </p>
          <div className="mt-8">
            <Button size="lg" asChild>
              <Link href="/appointments">Buchen Sie Ihren Service</Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="services" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-headline font-bold">Unsere Dienstleistungen</h2>
            <p className="mt-2 text-lg text-muted-foreground">
              Umfassende Lösungen für die Bedürfnisse Ihres Fahrzeugs.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="bg-card border-border hover:border-primary transition-colors duration-300 transform hover:-translate-y-1">
                <CardHeader className="items-center text-center">
                  <div className="p-4 bg-primary/10 rounded-full mb-4">
                    <service.icon className="w-10 h-10 text-primary drop-shadow-[0_0_5px_hsl(var(--primary))]" />
                  </div>
                  <CardTitle className="font-headline">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-muted-foreground">
                  <p>{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

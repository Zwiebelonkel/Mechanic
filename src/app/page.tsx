import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { placeholderImages } from '@/lib/images';
import { Award, ShieldCheck, Heart, Quote } from 'lucide-react';
import PromoModal from '@/components/promo-modal';
import ServiceCard from '@/components/service-card';

const services = [
  {
    icon: 'Wrench',
    title: 'Allgemeine Reparaturen',
    description: 'Von der Motordiagnose bis zur Bremsenreparatur erledigen wir alles mit Präzision und Sorgfalt.',
    rankings: {
      Dauer: 4,
      Preis: 3,
      Erfahrung: 5,
    },
  },
  {
    icon: 'CircleGauge',
    title: 'Geplante Wartung',
    description: 'Halten Sie Ihr Fahrzeug mit unseren umfassenden Wartungsdiensten in Top-Zustand.',
    rankings: {
      Dauer: 3,
      Preis: 4,
      Erfahrung: 5,
    },
  },
  {
    icon: 'Search',
    title: 'Inspektionen & Diagnosen',
    description: 'Modernste Ausrüstung zur Diagnose von Problemen und zur Gewährleistung der Verkehrssicherheit Ihres Autos.',
    rankings: {
      Dauer: 2,
      Preis: 4,
      Erfahrung: 5,
    },
  },
  {
    icon: 'Disc',
    title: 'Reifenservice',
    description: 'Reifenmontage, Auswuchten und Achsvermessung für eine reibungslose und sichere Fahrt.',
    rankings: {
      Dauer: 1,
      Preis: 5,
      Erfahrung: 4,
    },
  },
];

const whyChooseUs = [
  {
    icon: Award,
    title: 'Zertifizierte Techniker',
    description: 'Unser Team besteht aus hochqualifizierten und zertifizierten Fachleuten mit jahrelanger Erfahrung.',
  },
  {
    icon: ShieldCheck,
    title: 'Qualitätsgarantie',
    description: 'Wir verwenden nur Original-Ersatzteile und gewähren auf alle unsere Arbeiten eine Garantie.',
  },
  {
    icon: Heart,
    title: 'Leidenschaft für Autos',
    description: 'Wir lieben, was wir tun, und behandeln jedes Fahrzeug so, als wäre es unser eigenes.',
  },
];

const testimonials = [
  {
    name: 'Markus L.',
    text: "Absolut erstklassiger Service! Das Team von Anton's Werkstatt war professionell, schnell und hat das Problem mit meinem Auto im Handumdrehen gelöst. Sehr zu empfehlen!",
    image: placeholderImages.find(p => p.id === 'customer-1'),
  },
  {
    name: 'Julia K.',
    text: "Ich bin so froh, diese Werkstatt gefunden zu haben. Faire Preise, ehrliche Beratung und eine wirklich freundliche Atmosphäre. Ich komme definitiv wieder!",
    image: placeholderImages.find(p => p.id === 'customer-2'),
  }
];

export default function Home() {
  const heroImage = placeholderImages.find(p => p.id === 'hero-mechanic-2');
  const aboutImage = placeholderImages.find(p => p.id === 'about-us');

  return (
    <>
      <PromoModal />
      <section className="relative h-[70vh] md:h-[80vh] w-full flex items-center justify-center text-center text-white">
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
        <div className="relative z-10 p-4 animate-in fade-in slide-in-from-bottom-12 duration-1000">
          <h1 className="text-5xl md:text-7xl font-headline font-bold tracking-tight text-shadow-lg shadow-black/50">
            Ihre Experten für deutsche Wertarbeit
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg md:text-xl text-primary-foreground/90 text-shadow shadow-black/50">
            Präzision, Leidenschaft und Vertrauen – wir sind Ihre erste Wahl für Fahrzeugwartung und -reparatur.
          </p>
          <div className="mt-8 flex gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/appointments">Termin Buchen</Link>
            </Button>
             <Button size="lg" variant="outline" asChild>
              <Link href="#services">Unsere Dienste</Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="services" className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-headline font-bold">Unsere Dienstleistungen</h2>
            <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
              Wir bieten umfassende Lösungen, um Ihr Fahrzeug in einwandfreiem Zustand zu halten.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={index} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section id="why-us" className="py-20 md:py-28 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div className="space-y-8">
                <div className="mb-8">
                    <h2 className="text-4xl md:text-5xl font-headline font-bold">Warum Sie uns wählen sollten</h2>
                    <p className="mt-3 text-lg text-muted-foreground">Ihr Fahrzeug verdient nur das Beste. Das ist unser Versprechen.</p>
                </div>
              {whyChooseUs.map((reason, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <reason.icon className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-headline font-bold">{reason.title}</h3>
                    <p className="text-muted-foreground mt-1">{reason.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="relative h-80 md:h-full min-h-[400px] rounded-lg overflow-hidden shadow-xl">
                 {aboutImage && <Image src={aboutImage.imageUrl} alt={aboutImage.description} fill className="object-cover" data-ai-hint={aboutImage.imageHint}/>}
            </div>
          </div>
        </div>
      </section>

       <section id="testimonials" className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-headline font-bold">Was unsere Kunden sagen</h2>
            <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
              Ihre Zufriedenheit ist unser größter Antrieb.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-card border-border p-6">
                <CardContent className="p-0">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden relative flex-shrink-0">
                      {testimonial.image && <Image src={testimonial.image.imageUrl} alt={`Kunde ${testimonial.name}`} fill className="object-cover" data-ai-hint={testimonial.image.imageHint} />}
                    </div>
                    <div className="flex-1">
                      <Quote className="w-8 h-8 text-primary/30 mb-2" />
                      <p className="text-muted-foreground mb-4 italic">"{testimonial.text}"</p>
                      <p className="font-bold font-headline text-right">- {testimonial.name}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

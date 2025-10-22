import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { CircleGauge, Search, Wrench, Disc } from 'lucide-react';

const services = [
  {
    icon: Wrench,
    title: 'General Repairs',
    description: 'From engine diagnostics to brake repairs, we handle it all with precision and care.',
  },
  {
    icon: CircleGauge,
    title: 'Scheduled Maintenance',
    description: 'Keep your vehicle in peak condition with our comprehensive maintenance services.',
  },
  {
    icon: Search,
    title: 'Inspections & Diagnostics',
    description: 'State-of-the-art equipment to diagnose issues and ensure your car is road-safe.',
  },
  {
    icon: Disc,
    title: 'Tire Services',
    description: 'Tire fitting, balancing, and alignment to ensure a smooth and safe ride.',
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
            Precision German Engineering Meets Expert Care
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg md:text-xl text-primary-foreground/80">
            Your trusted partner for high-quality vehicle maintenance and repair. We bring passion and precision to every job.
          </p>
          <div className="mt-8">
            <Button size="lg" asChild>
              <Link href="/appointments">Schedule Your Service</Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="services" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-headline font-bold">Our Services</h2>
            <p className="mt-2 text-lg text-muted-foreground">
              Comprehensive solutions for your vehicle's needs.
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


'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wrench, CircleGauge, Search, Disc } from 'lucide-react';

const icons = {
  Wrench,
  CircleGauge,
  Search,
  Disc,
};

export interface Service {
  icon: keyof typeof icons;
  title: string;
  description: string;
}

const ServiceCard = ({ service }: { service: Service }) => {
  const Icon = icons[service.icon];

  return (
    <Card className="flex flex-col h-full bg-card border-border transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20 hover:border-primary">
      <CardHeader className="items-center text-center pb-4">
        <div className="p-4 bg-primary/10 rounded-full mb-4 ring-4 ring-primary/5">
          <Icon className="w-10 h-10 text-primary" />
        </div>
        <CardTitle className="font-headline text-xl">{service.title}</CardTitle>
      </CardHeader>
      <CardContent className="text-center text-muted-foreground text-sm flex-grow pb-6">
        <p>{service.description}</p>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;

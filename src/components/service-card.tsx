
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Wrench, CircleGauge, Search, Disc, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

const icons = {
  Wrench,
  CircleGauge,
  Search,
  Disc,
};

interface Ranking {
  label: string;
  value: number;
}

export interface Service {
  icon: keyof typeof icons;
  title: string;
  description: string;
  rankings: Ranking[];
}

const Rating = ({ value, max = 5 }: { value: number; max?: number }) => (
  <div className="flex items-center gap-1">
    {Array.from({ length: max }).map((_, i) => (
      <Star
        key={i}
        className={cn(
          "w-4 h-4",
          i < value ? "text-primary fill-primary" : "text-muted-foreground/30"
        )}
      />
    ))}
  </div>
);

const ServiceCard = ({ service }: { service: Service }) => {
  const Icon = icons[service.icon];

  return (
    <Card className="flex flex-col h-full bg-card border-border transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20">
      <CardHeader className="items-center text-center pb-4">
        <div className="p-4 bg-primary/10 rounded-full mb-4 ring-4 ring-primary/5">
          <Icon className="w-10 h-10 text-primary" />
        </div>
        <CardTitle className="font-headline text-xl">{service.title}</CardTitle>
      </CardHeader>
      <CardContent className="text-center text-muted-foreground text-sm flex-grow">
        <p>{service.description}</p>
      </CardContent>
      <CardFooter className="flex-col items-start p-4 pt-0 mt-4">
         <div className="w-full space-y-3">
            {service.rankings.map((ranking) => (
              <div key={ranking.label} className="flex justify-between items-center text-xs">
                <span className="font-medium text-muted-foreground">{ranking.label}</span>
                <Rating value={ranking.value} />
              </div>
            ))}
        </div>
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;

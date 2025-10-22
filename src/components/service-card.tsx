
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wrench, CircleGauge, Search, Disc } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const icons = {
  Wrench,
  CircleGauge,
  Search,
  Disc,
};

const ServiceCard = ({ service }) => {
  const Icon = icons[service.icon];

  return (
    <div className="flip-card">
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <Card className="bg-card border-border hover:border-primary transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20 w-full flex flex-col justify-center items-center p-4 min-h-[200px] h-full">
            <CardHeader className="items-center text-center p-0 mb-3">
              <div className="p-3 bg-primary/10 rounded-full mb-3 ring-4 ring-primary/5">
                <Icon className="w-8 h-8 text-primary drop-shadow-[0_0_8px_hsl(var(--primary))]" />
              </div>
              <CardTitle className="font-headline text-lg sm:text-lg lg:text-xl">{service.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-muted-foreground p-0">
              <p className="hidden lg:block text-sm">{service.description}</p>
            </CardContent>
          </Card>
        </div>
        <div className="flip-card-back">
          <Card className="bg-card border-primary w-full flex flex-col justify-center items-center p-4 min-h-[200px] h-full">
            <CardHeader className="p-0 mb-4">
              <CardTitle className="font-headline text-lg sm:text-xl">{service.title}</CardTitle>
            </CardHeader>
            <CardContent className="w-full p-0">
              <ul className="space-y-4">
                {Object.entries(service.rankings).map(([key, value]) => (
                  <li key={key} className="text-sm">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-semibold mr-2">{key}</span>
                      <span className="text-xs text-muted-foreground">{value}/5</span>
                    </div>
                    <Progress value={(value / 5) * 100} className="h-2" />
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;

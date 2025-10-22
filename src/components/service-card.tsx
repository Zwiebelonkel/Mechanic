
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, Wrench, CircleGauge, Search, Disc } from 'lucide-react';

const icons = {
  Wrench,
  CircleGauge,
  Search,
  Disc,
};

const ServiceCard = ({ service }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const Icon = icons[service.icon];

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`w-4 h-4 sm:w-5 sm:h-5 ${i < rating ? 'text-primary fill-primary' : 'text-gray-300'}`}
        />
      );
    }
    return <div className="flex">{stars}</div>;
  };

  return (
    <div
      className="flip-card w-full h-full"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className={`flip-card-inner ${isFlipped ? 'flipped' : ''}`}>
        <div className="flip-card-front">
          <Card className="bg-card border-border hover:border-primary transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20 w-full h-full flex flex-col justify-center items-center">
            <CardHeader className="items-center text-center p-2 sm:p-6">
              <div className="p-3 sm:p-4 bg-primary/10 rounded-full mb-2 sm:mb-4 ring-4 sm:ring-8 ring-primary/5">
                <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-primary drop-shadow-[0_0_8px_hsl(var(--primary))]" />
              </div>
              <CardTitle className="font-headline text-lg sm:text-xl md:text-2xl">{service.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-muted-foreground px-2 sm:px-4">
              <p className="hidden sm:block text-sm">{service.description}</p>
            </CardContent>
          </Card>
        </div>
        <div className="flip-card-back">
          <Card className="bg-card border-border w-full h-full flex flex-col justify-center items-center">
            <CardHeader>
              <CardTitle className="font-headline text-lg sm:text-xl md:text-2xl">Bewertungen</CardTitle>
            </CardHeader>
            <CardContent className="w-full px-2 sm:px-4">
              <ul className="space-y-2 sm:space-y-3">
                {Object.entries(service.rankings).map(([key, value]) => (
                  <li key={key} className="flex justify-between items-center text-xs sm:text-sm md:text-base">
                    <span className="font-semibold mr-2">{key}</span>
                    {renderStars(value)}
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


'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import type { EnrichedService } from '@/app/page';

interface ServiceModalProps {
  service: EnrichedService | null;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export default function ServiceModal({ service, isOpen, onOpenChange }: ServiceModalProps) {
  if (!service) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="relative w-full h-64 rounded-lg overflow-hidden mb-4">
            {service.image && (
              <Image
                src={service.image.imageUrl}
                alt={service.title}
                fill
                className="object-cover"
                data-ai-hint={service.image.imageHint}
              />
            )}
          </div>
          <DialogTitle className="text-2xl font-headline">{service.title}</DialogTitle>
          <DialogDescription className="text-base text-muted-foreground pt-2">
            {service.longDescription}
          </DialogDescription>
        </DialogHeader>
        <div className="pt-4 flex justify-end">
          <Button asChild>
            <Link href="/appointments">Termin für diesen Service buchen</Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

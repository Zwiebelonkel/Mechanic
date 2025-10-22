import Link from 'next/link';
import { Car } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Car className="h-6 w-6" />
          <span className="font-bold sm:inline-block">
            Deutsche Meisterwerkstatt
          </span>
        </Link>
        <nav className="flex items-center gap-4 text-sm ml-auto">
          <Button variant="ghost" asChild>
            <Link href="/">Home</Link>
          </Button>
          <Button asChild>
            <Link href="/appointments">Book Appointment</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}

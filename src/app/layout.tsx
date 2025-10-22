import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Rubik, Oswald } from 'next/font/google';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
} from '@/components/ui/sidebar';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Home, Wrench, Info, Calendar, Car } from 'lucide-react';
import Link from 'next/link';

const rubik = Rubik({ subsets: ['latin'], variable: '--font-body' });
const oswald = Oswald({ subsets: ['latin'], variable: '--font-headline', weight: ['400', '700'] });

export const metadata: Metadata = {
  title: "Anton's Werkstatt",
  description: 'Fachmännische deutsche Autoservice und Reparatur.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="dark">
      <body className={`${rubik.variable} ${oswald.variable} font-body antialiased`}>
        <SidebarProvider>
          <Sidebar>
            <SidebarHeader>
                <div className="flex items-center gap-2 p-2">
                    <Car className="h-6 w-6" />
                    <span className="font-bold">Anton's Werkstatt</span>
                </div>
            </SidebarHeader>
            <SidebarContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip={{children: 'Startseite'}}>
                    <Link href="/#">
                      <Home />
                      <span>Startseite</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip={{children: 'Dienste'}}>
                    <Link href="/#services">
                      <Wrench />
                      <span>Dienste</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                   <SidebarMenuButton asChild tooltip={{children: 'Über uns'}}>
                    <Link href="/#why-us">
                      <Info />
                      <span>Über uns</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                   <SidebarMenuButton asChild tooltip={{children: 'Termin Buchen'}}>
                    <Link href="/appointments">
                      <Calendar />
                      <span>Termin Buchen</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarContent>
          </Sidebar>
          <SidebarInset>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </SidebarInset>
        </SidebarProvider>
        <Toaster />
      </body>
    </html>
  );
}

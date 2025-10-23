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
  SidebarFooter,
} from '@/components/ui/sidebar';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Home, Wrench, Info, Calendar, User, Mail, LogOut } from 'lucide-react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';

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
      <head>
        <script type="module" src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"></script>
      </head>
      <body className={`${rubik.variable} ${oswald.variable} font-body antialiased`}>
        <SidebarProvider defaultOpen={false}>
           <Sidebar collapsible="offcanvas">
            <SidebarHeader>
              <div className="w-full flex items-center justify-center p-4">
                <div className="relative h-24 w-full">
                  <Image
                    src="/images/logo_transparent.png"
                    alt="Anton's Werkstatt"
                    fill
                    style={{ objectFit: 'contain' }}
                  />
                </div>
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
             <SidebarFooter>
               <div className="flex items-center gap-3 p-2">
                 <Avatar className="h-10 w-10">
                   <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                   <AvatarFallback>CN</AvatarFallback>
                 </Avatar>
                 <div className="flex flex-col">
                   <span className="text-sm font-semibold text-foreground">Anton Seibel</span>
                   <span className="text-xs text-muted-foreground">anton.seibel@werkstatt.de</span>
                 </div>
               </div>
            </SidebarFooter>
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

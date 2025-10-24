
import Image from "next/image";
import { placeholderImages } from "@/lib/images";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Award, Users, Wrench } from "lucide-react";
import { cn } from "@/lib/utils";

const timelineEvents = [
  {
    year: "2005",
    title: "Gründung",
    description: "Anton Seibel gründet die Werkstatt in einer kleinen Garage, angetrieben von seiner Leidenschaft für deutsche Automobile.",
    icon: Wrench,
  },
  {
    year: "2010",
    title: "Erste Erweiterung",
    description: "Umzug in eine größere Halle und Einstellung des ersten Mitarbeiters, um der wachsenden Nachfrage gerecht zu werden.",
    icon: Users,
  },
  {
    year: "2018",
    title: "Zertifizierung für E-Fahrzeuge",
    description: "Erfolgreiche Zertifizierung für die Wartung und Reparatur von Elektro- und Hybridfahrzeugen.",
    icon: Award,
  },
  {
    year: "2023",
    title: "Auszeichnung für Kundenservice",
    description: "Anerkennung für herausragenden Kundenservice und höchste Zufriedenheitsraten in der Region.",
    icon: CheckCircle,
  },
];


export default function StoryPage() {
    const storyImage = placeholderImages.find(p => p.id === 'about-us');

  return (
    <div className="container mx-auto max-w-4xl py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-headline font-bold">Unsere Geschichte</h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Von einer kleinen Garage zu Ihrer vertrauenswürdigen Meisterwerkstatt.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
        <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
            {storyImage && (
                <Image
                    src={storyImage.imageUrl}
                    alt={storyImage.description}
                    fill
                    className="object-cover"
                    data-ai-hint={storyImage.imageHint}
                />
            )}
        </div>
        <div className="space-y-4">
            <h2 className="text-3xl font-headline font-bold text-primary">Leidenschaft seit 2005</h2>
            <p className="text-muted-foreground">
                Anton's Werkstatt wurde aus einer tiefen Leidenschaft für deutsche Ingenieurskunst gegründet. Was als Ein-Mann-Betrieb in einer bescheidenen Garage begann, hat sich zu einer modernen Werkstatt entwickelt, die für Präzision, Zuverlässigkeit und erstklassigen Kundenservice bekannt ist.
            </p>
            <p className="text-muted-foreground">
                Unser Gründer, Anton Seibel, ein zertifizierter Meistertechniker, hat seine Vision verwirklicht, einen Ort zu schaffen, an dem Qualität und ehrliche Arbeit an erster Stelle stehen.
            </p>
        </div>
      </div>

      <div className="mt-20">
          <h2 className="text-3xl font-headline font-bold text-center mb-16">Meilensteine unserer Reise</h2>
          <div className="relative">
              {/* Central Line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2"></div>
              
              <div className="space-y-16">
                {timelineEvents.map((event, index) => (
                  <div key={index} className="relative flex items-center w-full">
                    <div className={cn(
                      "w-1/2",
                      index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left order-2"
                    )}>
                       <p className="text-sm text-muted-foreground">{event.year}</p>
                       <h3 className="text-xl font-headline font-semibold mb-2">{event.title}</h3>
                       <p className="text-sm text-muted-foreground">{event.description}</p>
                    </div>
                     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-background p-2 rounded-full border-2 border-primary">
                      <event.icon className="w-5 h-5 text-primary"/>
                    </div>
                  </div>
                ))}
              </div>
          </div>
      </div>


      <div className="mt-20">
        <h2 className="text-3xl font-headline font-bold text-center mb-10">Unsere Werte</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <CheckCircle className="text-primary"/> Qualität
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    Wir verwenden nur die besten Werkzeuge und Original-Ersatzteile, um die Langlebigkeit und Leistung Ihres Fahrzeugs zu gewährleisten.
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <CheckCircle className="text-primary"/> Transparenz
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    Keine versteckten Kosten, keine Überraschungen. Wir erklären jeden Schritt und geben Ihnen eine klare und faire Preisgestaltung.
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <CheckCircle className="text-primary"/> Vertrauen
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    Wir behandeln jedes Auto, als wäre es unser eigenes. Ihr Vertrauen ist unser wertvollstes Gut und wir arbeiten hart daran, es jeden Tag zu verdienen.
                </CardContent>
            </Card>
        </div>
      </div>

    </div>
  );
}

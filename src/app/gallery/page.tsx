import Image from "next/image";
import { placeholderImages } from "@/lib/images";
import ModelViewerContainer from "@/components/model-viewer-container";

export default function GalleryPage() {
  const galleryImages = placeholderImages.filter(p => p.id.startsWith("gallery-"));

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-headline font-bold">Gallerie</h1>
        <p className="mt-2 text-muted-foreground">
          Ein Einblick in unsere Arbeit und unsere Werkstatt.
        </p>
      </div>

      <section id="model-viewer" className="py-20 md:py-28 bg-background overflow-visible">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-headline font-bold">Erkunden Sie unser Meisterstück</h2>
            <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
              Werfen Sie einen interaktiven 3D-Blick auf den BMW M5.
            </p>
          </div>
          <div className="flex justify-center -mt-12 md:-mt-24 relative z-10 mb-[-12rem]">
            <ModelViewerContainer />
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-48">
        {galleryImages.map((image, index) => (
          <div key={index} className="relative aspect-square rounded-lg overflow-hidden shadow-lg group">
            <Image
              src={image.imageUrl}
              alt={image.description}
              fill
              className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
              data-ai-hint={image.imageHint}
            />
             <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
            <div className="absolute bottom-0 left-0 p-4">
                <p className="text-white text-sm font-semibold text-shadow-lg shadow-black/80">{image.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

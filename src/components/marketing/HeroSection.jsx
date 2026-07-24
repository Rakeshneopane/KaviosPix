import { ArrowRight, Images, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

import Photo1 from "@/assets/images/photo1.avif";
import Photo2 from "@/assets/images/photo2.avif";
import Photo3 from "@/assets/images/photo3.avif";
import Photo4 from "@/assets/images/photo4.avif";

export default function HeroSection() {
  return (
    <section className="overflow-hidden">
      <div className="mx-auto grid min-h-[calc(100svh-4rem)] w-full max-w-7xl items-center gap-14 px-4 py-16 sm:px-6 md:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-24">
        <div className="max-w-2xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-muted/40 px-3 py-1.5 text-sm text-muted-foreground">
            <Images className="size-4" />

            Your photos. Your moments. Your space.
          </div>

          <h1 className="max-w-xl text-5xl font-semibold tracking-[-0.045em] sm:text-6xl lg:text-7xl">
            Your memories deserve more than a camera roll.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
            Organize your photos into meaningful albums, rediscover the
            moments you love, and share them with the people who matter.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" asChild>
              <Link to="/login">
                Get started
                <ArrowRight className="size-4" />
              </Link>
            </Button>

            <Button size="lg" variant="outline" asChild>
              <a href="#how-it-works">See how it works</a>
            </Button>
          </div>

          <div className="mt-8 flex items-center gap-2 text-sm text-muted-foreground">
            <ShieldCheck className="size-4" />
            Organize and share your photo library from one place.
          </div>
        </div>

        <HeroGallery />
      </div>
    </section>
  );
}

function HeroGallery() {
  return (
    <div className="relative mx-auto w-full max-w-2xl">
      <div className="absolute -left-12 top-16 size-48 rounded-full bg-orange-200/30 blur-3xl" />
      <div className="absolute -right-8 bottom-12 size-56 rounded-full bg-amber-100/50 blur-3xl" />

      <div className="relative grid grid-cols-12 grid-rows-6 gap-3 sm:gap-4">
        <div className="col-span-7 row-span-4 overflow-hidden rounded-3xl">
          <img
            src={Photo1}
            alt="A memorable moment saved in KaviosPix"
            className="h-full min-h-80 w-full object-cover"
          />
        </div>

        <div className="col-span-5 row-span-3 mt-8 overflow-hidden rounded-3xl">
          <img
            src={Photo2}
            alt="Photo organized in a KaviosPix album"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="col-span-5 row-span-3 overflow-hidden rounded-3xl">
          <img
            src={Photo3}
            alt="Personal photograph"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="col-span-7 row-span-2 overflow-hidden rounded-3xl">
          <img
            src={Photo4}
            alt="Photo collection"
            className="h-full min-h-40 w-full object-cover"
          />
        </div>

        <div className="absolute -bottom-5 left-6 rounded-2xl border bg-background/95 px-4 py-3 shadow-lg backdrop-blur">
          <p className="text-sm font-medium">Moments worth keeping</p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Beautifully organized
          </p>
        </div>
      </div>
    </div>
  );
}
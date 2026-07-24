import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

export default function FinalCTA() {
  return (
    <section className="px-4 pb-20 sm:px-6 md:pb-28 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-muted px-6 py-16 text-center sm:px-10 md:py-24">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
          Start your collection
        </p>

        <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
          Your memories belong somewhere beautiful.
        </h2>

        <p className="mx-auto mt-5 max-w-xl leading-7 text-muted-foreground">
          Give your photo library the organization it deserves and keep the
          moments that matter within reach.
        </p>

        <Button size="lg" className="mt-8" asChild>
          <Link to="/login">
            Get started
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
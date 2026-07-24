import { FolderPlus, ImageUp, Share2 } from "lucide-react";

const steps = [
  {
    icon: ImageUp,
    step: "01",
    title: "Upload your photos",
    description:
      "Bring your favorite moments into KaviosPix from your device.",
  },
  {
    icon: FolderPlus,
    step: "02",
    title: "Build your albums",
    description:
      "Group related photos together and add the details that make them easy to find.",
  },
  {
    icon: Share2,
    step: "03",
    title: "Enjoy and share",
    description:
      "Rediscover your favorites and share albums with the people who matter.",
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="bg-foreground text-background">
      <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-background/60">
            How it works
          </p>

          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            From camera roll to organized collection.
          </h2>

          <p className="mt-4 max-w-xl leading-7 text-background/65">
            A simple workflow designed to keep the focus on your photos rather
            than managing them.
          </p>
        </div>

        <div className="mt-16 grid gap-10 md:grid-cols-3">
          {steps.map(({ icon: Icon, step, title, description }) => (
            <article key={title}>
              <div className="flex items-center justify-between border-b border-background/15 pb-5">
                <Icon className="size-6" />

                <span className="font-mono text-xs text-background/50">
                  {step}
                </span>
              </div>

              <h3 className="mt-6 text-xl font-medium">{title}</h3>

              <p className="mt-3 leading-7 text-background/60">
                {description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
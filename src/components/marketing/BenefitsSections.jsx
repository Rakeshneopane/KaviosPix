import { FolderHeart, Search, Share2 } from "lucide-react";

const benefits = [
  {
    icon: FolderHeart,
    number: "01",
    title: "Organize naturally",
    description:
      "Create albums for trips, celebrations, family moments, and everything in between.",
  },
  {
    icon: Search,
    number: "02",
    title: "Find what matters",
    description:
      "Use tags, people, and favorites to make meaningful photos easier to rediscover.",
  },
  {
    icon: Share2,
    number: "03",
    title: "Share memories",
    description:
      "Keep collections together and share albums with the people who were part of the moment.",
  },
];

export default function BenefitsSection() {
  return (
    <section id="features">
      <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Built around your memories
          </p>

          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            Everything your camera roll is missing.
          </h2>
        </div>

        <div className="mt-14 grid gap-10 md:grid-cols-3">
          {benefits.map(({ icon: Icon, number, title, description }) => (
            <article key={title}>
              <div className="flex items-center justify-between border-b pb-5">
                <div className="flex size-11 items-center justify-center rounded-xl bg-foreground text-background">
                  <Icon className="size-5" />
                </div>

                <span className="font-mono text-xs text-muted-foreground">
                  {number}
                </span>
              </div>

              <h3 className="mt-6 text-xl font-semibold">{title}</h3>

              <p className="mt-3 leading-7 text-muted-foreground">
                {description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
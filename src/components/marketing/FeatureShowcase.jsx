import { Heart, Tags, Users } from "lucide-react";

import Photo5 from "@/assets/images/photo5.avif";
import Photo6 from "@/assets/images/photo6.avif";

export default function FeatureShowcase() {
  return (
    <section id="about">
      <div className="mx-auto w-full max-w-7xl space-y-24 px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <ShowcaseRow
          image={Photo5}
          eyebrow="Albums"
          title="Give every memory a place."
          description="Turn an endless stream of photos into meaningful collections for trips, people, celebrations, and everyday life."
          points={[
            { icon: Tags, label: "Add tags for easier organization" },
            { icon: Heart, label: "Keep favorite moments close" },
          ]}
        />

        <ShowcaseRow
          image={Photo6}
          eyebrow="Shared memories"
          title="The best moments are rarely yours alone."
          description="Keep shared experiences together and make albums accessible to the people who matter."
          points={[
            { icon: Users, label: "Share albums with others" },
            { icon: Heart, label: "Keep meaningful collections together" },
          ]}
          reverse
        />
      </div>
    </section>
  );
}

function ShowcaseRow({
  image,
  eyebrow,
  title,
  description,
  points,
  reverse = false,
}) {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
      <div className={reverse ? "lg:order-2" : ""}>
        <div className="overflow-hidden rounded-3xl bg-muted">
          <img
            src={image}
            alt=""
            className="aspect-[4/3] w-full object-cover transition-transform duration-700 hover:scale-[1.02]"
          />
        </div>
      </div>

      <div className={reverse ? "lg:order-1" : ""}>
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
          {eyebrow}
        </p>

        <h2 className="mt-4 max-w-lg text-3xl font-semibold tracking-tight sm:text-4xl">
          {title}
        </h2>

        <p className="mt-5 max-w-lg text-base leading-7 text-muted-foreground">
          {description}
        </p>

        <div className="mt-8 space-y-4">
          {points.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-lg bg-muted">
                <Icon className="size-4" />
              </span>

              <span className="text-sm font-medium">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
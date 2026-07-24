import { Heart, Tags, Users } from "lucide-react";

export default function ProductPreview() {
  return (
    <section className="border-y bg-muted/30">
      <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Your photo library, simplified
          </p>

          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            Less searching. More remembering.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            KaviosPix gives your photo collection structure without getting in
            the way of the memories themselves.
          </p>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          <PreviewItem
            icon={Tags}
            title="Meaningful organization"
            description="Use albums, tags, and people to give your growing photo library structure."
          />

          <PreviewItem
            icon={Heart}
            title="Keep favorites close"
            description="Mark the moments that matter most and make them easier to rediscover."
          />

          <PreviewItem
            icon={Users}
            title="Made for sharing"
            description="Bring people into shared albums and keep important memories together."
          />
        </div>
      </div>
    </section>
  );
}

function PreviewItem({ icon: Icon, title, description }) {
  return (
    <article className="rounded-2xl border bg-card p-6">
      <div className="flex size-10 items-center justify-center rounded-xl bg-muted">
        <Icon className="size-5" />
      </div>

      <h3 className="mt-5 font-semibold">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        {description}
      </p>
    </article>
  );
}
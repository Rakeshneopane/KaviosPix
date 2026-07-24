import {
  Images,
  Image,
  Users,
} from "lucide-react";

const statItems = [
  {
    key: "albums",
    label: "Albums",
    description: "Collections in your library",
    icon: Images,
  },
  {
    key: "photos",
    label: "Photos",
    description: "Photos across your albums",
    icon: Image,
  },
  {
    key: "shared",
    label: "Shared",
    description: "Albums shared with others",
    icon: Users,
  },
];

export default function DashboardStats({ stats }) {
  return (
    <section aria-labelledby="library-overview-title">
      <h2
        id="library-overview-title"
        className="sr-only"
      >
        Library overview
      </h2>

      <div className="grid gap-4 sm:grid-cols-3">
        {statItems.map(
          ({ key, label, description, icon: Icon }) => (
            <div
              key={key}
              className="rounded-xl border bg-card p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {label}
                  </p>

                  <p className="mt-2 text-3xl font-semibold tracking-tight">
                    {stats[key].toLocaleString()}
                  </p>
                </div>

                <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
                  <Icon className="size-5 text-muted-foreground" />
                </div>
              </div>

              <p className="mt-4 text-xs text-muted-foreground">
                {description}
              </p>
            </div>
          )
        )}
      </div>
    </section>
  );
}
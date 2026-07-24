import { Heart, Images } from "lucide-react";

import { cn } from "@/lib/utils";

const tabs = [
  {
    value: "all",
    label: "All photos",
    icon: Images,
  },
  {
    value: "favorites",
    label: "Favorites",
    icon: Heart,
  },
];

export default function AlbumTabs({
  value,
  onChange,
  imageCount,
  favoriteCount,
}) {
  return (
    <div className="border-b">
      <div
        className="flex gap-6"
        role="tablist"
        aria-label="Album photos"
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = value === tab.value;

          const count =
            tab.value === "all"
              ? imageCount
              : favoriteCount;

          return (
            <button
              key={tab.value}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => onChange(tab.value)}
              className={cn(
                "relative flex items-center gap-2 py-3 text-sm font-medium transition-colors",
                active
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon
                className={cn(
                  "size-4",
                  tab.value === "favorites" &&
                    active &&
                    "fill-current"
                )}
              />

              {tab.label}

              {typeof count === "number" && (
                <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                  {count}
                </span>
              )}

              {active && (
                <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-foreground" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

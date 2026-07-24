import {
  ArrowRight,
  Images,
  RefreshCw,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import RecentAlbumCard from "./RecentAlbumCard";

export default function RecentAlbums({
  albums,
  status,
  error,
  onRetry,
}) {
  const navigate = useNavigate();

  if (status === "error") {
    return (
      <section>
        <SectionHeading />

        <div className="mt-4 flex min-h-52 flex-col items-center justify-center rounded-xl border border-dashed bg-muted/20 px-6 text-center">
          <div className="flex size-10 items-center justify-center rounded-full bg-muted">
            <RefreshCw className="size-4 text-muted-foreground" />
          </div>

          <h3 className="mt-4 font-medium">
            Couldn't load your albums
          </h3>

          <p className="mt-1 max-w-sm text-sm text-muted-foreground">
            {error ||
              "Something went wrong while loading your library."}
          </p>

          <Button
            variant="outline"
            size="sm"
            className="mt-4"
            onClick={onRetry}
          >
            Try again
          </Button>
        </div>
      </section>
    );
  }

  if (!albums?.length) {
    return (
      <section>
        <SectionHeading />

        <div className="mt-4 flex min-h-64 flex-col items-center justify-center rounded-xl border border-dashed bg-muted/20 px-6 text-center">
          <div className="flex size-12 items-center justify-center rounded-xl bg-muted">
            <Images className="size-5 text-muted-foreground" />
          </div>

          <h3 className="mt-4 font-medium">
            Your library is ready
          </h3>

          <p className="mt-1 max-w-md text-sm text-muted-foreground">
            Create an album to start organizing your
            photos into collections.
          </p>

          <Button
            className="mt-5"
            onClick={() => navigate("/albums")}
          >
            Create an album
          </Button>
        </div>
      </section>
    );
  }

  const recentAlbums = albums.slice(0, 4);

  return (
    <section>
      <SectionHeading />

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {recentAlbums.map((album) => (
          <RecentAlbumCard
            key={album._id}
            album={album}
          />
        ))}
      </div>
    </section>
  );
}

function SectionHeading() {
  const navigate = useNavigate();

  return (
    <div className="flex items-end justify-between gap-4">
      <div>
        <h2 className="text-lg font-semibold tracking-tight">
          Recent albums
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Pick up where you left off.
        </p>
      </div>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigate("/albums")}
      >
        View all
        <ArrowRight className="size-4" />
      </Button>
    </div>
  );
}
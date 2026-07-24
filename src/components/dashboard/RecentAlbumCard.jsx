import {
  ImageIcon,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function RecentAlbumCard({ album }) {
  const navigate = useNavigate();

  const isShared =
    album.sharedUserIds?.length > 0;

  const photoCount = album.photoCount ?? 0;

  return (
    <button
      type="button"
      onClick={() =>
        navigate(`/album/${album._id}`)
      }
      className="
        group overflow-hidden rounded-xl border
        bg-card text-left
        transition-all duration-200
        hover:-translate-y-0.5 hover:shadow-md
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-ring
        focus-visible:ring-offset-2
      "
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        {album.coverImage ? (
          <img
            src={album.coverImage}
            alt=""
            loading="lazy"
            className="
              size-full object-cover
              transition-transform duration-300
              group-hover:scale-[1.03]
            "
          />
        ) : (
          <div className="flex size-full flex-col items-center justify-center gap-2 text-muted-foreground">
            <div className="flex size-10 items-center justify-center rounded-full bg-background shadow-sm">
              <ImageIcon className="size-4" />
            </div>

            <span className="text-xs">
              No photos yet
            </span>
          </div>
        )}

        {album.coverImage && (
          <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/20 to-transparent" />
        )}

        {isShared && (
          <div className="
            absolute left-3 top-3
            flex items-center gap-1.5
            rounded-full bg-background/90
            px-2.5 py-1
            text-xs font-medium
            shadow-sm backdrop-blur-md
          ">
            <Users className="size-3" />
            Shared
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="truncate font-medium">
          {album.name}
        </h3>

        <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
          <span>
            {photoCount}{" "}
            {photoCount === 1
              ? "photo"
              : "photos"}
          </span>

          {album.isDefault && (
            <>
              <span aria-hidden="true">·</span>
              <span>Default</span>
            </>
          )}
        </div>
      </div>
    </button>
  );
}
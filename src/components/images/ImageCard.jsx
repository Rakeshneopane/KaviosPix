import { useState } from "react";
import {
  Download,
  Heart,
  MoreHorizontal,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ImageCard({
  image,
  isOwner,
  onToggleFavorite,
  onDelete,
  onDownload,
  onClick,
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <article className="group overflow-hidden rounded-xl border bg-card">
      {/* =====================================================
          IMAGE
      ====================================================== */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        {!loaded && (
          <Skeleton className="absolute inset-0 rounded-none" />
        )}

        <button
          type="button"
          onClick={onClick}
          className="absolute inset-0 z-0 cursor-zoom-in"
          aria-label={`Open ${image.name || "photo"}`}
        >
          <img
            src={image.url}
            alt={image.name || "Album photo"}
            loading="lazy"
            onLoad={() => setLoaded(true)}
            className={`size-full object-cover transition duration-300 ${
              loaded ? "opacity-100" : "opacity-0"
            } motion-safe:hover:scale-[1.03]`}
          />
        </button>

        {/* Desktop hover gradient */}
        <div
          className="
            pointer-events-none
            absolute inset-x-0 bottom-0
            hidden h-24
            bg-gradient-to-t from-black/60 to-transparent
            opacity-0
            transition-opacity
            [@media(hover:hover)]:block
            [@media(hover:hover)]:group-hover:opacity-100
          "
        />

        {/* =================================================
            DESKTOP / HOVER DEVICE ACTIONS
        ================================================== */}
        <div
          className="
            hidden
            [@media(hover:hover)]:block
          "
        >
          {/* Favorite */}
          <Button
            type="button"
            size="icon"
            variant="secondary"
            aria-label={
              image.isFavorite
                ? "Remove from favorites"
                : "Add to favorites"
            }
            onClick={onToggleFavorite}
            className={[
              "absolute left-2 top-2 z-10 size-8 rounded-full shadow-sm transition-opacity",
              image.isFavorite
                ? "opacity-100"
                : "opacity-0 group-hover:opacity-100 focus-visible:opacity-100",
            ].join(" ")}
          >
            <Heart
              className={`size-4 ${
                image.isFavorite
                  ? "fill-current text-red-500"
                  : ""
              }`}
            />
          </Button>

          {/* More */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                type="button"
                size="icon"
                variant="secondary"
                aria-label="Photo actions"
                className="
                  absolute right-2 top-2 z-10
                  size-8 rounded-full
                  opacity-0 shadow-sm
                  transition-opacity
                  group-hover:opacity-100
                  focus-visible:opacity-100
                  data-[state=open]:opacity-100
                "
              >
                <MoreHorizontal className="size-4" />
              </Button>
            </DropdownMenuTrigger>

            <PhotoActions
              isOwner={isOwner}
              onDownload={onDownload}
              onDelete={onDelete}
            />
          </DropdownMenu>

          {/* Filename */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 p-3 opacity-0 transition-opacity group-hover:opacity-100">
            <p className="truncate text-sm font-medium text-white">
              {image.name}
            </p>
          </div>
        </div>
      </div>

      {/* =====================================================
          TOUCH / NO-HOVER DEVICE FOOTER
      ====================================================== */}
      <div
        className="
          flex items-center justify-between gap-2
          border-t px-2 py-2
          [@media(hover:hover)]:hidden
        "
      >
        {/* Favorite */}
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="size-8 shrink-0"
          aria-label={
            image.isFavorite
              ? "Remove from favorites"
              : "Add to favorites"
          }
          onClick={onToggleFavorite}
        >
          <Heart
            className={`size-4 ${
              image.isFavorite
                ? "fill-current text-red-500"
                : "text-muted-foreground"
            }`}
          />
        </Button>

        {/* Filename */}
        <button
          type="button"
          onClick={onClick}
          className="min-w-0 flex-1 text-left"
        >
          <p className="truncate text-xs font-medium">
            {image.name || "Photo"}
          </p>
        </button>

        {/* More */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="size-8 shrink-0"
              aria-label="Photo actions"
            >
              <MoreHorizontal className="size-4" />
            </Button>
          </DropdownMenuTrigger>

          <PhotoActions
            isOwner={isOwner}
            onDownload={onDownload}
            onDelete={onDelete}
          />
        </DropdownMenu>
      </div>
    </article>
  );
}

/* =========================================================
   SHARED ACTION MENU
========================================================= */

function PhotoActions({
  isOwner,
  onDownload,
  onDelete,
}) {
  return (
    <DropdownMenuContent align="end">
      <DropdownMenuItem onClick={onDownload}>
        <Download className="size-4" />
        Download
      </DropdownMenuItem>

      {isOwner && (
        <>
          <DropdownMenuSeparator />

          <DropdownMenuItem
            variant="destructive"
            onClick={onDelete}
          >
            <Trash2 className="size-4" />
            Delete photo
          </DropdownMenuItem>
        </>
      )}
    </DropdownMenuContent>
  );
}
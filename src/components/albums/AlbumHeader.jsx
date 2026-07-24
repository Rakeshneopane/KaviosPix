import {
  ArrowLeft,
  Images,
  Share2,
  Upload,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";

export default function AlbumHeader({
  album,
  imageCount,
  isOwner,
  onBack,
  onShare,
  onUpload,
}) {
  if (!album) return null;

  const sharedCount = album.sharedUserIds?.length || 0;

  return (
    <header className="border-b">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        {/* Back */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="-ml-2 mb-5 text-muted-foreground"
        >
          <ArrowLeft className="size-4" />
          Albums
        </Button>

        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          {/* Album information */}
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="truncate text-2xl font-semibold tracking-tight sm:text-3xl">
                {album.name}
              </h1>

              {album.isDefault && (
                <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
                  Default
                </span>
              )}
            </div>

            {album.description && (
              <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
                {album.description}
              </p>
            )}

            {/* Metadata */}
            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Images className="size-4" />
                {imageCount} {imageCount === 1 ? "photo" : "photos"}
              </span>

              {isOwner ? (
                sharedCount > 0 && (
                  <span className="flex items-center gap-1.5">
                    <Users className="size-4" />
                    Shared with {sharedCount}{" "}
                    {sharedCount === 1 ? "person" : "people"}
                  </span>
                )
              ) : (
                <span className="flex items-center gap-1.5">
                  <Users className="size-4" />
                  Shared with you
                </span>
              )}
            </div>
          </div>

          {/* Owner actions */}
          {isOwner && (
            <div className="flex shrink-0 gap-2">
              <Button
                variant="outline"
                onClick={onShare}
              >
                <Share2 className="size-4" />
                Share
              </Button>

              <Button onClick={onUpload}>
                <Upload className="size-4" />
                Upload photos
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
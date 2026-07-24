import ImageCard from "./ImageCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Heart, Images, SearchX, Upload } from "lucide-react";

export default function ImageGrid({
  images = [],
  isLoading = false,
  isOwner = false,
  emptyType = "photos",
  onImageClick,
  onToggleFavorite,
  onDownload,
  onDelete,
  onUpload,
  onClearSearch,
}) {
  if (isLoading) {
    return <ImageGridSkeleton />;
  }

  if (!images.length) {
    return (
      <ImageEmptyState
        type={emptyType}
        isOwner={isOwner}
        onUpload={onUpload}
        onClearSearch={onClearSearch}
      />
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
      {images.map((image) => (
        <ImageCard
          key={image._id}
          image={image}
          isOwner={isOwner}
          onClick={() => onImageClick?.(image)}
          onToggleFavorite={() => onToggleFavorite?.(image)}
          onDownload={() => onDownload?.(image)}
          onDelete={() => onDelete?.(image)}
        />
      ))}
    </div>
  );
}

export function ImageGridSkeleton({ count = 10 }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
      {Array.from({ length: count }).map((_, index) => (
        <Skeleton
          key={index}
          className="aspect-square rounded-xl"
        />
      ))}
    </div>
  );
}

function ImageEmptyState({
  type,
  isOwner,
  onUpload,
  onClearSearch,
}) {
  const content = {
    photos: {
      icon: Images,
      title: "No photos yet",
      description: isOwner
        ? "Upload your first photos to start building this album."
        : "There aren't any photos in this album yet.",
    },

    favorites: {
      icon: Heart,
      title: "No favorites yet",
      description:
        "Photos you mark as favorites will appear here.",
    },

    search: {
      icon: SearchX,
      title: "No matching photos",
      description:
        "Try describing the photo differently or use fewer words.",
    },
  };

  const state = content[type] || content.photos;
  const Icon = state.icon;

  return (
    <div className="flex min-h-72 flex-col items-center justify-center rounded-xl border border-dashed bg-muted/20 px-6 text-center">
      <div className="mb-4 flex size-11 items-center justify-center rounded-full bg-muted">
        <Icon className="size-5 text-muted-foreground" />
      </div>

      <h3 className="font-medium">
        {state.title}
      </h3>

      <p className="mt-1 max-w-sm text-sm leading-6 text-muted-foreground">
        {state.description}
      </p>

      {type === "photos" && isOwner && onUpload && (
        <Button
          className="mt-5"
          size="sm"
          onClick={onUpload}
        >
          <Upload className="size-4" />
          Upload photos
        </Button>
      )}

      {type === "search" && onClearSearch && (
        <Button
          variant="outline"
          className="mt-5"
          size="sm"
          onClick={onClearSearch}
        >
          Clear search
        </Button>
      )}
    </div>
  );
}
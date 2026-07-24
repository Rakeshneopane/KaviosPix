import { useEffect, useMemo, useState } from "react";
import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  ArrowDownAZ,
  CalendarArrowDown,
  CalendarArrowUp,
} from "lucide-react";

import {
  fetchAllImages,
} from "@/store/slices/imageSlice";

import ImageGrid from "./ImageGrid";
import DeleteImageDialog from "./DeleteImageDialog";
import { useImageActions } from "./useImageActions";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import ImageViewer from "./ImageViewer";

export default function ImageGallery({
  albumId,
  isOwner,
  onUpload,
}) {
  const dispatch = useDispatch();

  const [selectedImage, setSelectedImage] =
    useState(null);

  const [sortBy, setSortBy] =
    useState("latest");

  const {
    imagesData,
    fetchImagesStatus,
  } = useSelector((state) => state.imageSlice);

  const {
    imageToDelete,
    deleteDialogOpen,
    toggleFavorite,
    downloadImage,
    requestDelete,
    cancelDelete,
    confirmDelete,
    setDeleteDialogOpen,
  } = useImageActions();

  useEffect(() => {
    if (albumId) {
      dispatch(fetchAllImages(albumId));
    }
  }, [albumId, dispatch]);

  const sortedImages = useMemo(() => {
    const result = [...(imagesData || [])];

    switch (sortBy) {
      case "oldest":
        return result.sort(
          (a, b) =>
            new Date(a.createdAt) -
            new Date(b.createdAt)
        );

      case "name":
        return result.sort((a, b) =>
          (a.name || "").localeCompare(
            b.name || ""
          )
        );

      case "latest":
      default:
        return result.sort(
          (a, b) =>
            new Date(b.createdAt) -
            new Date(a.createdAt)
        );
    }
  }, [imagesData, sortBy]);

  const handleDelete = async () => {
    const deletedId = imageToDelete?._id;

    const success = await confirmDelete();

    if (
      success &&
      selectedImage?._id === deletedId
    ) {
      setSelectedImage(null);
    }
  };

  if (fetchImagesStatus === "error") {
    return (
      <div className="flex min-h-64 flex-col items-center justify-center rounded-xl border border-dashed px-6 text-center">
        <h3 className="font-medium">
          Couldn't load photos
        </h3>

        <p className="mt-1 text-sm text-muted-foreground">
          Something went wrong while loading this
          album.
        </p>

        <Button
          variant="outline"
          size="sm"
          className="mt-4"
          onClick={() =>
            dispatch(fetchAllImages(albumId))
          }
        >
          Try again
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4">
        {/* Collection toolbar */}
        {imagesData?.length > 0 && (
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              {imagesData.length}{" "}
              {imagesData.length === 1
                ? "photo"
                : "photos"}
            </p>

            <Select
              value={sortBy}
              onValueChange={setSortBy}
            >
              <SelectTrigger
                className="w-[150px]"
                aria-label="Sort photos"
              >
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="latest">
                  <span className="flex items-center gap-2">
                    <CalendarArrowDown className="size-4" />
                    Newest first
                  </span>
                </SelectItem>

                <SelectItem value="oldest">
                  <span className="flex items-center gap-2">
                    <CalendarArrowUp className="size-4" />
                    Oldest first
                  </span>
                </SelectItem>

                <SelectItem value="name">
                  <span className="flex items-center gap-2">
                    <ArrowDownAZ className="size-4" />
                    Name
                  </span>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        <ImageGrid
          images={sortedImages}
          isLoading={
            fetchImagesStatus === "loading" ||
            fetchImagesStatus === "idle"
          }
          emptyType="photos"
          isOwner={isOwner}
          onUpload={onUpload}
          onImageClick={setSelectedImage}
          onToggleFavorite={toggleFavorite}
          onDownload={downloadImage}
          onDelete={requestDelete}
        />
      </div>

      {selectedImage && (
        <ImageViewer
            images={sortedImages}
            imageId={selectedImage._id}
            onClose={() => setSelectedImage(null)}
        />
      )}

      <DeleteImageDialog
        open={deleteDialogOpen}
        image={imageToDelete}
        onOpenChange={setDeleteDialogOpen}
        onCancel={cancelDelete}
        onConfirm={handleDelete}
      />
    </>
  );
}
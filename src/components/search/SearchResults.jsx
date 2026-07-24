import { useState } from "react";
import { useSelector } from "react-redux";

import ImageGrid from "@/components/images/ImageGrid";
import ImageViewer from "@/components/images/ImageViewer";
import DeleteImageDialog from "@/components/images/DeleteImageDialog";
import { useImageActions } from "@/components/images/useImageActions";

export default function SearchResults({
  isOwner,
  onClearSearch,
}) {
  const [selectedImage, setSelectedImage] =
    useState(null);

  const {
    searchResults,
    searchStatus,
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

  return (
    <>
      <div className="space-y-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-medium">
              Search results
            </h2>

            {searchStatus === "success" && (
              <span className="text-sm text-muted-foreground">
                {searchResults.length}
              </span>
            )}
          </div>

          <p className="mt-1 text-sm text-muted-foreground">
            Results are ranked by visual similarity.
          </p>
        </div>

        <ImageGrid
          images={searchResults}
          isLoading={
            searchStatus === "loading"
          }
          emptyType="search"
          isOwner={isOwner}
          onClearSearch={onClearSearch}
          onImageClick={setSelectedImage}
          onToggleFavorite={toggleFavorite}
          onDownload={downloadImage}
          onDelete={requestDelete}
        />
      </div>

      {selectedImage && (
        <ImageViewer
            images={searchResults}
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
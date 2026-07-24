import { useEffect, useState } from "react";
import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  favoriteImages as fetchFavoriteImages,
} from "@/store/slices/imageSlice";

import ImageGrid from "./ImageGrid";
import ImageViewer from "./ImageViewer";
import DeleteImageDialog from "./DeleteImageDialog";
import { useImageActions } from "./useImageActions";

export default function FavoriteImages({
  albumId,
  isOwner,
}) {
  const dispatch = useDispatch();

  const [selectedImage, setSelectedImage] =
    useState(null);

  const {
    favoriteImages,
    fetchFavoritesStatus,
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
      dispatch(fetchFavoriteImages(albumId));
    }
  }, [albumId, dispatch]);

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
      <ImageGrid
        images={favoriteImages}
        isLoading={
          fetchFavoritesStatus === "loading"
        }
        emptyType="favorites"
        isOwner={isOwner}
        onImageClick={setSelectedImage}
        onToggleFavorite={toggleFavorite}
        onDownload={downloadImage}
        onDelete={requestDelete}
      />

      {selectedImage && (
        <ImageViewer
            images={favoriteImages}
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
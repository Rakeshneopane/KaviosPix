import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

import {
  deleteImage,
  toggleImages,
} from "@/store/slices/imageSlice";

export function useImageActions() {
  const dispatch = useDispatch();

  const [imageToDelete, setImageToDelete] =
    useState(null);

  const [deleteDialogOpen, setDeleteDialogOpen] =
    useState(false);

  const toggleFavorite = async (image) => {
    if (!image) return;

    try {
      await dispatch(
        toggleImages({
          imageId: image._id,
          imageData: {
            isFavorite: !image.isFavorite,
          },
        })
      ).unwrap();

      toast.success(
        image.isFavorite
          ? "Removed from favorites"
          : "Added to favorites"
      );
    } catch {
      toast.error(
        "Failed to update favorite status"
      );
    }
  };

  const requestDelete = (image) => {
    setImageToDelete(image);
    setDeleteDialogOpen(true);
  };

  const cancelDelete = () => {
    setDeleteDialogOpen(false);
    setImageToDelete(null);
  };

  const confirmDelete = async () => {
    if (!imageToDelete) return false;

    try {
      await dispatch(
        deleteImage(imageToDelete._id)
      ).unwrap();

      toast.success("Photo deleted");

      setDeleteDialogOpen(false);
      setImageToDelete(null);

      return true;
    } catch {
      toast.error("Failed to delete photo");
      return false;
    }
  };

  const downloadImage = async (image) => {
    if (!image?.url) return;

    try {
      const response = await fetch(image.url);

      if (!response.ok) {
        throw new Error("Download failed");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const anchor = document.createElement("a");

      anchor.href = url;
      anchor.download =
        image.name || "kaviospix-photo";

      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();

      URL.revokeObjectURL(url);

      toast.success("Download started");
    } catch {
      toast.error("Failed to download photo");
    }
  };

  return {
    imageToDelete,
    deleteDialogOpen,

    toggleFavorite,
    downloadImage,

    requestDelete,
    cancelDelete,
    confirmDelete,

    setDeleteDialogOpen,
  };
}
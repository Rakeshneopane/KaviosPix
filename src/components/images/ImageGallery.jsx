// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchAllImages, toggleImages, deleteImage, searchImages, clearSearch } from '@/store/slices/imageSlice';
// import { Skeleton } from '@/components/ui/skeleton';
// import ImageModal from './ImageModal.jsx';
// import ImageUploader from './ImageUploader.jsx';
// import { toast } from 'sonner';
// import ImageCard from './ImageCard.jsx';
// import { Button } from '../ui/button.jsx';
// import {
//     Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription
// } from '@/components/ui/dialog';

// export default function ImageGallery({ albumId, isOwner }) {
//     const dispatch = useDispatch();
//     const { imagesData, fetchImagesStatus, searchResults, searchStatus } = useSelector((state) => state.imageSlice);
//     const [selectedImage, setSelectedImage] = useState(null);
//     const [showUploader, setShowUploader] = useState(false);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [sortBy, setSortBy] = useState('latest');

//     // Delete dialog state
//     const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
//     const [imageToDelete, setImageToDelete] = useState(null);

//     useEffect(() => {
//         if (albumId) {
//             dispatch(fetchAllImages(albumId));
//         }
//     }, [albumId, dispatch]);

//     useEffect(() => {
//         if (!searchTerm.trim()) {
//             dispatch(clearSearch());
//             return;
//         }
//         const timer = setTimeout(() => {
//             dispatch(searchImages({ albumId, query: searchTerm }));
//         }, 400);
//         return () => clearTimeout(timer);
//     }, [searchTerm, albumId, dispatch]);

//     const handleToggleFavorite = async (imageId) => {
//         const currentImage = imagesData.find(img => img._id === imageId);
//         if (!currentImage) return;
//         try {
//             await dispatch(toggleImages({
//                 imageId,
//                 imageData: { isFavorite: !currentImage.isFavorite }
//             })).unwrap();
//             toast.success(currentImage.isFavorite ? 'Removed from favorites' : 'Added to favorites');
//         } catch (error) {
//             toast.error('Failed to update favorite status');
//         }
//     };

//     const confirmDeleteImage = (image) => {
//         setImageToDelete(image);
//         setDeleteDialogOpen(true);
//     };

//     const handleDeleteImage = async () => {
//         if (!imageToDelete) return;
//         try {
//             await dispatch(deleteImage(imageToDelete._id)).unwrap();
//             toast.success('Image deleted successfully');
//             if (selectedImage?._id === imageToDelete._id) setSelectedImage(null);
//         } catch (error) {
//             toast.error('Failed to delete image');
//         } finally {
//             setDeleteDialogOpen(false);
//             setImageToDelete(null);
//         }
//     };

//     const handleDownloadImage = async (imageUrl, imageName) => {
//         try {
//             const response = await fetch(imageUrl);
//             const blob = await response.blob();
//             const url = window.URL.createObjectURL(blob);
//             const link = document.createElement('a');
//             link.href = url;
//             link.download = imageName || 'image.jpg';
//             document.body.appendChild(link);
//             link.click();
//             document.body.removeChild(link);
//             window.URL.revokeObjectURL(url);
//             toast.success('Download started');
//         } catch (error) {
//             toast.error('Failed to download image');
//         }
//     };

//     const isSearching = searchTerm.trim().length > 0;

//     const filteredAndSortedImages = React.useMemo(() => {
//         let base = isSearching ? searchResults : imagesData;
//         let filtered = [...base];
        
//         if (!isSearching) {
//             switch (sortBy) {
//                 case 'latest':
//                     filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//                     break;
//                 case 'oldest':
//                     filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
//                     break;
//                 case 'favorites':
//                     filtered.sort((a, b) => (b.isFavorite ? 1 : 0) - (a.isFavorite ? 1 : 0));
//                     break;
//                 default:
//                     break;
//             }
//         }
//         return filtered;
//     }, [imagesData, searchResults, isSearching, sortBy]);

//     if (fetchImagesStatus === 'loading') {
//         return (
//             <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 p-6">
//                 {Array.from({ length: 8 }).map((_, i) => (
//                     <Skeleton key={i} className="aspect-square rounded-lg" />
//                 ))}
//             </div>
//         );
//     }

//     if (fetchImagesStatus === 'error') {
//         return (
//             <div className="text-center py-12">
//                 <p className="text-red-500">Failed to load images. Please try again.</p>
//                 <Button onClick={() => dispatch(fetchAllImages(albumId))} className="mt-4">
//                     Retry
//                 </Button>
//             </div>
//         );
//     }

//     return (
//         <div className="space-y-6">
//             {/* Header Controls */}
//             <div className="flex flex-wrap justify-between items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
//                 <div className="flex gap-4">
//                     <input
//                         type="text"
//                         placeholder="Search photos with AI..."
//                         value={searchTerm}
//                         onChange={(e) => setSearchTerm(e.target.value)}
//                         className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
//                     />
//                     <select
//                         value={sortBy}
//                         onChange={(e) => setSortBy(e.target.value)}
//                         className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
//                     >
//                         <option value="latest">Latest First</option>
//                         <option value="oldest">Oldest First</option>
//                         <option value="favorites">Favorites First</option>
//                     </select>
//                 </div>
//                 {isOwner && (
//                     <Button
//                         variant="default"
//                         onClick={() => setShowUploader(true)}
//                         className="px-6 py-2 rounded-lg hover:opacity-90 transition"
//                     >
//                         + Upload Images
//                     </Button>
//                 )}
//             </div>

//             {/* Image Grid */}
//             {
//             searchStatus === 'loading' && isSearching ? (
//                     <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 p-6">
//                         {Array.from({ length: 4 }).map((_, i) => (
//                             <Skeleton key={i} className="aspect-square rounded-lg" />
//                         ))}
//                     </div>
//                 ) : filteredAndSortedImages.length === 0 ? (
//                 <div className="text-center py-12 bg-gray-50 dark:bg-gray-900 rounded-lg">
//                     <p className="text-gray-500">No images found</p>
//                     {searchTerm && (
//                         <button
//                             onClick={() => setSearchTerm('')}
//                             className="mt-2 text-blue-500 hover:underline"
//                         >
//                             Clear search
//                         </button>
//                     )}
//                 </div>
//             ) : (
//                 <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
//                     {filteredAndSortedImages.map((image) => {

//                         return (
//                             <ImageCard
//                                 key={image._id}
//                                 image={image}
//                                 isOwner={isOwner}
//                                 onToggleFavorite={() => handleToggleFavorite(image._id)}
//                                 onDelete={() => confirmDeleteImage(image)}
//                                 onDownload={() => handleDownloadImage(image.url, image.name)}
//                                 onClick={() => setSelectedImage(image)}
//                             />
//                         );
//                     })}
//                 </div>
//             )}

//             {/* Modals */}
//             {showUploader && (
//                 <ImageUploader
//                     albumId={albumId}
//                     onClose={() => setShowUploader(false)}
//                     onSuccess={() => dispatch(fetchAllImages(albumId))}
//                 />
//             )}

//             {selectedImage && (
//                 <ImageModal
//                     image={selectedImage}
//                     onClose={() => setSelectedImage(null)}
//                 />
//             )}

//             {/* Delete Confirmation Dialog */}
//             <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
//                 <DialogContent>
//                     <DialogHeader>
//                         <DialogTitle>Delete Image?</DialogTitle>
//                         <DialogDescription>
//                             Are you sure you want to delete <span className="font-semibold text-black dark:text-white">"{imageToDelete?.name}"</span>? This action cannot be undone.
//                         </DialogDescription>
//                     </DialogHeader>
//                     <div className="flex justify-end gap-2 mt-4">
//                         <Button variant="outline" onClick={() => {
//                             setDeleteDialogOpen(false);
//                             setImageToDelete(null);
//                         }}>
//                             Cancel
//                         </Button>
//                         <Button variant="destructive" onClick={handleDeleteImage}>
//                             Delete
//                         </Button>
//                     </div>
//                 </DialogContent>
//             </Dialog>
//         </div>
//     );
// }

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
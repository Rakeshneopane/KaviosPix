// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import ImageCard from './ImageCard';
// import ImageModal from './ImageModal';

// import { favoriteImages as fetchFavoriteImages, toggleImages, deleteImage } from '@/store/slices/imageSlice';
// import { Heart } from 'lucide-react';

// import { toast } from 'sonner';
// import { Button } from '../ui/button.jsx';
// import {
//     Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription
// } from '@/components/ui/dialog';


// export default function FavoriteImages({ albumId, isOwner }) {
//     const dispatch = useDispatch();
//     const { favoriteImages: favoriteImagesData, fetchFavoritesStatus } = useSelector((state) => state.imageSlice);
//     const [selectedImage, setSelectedImage] = useState(null);

//     const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
//     const [imageToDelete, setImageToDelete] = useState(null);

//     useEffect(() => {
//         if (albumId) {
//             dispatch(fetchFavoriteImages(albumId));
//         }
//     }, [albumId, dispatch]);

//     const handleToggleFavorite = async (imageId) => {
//         const currentImage = favoriteImagesData.find(img => img._id === imageId);
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
    
//     if (fetchFavoritesStatus === 'loading') {
//         return <div className="text-center py-12">Loading favorites...</div>;
//     }
    
//     if (!favoriteImagesData?.length) {
//         return (
//             <div className="text-center py-12">
//                 <Heart className="w-16 h-16 mx-auto text-gray-400 mb-4" />
//                 <p className="text-gray-500">No favorite images yet</p>
//                 <p className="text-sm text-gray-400">Heart some images to see them here</p>
//             </div>
//         );
//     }
    
//     return (
//         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 p-6">
//             {favoriteImagesData.map((image) => (
//                 <ImageCard 
//                     key={image._id} 
//                     image={image} 
//                     isOwner={isOwner} 
//                     onToggleFavorite={() => handleToggleFavorite(image._id)}
//                     onDownload={() => handleDownloadImage(image.url, image.name)}
//                     onClick={() => setSelectedImage(image)}
//                     onDelete={() => confirmDeleteImage(image)}
//                 />
//             ))}

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
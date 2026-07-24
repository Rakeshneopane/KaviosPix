// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { ArrowLeft, Share2 } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { toast } from "sonner";
// import { clearImageStatus } from "@/store/slices/imageSlice";
// import { fetchAlbum, clearAlbumStatus, clearCurrentAlbum } from "@/store/slices/albumSlice";
// import ImageGallery from "../images/ImageGallery.jsx";
// import FavoriteImages from "../images/FavoriteImages.jsx";
// import axiosInstance from "@/utils/axiosInstance.js";
// import {
//   Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";

// export default function AlbumDetailPage() {
//   const { albumId } = useParams();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const { currentAlbum } = useSelector((state) => state.albumSlice);
//   const { imagesData: images } = useSelector((state) => state.imageSlice);
//   const { userData: user } = useSelector((state) => state.userSlice);
  
//   const isOwner = currentAlbum?._id?.toString() === albumId?.toString() && currentAlbum?.ownerId?.toString() === user?._id?.toString();

//   const [activeTab, setActiveTab] = useState("all");
//   const [shareDialogOpen, setShareDialogOpen] = useState(false);
//   const [shareEmail, setShareEmail] = useState("");
//   const [shareLoading, setShareLoading] = useState(false);

//   useEffect(() => {
//     if (albumId) {
//       dispatch(fetchAlbum(albumId));
//     }
//     return () => {
//       dispatch(clearImageStatus());
//       dispatch(clearAlbumStatus());
//       dispatch(clearCurrentAlbum());
//     };
//   }, [albumId, dispatch]);

//   const handleShare = async () => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     const emails = shareEmail.split(",").map(e => e.trim()).filter(Boolean);
    
//     if (emails.length === 0) {
//         toast.error("Please enter at least one email");
//         return;
//     }
    
//     const invalidEmails = emails.filter(e => !emailRegex.test(e));
//     if (invalidEmails.length > 0) {
//         toast.error(`Invalid emails: ${invalidEmails.join(", ")}`);
//         return;
//     }

//     setShareLoading(true);
//     try {
//       await axiosInstance.post(`/album/${albumId}/share`, { emails });
//       toast.success("Album shared successfully");
//       setShareEmail("");
//       setShareDialogOpen(false);
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to share album");
//     } finally {
//       setShareLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-white border-b sticky top-0 z-10">
//         <div className="container mx-auto px-4 py-4">
//           <div className="flex justify-between items-center">
//             <Button variant="ghost" onClick={() => navigate(-1)}>
//               <ArrowLeft className="h-4 w-4 mr-2" /> Back
//             </Button>

//             {isOwner && (
//               <Button variant="outline" onClick={() => setShareDialogOpen(true)}>
//                 <Share2 className="h-4 w-4 mr-2" /> Share
//               </Button> 
//             )}
            
//           </div>
//           <div className="mt-4">
//             <h1 className="text-2xl font-bold">{currentAlbum?.name || "Album"}</h1>
//             <p className="text-gray-500">{images?.length || 0} photos</p>
//           </div>

//           {/* Tabs */}
//           <div className="flex gap-2 mt-4">
//             <button
//               onClick={() => setActiveTab("all")}
//               className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
//                 activeTab === "all"
//                   ? "bg-black text-white"
//                   : "bg-gray-100 text-gray-600 hover:bg-gray-200"
//               }`}
//             >
//               All Photos
//             </button>
//             <button
//               onClick={() => setActiveTab("favorites")}
//               className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
//                 activeTab === "favorites"
//                   ? "bg-black text-white"
//                   : "bg-gray-100 text-gray-600 hover:bg-gray-200"
//               }`}
//             >
//               ❤️ Favorites
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Content */}
//       <div className="container mx-auto px-4 py-6">

//         { activeTab === "all" && 
//         <div className={activeTab === "all" ? "" : "hidden"}>
//           <ImageGallery albumId={albumId} isOwner={isOwner} />
//         </div> }
//         {activeTab === "favorites" && 
//         <div className={activeTab === "favorites" ? "" : "hidden"}>
//           <FavoriteImages albumId={albumId} isOwner={isOwner} />
//         </div>}
//       </div>

//       {/* Share Dialog */}
//       <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Share Album</DialogTitle>
//             <DialogDescription>
//               Enter the email of the person you want to share this album with.
//             </DialogDescription>
//           </DialogHeader>
//           <div className="space-y-4 mt-2">
//             <Input
//               placeholder="Enter email separated by commas..."
//               value={shareEmail}
//               onChange={(e) => setShareEmail(e.target.value)}
//             />
//             <div className="flex justify-end gap-2">
//               <Button variant="outline" onClick={() => setShareDialogOpen(false)}>
//                 Cancel
//               </Button>
//               <Button onClick={handleShare} disabled={shareLoading}>
//                 {shareLoading ? "Sharing..." : "Share"}
//               </Button>
//             </div>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }


import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "sonner";

import AlbumHeader from "@/components/albums/AlbumHeader";
import AlbumTabs from "@/components/albums/AlbumTabs";

import ImageGallery from "@/components/images/ImageGallery";
import FavoriteImages from "@/components/images/FavoriteImages";
import ImageUploader from "@/components/images/ImageUploader";

import {
  fetchAlbum,
  clearAlbumStatus,
  clearCurrentAlbum,
} from "@/store/slices/albumSlice";

import { clearImageStatus } from "@/store/slices/imageSlice";

import axiosInstance from "@/utils/axiosInstance";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import SemanticImageSearch from "@/components/search/SemanticImageSearch";
import SearchResults from "@/components/search/SearchResults";
import { clearSearch } from "@/store/slices/imageSlice";

export default function AlbumDetailPage() {
  const { albumId } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    currentAlbum,
    fetchAlbumStatus,
    albumError,
  } = useSelector((state) => state.albumSlice);

  const {
    imagesData: images,
    favoriteImages,
  } = useSelector((state) => state.imageSlice);

  const { userData: user } = useSelector(
    (state) => state.userSlice
  );

  const [isSearching, setIsSearching] = useState(false);

  const [activeTab, setActiveTab] = useState("all");

  const [shareDialogOpen, setShareDialogOpen] =
    useState(false);

  const [uploadDialogOpen, setUploadDialogOpen] =
    useState(false);

  const [shareEmail, setShareEmail] = useState("");
  const [shareLoading, setShareLoading] =
    useState(false);

  const isOwner =
    currentAlbum?.ownerId?.toString() ===
    user?._id?.toString();

  useEffect(() => {
    if (albumId) {
      dispatch(fetchAlbum(albumId));
    }

    return () => {
      dispatch(clearImageStatus());
      dispatch(clearAlbumStatus());
      dispatch(clearCurrentAlbum());
    };
  }, [albumId, dispatch]);

  const handleSearchChange = useCallback(
      (active) => {
        setIsSearching(active);
      },
      []
    );

  const handleShare = async () => {
    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const emails = shareEmail
      .split(",")
      .map((email) => email.trim())
      .filter(Boolean);

    if (!emails.length) {
      toast.error(
        "Enter at least one email address"
      );
      return;
    }

    const invalidEmails = emails.filter(
      (email) => !emailRegex.test(email)
    );

    if (invalidEmails.length) {
      toast.error(
        `Invalid email${
          invalidEmails.length > 1 ? "s" : ""
        }: ${invalidEmails.join(", ")}`
      );

      return;
    }

    setShareLoading(true);

    try {
      await axiosInstance.post(
        `/album/${albumId}/share`,
        { emails }
      );

      toast.success("Album shared successfully");

      setShareEmail("");
      setShareDialogOpen(false);

      // Refresh album so sharedUserIds reflects
      // the newly added collaborators.
      dispatch(fetchAlbum(albumId));
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to share album"
      );
    } finally {
      setShareLoading(false);
    }
  };

  if (
    fetchAlbumStatus === "loading" ||
    fetchAlbumStatus === "idle"
  ) {
    return <AlbumDetailSkeleton />;
  }

  if (
    fetchAlbumStatus === "error" ||
    !currentAlbum
  ) {
    return (
      <AlbumErrorState
        message={albumError}
        onBack={() => navigate("/albums")}
        onRetry={() =>
          dispatch(fetchAlbum(albumId))
        }
      />
    );
  }

  return (
    <>
      <div className="min-h-full bg-background">
        <AlbumHeader
          album={currentAlbum}
          imageCount={images?.length || 0}
          isOwner={isOwner}
          onBack={() => navigate("/albums")}
          onShare={() =>
            setShareDialogOpen(true)
          }
          onUpload={() =>
            setUploadDialogOpen(true)
          }
        />

        {/* Workspace */}
        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="space-y-6">
            <SemanticImageSearch
              albumId={albumId}
              onSearchChange={handleSearchChange}
            />

            {isSearching ? (
              <SearchResults
                isOwner={isOwner}
              />
            ) : (
              <>
                <AlbumTabs
                  value={activeTab}
                  onChange={setActiveTab}
                  imageCount={images?.length}
                  favoriteCount={favoriteImages?.length}
                />

                {activeTab === "all" ? (
                  <ImageGallery
                    albumId={albumId}
                    isOwner={isOwner}
                    onUpload={() =>
                      setUploadDialogOpen(true)
                    }
                  />
                ) : (
                  <FavoriteImages
                    albumId={albumId}
                    isOwner={isOwner}
                  />
                )}
              </>
            )}
          </div>
        </main>
      </div>

      {/* Upload */}
      {uploadDialogOpen && isOwner && (
        <ImageUploader
          albumId={albumId}
          onClose={() =>
            setUploadDialogOpen(false)
          }
          onSuccess={() =>
            setUploadDialogOpen(false)
          }
        />
      )}

      {/* Share */}
      <Dialog
        open={shareDialogOpen}
        onOpenChange={setShareDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Share {currentAlbum.name}
            </DialogTitle>

            <DialogDescription>
              Give other KaviosPix users access to
              this album by entering their email
              addresses.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-2">
            <label
              htmlFor="share-emails"
              className="text-sm font-medium"
            >
              Email addresses
            </label>

            <Input
              id="share-emails"
              autoFocus
              placeholder="alex@example.com, sam@example.com"
              value={shareEmail}
              onChange={(event) =>
                setShareEmail(event.target.value)
              }
              onKeyDown={(event) => {
                if (
                  event.key === "Enter" &&
                  !shareLoading
                ) {
                  handleShare();
                }
              }}
            />

            <p className="text-xs text-muted-foreground">
              Separate multiple email addresses with
              commas.
            </p>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              disabled={shareLoading}
              onClick={() =>
                setShareDialogOpen(false)
              }
            >
              Cancel
            </Button>

            <Button
              onClick={handleShare}
              disabled={
                shareLoading ||
                !shareEmail.trim()
              }
            >
              {shareLoading
                ? "Sharing..."
                : "Share album"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

function AlbumDetailSkeleton() {
  return (
    <div className="min-h-full">
      <div className="border-b">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <Skeleton className="mb-6 h-8 w-24" />

          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-3">
              <Skeleton className="h-9 w-64 max-w-full" />
              <Skeleton className="h-5 w-96 max-w-full" />
              <Skeleton className="h-4 w-44" />
            </div>

            <div className="flex gap-2">
              <Skeleton className="h-9 w-24" />
              <Skeleton className="h-9 w-32" />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Skeleton className="h-10 w-64" />

        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map(
            (_, index) => (
              <Skeleton
                key={index}
                className="aspect-square rounded-xl"
              />
            )
          )}
        </div>
      </div>
    </div>
  );
}

function AlbumErrorState({
  message,
  onBack,
  onRetry,
}) {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-4 text-center">
      <h1 className="text-xl font-semibold">
        Couldn't open this album
      </h1>

      <p className="mt-2 text-sm text-muted-foreground">
        {message ||
          "The album may no longer exist or you may not have access to it."}
      </p>

      <div className="mt-6 flex gap-2">
        <Button
          variant="outline"
          onClick={onBack}
        >
          Back to albums
        </Button>

        <Button onClick={onRetry}>
          Try again
        </Button>
      </div>
    </div>
  );
}
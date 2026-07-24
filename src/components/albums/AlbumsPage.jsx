// import { useState, useEffect } from "react";
// import AlbumCard from "./AlbumCard.jsx";
// import { useSelector, useDispatch } from "react-redux";
// import { Search, Funnel, Plus, Images } from "lucide-react";
// import { Input } from "@/components/ui/input.jsx";
// import { Button } from "@/components/ui/button.jsx";
// import { Skeleton } from "@/components/ui/skeleton.jsx";
// import { useNavigate } from "react-router-dom";
// import { fetchAllAlbum, deleteAlbum } from "@/store/slices/albumSlice.js";
// import { toast } from "sonner";
// import  CreateAlbumModal from "@/components/modals/CreateAlbumModal.jsx"; 
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
// } from "@/components/ui/dialog";
// import { Label } from "@/components/ui/label"; 
// import EditAlbumDialog from "@/components/albums/EditAlbumDialog.jsx";

// export default function AlbumsPage() {
//     const { albumsData: albums, fetchAlbumsStatus, albumError } = useSelector((state) => state.albumSlice);
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     const [editDialogOpen, setEditDialogOpen] = useState(false);
//     const [albumToEdit, setAlbumToEdit] = useState(null);

//     useEffect(()=>{
//         if(fetchAlbumsStatus === "idle"){
//             dispatch(fetchAllAlbum());
//         }
//     }, [dispatch, fetchAlbumsStatus]);
    
//     const [searchTerm, setSearchTerm] = useState("");
//     const [showCreateAlbum, setShowCreateAlbum] = useState(false);
//     const [sortBy, setSortBy] = useState("newest");
//     const [filterDialogOpen, setFilterDialogOpen] = useState(false);
//     const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
//     const [albumToDelete, setAlbumToDelete] = useState(null);
//     const [confirmName, setConfirmName] = useState("");

//     const handleDeleteAlbum = async () => {
//         if (albumToDelete) {
//             if (confirmName !== albumToDelete.name) {
//                 toast.error("Album name does not match!");
//                 return;
//             }
//             try {
//                 await dispatch(deleteAlbum(albumToDelete._id)).unwrap();
//                 toast.success("Album deleted successfully");
//                 dispatch(fetchAllAlbum());
//             } catch (error) {
//                 toast.error(error.message || "Failed to delete album");
//             } finally {
//                 setDeleteDialogOpen(false);
//                 setAlbumToDelete(null);
//                 setConfirmName("");
//             }
//         }
//     };

//     console.log(albums);
//     let filteredAlbums = albums?.filter(album => 
//         album.name.toLowerCase().includes(searchTerm.toLowerCase())
//     ) || [];

//     filteredAlbums = [...filteredAlbums].sort((a, b) => {
//         switch(sortBy) {
//             case "newest":
//                 return new Date(b.createdAt) - new Date(a.createdAt);
//             case "oldest":
//                 return new Date(a.createdAt) - new Date(b.createdAt);
//             case "nameAsc":
//                 return a.name.localeCompare(b.name);
//             case "nameDesc":
//                 return b.name.localeCompare(a.name);
//             default:
//                 return 0;
//         }
//     });
    
//     // Loading state
//     if (fetchAlbumsStatus === "loading") {
//         return (
//             <div className="p-4">
//                 {/* Header Skeletons */}
//                 <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
//                     <div>
//                         <Skeleton className="h-7 w-20 mb-2" />
//                         <Skeleton className="h-4 w-32" />
//                     </div>
//                     <div className="flex gap-2">
//                         <Skeleton className="h-8 w-[200px]" />
//                         <Skeleton className="h-8 w-8" />
//                         <Skeleton className="h-8 w-24" />
//                     </div>
//                 </div>
                
//                 {/* Grid Skeletons */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
//                     {Array.from({ length: 10 }).map((_, i) => (
//                         <AlbumCardSkeleton key={i} />
//                     ))}
//                 </div>
//             </div>
//         );
//     }
//     // Error state
//     if (fetchAlbumsStatus === "error") {
//         return (
//             <div className="p-4 text-center py-12">
//                 <p className="text-red-500 mb-4">Error loading albums: {albumError}</p>
//                 <Button onClick={() => dispatch(fetchAllAlbum())}>
//                     Try Again
//                 </Button>
//             </div>
//         );
//     }
//     return (
//         <div className="p-4">
//             <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
//                 <div>
//                     <h5 className="text-lg font-bold">Albums</h5>
//                     <p className="text-muted-foreground text-sm">
//                         {filteredAlbums.length} {filteredAlbums.length === 1 ? "Album" : "Albums"}
//                     </p>
//                 </div>
                
//                 <div className="flex gap-2">
//                     <div className="relative">
//                         <Search className="absolute left-2.5 top-1/3 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />  
//                         <Input 
//                             placeholder="Search albums..."
//                             className="pl-8 h-8 text-sm w-full" 
//                             value={searchTerm}
//                             onChange={(e) => setSearchTerm(e.target.value)}
//                         />    
//                     </div>
//                     <Button 
//                         variant="outline" 
//                         size="icon" 
//                         className="h-8 w-8 rounded"
//                          onClick={() => setFilterDialogOpen(true)}
//                     > 
//                         <Funnel className="h-4 w-4" /> 
//                     </Button>

                    
//                     <Button 
//                         size="sm" 
//                         onClick={() => setShowCreateAlbum(true)}
//                     >
//                         <Plus className="h-4 w-4 mr-1" /> Create Album
//                     </Button>

                    
//                 </div>
//             </div>
        
//             {/* Empty State */}
//             {filteredAlbums.length === 0 && (
//                 <div className="text-center py-12 border rounded-lg">
//                     <Images className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
//                     <p className="text-muted-foreground">
//                         {searchTerm ? "No albums match your search" : "No albums yet. Create your first album!"}
//                     </p>
//                     {!searchTerm && (
//                         <Button className="mt-4" onClick={() => setShowCreateAlbum(true)}>
//                             <Plus className="h-4 w-4 mr-2" /> Create Album
//                         </Button>
//                     )}
//                 </div>
//             )}

//             { filteredAlbums.length > 0 && (
//                 /* Album Grid */
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
//                     {filteredAlbums.map((album) => (
//                         <AlbumCard 
//                             key={album._id} 
//                             album={album} 
//                             onClick={() => navigate(`/album/${album._id}`)}
//                             onEdit={() => {
//                                 setAlbumToEdit(album);
//                                 setEditDialogOpen(true);
//                             }}
//                             onDelete={() => {
//                                 if (album.isDefault) {
//                                     toast.error("Default album cannot be deleted.");
//                                     return;
//                                 }
//                                 setAlbumToDelete(album);
//                                 setConfirmName("");
//                                 setDeleteDialogOpen(true);
//                             }}
//                         />
//                     ))}
//                 </div>
//             )}

//             {/* Modal */}
//             <CreateAlbumModal 
//                 open={showCreateAlbum} 
//                 onOpenChange={setShowCreateAlbum}
//             />

//             <FilterDialog 
//                 open={filterDialogOpen}
//                 onOpenChange={setFilterDialogOpen}
//                 sortBy={sortBy}
//                 onSortChange={setSortBy}
//             />

//             {/* Delete Confirmation Dialog */}
//             <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
//                 <DialogContent>
//                     <DialogHeader>
//                         <DialogTitle>Delete Album?</DialogTitle>
//                         <DialogDescription>
//                             This action cannot be undone. All photos in this album will be permanently deleted.
//                             Please type <span className="font-semibold text-black">{albumToDelete?.name}</span> to confirm deletion.
//                         </DialogDescription>
//                     </DialogHeader>
//                     <div className="mt-4 space-y-4">
//                         <Input
//                             placeholder="Type album name..."
//                             value={confirmName}
//                             onChange={(e) => setConfirmName(e.target.value)}
//                         />
//                         <div className="flex justify-end gap-2">
//                             <Button variant="outline" onClick={() => {
//                                 setDeleteDialogOpen(false);
//                                 setAlbumToDelete(null);
//                                 setConfirmName("");
//                             }}>
//                                 Cancel
//                             </Button>
//                             <Button 
//                                 variant="destructive" 
//                                 onClick={handleDeleteAlbum}
//                                 disabled={confirmName !== albumToDelete?.name}
//                             >
//                                 Delete
//                             </Button>
//                         </div>
//                     </div>
//                 </DialogContent>
//             </Dialog>

//             {editDialogOpen && albumToEdit && (
//                 <EditAlbumDialog
//                     album={albumToEdit}
//                     onClose={() => {
//                         setEditDialogOpen(false);
//                         setAlbumToEdit(null);
//                     }}
//                     onSuccess={() => dispatch(fetchAllAlbum())}
//                 />
//             )}

//         </div>
//     );
// }

// // Skeleton Component for AlbumCard
// function AlbumCardSkeleton() {
//     return (
//         <div className="rounded-xl border bg-card overflow-hidden">
//             <Skeleton className="aspect-video w-full" />
//             <div className="p-4 space-y-2">
//                 <Skeleton className="h-5 w-3/4" />
//                 <Skeleton className="h-3 w-full" />
//                 <Skeleton className="h-3 w-2/3" />
//                 <div className="flex justify-between pt-2">
//                     <Skeleton className="h-4 w-16" />
//                     <Skeleton className="h-4 w-16" />
//                 </div>
//             </div>
//         </div>
//     );
// }

// function FilterDialog({ open, onOpenChange, sortBy, onSortChange, onEdit }) {
//     return (
//         <Dialog open={open} onOpenChange={onOpenChange} onEdit={onEdit}>
//             <DialogContent className="max-w-sm">
//                 <DialogHeader>
//                     <DialogTitle>Sort & Filter</DialogTitle>
//                 </DialogHeader>
//                 <div className="space-y-4">
//                     <div>
//                         <Label>Sort By</Label>
//                         <select 
//                             className="w-full mt-1 p-2 border rounded"
//                             value={sortBy}
//                             onChange={(e) => onSortChange(e.target.value)}
//                         >
//                             <option value="newest">Newest First</option>
//                             <option value="oldest">Oldest First</option>
//                             <option value="nameAsc">Name (A-Z)</option>
//                             <option value="nameDesc">Name (Z-A)</option>
//                         </select>
//                     </div>
//                 </div>
//             </DialogContent>
//         </Dialog>
//     );
// }

import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  ArrowDownAZ,
  Images,
  Plus,
  Search,
} from "lucide-react";

import PageContainer from "@/components/layout/PageContainer";
import PageHeader from "@/components/layout/PageHeader";

import AlbumCard from "@/components/albums/AlbumCard";
import EditAlbumDialog from "@/components/albums/EditAlbumDialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  deleteAlbum,
  fetchAllAlbum,
} from "@/store/slices/albumSlice";

import { toast } from "sonner";
import CreateAlbumModal from "@/components/modals/CreateAlbumModal";

export default function AlbumsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    albumsData: albums,
    fetchAlbumsStatus,
    albumError,
  } = useSelector((state) => state.albumSlice);

  const { userData: user } = useSelector(
    (state) => state.userSlice
   );
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("recent");

  const [createAlbumOpen, setCreateAlbumOpen] = useState(false);
  const [albumToEdit, setAlbumToEdit] = useState(null);
  const [albumToDelete, setAlbumToDelete] = useState(null);

  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (fetchAlbumsStatus === "idle") {
      dispatch(fetchAllAlbum());
    }
  }, [dispatch, fetchAlbumsStatus]);

  const filteredAlbums = useMemo(() => {
    const query = search.trim().toLowerCase();

    let result = [...(albums || [])];

    if (query) {
      result = result.filter((album) => {
        const name = album.name?.toLowerCase() || "";
        const description =
          album.description?.toLowerCase() || "";

        return (
          name.includes(query) ||
          description.includes(query)
        );
      });
    }

    if (sort === "name") {
      result.sort((a, b) =>
        (a.name || "").localeCompare(b.name || "")
      );
    }

    if (sort === "photos") {
      result.sort(
        (a, b) =>
          (b.photoCount || 0) - (a.photoCount || 0)
      );
    }

    if (sort === "recent") {
      result.sort((a, b) => {
        const aDate = new Date(
          a.updatedAt || a.createdAt || 0
        );

        const bDate = new Date(
          b.updatedAt || b.createdAt || 0
        );

        return bDate - aDate;
      });
    }

    return result;
  }, [albums, search, sort]);

  const handleDelete = async () => {
    if (!albumToDelete) return;

    setIsDeleting(true);

    try {
      await dispatch(
        deleteAlbum(albumToDelete._id)
      ).unwrap();

      toast.success("Album deleted");
      setAlbumToDelete(null);
    } catch (error) {
      toast.error(
        typeof error === "string"
            ? error
            : error?.message || "Failed to create album"
        );
    } finally {
      setIsDeleting(false);
    }
  };

  if (fetchAlbumsStatus === "loading") {
    return <AlbumsSkeleton />;
  }

  if (fetchAlbumsStatus === "error") {
    return (
      <PageContainer className="py-8 sm:py-10">
        <PageHeader
          title="Albums"
          description="Organize your photos into collections."
        />

        <div className="mt-8 flex min-h-72 flex-col items-center justify-center rounded-xl border border-dashed text-center">
          <h2 className="font-medium">
            Couldn't load your albums
          </h2>

          <p className="mt-1 max-w-sm text-sm text-muted-foreground">
            {albumError ||
              "Something went wrong while loading your library."}
          </p>

          <Button
            variant="outline"
            className="mt-4"
            onClick={() => dispatch(fetchAllAlbum())}
          >
            Try again
          </Button>
        </div>
      </PageContainer>
    );
  }

  return (
    <>
      <PageContainer className="py-8 sm:py-10">
        <PageHeader
          title="Albums"
          description="Organize your photos into collections and keep every memory easy to find."
          actions={
            <Button
              onClick={() => setCreateAlbumOpen(true)}
            >
              <Plus className="size-4" />
              New album
            </Button>
          }
        />

        {/* Toolbar */}
        <div className="mt-8 flex flex-col gap-3 rounded-xl border bg-card p-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search albums..."
              className="pl-9"
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="justify-start sm:justify-center"
              >
                <ArrowDownAZ className="size-4" />
                {getSortLabel(sort)}
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => setSort("recent")}
              >
                Recently updated
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => setSort("name")}
              >
                Album name
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => setSort("photos")}
              >
                Most photos
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Results */}
        <div className="mt-6">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {filteredAlbums.length}{" "}
              {filteredAlbums.length === 1
                ? "album"
                : "albums"}
            </p>
          </div>

          {!albums?.length ? (
            <EmptyAlbums />
          ) : !filteredAlbums.length ? (
            <NoAlbumResults
              search={search}
              onClear={() => setSearch("")}
            />
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredAlbums.map((album) => (
                <AlbumCard
                  key={album._id}
                  album={album}
                  currentUserId={user?._id}
                  onClick={() =>
                    navigate(`/album/${album._id}`)
                  }
                  onEdit={() =>
                    setAlbumToEdit(album)
                  }
                  onDelete={() =>
                    setAlbumToDelete(album)
                  }
                />
              ))}
            </div>
          )}
        </div>
      </PageContainer>

      {albumToEdit && (
        <EditAlbumDialog
          album={albumToEdit}
          onClose={() => setAlbumToEdit(null)}
        />
      )}

      <Dialog
        open={Boolean(albumToDelete)}
        onOpenChange={(open) => {
          if (!open && !isDeleting) {
            setAlbumToDelete(null);
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete album?</DialogTitle>

            <DialogDescription>
              You're about to permanently delete{" "}
              <span className="font-medium text-foreground">
                {albumToDelete?.name}
              </span>
              . This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">
            <Button
              variant="outline"
              disabled={isDeleting}
              onClick={() =>
                setAlbumToDelete(null)
              }
            >
              Cancel
            </Button>

            <Button
              variant="destructive"
              disabled={isDeleting}
              onClick={handleDelete}
            >
              {isDeleting
                ? "Deleting..."
                : "Delete album"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <CreateAlbumModal
        open={createAlbumOpen}
        onOpenChange={setCreateAlbumOpen}
      />
    </>
  );
}

function getSortLabel(sort) {
  const labels = {
    recent: "Recently updated",
    name: "Album name",
    photos: "Most photos",
  };

  return labels[sort];
}

function EmptyAlbums() {
  return (
    <div className="flex min-h-80 flex-col items-center justify-center rounded-xl border border-dashed bg-muted/20 px-6 text-center">
      <div className="flex size-12 items-center justify-center rounded-xl bg-muted">
        <Images className="size-5 text-muted-foreground" />
      </div>

      <h2 className="mt-4 font-medium">
        Create your first album
      </h2>

      <p className="mt-1 max-w-md text-sm text-muted-foreground">
        Albums help you organize photos by trips,
        events, people, or anything else worth
        remembering.
      </p>
    </div>
  );
}

function NoAlbumResults({ search, onClear }) {
  return (
    <div className="flex min-h-64 flex-col items-center justify-center rounded-xl border border-dashed px-6 text-center">
      <Search className="size-6 text-muted-foreground" />

      <h2 className="mt-4 font-medium">
        No albums found
      </h2>

      <p className="mt-1 text-sm text-muted-foreground">
        No albums match "{search}".
      </p>

      <Button
        variant="outline"
        size="sm"
        className="mt-4"
        onClick={onClear}
      >
        Clear search
      </Button>
    </div>
  );
}

function AlbumsSkeleton() {
  return (
    <PageContainer className="py-8 sm:py-10">
      <Skeleton className="h-9 w-36" />
      <Skeleton className="mt-3 h-5 w-80 max-w-full" />

      <div className="mt-8 flex gap-3">
        <Skeleton className="h-10 flex-1" />
        <Skeleton className="h-10 w-40" />
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map(
          (_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-xl border"
            >
              <Skeleton className="aspect-[4/3] w-full rounded-none" />

              <div className="p-4">
                <Skeleton className="h-5 w-2/3" />
                <Skeleton className="mt-2 h-4 w-full" />
                <Skeleton className="mt-4 h-4 w-20" />
              </div>
            </div>
          )
        )}
      </div>
    </PageContainer>
  );
}
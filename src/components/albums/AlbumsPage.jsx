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
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  FolderPlus,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

import { createAlbum } from "@/store/slices/albumSlice";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function CreateAlbumModal({
  open,
  onOpenChange,
}) {
  const dispatch = useDispatch();

  const [albumName, setAlbumName] = useState("");
  const [description, setDescription] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const resetForm = () => {
    setAlbumName("");
    setDescription("");
  };

  const handleOpenChange = (nextOpen) => {
    // Prevent closing while the request is running
    if (isCreating) return;

    if (!nextOpen) {
      resetForm();
    }

    onOpenChange(nextOpen);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const name = albumName.trim();
    const normalizedDescription = description.trim();

    if (!name) {
      toast.error("Please enter an album name");
      return;
    }

    if (name.length < 3) {
      toast.error(
        "Album name must be at least 3 characters"
      );
      return;
    }

    if (name.length > 30) {
      toast.error(
        "Album name cannot exceed 30 characters"
      );
      return;
    }

    setIsCreating(true);

    try {
      await dispatch(
        createAlbum({
          name,
          description: normalizedDescription,
        })
      ).unwrap();

      toast.success("Album created");

      resetForm();
      onOpenChange(false);
    } catch (error) {
      toast.error(
        typeof error === "string"
          ? error
          : error?.message ||
              "Failed to create album"
      );
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={handleOpenChange}
    >
      <DialogContent className="sm:max-w-md">
        {/* Header */}
        <DialogHeader>
          <div className="mb-2 flex size-10 items-center justify-center rounded-xl bg-muted">
            <FolderPlus className="size-5" />
          </div>

          <DialogTitle>
            Create a new album
          </DialogTitle>

          <DialogDescription>
            Create a collection to organize your
            photos and memories.
          </DialogDescription>
        </DialogHeader>

        {/* Form */}
        <form
          id="create-album-form"
          onSubmit={handleSubmit}
          className="space-y-5 py-2"
        >
          {/* Album name */}
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-4">
              <Label htmlFor="albumName">
                Album name
              </Label>

              <span className="text-xs text-muted-foreground">
                {albumName.length}/30
              </span>
            </div>

            <Input
              id="albumName"
              value={albumName}
              disabled={isCreating}
              maxLength={30}
              autoFocus
              autoComplete="off"
              placeholder="Summer vacation"
              onChange={(event) =>
                setAlbumName(event.target.value)
              }
            />

            <p className="text-xs text-muted-foreground">
              Choose a short, memorable name for
              your album.
            </p>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="albumDescription">
              Description{" "}
              <span className="font-normal text-muted-foreground">
                (optional)
              </span>
            </Label>

            <Textarea
              id="albumDescription"
              value={description}
              disabled={isCreating}
              rows={3}
              placeholder="A few words about this album..."
              onChange={(event) =>
                setDescription(event.target.value)
              }
              className="resize-none"
            />
          </div>
        </form>

        {/* Footer */}
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            disabled={isCreating}
            onClick={() =>
              handleOpenChange(false)
            }
          >
            Cancel
          </Button>

          <Button
            type="submit"
            form="create-album-form"
            disabled={
              isCreating ||
              albumName.trim().length < 3
            }
          >
            {isCreating ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <FolderPlus className="size-4" />
                Create album
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
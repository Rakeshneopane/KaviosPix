import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { updateAlbum } from "@/store/slices/albumSlice";

export default function EditAlbumDialog({
  album,
  onClose,
  onSuccess,
}) {
  const dispatch = useDispatch();

  const [name, setName] = useState(album.name || "");
  const [description, setDescription] = useState(
    album.description || ""
  );

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmedName = name.trim();

    if (!trimmedName) {
      toast.error("Album name is required");
      return;
    }

    if (trimmedName.length < 3) {
      toast.error(
        "Album name must be at least 3 characters"
      );
      return;
    }

    setIsLoading(true);

    try {
      await dispatch(
        updateAlbum({
          albumId: album._id,
          albumUpdateData: {
            name: trimmedName,
            description: description.trim(),

            // Preserve existing sharing.
            sharedUserIds: album.sharedUserIds || [],
          },
        })
      ).unwrap();

      toast.success("Album updated");

      onSuccess?.();
      onClose();
    } catch (error) {
      toast.error(
        error || "Failed to update album"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open && !isLoading) {
          onClose();
        }
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit album</DialogTitle>

          <DialogDescription>
            Change the name or description of this
            album.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div className="space-y-2">
            <Label htmlFor="album-name">
              Album name
            </Label>

            <Input
              id="album-name"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              maxLength={30}
              autoFocus
              disabled={isLoading}
              placeholder="Album name"
            />

            <div className="flex justify-end">
              <span className="text-xs text-muted-foreground">
                {name.length}/30
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="album-description">
              Description
            </Label>

            <Textarea
              id="album-description"
              value={description}
              onChange={(event) =>
                setDescription(event.target.value)
              }
              disabled={isLoading}
              placeholder="What's this album about?"
              rows={4}
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              disabled={isLoading}
              onClick={onClose}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={
                isLoading ||
                !name.trim() ||
                name.trim().length < 3
              }
            >
              {isLoading
                ? "Saving..."
                : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function DeleteImageDialog({
  open,
  image,
  onOpenChange,
  onCancel,
  onConfirm,
}) {
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Delete photo?
          </DialogTitle>

          <DialogDescription>
            {image?.name ? (
              <>
                <span className="font-medium text-foreground">
                  {image.name}
                </span>{" "}
                will be permanently removed from this
                album. This action cannot be undone.
              </>
            ) : (
              "This photo will be permanently removed. This action cannot be undone."
            )}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={onCancel}
          >
            Cancel
          </Button>

          <Button
            variant="destructive"
            onClick={onConfirm}
          >
            Delete photo
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
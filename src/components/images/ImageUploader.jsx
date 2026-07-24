import {
  useEffect,
  useRef,
  useState,
} from "react";
import {
  useDispatch,
  useSelector,
} from "react-redux";
import {
  Check,
  Heart,
  ImagePlus,
  Loader2,
  Upload,
  X,
} from "lucide-react";
import { toast } from "sonner";

import { uploadImages } from "@/store/slices/imageSlice";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ACCEPTED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

export default function ImageUploader({
  albumId: propAlbumId,
  onClose,
  onSuccess,
}) {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  const { albumsData: albums } = useSelector(
    (state) => state.albumSlice
  );

  const defaultAlbum = albums?.find(
    (album) => album.isDefault === true
  );

  const [selectedAlbumId, setSelectedAlbumId] =
    useState(propAlbumId || "");

  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  const [tags, setTags] = useState("");
  const [person, setPerson] = useState("");

  const [isFavorite, setIsFavorite] =
    useState(false);

  const [isLoading, setIsLoading] =
    useState(false);

  // -----------------------------------------
  // Select default album when opened
  // from dashboard
  // -----------------------------------------

  useEffect(() => {
    if (
      !propAlbumId &&
      !selectedAlbumId &&
      defaultAlbum?._id
    ) {
      setSelectedAlbumId(defaultAlbum._id);
    }
  }, [
    defaultAlbum,
    propAlbumId,
    selectedAlbumId,
  ]);

  // -----------------------------------------
  // Clean preview URLs on unmount
  // -----------------------------------------

  useEffect(() => {
    return () => {
      previews.forEach((preview) => {
        URL.revokeObjectURL(preview);
      });
    };
  }, [previews]);

  // -----------------------------------------
  // Add files
  // -----------------------------------------

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(
      event.target.files || []
    );

    if (!selectedFiles.length) return;

    const validFiles = selectedFiles.filter(
      (file) =>
        ACCEPTED_TYPES.includes(file.type)
    );

    const rejectedCount =
      selectedFiles.length - validFiles.length;

    if (rejectedCount > 0) {
      toast.error(
        rejectedCount === 1
          ? "1 unsupported file was ignored"
          : `${rejectedCount} unsupported files were ignored`
      );
    }

    if (!validFiles.length) {
      event.target.value = "";
      return;
    }

    const newPreviews = validFiles.map(
      (file) => URL.createObjectURL(file)
    );

    setFiles((current) => [
      ...current,
      ...validFiles,
    ]);

    setPreviews((current) => [
      ...current,
      ...newPreviews,
    ]);

    // Allows selecting the same file again
    event.target.value = "";
  };

  // -----------------------------------------
  // Remove image
  // -----------------------------------------

  const removeFile = (index) => {
    const preview = previews[index];

    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setFiles((current) =>
      current.filter((_, i) => i !== index)
    );

    setPreviews((current) =>
      current.filter((_, i) => i !== index)
    );
  };

  // -----------------------------------------
  // Upload
  // -----------------------------------------

  const handleSubmit = async () => {
    if (!files.length) {
      toast.error(
        "Please select at least one image"
      );
      return;
    }

    if (!selectedAlbumId) {
      toast.error("Please select an album");
      return;
    }

    const formData = new FormData();

    files.forEach((file) => {
      formData.append("images", file);
    });

    formData.append(
      "albumId",
      selectedAlbumId
    );

    if (tags.trim()) {
      const normalizedTags = tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);

      formData.append(
        "tags",
        JSON.stringify(normalizedTags)
      );
    }

    if (person.trim()) {
      const normalizedPeople = person
        .split(",")
        .map((name) => name.trim())
        .filter(Boolean);

      formData.append(
        "person",
        JSON.stringify(normalizedPeople)
      );
    }

    formData.append(
      "isFavorite",
      String(isFavorite)
    );

    setIsLoading(true);

    try {
      await dispatch(
        uploadImages(formData)
      ).unwrap();

      toast.success(
        files.length === 1
          ? "Photo uploaded successfully"
          : `${files.length} photos uploaded successfully`
      );

      onSuccess?.();
      onClose?.();
    } catch (error) {
      toast.error(
        typeof error === "string"
          ? error
          : error?.message ||
              "Failed to upload images"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const selectedAlbum = albums?.find(
    (album) =>
      album._id === selectedAlbumId
  );

  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open && !isLoading) {
          onClose?.();
        }
      }}
    >
      <DialogContent
        className="
          flex
          max-h-[92vh]
          w-[calc(100%-2rem)]
          max-w-3xl
          flex-col
          gap-0
          overflow-hidden
          p-0
        "
      >
        {/* ===================================
            HEADER
        =================================== */}

        <DialogHeader className="border-b px-5 py-4 sm:px-6">
          <DialogTitle className="flex items-center gap-2">
            <ImagePlus className="size-5" />
            Upload photos
          </DialogTitle>

          <DialogDescription>
            Add photos to your library and organize
            them before uploading.
          </DialogDescription>
        </DialogHeader>

        {/* ===================================
            SCROLLABLE CONTENT
        =================================== */}

        <div className="flex-1 overflow-y-auto">
          <div className="space-y-6 p-5 sm:p-6">

            {/* ===============================
                DROP ZONE
            =============================== */}

            <button
              type="button"
              disabled={isLoading}
              onClick={() =>
                fileInputRef.current?.click()
              }
              className="
                group
                flex
                w-full
                flex-col
                items-center
                justify-center
                rounded-xl
                border
                border-dashed
                bg-muted/20
                px-6
                py-10
                text-center
                transition-colors

                hover:border-foreground/30
                hover:bg-muted/40

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-ring
                focus-visible:ring-offset-2

                disabled:pointer-events-none
                disabled:opacity-50
              "
            >
              <div
                className="
                  flex
                  size-12
                  items-center
                  justify-center
                  rounded-xl
                  border
                  bg-background
                  shadow-sm
                  transition-transform
                  group-hover:scale-105
                "
              >
                <Upload className="size-5 text-muted-foreground" />
              </div>

              <p className="mt-4 text-sm font-medium">
                Choose photos to upload
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                JPEG, PNG or WebP
              </p>

              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={handleFileChange}
              />
            </button>

            {/* ===============================
                PREVIEWS
            =============================== */}

            {files.length > 0 && (
              <section>
                <div className="mb-3 flex items-center justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-medium">
                      Selected photos
                    </h3>

                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {files.length}{" "}
                      {files.length === 1
                        ? "photo"
                        : "photos"}{" "}
                      ready to upload
                    </p>
                  </div>

                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    disabled={isLoading}
                    onClick={() =>
                      fileInputRef.current?.click()
                    }
                  >
                    <ImagePlus className="size-4" />
                    Add more
                  </Button>
                </div>

                <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5">
                  {previews.map(
                    (src, index) => (
                      <div
                        key={src}
                        className="
                          group
                          relative
                          aspect-square
                          overflow-hidden
                          rounded-lg
                          bg-muted
                        "
                      >
                        <img
                          src={src}
                          alt={
                            files[index]?.name ||
                            `Selected photo ${index + 1}`
                          }
                          className="size-full object-cover"
                        />

                        <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />

                        <Button
                          type="button"
                          variant="secondary"
                          size="icon"
                          disabled={isLoading}
                          onClick={() =>
                            removeFile(index)
                          }
                          aria-label={`Remove ${
                            files[index]?.name ||
                            "photo"
                          }`}
                          className="
                            absolute
                            right-1.5
                            top-1.5
                            size-7
                            rounded-full
                            bg-background/90
                            opacity-100
                            shadow-sm
                            backdrop-blur

                            sm:opacity-0
                            sm:group-hover:opacity-100
                            sm:focus:opacity-100
                          "
                        >
                          <X className="size-3.5" />
                        </Button>

                        {/* filename */}
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-2 pb-2 pt-6">
                          <p className="truncate text-[11px] text-white">
                            {files[index]?.name}
                          </p>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </section>
            )}

            {/* ===============================
                ALBUM
            =============================== */}

            {!propAlbumId && (
              <section className="space-y-2">
                <Label htmlFor="album">
                  Album
                </Label>

                <Select
                  value={selectedAlbumId}
                  onValueChange={
                    setSelectedAlbumId
                  }
                  disabled={isLoading}
                >
                  <SelectTrigger
                    id="album"
                    className="w-full"
                  >
                    <SelectValue placeholder="Select an album" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>
                        Your albums
                      </SelectLabel>

                      {albums?.map((album) => (
                        <SelectItem
                          key={album._id}
                          value={album._id}
                        >
                          <span className="flex items-center gap-2">
                            {album.name}

                            {album.isDefault && (
                              <span className="text-xs text-muted-foreground">
                                Default
                              </span>
                            )}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </section>
            )}

            {/* Album supplied by AlbumDetailPage */}

            {propAlbumId && selectedAlbum && (
              <div className="rounded-lg border bg-muted/20 px-4 py-3">
                <p className="text-xs text-muted-foreground">
                  Uploading to
                </p>

                <p className="mt-0.5 text-sm font-medium">
                  {selectedAlbum.name}
                </p>
              </div>
            )}

            {/* ===============================
                METADATA
            =============================== */}

            <section className="space-y-4">
              <div>
                <h3 className="text-sm font-medium">
                  Photo details
                </h3>

                <p className="mt-1 text-xs text-muted-foreground">
                  These details will be applied to all
                  selected photos.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {/* Tags */}

                <div className="space-y-2">
                  <Label htmlFor="tags">
                    Tags
                  </Label>

                  <Input
                    id="tags"
                    value={tags}
                    disabled={isLoading}
                    onChange={(event) =>
                      setTags(event.target.value)
                    }
                    placeholder="beach, sunset, travel"
                  />

                  <p className="text-xs text-muted-foreground">
                    Separate tags with commas.
                  </p>
                </div>

                {/* People */}

                <div className="space-y-2">
                  <Label htmlFor="people">
                    People
                  </Label>

                  <Input
                    id="people"
                    value={person}
                    disabled={isLoading}
                    onChange={(event) =>
                      setPerson(
                        event.target.value
                      )
                    }
                    placeholder="John, Jane"
                  />

                  <p className="text-xs text-muted-foreground">
                    Separate names with commas.
                  </p>
                </div>
              </div>

              {/* Favorite */}

              <label
                htmlFor="favorite"
                className="
                  flex
                  cursor-pointer
                  items-start
                  gap-3
                  rounded-lg
                  border
                  p-3
                  transition-colors
                  hover:bg-muted/30
                "
              >
                <Checkbox
                  id="favorite"
                  checked={isFavorite}
                  disabled={isLoading}
                  onCheckedChange={(checked) =>
                    setIsFavorite(
                      checked === true
                    )
                  }
                  className="mt-0.5"
                />

                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <Heart
                      className={`size-4 ${
                        isFavorite
                          ? "fill-red-500 text-red-500"
                          : "text-muted-foreground"
                      }`}
                    />

                    <span className="text-sm font-medium">
                      Mark as favorite
                    </span>
                  </div>

                  <p className="mt-1 text-xs text-muted-foreground">
                    Add these photos to your favorites
                    after uploading.
                  </p>
                </div>
              </label>
            </section>
          </div>
        </div>

        {/* ===================================
            FOOTER
        =================================== */}

        <DialogFooter className="border-t bg-background px-5 py-8 sm:px-6">
          <div className="flex w-full flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="hidden text-xs text-muted-foreground sm:block">
              {files.length > 0
                ? `${files.length} ${
                    files.length === 1
                      ? "photo"
                      : "photos"
                  } selected`
                : "No photos selected"}
            </div>

            <div className="flex gap-2 sm:justify-end">
              <Button
                type="button"
                variant="outline"
                disabled={isLoading}
                onClick={onClose}
                className="flex-1 sm:flex-none"
              >
                Cancel
              </Button>

              <Button
                type="button"
                disabled={
                  isLoading ||
                  !files.length ||
                  !selectedAlbumId
                }
                onClick={handleSubmit}
                className="flex-1 sm:flex-none"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="size-4" />

                    {files.length
                      ? `Upload ${files.length}`
                      : "Upload"}
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
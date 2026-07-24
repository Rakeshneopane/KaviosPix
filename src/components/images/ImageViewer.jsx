import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Heart,
  MessageCircle,
  Send,
  X,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import {
  commentImages,
  toggleImages,
} from "@/store/slices/imageSlice";

export default function ImageViewer({
  images = [],
  imageId,
  onClose,
}) {
  const dispatch = useDispatch();

  /*
   * Redux is our live source of truth.
   *
   * The images prop determines the collection/order being viewed.
   * Redux gives us the latest version of each image after things like
   * favorite/comment updates.
   */
  const {
    imagesData = [],
    favoriteImages = [],
  } = useSelector((state) => state.imageSlice);

  const [comment, setComment] = useState("");
  const [isCommenting, setIsCommenting] = useState(false);

  /*
   * Build the viewer collection.
   *
   * Keep the ordering supplied by ImageGallery, but replace each image
   * with its latest Redux version when available.
   */
  const liveImages = useMemo(() => {
    return images.map((image) => {
      return (
        imagesData.find((item) => item._id === image._id) ||
        favoriteImages.find((item) => item._id === image._id) ||
        image
      );
    });
  }, [images, imagesData, favoriteImages]);

  /*
   * Find the image that originally opened the viewer.
   */
  const initialIndex = Math.max(
    0,
    liveImages.findIndex((image) => image._id === imageId)
  );

  const [currentIndex, setCurrentIndex] =
    useState(initialIndex);

  /*
   * If ImageGallery opens a different image while the viewer
   * remains mounted, synchronize to that image.
   */
  useEffect(() => {
    const index = liveImages.findIndex(
      (image) => image._id === imageId
    );

    if (index >= 0) {
      setCurrentIndex(index);
    }
    // We intentionally synchronize when imageId changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageId]);

  const currentImage = liveImages[currentIndex];

  const hasPrevious = currentIndex > 0;

  const hasNext =
    currentIndex < liveImages.length - 1;

  const comments = currentImage?.comments || [];
  const isFavorite = currentImage?.isFavorite || false;

  /*
   * Navigation
   */
  const showPrevious = () => {
    if (!hasPrevious) return;

    setCurrentIndex((index) => index - 1);
    setComment("");
  };

  const showNext = () => {
    if (!hasNext) return;

    setCurrentIndex((index) => index + 1);
    setComment("");
  };

  /*
   * Keyboard navigation
   *
   * Avoid hijacking arrow keys while the user is typing
   * inside an input/textarea.
   */
  useEffect(() => {
    const handleKeyDown = (event) => {
      const tagName =
        document.activeElement?.tagName?.toLowerCase();

      const isTyping =
        tagName === "input" ||
        tagName === "textarea" ||
        document.activeElement?.isContentEditable;

      if (event.key === "Escape") {
        onClose?.();
        return;
      }

      if (isTyping) return;

      if (event.key === "ArrowLeft") {
        setCurrentIndex((index) =>
          Math.max(0, index - 1)
        );
        setComment("");
      }

      if (event.key === "ArrowRight") {
        setCurrentIndex((index) =>
          Math.min(liveImages.length - 1, index + 1)
        );
        setComment("");
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [liveImages.length, onClose]);

  /*
   * Favorite
   */
  const handleToggleFavorite = async () => {
    if (!currentImage) return;

    try {
      await dispatch(
        toggleImages({
          imageId: currentImage._id,
          imageData: {
            isFavorite: !isFavorite,
          },
        })
      ).unwrap();

      toast.success(
        isFavorite
          ? "Removed from favorites"
          : "Added to favorites"
      );
    } catch {
      toast.error("Failed to update favorite");
    }
  };

  /*
   * Comments
   */
  const handleAddComment = async () => {
    const value = comment.trim();

    if (!value || !currentImage) return;

    setIsCommenting(true);

    try {
      await dispatch(
        commentImages({
          imageId: currentImage._id,
          comments: {
            comment: value,
          },
        })
      ).unwrap();

      setComment("");
      toast.success("Comment added");
    } catch {
      toast.error("Failed to add comment");
    } finally {
      setIsCommenting(false);
    }
  };

  /*
   * Download
   */
  const handleDownload = async () => {
    if (!currentImage) return;

    try {
      const response = await fetch(currentImage.url);

      if (!response.ok) {
        throw new Error("Download failed");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;
      link.download =
        currentImage.name || "image.jpg";

      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);

      toast.success("Download started");
    } catch {
      toast.error("Failed to download image");
    }
  };

  /*
   * Viewer may briefly have no image if the collection changes.
   */
  if (!currentImage) {
    return null;
  }

  return (
    <div
      className="
        fixed inset-0 z-50
        bg-black/70
        backdrop-blur-sm
        sm:p-4
      "
      onClick={onClose}
    >
      <div
        className="
          mx-auto flex h-full w-full
          max-w-7xl flex-col
          overflow-hidden
          bg-background
          text-foreground
          sm:rounded-2xl
          sm:border
          sm:shadow-2xl
        "
        onClick={(event) => event.stopPropagation()}
      >
        {/* =====================================================
            TOP TOOLBAR
        ====================================================== */}

        <header
          className="
            flex shrink-0
            items-center justify-between
            gap-3
            border-b
            bg-background
            px-3 py-2
            sm:px-4
          "
        >
          {/* Photo identity */}
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">
              {currentImage.name || "Photo"}
            </p>

            {liveImages.length > 1 && (
              <p className="text-xs text-muted-foreground">
                {currentIndex + 1} of {liveImages.length}
              </p>
            )}
          </div>

          {/* Toolbar actions */}
          <div className="flex shrink-0 items-center gap-1">
            {/* Desktop favorite */}
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleToggleFavorite}
              className="hidden gap-2 sm:flex"
            >
              <Heart
                className={`size-4 ${
                  isFavorite
                    ? "fill-current text-red-500"
                    : ""
                }`}
              />

              {isFavorite ? "Favorited" : "Favorite"}
            </Button>

            {/* Mobile favorite */}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={handleToggleFavorite}
              className="sm:hidden"
              aria-label={
                isFavorite
                  ? "Remove from favorites"
                  : "Add to favorites"
              }
            >
              <Heart
                className={`size-4 ${
                  isFavorite
                    ? "fill-current text-red-500"
                    : ""
                }`}
              />
            </Button>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={handleDownload}
              aria-label="Download photo"
            >
              <Download className="size-4" />
            </Button>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={onClose}
              aria-label="Close viewer"
            >
              <X className="size-4" />
            </Button>
          </div>
        </header>

        {/* =====================================================
            VIEWER BODY

            Mobile:
            Image
            Details

            Desktop:
            Image | Details
        ====================================================== */}

        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto lg:flex-row lg:overflow-hidden">
          {/* ===================================================
              IMAGE STAGE
          ==================================================== */}

          <section
            className="
              relative flex
              min-h-[50vh]
              w-full
              shrink-0
              items-center justify-center
              overflow-hidden
              bg-muted
              lg:min-h-0
              lg:flex-1
              lg:shrink
            "
          >
            <img
              key={currentImage._id}
              src={currentImage.url}
              alt={currentImage.name || "Photo"}
              draggable={false}
              className="
                max-h-[70vh]
                max-w-full
                select-none
                object-contain
                lg:max-h-full
              "
            />

            {/* Previous */}
            {hasPrevious && (
              <Button
                type="button"
                variant="secondary"
                size="icon"
                onClick={showPrevious}
                aria-label="Previous photo"
                className="
                  absolute left-2 top-1/2 z-30
                  size-11
                  -translate-y-1/2
                  rounded-full
                  bg-background
                  shadow-lg
                  backdrop-blur
                  hover:bg-accent
                  sm:left-4
                "
              >
                <ChevronLeft className="size-5" />
              </Button>
            )}

            {/* Next */}
            {hasNext && (
              <Button
                type="button"
                variant="secondary"
                size="icon"
                onClick={showNext}
                aria-label="Next photo"
                className="
                  absolute right-2 top-1/2 z-30
                  size-11
                  -translate-y-1/2
                  rounded-full
                  bg-background
                  shadow-lg
                  backdrop-blur
                  hover:bg-accent
                  sm:right-4
                "
              >
                <ChevronRight className="size-5" />
              </Button>
            )}
          </section>

          {/* ===================================================
              DETAILS

              Bottom on mobile.
              Right sidebar on desktop.
          ==================================================== */}

          <aside
            className="
              w-full
              shrink-0
              border-t
              bg-card
              text-card-foreground
              lg:w-[360px]
              lg:border-l
              lg:border-t-0
              xl:w-[400px]
            "
          >
            <DetailsPanel
              image={currentImage}
              comments={comments}
              comment={comment}
              setComment={setComment}
              isCommenting={isCommenting}
              onAddComment={handleAddComment}
            />
          </aside>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   DETAILS PANEL
============================================================ */

function DetailsPanel({
  image,
  comments,
  comment,
  setComment,
  isCommenting,
  onAddComment,
}) {
  return (
    <div
      className="
        flex h-full
        min-h-0
        flex-col
      "
    >
      {/* Scrollable details */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5">
        <div className="space-y-5">
          {/* Heading */}
          <div>
            <h2 className="text-base font-semibold">
              Photo details
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Information and metadata for this photo.
            </p>
          </div>

          <Separator />

          {/* Caption */}
          {image.caption && (
            <DetailSection title="Caption">
              <p className="text-sm leading-6">
                {image.caption}
              </p>
            </DetailSection>
          )}

          {/* Tags */}
          {image.tags?.length > 0 && (
            <DetailSection title="Tags">
              <div className="flex flex-wrap gap-1.5">
                {image.tags.map((tag, index) => (
                  <Badge
                    key={`${tag}-${index}`}
                    variant="secondary"
                  >
                    #{tag}
                  </Badge>
                ))}
              </div>
            </DetailSection>
          )}

          {/* People */}
          {image.person?.length > 0 && (
            <DetailSection title="People">
              <div className="flex flex-wrap gap-1.5">
                {image.person.map((person, index) => (
                  <Badge
                    key={`${person}-${index}`}
                    variant="outline"
                  >
                    {person}
                  </Badge>
                ))}
              </div>
            </DetailSection>
          )}

          {/* Metadata */}
          <DetailSection title="Information">
            <dl className="space-y-2 text-sm">
              {image.size != null && (
                <MetadataRow
                  label="Size"
                  value={formatFileSize(image.size)}
                />
              )}

              {image.createdAt && (
                <MetadataRow
                  label="Uploaded"
                  value={formatDate(image.createdAt)}
                />
              )}
            </dl>
          </DetailSection>

          <Separator />

          {/* Comments */}
          <section>
            <div className="mb-3 flex items-center gap-2">
              <MessageCircle className="size-4 text-muted-foreground" />

              <h3 className="text-sm font-medium">
                Comments
              </h3>

              <span className="text-xs text-muted-foreground">
                {comments.length}
              </span>
            </div>

            {comments.length === 0 ? (
              <div
                className="
                  rounded-xl
                  border border-dashed
                  bg-muted/30
                  px-4 py-6
                  text-center
                "
              >
                <MessageCircle className="mx-auto mb-2 size-5 text-muted-foreground" />

                <p className="text-sm font-medium">
                  No comments yet
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  Start the conversation about this photo.
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {comments.map((item, index) => (
                  <div
                    key={index}
                    className="
                      rounded-xl
                      bg-muted
                      px-3 py-2.5
                      text-sm
                      leading-5
                    "
                  >
                    {typeof item === "string"
                      ? item
                      : item?.comment || ""}
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>

      {/* Comment composer */}
      <div
        className="
          shrink-0
          border-t
          bg-card
          p-3
          sm:p-4
        "
      >
        <div className="flex gap-2">
          <Input
            value={comment}
            onChange={(event) =>
              setComment(event.target.value)
            }
            onKeyDown={(event) => {
              if (
                event.key === "Enter" &&
                !event.shiftKey
              ) {
                event.preventDefault();
                onAddComment();
              }
            }}
            placeholder="Add a comment..."
            disabled={isCommenting}
          />

          <Button
            type="button"
            size="icon"
            onClick={onAddComment}
            disabled={
              isCommenting || !comment.trim()
            }
            aria-label="Post comment"
            className="shrink-0"
          >
            <Send className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   SMALL PRESENTATIONAL COMPONENTS
============================================================ */

function DetailSection({ title, children }) {
  return (
    <section>
      <h3 className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {title}
      </h3>

      {children}
    </section>
  );
}

function MetadataRow({ label, value }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <dt className="text-muted-foreground">
        {label}
      </dt>

      <dd className="text-right font-medium">
        {value}
      </dd>
    </div>
  );
}

/* ============================================================
   FORMATTERS
============================================================ */

function formatFileSize(bytes) {
  if (!Number.isFinite(Number(bytes))) {
    return "—";
  }

  const value = Number(bytes);

  if (value < 1024) {
    return `${value} B`;
  }

  if (value < 1024 * 1024) {
    return `${(value / 1024).toFixed(1)} KB`;
  }

  return `${(value / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDate(value) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
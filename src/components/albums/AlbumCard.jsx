// import { Card } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { MoreVertical, Trash2, Pencil } from "lucide-react";
// import {
//   DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { useState } from "react";

// import Photo6 from "../../assets/images/photo1.avif";
// import Photo4 from "../../assets/images/photo2.avif";
// import Photo5 from "../../assets/images/photo3.avif";
// import Photo2 from "../../assets/images/photo4.avif";
// import Photo3 from "../../assets/images/photo5.avif";
// import Photo1 from "../../assets/images/photo6.avif";

// export default function AlbumCard({ album, onClick, onDelete, onEdit }) {
//     const isDefault = album.isDefault === true;
//     const [isHovered, setIsHovered] = useState(false);

//     const photos = [Photo1, Photo2, Photo3, Photo4, Photo5, Photo6];
//     const placeholderImage = photos[album._id.charCodeAt(album._id.length - 1) % photos.length];

//     return (
//         <Card 
//             className="overflow-hidden hover:shadow-2xl shadow-lg transition-all cursor-pointer relative min-h-48"
//             onClick={onClick}  
//             onMouseEnter={() => setIsHovered(true)}
//             onMouseLeave={() => setIsHovered(false)}  
//         >
//             {/* Image fills entire card */}
            
//             <img 
//                 src={album.coverImage || placeholderImage} 
//                 alt={album.name}
//                 className={`absolute inset-0 w-full h-full object-cover transition-transform duration-300 ${isHovered ? 'scale-110' : 'scale-100'}`}
//                 onError={(e) => { e.target.src = Photo1; }}
//             />

//             {/* Dark overlay */}
//             <div className={`absolute inset-0 transition-opacity duration-300 ${isHovered ? 'bg-black/55' : 'bg-black/40'}`} />

//             {/* Top row — badges */}
//             <div className="absolute top-2 left-2 right-2 flex justify-between items-start">
//                 <Badge variant={album.sharedUserIds?.length > 0 ? "default" : "secondary"}>
//                     {album.sharedUserIds?.length > 0 ? "Shared" : "Private"}
//                 </Badge>

//                 {/* Dropdown */}
//                 <DropdownMenu>
//                     <DropdownMenuTrigger asChild>
//                         <Button 
//                             variant="ghost" 
//                             size="icon" 
//                             className="h-7 w-7 bg-black/30 hover:bg-black/50 text-white"
//                             onClick={(e) => e.stopPropagation()}
//                         >
//                             <MoreVertical className="h-3.5 w-3.5" />
//                         </Button>
//                     </DropdownMenuTrigger>
//                     <DropdownMenuContent onClick={(e) => e.stopPropagation()}>
//                         <DropdownMenuItem onClick={onEdit}>
//                             <Pencil className="h-4 w-4 mr-2" /> Edit
//                         </DropdownMenuItem>
//                         {!isDefault && (
//                             <DropdownMenuItem 
//                                 onClick={onDelete}
//                                 className="text-destructive focus:text-destructive"
//                             >
//                                 <Trash2 className="h-4 w-4 mr-2" /> Delete
//                             </DropdownMenuItem>
//                         )}
//                     </DropdownMenuContent>
//                 </DropdownMenu>
//             </div>

//             {/* Bottom — album info */}
//             <div className="absolute bottom-0 left-0 right-0 p-3">
//                 <p className="text-sm font-semibold text-white truncate drop-shadow-sm">{album.name}</p>
//                 {album.description && (
//                     <p className="text-xs text-white/70 line-clamp-1 drop-shadow-sm">{album.description}</p>
//                 )}
//                 <p className="text-xs text-white/60 mt-0.5  drop-shadow-sm">{album.photoCount || 0} photos</p>
//             </div>
//         </Card>
//     );
// }

import {
  Images,
  Lock,
  MoreHorizontal,
  Pencil,
  Trash2,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Photo1 from "@/assets/images/photo1.avif";
import Photo2 from "@/assets/images/photo2.avif";
import Photo3 from "@/assets/images/photo3.avif";
import Photo4 from "@/assets/images/photo4.avif";
import Photo5 from "@/assets/images/photo5.avif";
import Photo6 from "@/assets/images/photo6.avif";

const fallbackImages = [
  Photo1,
  Photo2,
  Photo3,
  Photo4,
  Photo5,
  Photo6,
];

function getFallbackImage(albumId = "") {
  if (!albumId) return fallbackImages[0];

  const hash = [...albumId].reduce(
    (total, character) => total + character.charCodeAt(0),
    0
  );

  return fallbackImages[hash % fallbackImages.length];
}

export default function AlbumCard({
  album,
  onClick,
  onDelete,
  currentUserId,
  onEdit,
}) {
  const isDefault = album.isDefault === true;
  const isShared = album.sharedUserIds?.length > 0;
  const photoCount = album.photoCount || 0;

  const isOwner =
    album.ownerId?.toString() ===
    currentUserId?.toString();

  const sharedCount =
    album.sharedUserIds?.length || 0;

  const isSharedByMe =
    isOwner && sharedCount > 0;

  const isSharedWithMe =
    !isOwner;

  const coverImage =
    album.coverImage || getFallbackImage(album._id);

  return (
    <article className="group overflow-hidden rounded-xl border bg-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      {/* Cover */}
      <div
        role="button"
        tabIndex={0}
        onClick={onClick}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onClick();
          }
        }}
        className="relative aspect-[4/3] cursor-pointer overflow-hidden bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
      >
        <img
          src={coverImage}
          alt=""
          loading="lazy"
          className="size-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />

        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/30 to-transparent" />

        {/* Privacy / sharing */}
        <div className="absolute left-3 top-3">
          {isSharedWithMe ? (
            <div className="flex items-center gap-1.5 rounded-full bg-background/90 px-2.5 py-1 text-xs font-medium shadow-sm backdrop-blur">
                <Users className="size-3" />
                Shared with you
            </div>
            ) : isSharedByMe ? (
            <div className="flex items-center gap-1.5 rounded-full bg-background/90 px-2.5 py-1 text-xs font-medium shadow-sm backdrop-blur">
                <Users className="size-3" />
                Shared
            </div>
            ) : (
            <div className="flex items-center gap-1.5 rounded-full bg-background/90 px-2.5 py-1 text-xs font-medium shadow-sm backdrop-blur">
                <Lock className="size-3" />
                Private
            </div>
            )}
        </div>

        {/* Management — owners only */}
            {isOwner && (
            <div className="absolute right-3 top-3">
                <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                    variant="secondary"
                    size="icon"
                    className="size-8 rounded-full bg-background/90 shadow-sm backdrop-blur hover:bg-background"
                    aria-label={`Manage ${album.name}`}
                    onClick={(event) => event.stopPropagation()}
                    >
                    <MoreHorizontal className="size-4" />
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                    align="end"
                    onClick={(event) => event.stopPropagation()}
                >
                    <DropdownMenuItem onClick={onEdit}>
                    <Pencil className="size-4" />
                    Edit album
                    </DropdownMenuItem>

                    {!isDefault && (
                    <DropdownMenuItem
                        onClick={onDelete}
                        className="text-destructive focus:text-destructive"
                    >
                        <Trash2 className="size-4" />
                        Delete album
                    </DropdownMenuItem>
                    )}
                </DropdownMenuContent>
                </DropdownMenu>
            </div>
            )}
      </div>

      {/* Information */}
      <button
        type="button"
        onClick={onClick}
        className="block w-full p-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 className="truncate font-medium">
              {album.name}
            </h2>

            {album.description && (
              <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">
                {album.description}
              </p>
            )}
          </div>

          {isDefault && (
            <span className="shrink-0 rounded-md bg-muted px-2 py-1 text-[11px] font-medium text-muted-foreground">
              Default
            </span>
          )}
        </div>

        <div className="mt-3 flex items-center gap-1.5 text-sm text-muted-foreground">
          <Images className="size-3.5" />

          <span>
            {photoCount} {photoCount === 1 ? "photo" : "photos"}
          </span>
        </div>
      </button>
    </article>
  );
}
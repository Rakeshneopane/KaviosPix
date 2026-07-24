import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Search,
  Sparkles,
  X,
} from "lucide-react";

import {
  clearSearch,
  searchImages,
} from "@/store/slices/imageSlice";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SemanticImageSearch({
  albumId,
  onSearchChange,
}) {
  const dispatch = useDispatch();

  const [query, setQuery] = useState("");

  useEffect(() => {
    const normalizedQuery = query.trim();

    if (!normalizedQuery) {
      dispatch(clearSearch());
      onSearchChange?.(false);
      return;
    }

    onSearchChange?.(true);

    const timer = setTimeout(() => {
      dispatch(
        searchImages({
          albumId,
          query: normalizedQuery,
        })
      );
    }, 450);

    return () => clearTimeout(timer);
  }, [query, albumId, dispatch, onSearchChange]);

  const clear = () => {
    setQuery("");
    dispatch(clearSearch());
    onSearchChange?.(false);
  };

  return (
    <section className="relative overflow-hidden rounded-2xl border bg-card">
      <div className="p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <div className="hidden size-9 shrink-0 items-center justify-center rounded-lg bg-muted sm:flex">
            <Sparkles className="size-4" />
          </div>

          <div className="min-w-0 flex-1">
            <div>
              <h2 className="text-sm font-semibold">
                Search your photos
              </h2>

              <p className="mt-0.5 text-xs leading-5 text-muted-foreground">
                Describe what you remember and KaviosPix
                will find visually similar photos.
              </p>
            </div>

            <div className="relative mt-3">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                value={query}
                onChange={(event) =>
                  setQuery(event.target.value)
                }
                placeholder='Try "sunset at the beach" or "people near mountains"'
                className="h-10 pl-9 pr-10"
                aria-label="Search photos using AI"
              />

              {query && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={clear}
                  aria-label="Clear search"
                  className="absolute right-1 top-1/2 size-8 -translate-y-1/2"
                >
                  <X className="size-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
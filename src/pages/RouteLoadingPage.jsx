import { Camera } from "lucide-react";

export default function RouteLoadingPage() {
  return (
    <main className="flex min-h-svh items-center justify-center bg-background">
      <div className="text-center">
        <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <Camera className="size-5" />
        </div>

        <p className="mt-4 text-sm font-medium">
          Loading KaviosPix
        </p>

        <p className="mt-1 text-xs text-muted-foreground">
          Getting your photos ready...
        </p>

        <div className="mx-auto mt-4 h-1 w-24 overflow-hidden rounded-full bg-muted">
          <div className="h-full w-1/2 animate-pulse rounded-full bg-primary" />
        </div>
      </div>
    </main>
  );
}
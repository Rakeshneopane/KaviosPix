import { Camera } from "lucide-react";
import { Link } from "react-router-dom";

export default function MarketingFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link
              to="/"
              className="inline-flex items-center gap-2.5"
            >
              <div className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Camera className="size-4" />
              </div>

              <span className="text-lg font-semibold tracking-tight">
                KaviosPix
              </span>
            </Link>

            <p className="mt-3 text-sm text-muted-foreground">
              Your memories, beautifully organized.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
            <a
              href="#features"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Features
            </a>

            <a
              href="#how-it-works"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              How it works
            </a>

            <Link
              to="/login"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Sign in
            </Link>
          </nav>
        </div>

        <div className="mt-8 border-t pt-6 text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} KaviosPix.
        </div>
      </div>
    </footer>
  );
}
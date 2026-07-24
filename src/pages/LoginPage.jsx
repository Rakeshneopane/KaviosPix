import {
  Camera,
  Images,
  Search,
  Share2,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";

export const LoginPage = () => {
  const handleGoogleLogin = (event) => {
    event.preventDefault();

    window.location.href =
      `${import.meta.env.VITE_BASE_URL}/auth/google`;
  };

  return (
    <main className="min-h-svh bg-background lg:grid lg:grid-cols-2">
      {/* =====================================================
          LEFT — BRAND / HERO
      ====================================================== */}
      <section className="relative hidden overflow-hidden border-r bg-muted/30 lg:flex lg:items-center lg:justify-center">
        {/* Background decoration */}
        <div className="pointer-events-none absolute -left-32 top-20 size-96 rounded-full bg-primary/5 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-40 right-0 size-[28rem] rounded-full bg-primary/5 blur-3xl" />

        <div className="relative z-10 w-full max-w-xl px-12">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
              <Camera className="size-5" />
            </div>

            <span className="text-xl font-semibold tracking-tight">
              KaviosPix
            </span>
          </div>

          {/* Hero */}
          <div className="mt-14">
            <p className="mb-4 flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Sparkles className="size-4" />
              Your intelligent photo library
            </p>

            <h1 className="max-w-lg text-4xl font-semibold tracking-tight xl:text-5xl xl:leading-[1.1]">
              Organize your photos.
              <br />
              Find any memory.
              <br />
              Share what matters.
            </h1>

            <p className="mt-6 max-w-lg text-base leading-7 text-muted-foreground">
              KaviosPix gives your photos a home where
              they can be organized into albums,
              discovered with intelligent search, and
              shared with the people who matter.
            </p>
          </div>

          {/* Feature list */}
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <Feature
              icon={Images}
              title="Organize"
              description="Keep memories in albums."
            />

            <Feature
              icon={Search}
              title="Discover"
              description="Search photos naturally."
            />

            <Feature
              icon={Share2}
              title="Share"
              description="Share albums privately."
            />
          </div>
        </div>
      </section>

      {/* =====================================================
            RIGHT — LOGIN
        ====================================================== */}
        <section className="flex min-h-svh flex-col lg:items-center lg:justify-center lg:px-12">
          
          {/* Mobile / Tablet Hero */}
          <div className="w-full border-b bg-muted/30 px-5 py-8 sm:px-8 sm:py-10 lg:hidden">
            <div className="mx-auto max-w-md">
              
              {/* Brand */}
              <div className="flex items-center gap-2.5">
                <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                  <Camera className="size-5" />
                </div>

                <span className="text-xl font-semibold tracking-tight">
                  KaviosPix
                </span>
              </div>

              {/* Hero */}
              <div className="mt-7">
                <p className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                  <Sparkles className="size-3.5" />
                  Your intelligent photo library
                </p>

                <h1 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
                  Your memories, beautifully organized.
                </h1>

                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  Organize photos into albums, discover memories
                  with intelligent search, and share them with
                  people you trust.
                </p>

                {/* Compact features */}
                <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Images className="size-3.5" />
                    Organize
                  </span>

                  <span className="flex items-center gap-1.5">
                    <Search className="size-3.5" />
                    Discover
                  </span>

                  <span className="flex items-center gap-1.5">
                    <Share2 className="size-3.5" />
                    Share
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Login area */}
          <div className="flex w-full flex-1 items-center justify-center px-5 py-10 sm:px-8 lg:flex-none lg:px-0 lg:py-0">
            <div className="w-full max-w-md">

              {/* Login heading */}
              <div className="text-center sm:text-left">
                <h2 className="text-3xl font-semibold tracking-tight">
                  Welcome back
                </h2>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Sign in to access your photos, albums,
                  favorites, and shared memories.
                </p>
              </div>

              {/* Login card */}
              <div className="mt-8 rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
                <div>
                  <h3 className="font-medium">
                    Sign in to KaviosPix
                  </h3>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Continue securely using your Google account.
                  </p>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  onClick={handleGoogleLogin}
                  className="mt-6 h-12 w-full gap-3 rounded-xl"
                >
                  <GoogleIcon className="size-5" />

                  <span className="font-medium">
                    Continue with Google
                  </span>
                </Button>

                <div className="mt-6 rounded-xl bg-muted/40 px-4 py-3">
                  <p className="text-xs leading-5 text-muted-foreground">
                    KaviosPix uses Google authentication so you
                    don't need to create or remember another
                    password.
                  </p>
                </div>

                <p className="mt-6 text-center text-xs leading-5 text-muted-foreground">
                  By continuing, you agree to the KaviosPix{" "}
                  <a
                    href="/terms"
                    className="font-medium text-foreground underline-offset-4 hover:underline"
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    href="/privacy"
                    className="font-medium text-foreground underline-offset-4 hover:underline"
                  >
                    Privacy Policy
                  </a>
                  .
                </p>
              </div>

              <p className="mt-6 text-center text-xs text-muted-foreground">
                Secure photo organization and collaboration.
              </p>
            </div>
          </div>
        </section>
    </main>
  );
};

/* =========================================================
   FEATURE
========================================================= */

function Feature({
  icon: Icon,
  title,
  description,
}) {
  return (
    <div className="rounded-xl border bg-background/60 p-4 backdrop-blur-sm">
      <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
        <Icon className="size-4" />
      </div>

      <p className="mt-3 text-sm font-medium">
        {title}
      </p>

      <p className="mt-1 text-xs leading-5 text-muted-foreground">
        {description}
      </p>
    </div>
  );
}

/* =========================================================
   GOOGLE ICON
========================================================= */

function GoogleIcon({
  className = "size-5",
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />

      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />

      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />

      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}
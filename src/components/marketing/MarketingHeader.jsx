import { useState } from "react";
import { Camera, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";

export default function MarketingHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    
  const { userData: user } = useSelector(
        (state) => state.userSlice
    );

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur-xl">
      {/* Main navbar */}
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          to="/"
          onClick={closeMobileMenu}
          className="flex items-center gap-2 font-semibold tracking-tight"
          aria-label="KaviosPix home"
        >
          <span className="flex size-8 items-center justify-center rounded-lg bg-foreground text-background">
            <Camera className="size-4" />
          </span>

          <span className="text-lg">KaviosPix</span>
        </Link>

        {/* Desktop navigation */}
        <nav
          className="hidden items-center gap-8 md:flex"
          aria-label="Main navigation"
        >
          <a
            href="#features"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Features
          </a>

          <a
            href="#how-it-works"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            How it works
          </a>

          <a
            href="#about"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            About
          </a>
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-2 md:flex">
            {user ? (
                <Button asChild>
                <Link to="/dashboard">
                    Dashboard
                </Link>
                </Button>
            ) : (
                <>
                <Button variant="ghost" asChild>
                    <Link to="/login">
                    Sign in
                    </Link>
                </Button>

                <Button asChild>
                    <Link to="/dashboard">
                    Get started
                    </Link>
                </Button>
                </>
            )}
            </div>

        {/* Mobile menu button */}
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label={
            mobileMenuOpen
              ? "Close navigation"
              : "Open navigation"
          }
          aria-expanded={mobileMenuOpen}
          onClick={() =>
            setMobileMenuOpen((current) => !current)
          }
        >
          {mobileMenuOpen ? (
            <X className="size-5" />
          ) : (
            <Menu className="size-5" />
          )}
        </Button>
      </div>

      {/* Mobile navigation */}
      {mobileMenuOpen && (
        <div className="border-t bg-background md:hidden">
          <div className="mx-auto w-full max-w-7xl px-4 py-4 sm:px-6">
            <nav
              className="flex flex-col"
              aria-label="Mobile navigation"
            >
              <a
                href="#features"
                onClick={closeMobileMenu}
                className="rounded-lg px-3 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                Features
              </a>

              <a
                href="#how-it-works"
                onClick={closeMobileMenu}
                className="rounded-lg px-3 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                How it works
              </a>

              <a
                href="#about"
                onClick={closeMobileMenu}
                className="rounded-lg px-3 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                About
              </a>
            </nav>

            {/* Mobile actions */}
            <div className="mt-4 border-t pt-4">
                {user ? (
                    <Button className="w-full" asChild>
                    <Link
                        to="/dashboard"
                        onClick={closeMobileMenu}
                    >
                        Dashboard
                    </Link>
                    </Button>
                ) : (
                    <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" asChild>
                        <Link
                        to="/login"
                        onClick={closeMobileMenu}
                        >
                        Sign in
                        </Link>
                    </Button>

                    <Button asChild>
                        <Link
                        to="/dashboard"
                        onClick={closeMobileMenu}
                        >
                        Get started
                        </Link>
                    </Button>
                    </div>
                )}
                </div>
          </div>
        </div>
      )}
    </header>
  );
}
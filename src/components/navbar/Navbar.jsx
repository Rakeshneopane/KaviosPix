import { useState } from "react";
import {
  Camera,
  House,
  Images,
  LogOut,
  Menu,
  User,
  X,
} from "lucide-react";

import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "@/store/slices/authSlice.js";

import { Button } from "@/components/ui/button";

import {
  Loader2,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import PageContainer from "@/components/layout/PageContainer";
import { cn } from "@/lib/utils";

const navigation = [
  {
    label: "Home",
    to: "/dashboard",
    icon: House,
  },
  {
    label: "Albums",
    to: "/albums",
    icon: Images,
  },
];

export default function NavbarComponent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

    const isNavigationActive = (to) => {
    if (to === "/dashboard") {
        return location.pathname === "/dashboard";
    }

    if (to === "/albums") {
        return (
        location.pathname === "/albums" ||
        location.pathname.startsWith("/album/")
        );
    }

    return location.pathname === to;
    };



  const { userData: user } = useSelector(
    (state) => state.userSlice
  );

  const [menuOpen, setMenuOpen] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] =
    useState(false);
  const [isLoggingOut, setIsLoggingOut] =
    useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);

    try {
      await dispatch(logoutUser()).unwrap();
      
      setLogoutDialogOpen(false);
      setMenuOpen(false);

      navigate("/login", { replace: true });
    
    } finally {
      setIsLoggingOut(false);
    }
  };

  const initials = user?.name
    ?.split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <>
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <PageContainer>
          <div className="flex h-16 items-center">
            {/* Brand */}
            <Link
              to="/dashboard"
              className="flex shrink-0 items-center gap-2"
              aria-label="KaviosPix home"
            >
              <div className="flex size-8 items-center justify-center rounded-lg bg-foreground text-background">
                <Camera className="size-4" />
              </div>

              <span className="font-semibold tracking-tight">
                KaviosPix
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="ml-8 hidden items-center gap-1 md:flex">
              {navigation.map(({ label, to, icon: Icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={() =>
                        cn(
                            "inline-flex h-9 items-center gap-2 rounded-md px-3 text-sm font-medium transition-colors",
                            isNavigationActive(to)
                            ? "bg-muted text-foreground"
                            : "text-muted-foreground hover:bg-muted/70 hover:text-foreground"
                        )
                    }
                >
                  <Icon className="size-4" />
                  {label}
                </NavLink>
              ))}
            </nav>

            <div className="ml-auto flex items-center gap-2">
              {/* Account */}
              <button
                type="button"
                onClick={() => setLogoutDialogOpen(true)}
                className="hidden items-center gap-2 rounded-lg p-1.5 text-left transition-colors hover:bg-muted md:flex"
              >
                <div className="flex size-8 items-center justify-center rounded-full bg-muted text-xs font-semibold">
                  {initials || <User className="size-4" />}
                </div>

                <div className="hidden max-w-36 lg:block">
                  <p className="truncate text-sm font-medium leading-none">
                    {user?.name || "Account"}
                  </p>

                  {user?.email && (
                    <p className="mt-1 truncate text-xs text-muted-foreground">
                      {user.email}
                    </p>
                  )}
                </div>
              </button>

              {/* Mobile navigation */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label={
                  menuOpen
                    ? "Close navigation"
                    : "Open navigation"
                }
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((current) => !current)}
              >
                {menuOpen ? (
                  <X className="size-5" />
                ) : (
                  <Menu className="size-5" />
                )}
              </Button>
            </div>
          </div>
        </PageContainer>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="border-t bg-background md:hidden">
            <PageContainer className="py-3">
              <nav className="space-y-1">
                {navigation.map(
                  ({ label, to, icon: Icon }) => (
                    <NavLink
                      key={to}
                      to={to}
                      onClick={() => setMenuOpen(false)}
                      className={() =>
                            cn(
                                "inline-flex h-9 items-center gap-2 rounded-md px-3 text-sm font-medium transition-colors",
                                isNavigationActive(to)
                                ? "bg-muted text-foreground"
                                : "text-muted-foreground hover:bg-muted/70 hover:text-foreground"
                            )
                        }
                    >
                      <Icon className="size-4" />
                      {label}
                    </NavLink>
                  )
                )}

                <div className="my-2 border-t" />

                <button
                  type="button"
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left hover:bg-muted"
                  onClick={() => {
                    setMenuOpen(false);
                    setLogoutDialogOpen(true);
                  }}
                >
                  <div className="flex size-8 items-center justify-center rounded-full bg-muted text-xs font-semibold">
                    {initials || (
                      <User className="size-4" />
                    )}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">
                      {user?.name || "Account"}
                    </p>

                    {user?.email && (
                      <p className="truncate text-xs text-muted-foreground">
                        {user.email}
                      </p>
                    )}
                  </div>
                </button>
              </nav>
            </PageContainer>
          </div>
        )}
      </header>

      {/* Logout confirmation */}
      <Dialog
            open={logoutDialogOpen}
            onOpenChange={(open) => {
                if (!isLoggingOut) {
                setLogoutDialogOpen(open);
                }
            }}
            >
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                {/* Icon */}
                <div className="mb-2 flex size-10 items-center justify-center rounded-xl bg-destructive/10">
                    <LogOut className="size-5 text-destructive" />
                </div>

                <DialogTitle>
                    Sign out of KaviosPix?
                </DialogTitle>

                <DialogDescription>
                    {user?.email ? (
                    <>
                        You're currently signed in as{" "}
                        <span className="font-medium text-foreground">
                        {user.email}
                        </span>
                        . You'll need to sign in again to access
                        your library.
                    </>
                    ) : (
                    <>
                        You'll need to sign in again to access
                        your library and photos.
                    </>
                    )}
                </DialogDescription>
                </DialogHeader>

                <DialogFooter>
                <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                    setLogoutDialogOpen(false)
                    }
                    disabled={isLoggingOut}
                >
                    Cancel
                </Button>

                <Button
                    type="button"
                    variant="destructive"
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                >
                    {isLoggingOut ? (
                    <>
                        <Loader2 className="size-4 animate-spin" />
                        Signing out...
                    </>
                    ) : (
                    <>
                        <LogOut className="size-4" />
                        Sign out
                    </>
                    )}
                </Button>
                </DialogFooter>
            </DialogContent>
            </Dialog>
    </>
  );
}
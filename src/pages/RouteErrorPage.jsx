import {
  AlertTriangle,
  ArrowLeft,
  Home,
} from "lucide-react";
import {
  isRouteErrorResponse,
  useNavigate,
  useRouteError,
} from "react-router-dom";

import { Button } from "@/components/ui/button";

export default function RouteErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();

  let title = "Something went wrong";
  let description =
    "We couldn't load this page. Please try again.";

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      title = "Page not found";
      description =
        "The page you're looking for doesn't exist or may have been moved.";
    } else {
      description =
        error.statusText ||
        error.data?.message ||
        description;
    }
  }

  return (
    <main className="flex min-h-svh items-center justify-center bg-background px-6">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-destructive/10">
          <AlertTriangle className="size-5 text-destructive" />
        </div>

        <h1 className="mt-6 text-2xl font-semibold tracking-tight">
          {title}
        </h1>

        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          {description}
        </p>

        <div className="mt-6 flex justify-center gap-2">
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="size-4" />
            Go back
          </Button>

          <Button onClick={() => navigate("/")}>
            <Home className="size-4" />
            Home
          </Button>
        </div>
      </div>
    </main>
  );
}
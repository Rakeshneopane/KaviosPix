import {
  Camera ,
} from "lucide-react";

import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const githubUrl = import.meta.env.VITE_GITHUB_URL;
  const linkedinUrl = import.meta.env.VITE_LINKEDIN_URL;

  return (
    <footer className="mt-auto border-t bg-background">
      {/* Main footer */}
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          
          {/* Brand */}
          <div className="sm:col-span-2">
            <Link
              to="/"
              className="inline-flex items-center gap-2"
            >
               <div className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <Camera className="size-4" />
                </div>

              <span className="text-lg font-semibold tracking-tight">
                KaviosPix
              </span>
            </Link>

            <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
              A simple place to organize, discover, and
              revisit the photos that matter to you.
            </p>
          </div>

          {/* Product */}
           <div>
    <h3 className="text-sm font-semibold">
      Product
    </h3>

    <nav className="mt-4 flex flex-col items-start gap-3 text-sm text-muted-foreground">
      <Link
        to="/dashboard"
        className="transition-colors hover:text-foreground"
      >
        Dashboard
      </Link>

      <Link
        to="/albums"
        className="transition-colors hover:text-foreground"
      >
        Albums
      </Link>
    </nav>
  </div>

  {/* Social */}
  <div>
    <h3 className="text-sm font-semibold">
      Connect
    </h3>

    <div className="mt-4 flex flex-col items-start gap-3 text-sm text-muted-foreground">
      <a
        href={githubUrl}
        target="_blank"
        rel="noreferrer"
        className="transition-colors hover:text-foreground"
      >
        GitHub
      </a>

      <a
        href={linkedinUrl}
        target="_blank"
        rel="noreferrer"
        className="transition-colors hover:text-foreground"
      >
        LinkedIn
      </a>
    </div>
  </div>
        </div>
      </div>

      <Separator />

      {/* Bottom bar */}
      <div className="mx-auto w-full max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} KaviosPix. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
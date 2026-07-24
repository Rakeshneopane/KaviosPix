import { cn } from "@/lib/utils";

export default function PageContainer({
  children,
  className,
  size = "default",
}) {
  const sizes = {
    default: "max-w-7xl",
    wide: "max-w-[1440px]",
    narrow: "max-w-4xl",
  };

  return (
    <div
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        sizes[size],
        className
      )}
    >
      {children}
    </div>
  );
}
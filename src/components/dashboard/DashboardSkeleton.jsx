import { Skeleton } from "@/components/ui/skeleton";
import PageContainer from "@/components/layout/PageContainer";

export default function DashboardSkeleton() {
  return (
    <PageContainer className="py-8 sm:py-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Skeleton className="h-4 w-24" />
          <Skeleton className="mt-3 h-9 w-64" />
          <Skeleton className="mt-3 h-5 w-96 max-w-full" />
        </div>

        <Skeleton className="h-9 w-32" />
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="rounded-xl border p-5"
          >
            <Skeleton className="h-4 w-20" />
            <Skeleton className="mt-3 h-9 w-16" />
            <Skeleton className="mt-5 h-3 w-36" />
          </div>
        ))}
      </div>

      <div className="mt-10">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="mt-2 h-4 w-48" />

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-xl border"
            >
              <Skeleton className="aspect-[4/3] w-full rounded-none" />

              <div className="p-4">
                <Skeleton className="h-5 w-2/3" />
                <Skeleton className="mt-2 h-4 w-20" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageContainer>
  );
}
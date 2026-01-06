import { Skeleton } from "@/components/ui/skeleton";

export const CPNavbarSkeleton = () => {
  return (
    <nav className="p-4 flex items-center justify-between sticky top-0 z-10 bg-primary-foreground border-b">
      {/* LEFT SIDE SKELETON */}
      <div className="flex gap-2 items-center">
        {/* Sidebar Trigger Skeleton */}
        <Skeleton className="h-9 w-9 rounded-md" />
        {/* Theme Toggle Skeleton */}
        <Skeleton className="h-9 w-9 rounded-md" />
        {/* Home Button Skeleton */}
        <Skeleton className="h-9 w-9 rounded-md" />
      </div>

      {/* RIGHT SIDE SKELETON */}
      <div className="flex items-center gap-4">
        {/* User Menu / Avatar Skeleton */}
        <div className="flex items-center gap-2">
          <div className="flex flex-col items-end gap-1">
            <Skeleton className="h-3 w-20" /> {/* Nama User */}
            <Skeleton className="h-2 w-12" /> {/* Role */}
          </div>
          <Skeleton className="h-10 w-10 rounded-full" /> {/* Avatar */}
        </div>
      </div>
    </nav>
  );
};

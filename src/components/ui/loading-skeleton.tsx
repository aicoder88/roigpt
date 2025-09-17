import { cn } from "@/lib/utils"

interface LoadingSkeletonProps {
  className?: string;
  lines?: number;
  showAvatar?: boolean;
}

export function LoadingSkeleton({
  className,
  lines = 3,
  showAvatar = false
}: LoadingSkeletonProps) {
  return (
    <div className={cn("space-y-3", className)}>
      {showAvatar && (
        <div className="flex items-center space-x-4">
          <div className="h-12 w-12 rounded-full bg-muted animate-pulse" />
          <div className="space-y-2">
            <div className="h-4 w-24 rounded bg-muted animate-pulse" />
            <div className="h-3 w-16 rounded bg-muted animate-pulse" />
          </div>
        </div>
      )}
      <div className="space-y-2">
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-4 rounded bg-muted animate-pulse",
              i === lines - 1 ? "w-3/4" : "w-full"
            )}
          />
        ))}
      </div>
    </div>
  )
}

export function CardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("glass-card p-6 space-y-4", className)}>
      <div className="h-6 w-1/2 rounded bg-muted animate-pulse" />
      <div className="space-y-2">
        <div className="h-4 w-full rounded bg-muted animate-pulse" />
        <div className="h-4 w-4/5 rounded bg-muted animate-pulse" />
        <div className="h-4 w-3/5 rounded bg-muted animate-pulse" />
      </div>
      <div className="h-10 w-1/3 rounded bg-muted animate-pulse" />
    </div>
  )
}

export function MetricSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("glass-card p-6 space-y-4", className)}>
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded bg-muted animate-pulse" />
        <div className="h-5 w-24 rounded bg-muted animate-pulse" />
      </div>
      <div className="h-8 w-20 rounded bg-muted animate-pulse" />
      <div className="h-2 w-full rounded-full bg-muted animate-pulse" />
    </div>
  )
}
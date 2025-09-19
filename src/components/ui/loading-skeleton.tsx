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

export function ButtonLoading({ children, isLoading, ...props }: {
  children: React.ReactNode;
  isLoading?: boolean;
  [key: string]: any;
}) {
  return (
    <button {...props} disabled={isLoading}>
      {isLoading ? (
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          Loading...
        </div>
      ) : (
        children
      )}
    </button>
  )
}

export function ShimmerSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("relative overflow-hidden rounded bg-muted", className)}>
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </div>
  )
}

export function HeroSkeleton() {
  return (
    <div className="container mx-auto px-4 py-24 relative z-10">
      <div className="flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1 space-y-8">
          <ShimmerSkeleton className="h-8 w-48" />
          <div className="space-y-4">
            <ShimmerSkeleton className="h-12 w-full" />
            <ShimmerSkeleton className="h-12 w-4/5" />
            <ShimmerSkeleton className="h-12 w-3/5" />
          </div>
          <ShimmerSkeleton className="h-6 w-3/4" />
          <div className="flex gap-4">
            <ShimmerSkeleton className="h-12 w-32" />
            <ShimmerSkeleton className="h-12 w-28" />
          </div>
        </div>
        <div className="flex-1">
          <div className="glass-card p-8 max-w-md mx-auto">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <ShimmerSkeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2">
                  <ShimmerSkeleton className="h-4 w-24" />
                  <ShimmerSkeleton className="h-3 w-16" />
                </div>
              </div>
              <div className="space-y-4">
                <ShimmerSkeleton className="h-16 w-full rounded-2xl" />
                <ShimmerSkeleton className="h-16 w-4/5 rounded-2xl ml-auto" />
                <ShimmerSkeleton className="h-16 w-full rounded-2xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function CopywritingExamplesSkeleton() {
  return (
    <div className="w-full py-16 bg-background relative">
      <div className="container mx-auto px-4 relative">
        <div className="flex justify-center mb-12">
          <div className="glass-card p-2 bg-background/50">
            <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <ShimmerSkeleton key={i} className="h-10 w-20" />
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="glass-card border-white/10 shadow-2xl overflow-hidden">
              <div className="pb-6 bg-gradient-to-r from-primary/5 to-accent/5 p-6">
                <div className="space-y-3">
                  <ShimmerSkeleton className="h-6 w-32" />
                  <ShimmerSkeleton className="h-8 w-3/4" />
                  <ShimmerSkeleton className="h-4 w-full" />
                </div>
              </div>
              <div className="pt-6 p-6">
                <div className="p-6 rounded-2xl relative overflow-hidden border border-white/10">
                  <div className="space-y-4">
                    <ShimmerSkeleton className="h-6 w-full" />
                    <ShimmerSkeleton className="h-6 w-5/6" />
                    <div className="space-y-2">
                      <ShimmerSkeleton className="h-4 w-full" />
                      <ShimmerSkeleton className="h-4 w-4/5" />
                      <ShimmerSkeleton className="h-4 w-3/5" />
                    </div>
                    <div className="flex justify-center pt-4">
                      <ShimmerSkeleton className="h-10 w-40" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
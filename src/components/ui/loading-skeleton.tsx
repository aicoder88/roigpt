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



export function FormSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("glass-card p-8 space-y-6", className)}>
      <div className="space-y-4">
        <ShimmerSkeleton className="h-6 w-32" />
        <div className="space-y-4">
          <div className="space-y-2">
            <ShimmerSkeleton className="h-4 w-20" />
            <ShimmerSkeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <ShimmerSkeleton className="h-4 w-24" />
            <ShimmerSkeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <ShimmerSkeleton className="h-4 w-28" />
            <ShimmerSkeleton className="h-24 w-full" />
          </div>
        </div>
        <ShimmerSkeleton className="h-10 w-32" />
      </div>
    </div>
  )
}

export function TableSkeleton({ rows = 5, columns = 4, className }: {
  rows?: number;
  columns?: number;
  className?: string;
}) {
  return (
    <div className={cn("glass-card overflow-hidden", className)}>
      <div className="p-6 border-b border-white/10">
        <ShimmerSkeleton className="h-6 w-48" />
      </div>
      <div className="divide-y divide-white/10">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="p-4 flex items-center space-x-4">
            {Array.from({ length: columns }).map((_, colIndex) => (
              <ShimmerSkeleton
                key={colIndex}
                className={cn(
                  "h-4",
                  colIndex === 0 ? "w-32" : colIndex === columns - 1 ? "w-20" : "w-40"
                )}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export function NavigationSkeleton({ className }: { className?: string }) {
  return (
    <nav className={cn("flex items-center justify-between p-4", className)}>
      <ShimmerSkeleton className="h-8 w-32" />
      <div className="hidden md:flex items-center space-x-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <ShimmerSkeleton key={i} className="h-4 w-16" />
        ))}
      </div>
      <div className="flex items-center space-x-4">
        <ShimmerSkeleton className="h-8 w-8 rounded-full" />
        <ShimmerSkeleton className="h-8 w-24" />
      </div>
    </nav>
  )
}

export function ChatMessageSkeleton({ isUser = false, className }: {
  isUser?: boolean;
  className?: string;
}) {
  return (
    <div className={cn(
      "flex gap-3 p-4",
      isUser ? "justify-end" : "justify-start",
      className
    )}>
      {!isUser && <ShimmerSkeleton className="h-8 w-8 rounded-full flex-shrink-0" />}
      <div className={cn(
        "space-y-2 max-w-xs",
        isUser ? "bg-primary/10" : "bg-muted",
        "rounded-2xl p-3"
      )}>
        <ShimmerSkeleton className="h-4 w-full" />
        <ShimmerSkeleton className="h-4 w-3/4" />
        <ShimmerSkeleton className="h-4 w-1/2" />
      </div>
      {isUser && <ShimmerSkeleton className="h-8 w-8 rounded-full flex-shrink-0" />}
    </div>
  )
}

export function ImageSkeleton({
  aspectRatio = "aspect-video",
  className
}: {
  aspectRatio?: string;
  className?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden rounded-lg", aspectRatio, className)}>
      <ShimmerSkeleton className="absolute inset-0" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center">
          <div className="h-6 w-6 rounded bg-white/40" />
        </div>
      </div>
    </div>
  )
}

export function StatGridSkeleton({
  items = 4,
  className
}: {
  items?: number;
  className?: string;
}) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", className)}>
      {Array.from({ length: items }).map((_, i) => (
        <div key={i} className="glass-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <ShimmerSkeleton className="h-6 w-6 rounded" />
            <ShimmerSkeleton className="h-4 w-12" />
          </div>
          <ShimmerSkeleton className="h-8 w-20" />
          <ShimmerSkeleton className="h-3 w-full" />
        </div>
      ))}
    </div>
  )
}

export function PricingCardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("glass-card p-8 space-y-6 relative", className)}>
      <div className="text-center space-y-4">
        <ShimmerSkeleton className="h-6 w-24 mx-auto" />
        <div className="space-y-2">
          <div className="flex items-baseline justify-center gap-1">
            <ShimmerSkeleton className="h-12 w-20" />
            <ShimmerSkeleton className="h-6 w-16" />
          </div>
          <ShimmerSkeleton className="h-4 w-32 mx-auto" />
        </div>
      </div>

      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <ShimmerSkeleton className="h-4 w-4 rounded-full" />
            <ShimmerSkeleton className="h-4 flex-1" />
          </div>
        ))}
      </div>

      <ShimmerSkeleton className="h-12 w-full" />
    </div>
  )
}
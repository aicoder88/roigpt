'use client';

import Image, { ImageProps } from 'next/image';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface OptimizedImageProps extends Omit<ImageProps, 'onLoad' | 'onError'> {
  fallbackSrc?: string;
  showPlaceholder?: boolean;
  placeholderClassName?: string;
  containerClassName?: string;
}

export function OptimizedImage({
  src,
  alt,
  className,
  fallbackSrc = '/images/placeholder.svg',
  showPlaceholder = true,
  placeholderClassName,
  containerClassName,
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <div className={cn('relative overflow-hidden', containerClassName)}>
      {/* Loading placeholder */}
      {isLoading && showPlaceholder && (
        <div
          className={cn(
            'absolute inset-0 bg-muted animate-pulse flex items-center justify-center',
            placeholderClassName
          )}
        >
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Main image */}
      <Image
        src={hasError ? fallbackSrc : src}
        alt={alt}
        className={cn(
          'transition-opacity duration-300',
          isLoading ? 'opacity-0' : 'opacity-100',
          className
        )}
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />
    </div>
  );
}

interface ResponsiveImageProps extends OptimizedImageProps {
  sizes?: string;
}

/**
 * Responsive image component with built-in responsive sizes
 */
export function ResponsiveImage({
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  ...props
}: ResponsiveImageProps) {
  return <OptimizedImage sizes={sizes} {...props} />;
}

interface HeroImageProps extends OptimizedImageProps {
  priority?: boolean;
}

/**
 * Hero image component optimized for above-the-fold content
 */
export function HeroImage({ priority = true, ...props }: HeroImageProps) {
  return (
    <OptimizedImage
      priority={priority}
      sizes="100vw"
      {...props}
    />
  );
}

interface AvatarImageProps extends OptimizedImageProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

/**
 * Avatar image component with predefined sizes
 */
export function AvatarImage({
  size = 'md',
  className,
  ...props
}: AvatarImageProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  };

  return (
    <OptimizedImage
      className={cn('rounded-full object-cover', sizeClasses[size], className)}
      {...props}
    />
  );
}

interface ProductImageProps extends OptimizedImageProps {
  variant?: 'card' | 'gallery' | 'thumbnail';
}

/**
 * Product image component with different display variants
 */
export function ProductImage({
  variant = 'card',
  className,
  ...props
}: ProductImageProps) {
  const variantClasses = {
    card: 'aspect-square object-cover rounded-lg',
    gallery: 'aspect-[4/3] object-cover rounded-lg',
    thumbnail: 'aspect-square object-cover rounded-md w-16 h-16',
  };

  const variantSizes = {
    card: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
    gallery: '(max-width: 768px) 100vw, 80vw',
    thumbnail: '64px',
  };

  return (
    <OptimizedImage
      className={cn(variantClasses[variant], className)}
      sizes={variantSizes[variant]}
      {...props}
    />
  );
}
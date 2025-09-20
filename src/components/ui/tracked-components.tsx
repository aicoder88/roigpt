'use client';

import React, { forwardRef } from 'react';
import { Button, ButtonProps } from './button';
import { useTracking } from '../AnalyticsProvider';
import { cn } from '@/lib/utils';

// Tracked Button Component
interface TrackedButtonProps extends ButtonProps {
  trackingName?: string;
  trackingLocation?: string;
  trackingCategory?: string;
  onTrackingClick?: () => void;
}

export const TrackedButton = forwardRef<HTMLButtonElement, TrackedButtonProps>(
  ({
    trackingName,
    trackingLocation,
    trackingCategory = 'button',
    onTrackingClick,
    onClick,
    children,
    ...props
  }, ref) => {
    const { track } = useTracking();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      // Track the button click
      if (trackingName) {
        track.buttonClick(trackingName, trackingLocation);
      }

      // Call custom tracking callback
      onTrackingClick?.();

      // Call the original onClick handler
      onClick?.(event);
    };

    return (
      <Button
        ref={ref}
        onClick={handleClick}
        {...props}
      >
        {children}
      </Button>
    );
  }
);
TrackedButton.displayName = 'TrackedButton';

// Tracked Link Component
interface TrackedLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  trackingName?: string;
  trackingCategory?: string;
  external?: boolean;
}

export const TrackedLink = forwardRef<HTMLAnchorElement, TrackedLinkProps>(
  ({
    trackingName,
    trackingCategory = 'link',
    external = false,
    onClick,
    href,
    children,
    className,
    ...props
  }, ref) => {
    const { track } = useTracking();

    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
      // Track the link click
      if (trackingName && href) {
        track.linkClick(trackingName, href);
      }

      // For external links, add a small delay to ensure tracking completes
      if (external && href) {
        event.preventDefault();
        setTimeout(() => {
          window.open(href, '_blank', 'noopener,noreferrer');
        }, 100);
      }

      // Call the original onClick handler
      onClick?.(event);
    };

    return (
      <a
        ref={ref}
        href={href}
        onClick={handleClick}
        className={cn(
          'text-primary hover:text-primary/80 transition-colors',
          external && 'inline-flex items-center gap-1',
          className
        )}
        {...(external && {
          target: '_blank',
          rel: 'noopener noreferrer'
        })}
        {...props}
      >
        {children}
        {external && (
          <svg
            className="w-3 h-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        )}
      </a>
    );
  }
);
TrackedLink.displayName = 'TrackedLink';

// Tracked Form Component
interface TrackedFormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  formName: string;
  trackingCategory?: string;
  onFormStart?: () => void;
  onFormSubmitSuccess?: () => void;
  onFormSubmitError?: (error: any) => void;
}

export const TrackedForm = forwardRef<HTMLFormElement, TrackedFormProps>(
  ({
    formName,
    trackingCategory = 'form',
    onFormStart,
    onFormSubmitSuccess,
    onFormSubmitError,
    onSubmit,
    onFocus,
    children,
    ...props
  }, ref) => {
    const { track } = useTracking();
    const [hasStarted, setHasStarted] = React.useState(false);

    const handleFormStart = () => {
      if (!hasStarted) {
        setHasStarted(true);
        track.formStart(formName);
        onFormStart?.();
      }
    };

    const handleFocus = (event: React.FocusEvent<HTMLFormElement>) => {
      handleFormStart();
      onFocus?.(event);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      try {
        // Call the original onSubmit handler
        await onSubmit?.(event);

        // Track successful submission
        track.formSubmit(formName, true);
        onFormSubmitSuccess?.();
      } catch (error) {
        // Track failed submission
        track.formSubmit(formName, false);
        onFormSubmitError?.(error);
        throw error; // Re-throw to maintain error handling
      }
    };

    return (
      <form
        ref={ref}
        onSubmit={handleSubmit}
        onFocus={handleFocus}
        {...props}
      >
        {children}
      </form>
    );
  }
);
TrackedForm.displayName = 'TrackedForm';

// Tracked Download Link Component
interface TrackedDownloadProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  fileName: string;
  fileType?: string;
  trackingCategory?: string;
}

export const TrackedDownload = forwardRef<HTMLAnchorElement, TrackedDownloadProps>(
  ({
    fileName,
    fileType,
    trackingCategory = 'download',
    onClick,
    href,
    children,
    className,
    ...props
  }, ref) => {
    const { track } = useTracking();

    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
      // Determine file type from href if not provided
      const detectedFileType = fileType || getFileTypeFromUrl(href || '');

      // Track the download
      track.downloadStart(fileName, detectedFileType);

      // Call the original onClick handler
      onClick?.(event);
    };

    return (
      <a
        ref={ref}
        href={href}
        onClick={handleClick}
        className={cn(
          'inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors',
          className
        )}
        download
        {...props}
      >
        {children}
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      </a>
    );
  }
);
TrackedDownload.displayName = 'TrackedDownload';

// Video tracking component
interface TrackedVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  videoTitle: string;
  trackingCategory?: string;
}

export const TrackedVideo = forwardRef<HTMLVideoElement, TrackedVideoProps>(
  ({
    videoTitle,
    trackingCategory = 'video',
    onPlay,
    onPause,
    onEnded,
    ...props
  }, ref) => {
    const { track } = useTracking();

    const handlePlay = (event: React.SyntheticEvent<HTMLVideoElement>) => {
      const video = event.currentTarget;
      track.videoPlay(videoTitle, video.duration);
      onPlay?.(event);
    };

    const handlePause = (event: React.SyntheticEvent<HTMLVideoElement>) => {
      // Could track pause events too
      onPause?.(event);
    };

    const handleEnded = (event: React.SyntheticEvent<HTMLVideoElement>) => {
      // Could track completion events
      onEnded?.(event);
    };

    return (
      <video
        ref={ref}
        onPlay={handlePlay}
        onPause={handlePause}
        onEnded={handleEnded}
        {...props}
      />
    );
  }
);
TrackedVideo.displayName = 'TrackedVideo';

// Newsletter signup tracking wrapper
interface TrackedNewsletterWrapperProps {
  source: string;
  children: React.ReactNode;
  onSignupSuccess?: () => void;
}

export function TrackedNewsletterWrapper({
  source,
  children,
  onSignupSuccess
}: TrackedNewsletterWrapperProps) {
  const { track } = useTracking();

  const handleSignupSuccess = () => {
    track.newsletterSignup(source);
    onSignupSuccess?.();
  };

  return (
    <div data-newsletter-source={source}>
      {React.cloneElement(children as React.ReactElement, {
        onSubmitSuccess: handleSignupSuccess,
      })}
    </div>
  );
}

// Utility function to determine file type from URL
function getFileTypeFromUrl(url: string): string {
  const extension = url.split('.').pop()?.toLowerCase();

  const typeMap: Record<string, string> = {
    pdf: 'PDF',
    doc: 'Word Document',
    docx: 'Word Document',
    xls: 'Excel Spreadsheet',
    xlsx: 'Excel Spreadsheet',
    ppt: 'PowerPoint',
    pptx: 'PowerPoint',
    zip: 'Archive',
    rar: 'Archive',
    jpg: 'Image',
    jpeg: 'Image',
    png: 'Image',
    gif: 'Image',
    svg: 'Image',
    mp4: 'Video',
    mov: 'Video',
    avi: 'Video',
    mp3: 'Audio',
    wav: 'Audio',
    txt: 'Text File',
  };

  return typeMap[extension || ''] || 'Unknown';
}

// Error boundary with tracking
interface TrackedErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  errorLocation?: string;
}

interface TrackedErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class TrackedErrorBoundary extends React.Component<
  TrackedErrorBoundaryProps,
  TrackedErrorBoundaryState
> {
  constructor(props: TrackedErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): TrackedErrorBoundaryState {
    return { hasError: true, error };
  }

  override componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Track the error
    if (typeof window !== 'undefined') {
      import('../AnalyticsProvider').then(({ useTracking }) => {
        // Note: This is a simplified approach. In a real app, you'd want to
        // have the tracking context available at the class component level
        console.error('Error boundary caught error:', error, errorInfo);
      });
    }
  }

  override render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="p-4 text-center text-destructive">
          Something went wrong. Please try refreshing the page.
        </div>
      );
    }

    return this.props.children;
  }
}
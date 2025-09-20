'use client';

import React from 'react';
import { RefreshCw, Settings } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ErrorBoundary } from './ErrorBoundary';

function ServiceErrorFallback() {
  return (
    <Card className="glass-card max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <Settings className="h-10 w-10 text-muted-foreground" />
        </div>
        <CardTitle className="text-lg">Services Temporarily Unavailable</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground text-center text-sm">
          We're having trouble loading our services. This doesn't affect the rest of the site.
        </p>
        <div className="flex justify-center">
          <Button
            onClick={() => window.location.reload()}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Retry
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export function ServiceErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary fallback={<ServiceErrorFallback />}>
      {children}
    </ErrorBoundary>
  );
}
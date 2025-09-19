'use client';

import React from 'react';
import { FileText, RefreshCw } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ErrorBoundary } from './ErrorBoundary';

function CopywritingErrorFallback() {
  return (
    <Card className="glass-card max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <FileText className="h-10 w-10 text-muted-foreground" />
        </div>
        <CardTitle className="text-lg">Copywriting Examples Unavailable</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground text-center text-sm">
          Our copywriting examples are temporarily unavailable. You can still explore our other services.
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

export function CopywritingErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary fallback={<CopywritingErrorFallback />}>
      {children}
    </ErrorBoundary>
  );
}
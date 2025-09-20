'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface LoadingState {
  isLoading: boolean;
  progress?: number;
  message?: string;
  error?: string;
}

interface LoadingContextType {
  isLoading: boolean;
  globalLoadingState: LoadingState;
  setLoading: (loading: boolean) => void;
  setLoadingState: (state: Partial<LoadingState>) => void;
  componentLoading: Record<string, LoadingState>;
  setComponentLoading: (component: string, state: boolean | Partial<LoadingState>) => void;
  isComponentLoading: (component: string) => boolean;
  startGlobalLoading: (message?: string) => void;
  stopGlobalLoading: () => void;
  simulateProgress: (duration?: number) => Promise<void>;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({
  children,
  initialLoadingDuration = 1500,
  showInitialLoading = true
}: {
  children: React.ReactNode;
  initialLoadingDuration?: number;
  showInitialLoading?: boolean;
}) {
  const [isLoading, setIsLoading] = useState(showInitialLoading);
  const [globalLoadingState, setGlobalLoadingState] = useState<LoadingState>({
    isLoading: showInitialLoading,
    message: 'Loading...'
  });
  const [componentLoading, setComponentLoadingState] = useState<Record<string, LoadingState>>({});

  const setLoading = useCallback((loading: boolean) => {
    setIsLoading(loading);
    setGlobalLoadingState(prev => ({ ...prev, isLoading: loading }));
  }, []);

  const setLoadingState = useCallback((state: Partial<LoadingState>) => {
    setGlobalLoadingState(prev => ({ ...prev, ...state }));
    if (state.isLoading !== undefined) {
      setIsLoading(state.isLoading);
    }
  }, []);

  const setComponentLoading = useCallback((component: string, state: boolean | Partial<LoadingState>) => {
    if (typeof state === 'boolean') {
      setComponentLoadingState(prev => ({
        ...prev,
        [component]: { isLoading: state }
      }));
    } else {
      setComponentLoadingState(prev => ({
        ...prev,
        [component]: {
          isLoading: false,
          ...prev[component],
          ...state
        }
      }));
    }
  }, []);

  const isComponentLoading = useCallback((component: string): boolean => {
    return componentLoading[component]?.isLoading || false;
  }, [componentLoading]);

  const startGlobalLoading = useCallback((message = 'Loading...') => {
    setLoadingState({
      isLoading: true,
      message,
      progress: undefined,
      error: undefined
    });
  }, [setLoadingState]);

  const stopGlobalLoading = useCallback(() => {
    setLoadingState({
      isLoading: false,
      progress: 100,
      error: undefined
    });
  }, [setLoadingState]);

  const simulateProgress = useCallback((duration = 2000): Promise<void> => {
    return new Promise((resolve) => {
      const steps = 20;
      const stepDuration = duration / steps;
      let currentStep = 0;

      const interval = setInterval(() => {
        currentStep++;
        const progress = Math.min((currentStep / steps) * 100, 100);

        setLoadingState({
          isLoading: progress < 100,
          progress,
          message: progress < 100 ? `Loading... ${Math.round(progress)}%` : 'Complete!'
        });

        if (progress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setLoadingState({ isLoading: false });
            resolve();
          }, 300);
        }
      }, stepDuration);
    });
  }, [setLoadingState]);

  // Simulate initial page load
  useEffect(() => {
    if (!showInitialLoading) return;

    const timer = setTimeout(() => {
      setLoading(false);
    }, initialLoadingDuration);

    return () => clearTimeout(timer);
  }, [initialLoadingDuration, showInitialLoading, setLoading]);

  return (
    <LoadingContext.Provider value={{
      isLoading,
      globalLoadingState,
      setLoading,
      setLoadingState,
      componentLoading,
      setComponentLoading,
      isComponentLoading,
      startGlobalLoading,
      stopGlobalLoading,
      simulateProgress
    }}>
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
}
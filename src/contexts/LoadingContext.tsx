'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface LoadingContextType {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  componentLoading: Record<string, boolean>;
  setComponentLoading: (component: string, loading: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [componentLoading, setComponentLoadingState] = useState<Record<string, boolean>>({});

  const setLoading = (loading: boolean) => {
    setIsLoading(loading);
  };

  const setComponentLoading = (component: string, loading: boolean) => {
    setComponentLoadingState(prev => ({ ...prev, [component]: loading }));
  };

  // Simulate initial page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <LoadingContext.Provider value={{
      isLoading,
      setLoading,
      componentLoading,
      setComponentLoading
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
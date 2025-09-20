'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  LoadingSkeleton,
  CardSkeleton,
  MetricSkeleton,
  HeroSkeleton,
  CopywritingExamplesSkeleton,
  FormSkeleton,
  TableSkeleton,
  NavigationSkeleton,
  ChatMessageSkeleton,
  ImageSkeleton,
  StatGridSkeleton,
  PricingCardSkeleton,
  ShimmerSkeleton,
  ButtonLoading
} from '@/components/ui/loading-skeleton';
import { useLoading } from '@/contexts/LoadingContext';
import { cn } from '@/lib/utils';
import { Play, Pause, RotateCcw, Sparkles } from 'lucide-react';

const demoSections = [
  {
    id: 'basic',
    title: 'Basic Skeletons',
    description: 'Fundamental loading patterns for text and content',
  },
  {
    id: 'cards',
    title: 'Card Skeletons',
    description: 'Card-based layouts with various content types',
  },
  {
    id: 'specialized',
    title: 'Specialized Components',
    description: 'Domain-specific loading states for forms, tables, and more',
  },
  {
    id: 'complex',
    title: 'Complex Layouts',
    description: 'Full-page and section-level loading experiences',
  },
];

export function LoadingSkeletonsDemo() {
  const [activeSection, setActiveSection] = useState('basic');
  const [isSimulating, setIsSimulating] = useState(false);
  const {
    simulateProgress,
    globalLoadingState,
    setComponentLoading,
    componentLoading,
    isComponentLoading
  } = useLoading();

  const handleSimulateProgress = async () => {
    setIsSimulating(true);
    await simulateProgress(3000);
    setIsSimulating(false);
  };

  const toggleComponentLoading = (component: string) => {
    const isLoading = isComponentLoading(component);
    setComponentLoading(component, !isLoading);
  };

  const renderBasicSkeletons = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="space-y-4">
          <h4 className="font-semibold text-foreground">Basic Loading</h4>
          <LoadingSkeleton />
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold text-foreground">With Avatar</h4>
          <LoadingSkeleton showAvatar lines={2} />
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold text-foreground">Shimmer Effect</h4>
          <div className="space-y-3">
            <ShimmerSkeleton className="h-4 w-full" />
            <ShimmerSkeleton className="h-4 w-3/4" />
            <ShimmerSkeleton className="h-4 w-1/2" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="font-semibold text-foreground">Button Loading States</h4>
          <div className="flex gap-4">
            <ButtonLoading isLoading={isComponentLoading('button1')}>
              Normal Button
            </ButtonLoading>
            <Button
              variant="outline"
              onClick={() => toggleComponentLoading('button1')}
            >
              Toggle Loading
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold text-foreground">Progress Simulation</h4>
          <div className="space-y-3">
            {globalLoadingState.progress !== undefined && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{globalLoadingState.message}</span>
                  <span>{Math.round(globalLoadingState.progress)}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${globalLoadingState.progress}%` }}
                  />
                </div>
              </div>
            )}
            <Button
              onClick={handleSimulateProgress}
              disabled={isSimulating}
              className="w-full"
            >
              {isSimulating ? (
                <>
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                  Simulating...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Simulate Progress
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCardSkeletons = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="space-y-4">
          <h4 className="font-semibold text-foreground">Basic Card</h4>
          <CardSkeleton />
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold text-foreground">Metric Card</h4>
          <MetricSkeleton />
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold text-foreground">Pricing Card</h4>
          <PricingCardSkeleton />
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-semibold text-foreground">Statistics Grid</h4>
        <StatGridSkeleton items={4} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="space-y-4">
          <h4 className="font-semibold text-foreground">Image Placeholder</h4>
          <ImageSkeleton className="h-48" />
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold text-foreground">Square Image</h4>
          <ImageSkeleton aspectRatio="aspect-square" className="h-48" />
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold text-foreground">Portrait Image</h4>
          <ImageSkeleton aspectRatio="aspect-[3/4]" className="h-64" />
        </div>
      </div>
    </div>
  );

  const renderSpecializedSkeletons = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h4 className="font-semibold text-foreground">Form Skeleton</h4>
          <FormSkeleton />
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold text-foreground">Chat Messages</h4>
          <div className="glass-card p-4 space-y-4 max-h-96 overflow-y-auto">
            <ChatMessageSkeleton />
            <ChatMessageSkeleton isUser />
            <ChatMessageSkeleton />
            <ChatMessageSkeleton isUser />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-semibold text-foreground">Navigation Skeleton</h4>
        <NavigationSkeleton className="glass-card rounded-lg" />
      </div>

      <div className="space-y-4">
        <h4 className="font-semibold text-foreground">Data Table</h4>
        <TableSkeleton rows={5} columns={4} />
      </div>
    </div>
  );

  const renderComplexLayouts = () => (
    <div className="space-y-8">
      <div className="space-y-4">
        <h4 className="font-semibold text-foreground">Hero Section</h4>
        <div className="border border-white/10 rounded-lg overflow-hidden">
          <HeroSkeleton />
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-semibold text-foreground">Copywriting Examples</h4>
        <div className="border border-white/10 rounded-lg overflow-hidden max-h-96 overflow-y-auto">
          <CopywritingExamplesSkeleton />
        </div>
      </div>
    </div>
  );

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'basic':
        return renderBasicSkeletons();
      case 'cards':
        return renderCardSkeletons();
      case 'specialized':
        return renderSpecializedSkeletons();
      case 'complex':
        return renderComplexLayouts();
      default:
        return renderBasicSkeletons();
    }
  };

  return (
    <section className="w-full py-20 px-4 md:px-8 lg:px-12 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5"></div>
      <div className="max-w-7xl mx-auto relative">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full mb-6">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Loading States</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
            Loading Skeletons Demo
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Comprehensive collection of loading skeleton components for every use case,
            from basic content placeholders to complex layout structures.
          </p>
        </div>

        {/* Navigation */}
        <div className="flex justify-center mb-12">
          <div className="glass-card p-2 bg-background/50">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {demoSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    "hover:bg-primary/10 hover:text-primary",
                    activeSection === section.id
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : "text-muted-foreground"
                  )}
                >
                  {section.title}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Section Description */}
        <div className="text-center mb-12">
          <div className="glass-card p-6 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold mb-2 text-foreground">
              {demoSections.find(s => s.id === activeSection)?.title}
            </h3>
            <p className="text-muted-foreground">
              {demoSections.find(s => s.id === activeSection)?.description}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="glass-card p-8">
          {renderActiveSection()}
        </div>

        {/* Implementation Tips */}
        <div className="mt-16 glass-card p-8">
          <h3 className="text-2xl font-semibold mb-6 gradient-text">Implementation Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-3">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-primary" />
              </div>
              <h4 className="font-semibold text-foreground">Match Your Content</h4>
              <p className="text-muted-foreground text-sm">
                Design skeleton layouts that closely match your actual content structure for seamless transitions.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <RotateCcw className="h-4 w-4 text-primary" />
              </div>
              <h4 className="font-semibold text-foreground">Animate Thoughtfully</h4>
              <p className="text-muted-foreground text-sm">
                Use subtle animations like shimmer effects to indicate active loading without being distracting.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Play className="h-4 w-4 text-primary" />
              </div>
              <h4 className="font-semibold text-foreground">Progressive Loading</h4>
              <p className="text-muted-foreground text-sm">
                Show content as it becomes available rather than waiting for everything to load at once.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
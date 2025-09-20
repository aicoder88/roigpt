'use client';

import React from 'react';
import {
  OptimizedImage,
  ResponsiveImage,
  HeroImage,
  AvatarImage,
  ProductImage
} from './ui/optimized-image';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Zap, Users, TrendingUp, Award } from 'lucide-react';

export function ImageOptimizationDemo() {
  return (
    <section className="py-16 px-4 bg-background/50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            <Zap className="h-4 w-4 mr-2" />
            Image Optimization Demo
          </Badge>
          <h2 className="text-3xl font-bold gradient-text mb-4">
            Next.js Image Optimization in Action
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Demonstrating various optimized image components with automatic format conversion,
            responsive sizing, and lazy loading.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Hero Image Demo */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Hero Image (Priority Loading)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <HeroImage
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop"
                alt="Marketing Analytics Dashboard"
                width={800}
                height={400}
                className="rounded-lg shadow-lg"
                containerClassName="mb-4"
              />
              <p className="text-sm text-muted-foreground">
                Uses priority loading for above-the-fold content with automatic AVIF/WebP conversion.
              </p>
            </CardContent>
          </Card>

          {/* Responsive Image Demo */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Responsive Team Photo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveImage
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=400&fit=crop"
                alt="Professional team collaboration"
                width={800}
                height={400}
                className="rounded-lg shadow-lg"
                containerClassName="mb-4"
              />
              <p className="text-sm text-muted-foreground">
                Automatically serves different sizes based on device viewport and screen density.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Avatar and Product Image Demos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* Avatar Examples */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-lg">Avatar Sizes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <AvatarImage
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
                  alt="John Doe"
                  size="sm"
                />
                <div>
                  <p className="font-medium">Small (32px)</p>
                  <p className="text-sm text-muted-foreground">Chat avatars</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <AvatarImage
                  src="https://images.unsplash.com/photo-1494790108755-2616b612b5b8?w=100&h=100&fit=crop&crop=face"
                  alt="Jane Smith"
                  size="md"
                />
                <div>
                  <p className="font-medium">Medium (48px)</p>
                  <p className="text-sm text-muted-foreground">Profile cards</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <AvatarImage
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
                  alt="Mike Johnson"
                  size="lg"
                />
                <div>
                  <p className="font-medium">Large (64px)</p>
                  <p className="text-sm text-muted-foreground">Team pages</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Product Image Card Variant */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-lg">Product - Card</CardTitle>
            </CardHeader>
            <CardContent>
              <ProductImage
                src="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=400&fit=crop"
                alt="Premium Marketing Package"
                width={400}
                height={400}
                variant="card"
                containerClassName="mb-3"
              />
              <Badge className="mb-2">
                <Award className="h-3 w-3 mr-1" />
                Premium
              </Badge>
              <h3 className="font-semibold">AI Marketing Suite</h3>
              <p className="text-sm text-muted-foreground">Complete automation package</p>
            </CardContent>
          </Card>

          {/* Product Image Gallery Variant */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-lg">Product - Gallery</CardTitle>
            </CardHeader>
            <CardContent>
              <ProductImage
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=450&fit=crop"
                alt="Analytics Dashboard"
                width={600}
                height={450}
                variant="gallery"
                containerClassName="mb-3"
              />
              <h3 className="font-semibold">ROI Analytics</h3>
              <p className="text-sm text-muted-foreground">Real-time performance tracking</p>
            </CardContent>
          </Card>
        </div>

        {/* Technical Features */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Optimization Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
              <div className="p-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-semibold mb-2">Format Conversion</h4>
                <p className="text-sm text-muted-foreground">
                  Automatic AVIF/WebP serving based on browser support
                </p>
              </div>

              <div className="p-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-semibold mb-2">Lazy Loading</h4>
                <p className="text-sm text-muted-foreground">
                  Images load only when entering viewport
                </p>
              </div>

              <div className="p-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-semibold mb-2">Responsive Sizing</h4>
                <p className="text-sm text-muted-foreground">
                  Perfect size for every device and screen density
                </p>
              </div>

              <div className="p-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-semibold mb-2">Loading States</h4>
                <p className="text-sm text-muted-foreground">
                  Smooth placeholders and error handling
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
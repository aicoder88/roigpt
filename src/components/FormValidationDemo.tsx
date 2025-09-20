'use client';

import React from 'react';
import { ContactForm } from './ContactForm';
import { NewsletterForm } from './NewsletterForm';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  Shield,
  CheckCircle,
  AlertCircle,
  Zap,
  Users,
  Mail,
  FileText,
  Star,
} from 'lucide-react';

export function FormValidationDemo() {
  return (
    <section className="py-16 px-4 bg-background/50">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            <Shield className="h-4 w-4 mr-2" />
            Form Validation Demo
          </Badge>
          <h2 className="text-3xl font-bold gradient-text mb-4">
            React Hook Form with Comprehensive Validation
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Demonstrating real-time validation, accessibility features, user experience enhancements,
            and comprehensive error handling across different form types.
          </p>
        </div>

        <Tabs defaultValue="contact" className="w-full">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 mb-8">
            <TabsTrigger value="contact" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Contact Form
            </TabsTrigger>
            <TabsTrigger value="newsletter" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Newsletter Forms
            </TabsTrigger>
            <TabsTrigger value="features" className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              Features
            </TabsTrigger>
          </TabsList>

          {/* Contact Form Demo */}
          <TabsContent value="contact" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <ContactForm
                  onSubmit={async (data) => {
                    console.log('Demo contact form submission:', data);
                    // Simulate API delay
                    await new Promise(resolve => setTimeout(resolve, 2000));
                  }}
                />
              </div>

              <div className="space-y-4">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      Validation Features
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <div>
                        <strong>Real-time validation</strong>
                        <br />
                        Instant feedback as you type
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <div>
                        <strong>Email format checking</strong>
                        <br />
                        RFC-compliant email validation
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <div>
                        <strong>Character limits</strong>
                        <br />
                        Visual counters with warnings
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <div>
                        <strong>XSS protection</strong>
                        <br />
                        Input sanitization
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <div>
                        <strong>Accessibility</strong>
                        <br />
                        ARIA labels and screen reader support
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Zap className="h-5 w-5 text-primary" />
                      Try the Validation
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <p><strong>Test scenarios:</strong></p>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Try submitting with empty required fields</li>
                      <li>• Enter an invalid email address</li>
                      <li>• Type more than 1000 characters in the message</li>
                      <li>• Submit without selecting any services</li>
                      <li>• Watch real-time validation feedback</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Newsletter Forms Demo */}
          <TabsContent value="newsletter" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Inline Newsletter */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5 text-primary" />
                    Inline Newsletter Signup
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground text-sm">
                    Compact form for headers, footers, or sidebar areas:
                  </p>
                  <NewsletterForm
                    variant="inline"
                    size="md"
                    onSubmit={async (data) => {
                      console.log('Inline newsletter signup:', data);
                      await new Promise(resolve => setTimeout(resolve, 1500));
                    }}
                  />
                </CardContent>
              </Card>

              {/* Card Newsletter */}
              <NewsletterForm
                variant="card"
                size="md"
                onSubmit={async (data) => {
                  console.log('Card newsletter signup:', data);
                  await new Promise(resolve => setTimeout(resolve, 1500));
                }}
              />
            </div>

            {/* Size Variations */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Size Variations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-medium mb-2">Small (for sidebars)</h4>
                  <NewsletterForm
                    variant="inline"
                    size="sm"
                    onSubmit={async (data) => {
                      console.log('Small newsletter signup:', data);
                      await new Promise(resolve => setTimeout(resolve, 1000));
                    }}
                  />
                </div>

                <div>
                  <h4 className="font-medium mb-2">Large (for hero sections)</h4>
                  <NewsletterForm
                    variant="inline"
                    size="lg"
                    onSubmit={async (data) => {
                      console.log('Large newsletter signup:', data);
                      await new Promise(resolve => setTimeout(resolve, 1000));
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Features Overview */}
          <TabsContent value="features" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="glass-card">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Security First</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Input sanitization</li>
                    <li>• XSS protection</li>
                    <li>• CSRF token support</li>
                    <li>• Rate limiting ready</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Accessibility</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• WCAG 2.1 AA compliant</li>
                    <li>• Screen reader support</li>
                    <li>• Keyboard navigation</li>
                    <li>• High contrast mode</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Optimistic UI updates</li>
                    <li>• Debounced validation</li>
                    <li>• Minimal re-renders</li>
                    <li>• Error boundaries</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <CheckCircle className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Validation Types</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Required fields</li>
                    <li>• Email & URL formats</li>
                    <li>• Character limits</li>
                    <li>• Pattern matching</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <AlertCircle className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Error Handling</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Inline error messages</li>
                    <li>• Field-level validation</li>
                    <li>• Form-level errors</li>
                    <li>• Network error recovery</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Star className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>User Experience</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Loading states</li>
                    <li>• Success feedback</li>
                    <li>• Progressive enhancement</li>
                    <li>• Mobile optimized</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Technical Implementation */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Technical Implementation</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">React Hook Form Benefits</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Minimal re-renders for performance</li>
                    <li>• Built-in validation with custom rules</li>
                    <li>• TypeScript support out of the box</li>
                    <li>• Easy integration with UI libraries</li>
                    <li>• Automatic form state management</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-3">Custom Enhancements</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Reusable form field components</li>
                    <li>• Consistent error styling</li>
                    <li>• Character counters with warnings</li>
                    <li>• Loading states and success feedback</li>
                    <li>• Input sanitization and security</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
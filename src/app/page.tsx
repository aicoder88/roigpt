import React from "react";
import HeroSection from "@/components/HeroSection";
import ServicesShowcase from "@/components/ServicesShowcase";
import CopywritingExamples from "@/components/CopywritingExamples";
import PerformanceMetrics from "@/components/PerformanceMetrics";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-background">
      {/* Hero Section */}
      <HeroSection />

      {/* Services Showcase */}
      <section className="w-full py-20 px-4 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Our AI-Powered Services
          </h2>
          <p className="text-muted-foreground text-center max-w-3xl mx-auto mb-12">
            Leverage cutting-edge AI technology to boost your ROI with our
            comprehensive suite of digital marketing services.
          </p>
          <ServicesShowcase />
        </div>
      </section>

      {/* Copywriting Examples */}
      <section className="w-full py-20 px-4 md:px-8 lg:px-12 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            AI-Generated Copywriting
          </h2>
          <p className="text-muted-foreground text-center max-w-3xl mx-auto mb-12">
            Experience the power of AI copywriting that emulates the styles of
            the world's most successful copywriters.
          </p>
          <CopywritingExamples />
        </div>
      </section>

      {/* Performance Metrics */}
      <section className="w-full py-20 px-4 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Proven Results
          </h2>
          <p className="text-muted-foreground text-center max-w-3xl mx-auto mb-12">
            Our AI-powered solutions deliver measurable improvements in ROI,
            page speed, and conversion rates.
          </p>
          <PerformanceMetrics />
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-24 px-4 md:px-8 lg:px-12 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Digital Presence?
          </h2>
          <p className="text-xl md:text-2xl mb-10 opacity-90">
            Join the AI revolution and watch your ROI soar with our cutting-edge
            solutions.
          </p>
          <Button size="lg" className="text-lg px-8 py-6 h-auto group">
            Get Started Today
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-12 px-4 md:px-8 lg:px-12 bg-background border-t">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-bold">ROIGPT</h3>
              <p className="text-muted-foreground mt-2">
                AI-Powered Marketing Solutions
              </p>
            </div>
            <div className="flex flex-col md:flex-row gap-8">
              <div>
                <h4 className="font-semibold mb-3">Services</h4>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      NextJS Websites
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      SEO Optimization
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      AI Copywriting
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Company</h4>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      About Us
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Case Studies
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Legal</h4>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Terms of Service
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-6 border-t text-center text-muted-foreground">
            <p>© {new Date().getFullYear()} ROIGPT. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}

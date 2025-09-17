import React from "react";
import { Button } from "./ui/button";
import { ArrowRight, Star } from "lucide-react";
import { Badge } from "./ui/badge";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  testimonials?: Array<{
    text: string;
    author: string;
    company: string;
    rating: number;
  }>;
}

const HeroSection = ({
  title = "AI-Powered Marketing Solutions That Deliver Real ROI",
  subtitle = "Transform your digital presence with our cutting-edge AI tools designed to boost conversions, optimize SEO, and create compelling copy that converts.",
  ctaText = "Get Started Today",
  testimonials = [
    {
      text: "ROIGPT increased our conversion rate by 137% in just 30 days.",
      author: "Sarah Johnson",
      company: "TechStart Inc.",
      rating: 5,
    },
    {
      text: "The AI-generated copy reads exactly like Hormozi. Game changer!",
      author: "Michael Chen",
      company: "Growth Partners",
      rating: 5,
    },
  ],
}: HeroSectionProps) => {
  return (
    <div className="relative w-full min-h-[800px] bg-gradient-to-br from-background via-background to-primary/10 flex items-center justify-center overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 space-y-8">
            <Badge
              variant="outline"
              className="px-4 py-1 text-sm bg-background/80 backdrop-blur-sm"
            >
              AI-First Marketing Solutions
            </Badge>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              {title}
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl">{subtitle}</p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="gap-2 text-md">
                {ctaText}
                <ArrowRight className="h-4 w-4" />
              </Button>

              <Button variant="outline" size="lg" className="text-md">
                View Services
              </Button>
            </div>

            <div className="pt-6">
              <p className="text-sm text-muted-foreground mb-4">
                Trusted by innovative companies
              </p>
              <div className="flex flex-wrap gap-6 items-center">
                {["Company 1", "Company 2", "Company 3", "Company 4"].map(
                  (company, i) => (
                    <div
                      key={i}
                      className="text-muted-foreground/70 font-semibold"
                    >
                      {company}
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="relative bg-background/70 backdrop-blur-sm border rounded-xl p-6 shadow-lg max-w-md mx-auto">
              <div className="absolute -top-3 -right-3">
                <Badge className="bg-primary text-primary-foreground">
                  AI-Powered
                </Badge>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-primary font-semibold">AI</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">ROIGPT Assistant</h3>
                    <p className="text-xs text-muted-foreground">Online now</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-muted p-3 rounded-lg rounded-tl-none max-w-[80%]">
                    How can I help improve your marketing ROI today?
                  </div>

                  <div className="bg-primary/10 p-3 rounded-lg rounded-tr-none ml-auto max-w-[80%]">
                    I need better converting copy for my landing page.
                  </div>

                  <div className="bg-muted p-3 rounded-lg rounded-tl-none max-w-[80%]">
                    I can generate high-converting copy in the style of Alex
                    Hormozi, John Carlton, or Gary Halbert. Which would you
                    prefer?
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, i) => (
            <div
              key={i}
              className="bg-background/70 backdrop-blur-sm border rounded-lg p-6 shadow-sm"
            >
              <div className="flex gap-1 mb-2">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-lg font-medium mb-4">"{testimonial.text}"</p>
              <div>
                <p className="font-semibold">{testimonial.author}</p>
                <p className="text-sm text-muted-foreground">
                  {testimonial.company}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

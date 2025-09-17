"use client";

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface CopywriterExample {
  name: string;
  style: string;
  headline: string;
  body: string;
  callToAction: string;
}

const CopywritingExamples = () => {
  const [selectedTab, setSelectedTab] = useState("hormozi");

  const copywriters: Record<string, CopywriterExample> = {
    hormozi: {
      name: "Alex Hormozi",
      style:
        "Direct, punchy, and results-focused with clear value propositions",
      headline:
        "The Only 3 Ways To Grow Any Business (And How AI Multiplies Each One)",
      body: "Look, there are only three ways to grow any business: get more customers, increase transaction value, or increase purchase frequency. That's it. Most businesses focus on just one and leave money on the table. Our AI systems optimize all three simultaneously, creating compound growth that traditional marketing can't match. We've helped 127 businesses increase revenue by an average of 287% in under 90 days using this exact framework.",
      callToAction: "Book Your AI Growth Strategy Call (Limited Spots)",
    },
    carlton: {
      name: "John Carlton",
      style:
        "Story-driven with a focus on pain points and dramatic transformations",
      headline:
        "How A Frustrated Business Owner Discovered The 'AI Advantage' That Doubled His Revenue While Working Half The Hours",
      body: "It was embarrassing. There I was, a supposedly 'successful' business owner, working 80-hour weeks while watching competitors with inferior products steal my customers. The worst part? They weren't smarter than me—they just had better marketing. Then I discovered the 'AI Advantage'—a simple 3-step system that automatically identifies your ideal customers, creates irresistible offers they can't refuse, and delivers them through channels that actually work. Now my business runs itself while I focus on what matters.",
      callToAction: "Grab Your Free 'AI Advantage' Roadmap Now",
    },
    halbert: {
      name: "Gary Halbert",
      style: "Conversational, direct, with powerful psychological triggers",
      headline:
        "WARNING: Do NOT Hire Any Marketing Agency Until You Read This Letter!",
      body: "Let me tell you something most marketing 'experts' won't admit: 90% of what they do is guesswork. They test headlines, fiddle with ad copy, and pray something works before your budget runs out. But what if you could eliminate the guesswork entirely? Our AI-powered system has analyzed over 10,000 successful marketing campaigns across 23 industries to identify exactly what works and what doesn't. We don't guess—we KNOW what will convert for your specific business. And we guarantee results in writing or you pay nothing.",
      callToAction: "Claim Your Free Marketing AI Analysis ($997 Value)",
    },
    ogilvy: {
      name: "David Ogilvy",
      style: "Sophisticated, fact-based, with meticulous attention to detail",
      headline:
        "At 60 Miles An Hour, The Loudest Noise In This New Website Comes From The Electric Clock",
      body: "When we designed our first AI-powered website for a luxury brand client, we tested it against 17 different metrics. The results were remarkable. Visitors stayed 3.7 times longer. Conversion rates increased by 212%. Customer acquisition costs dropped by 67%. Why such dramatic improvements? Because unlike conventional websites that present the same experience to everyone, our AI-driven approach personalizes every element—from headlines to images to offers—based on each visitor's unique behavior patterns. The result is a website that feels custom-built for each individual visitor.",
      callToAction: "Request Our Detailed Case Study Portfolio",
    },
    bencivenga: {
      name: "Gary Bencivenga",
      style: "Thoughtful, educational, with compelling proof and credibility",
      headline:
        "The Astonishing ROI Secret That Makes Traditional Marketing Obsolete",
      body: "If you're still using traditional marketing methods, I have news that might disturb you: you're likely wasting 70% of your budget. After analyzing data from 1,324 marketing campaigns across multiple industries, we've discovered that AI-optimized approaches consistently outperform traditional methods by a minimum of 3:1 in ROI. This isn't theory—it's mathematical certainty. By applying advanced algorithmic testing to every element of your marketing, we can identify the exact messages, offers, and channels that will maximize your returns. The proof? Our clients average a 431% increase in marketing ROI within 90 days.",
      callToAction: "Download Our Free ROI Calculator Tool",
    },
  };

  return (
    <section className="w-full py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            AI-Powered Copywriting Styles
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our AI can generate high-converting copy in the style of the world's
            most legendary copywriters. See examples below.
          </p>
        </div>

        <Tabs
          defaultValue="hormozi"
          value={selectedTab}
          onValueChange={setSelectedTab}
          className="w-full"
        >
          <div className="flex justify-center mb-8">
            <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2">
              <TabsTrigger value="hormozi">Hormozi</TabsTrigger>
              <TabsTrigger value="carlton">Carlton</TabsTrigger>
              <TabsTrigger value="halbert">Halbert</TabsTrigger>
              <TabsTrigger value="ogilvy">Ogilvy</TabsTrigger>
              <TabsTrigger value="bencivenga">Bencivenga</TabsTrigger>
            </TabsList>
          </div>

          {Object.entries(copywriters).map(([key, copywriter]) => (
            <TabsContent key={key} value={key} className="mt-2">
              <Card className="border shadow-lg">
                <CardHeader className="pb-4">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                    <div>
                      <CardTitle className="text-2xl">
                        {copywriter.name} Style
                      </CardTitle>
                      <CardDescription className="mt-1">
                        {copywriter.style}
                      </CardDescription>
                    </div>
                    <Button variant="outline" className="md:self-end">
                      Use This Style
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="bg-muted/50 p-6 rounded-lg">
                    <h3 className="text-xl md:text-2xl font-bold mb-4">
                      {copywriter.headline}
                    </h3>
                    <p className="mb-6 text-muted-foreground">
                      {copywriter.body}
                    </p>
                    <Separator className="my-6" />
                    <div className="flex justify-center">
                      <Button size="lg" className="font-medium">
                        {copywriter.callToAction}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-6">
            Our AI can be trained on your brand voice or emulate any successful
            copywriting style.
          </p>
          <Button size="lg" className="font-medium">
            Get Custom AI Copywriting
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CopywritingExamples;

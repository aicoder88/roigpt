'use client';

import React from 'react';
import { Star, ArrowRight, TrendingUp } from 'lucide-react';
import { CountUp } from './AnimatedMetricsChart';

const caseStudies = [
    {
        company: 'TechCorp Global',
        industry: 'Enterprise SaaS',
        logo: '🏢',
        challenge: 'Low conversion rates on landing pages and email campaigns',
        solution: 'AI-powered copywriting and A/B testing optimization',
        results: [
            { label: 'ROI Increase', value: 425, suffix: '%' },
            { label: 'Conversion Rate', value: 18.5, suffix: '%' },
            { label: 'Revenue Growth', value: 3.2, prefix: '$', suffix: 'M' },
        ],
        testimonial: {
            quote: 'ROIGPT transformed our marketing efficiency. The AI-generated copy outperforms our best human copywriters consistently.',
            author: 'Sarah Chen',
            role: 'CMO, TechCorp Global',
        },
        timeframe: '90 days',
    },
    {
        company: 'FinanceFlow',
        industry: 'Financial Services',
        logo: '💰',
        challenge: 'Scaling content production while maintaining compliance',
        solution: 'Enterprise AI content generation with compliance guardrails',
        results: [
            { label: 'Content Output', value: 500, suffix: '%' },
            { label: 'Cost Reduction', value: 67, suffix: '%' },
            { label: 'Lead Quality', value: 92, suffix: '%' },
        ],
        testimonial: {
            quote: 'We produce 5x more content at a fraction of the cost, all while maintaining strict regulatory compliance.',
            author: 'Michael Rodriguez',
            role: 'VP Marketing, FinanceFlow',
        },
        timeframe: '6 months',
    },
    {
        company: 'RetailMax',
        industry: 'E-commerce',
        logo: '🛍️',
        challenge: 'Personalizing marketing at scale for 10M+ customers',
        solution: 'AI-driven personalization engine and dynamic content',
        results: [
            { label: 'Customer Engagement', value: 340, suffix: '%' },
            { label: 'Cart Abandonment', value: -45, suffix: '%' },
            { label: 'Revenue Per User', value: 156, suffix: '%' },
        ],
        testimonial: {
            quote: 'The personalization capabilities are game-changing. Every customer gets a unique experience that drives conversions.',
            author: 'Jennifer Park',
            role: 'Chief Digital Officer, RetailMax',
        },
        timeframe: '4 months',
    },
];

export function EnterpriseCaseStudies() {
    return (
        <section className="w-full py-20 px-4 md:px-8 lg:px-12 relative">
            <div className="absolute inset-0 glass opacity-30"></div>

            <div className="max-w-7xl mx-auto relative">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full mb-6">
                        <Star className="h-4 w-4 text-accent fill-accent" />
                        <span className="text-sm font-medium text-accent">Success Stories</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
                        Enterprise Case Studies
                    </h2>
                    <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                        See how leading enterprises achieve transformational results with AI-powered marketing solutions.
                    </p>
                </div>

                {/* Case Studies Grid */}
                <div className="space-y-8">
                    {caseStudies.map((study, index) => (
                        <div
                            key={index}
                            className="glass-card p-8 md:p-10 hover:shadow-2xl transition-all duration-500 group"
                        >
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                {/* Company Info */}
                                <div className="lg:col-span-1">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="text-5xl">{study.logo}</div>
                                        <div>
                                            <h3 className="text-2xl font-bold gradient-text">
                                                {study.company}
                                            </h3>
                                            <p className="text-sm text-muted-foreground">
                                                {study.industry}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-4 mt-6">
                                        <div>
                                            <h4 className="text-sm font-semibold text-muted-foreground mb-2">
                                                Challenge
                                            </h4>
                                            <p className="text-sm text-foreground">
                                                {study.challenge}
                                            </p>
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-semibold text-muted-foreground mb-2">
                                                Solution
                                            </h4>
                                            <p className="text-sm text-foreground">
                                                {study.solution}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <TrendingUp className="h-4 w-4 text-primary" />
                                            <span className="text-muted-foreground">
                                                Results in <span className="font-semibold text-primary">{study.timeframe}</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Results */}
                                <div className="lg:col-span-2">
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                                        {study.results.map((result, idx) => (
                                            <div
                                                key={idx}
                                                className="glass p-6 rounded-xl hover:scale-105 transition-transform duration-300"
                                            >
                                                <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                                                    <CountUp
                                                        end={result.value}
                                                        prefix={result.prefix}
                                                        suffix={result.suffix}
                                                        decimals={result.value % 1 !== 0 ? 1 : 0}
                                                    />
                                                </div>
                                                <div className="text-sm font-medium text-foreground">
                                                    {result.label}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Testimonial */}
                                    <div className="glass bg-primary/5 p-6 rounded-xl border-l-4 border-primary">
                                        <div className="flex gap-1 mb-3">
                                            {Array.from({ length: 5 }).map((_, i) => (
                                                <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                                            ))}
                                        </div>
                                        <p className="text-lg font-medium mb-4 leading-relaxed italic">
                                            "{study.testimonial.quote}"
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="font-semibold text-foreground">
                                                    {study.testimonial.author}
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                    {study.testimonial.role}
                                                </p>
                                            </div>
                                            <ArrowRight className="h-5 w-5 text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="mt-12 text-center">
                    <p className="text-lg text-muted-foreground mb-6">
                        Ready to write your success story?
                    </p>
                    <button className="glass-card px-8 py-4 rounded-xl font-semibold hover:scale-105 transition-all duration-300 group">
                        <span className="gradient-text">View All Case Studies</span>
                        <ArrowRight className="inline-block ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </section>
    );
}

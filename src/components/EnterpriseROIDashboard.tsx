'use client';

import React from 'react';
import { AnimatedMetricsChart, CountUp } from './AnimatedMetricsChart';
import { TrendingUp, DollarSign, Users, Zap, Sparkles } from 'lucide-react';

const roiData = [
    { label: 'Jan', value: 100 },
    { label: 'Feb', value: 145 },
    { label: 'Mar', value: 180 },
    { label: 'Apr', value: 220 },
    { label: 'May', value: 285 },
    { label: 'Jun', value: 340 },
];

const conversionData = [
    { label: 'Email', value: 24, color: 'hsl(var(--primary))' },
    { label: 'Landing', value: 42, color: 'hsl(217, 91%, 60%)' },
    { label: 'Social', value: 31, color: 'hsl(var(--accent))' },
    { label: 'Ads', value: 38, color: 'hsl(280, 100%, 70%)' },
];

const metrics = [
    {
        icon: TrendingUp,
        label: 'Average ROI Increase',
        value: 340,
        suffix: '%',
        description: 'Within 90 days',
        color: 'text-primary',
    },
    {
        icon: DollarSign,
        label: 'Revenue Generated',
        value: 127,
        prefix: '$',
        suffix: 'M',
        description: 'For our clients',
        color: 'text-green-500',
    },
    {
        icon: Users,
        label: 'Enterprise Clients',
        value: 250,
        suffix: '+',
        description: 'Worldwide',
        color: 'text-accent',
    },
    {
        icon: Zap,
        label: 'Time Saved',
        value: 85,
        suffix: '%',
        description: 'On content creation',
        color: 'text-yellow-500',
    },
];

export function EnterpriseROIDashboard() {
    return (
        <section className="w-full py-20 px-4 md:px-8 lg:px-12 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>

            <div className="max-w-7xl mx-auto relative">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full mb-6">
                        <Sparkles className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium text-primary">Real Results</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
                        Data-Driven Performance
                    </h2>
                    <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                        See how enterprise clients leverage AI-powered marketing to achieve unprecedented ROI growth and operational efficiency.
                    </p>
                </div>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {metrics.map((metric, index) => (
                        <div
                            key={index}
                            className="glass-card p-6 hover:scale-105 transition-all duration-300 group"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <div className={cn(
                                'w-12 h-12 rounded-xl flex items-center justify-center mb-4',
                                'bg-gradient-to-br from-primary/10 to-accent/10',
                                'group-hover:scale-110 transition-transform duration-300'
                            )}>
                                <metric.icon className={cn('h-6 w-6', metric.color)} />
                            </div>
                            <div className="text-3xl md:text-4xl font-bold mb-2 gradient-text">
                                <CountUp
                                    end={metric.value}
                                    prefix={metric.prefix}
                                    suffix={metric.suffix}
                                    duration={2000}
                                />
                            </div>
                            <div className="text-sm font-semibold text-foreground mb-1">
                                {metric.label}
                            </div>
                            <div className="text-xs text-muted-foreground">
                                {metric.description}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* ROI Growth Chart */}
                    <div className="glass-card p-8">
                        <div className="mb-6">
                            <h3 className="text-2xl font-semibold mb-2 gradient-text">
                                ROI Growth Trajectory
                            </h3>
                            <p className="text-muted-foreground text-sm">
                                Average client performance over 6 months
                            </p>
                        </div>
                        <AnimatedMetricsChart
                            data={roiData}
                            type="area"
                            height={280}
                            showGrid={true}
                            showLabels={true}
                        />
                        <div className="mt-4 flex items-center gap-2 text-sm">
                            <TrendingUp className="h-4 w-4 text-green-500" />
                            <span className="text-green-500 font-semibold">+240%</span>
                            <span className="text-muted-foreground">vs. traditional marketing</span>
                        </div>
                    </div>

                    {/* Conversion Rates Chart */}
                    <div className="glass-card p-8">
                        <div className="mb-6">
                            <h3 className="text-2xl font-semibold mb-2 gradient-text">
                                Channel Performance
                            </h3>
                            <p className="text-muted-foreground text-sm">
                                Conversion rate improvements by channel
                            </p>
                        </div>
                        <AnimatedMetricsChart
                            data={conversionData}
                            type="bar"
                            height={280}
                            showGrid={true}
                            showLabels={true}
                        />
                        <div className="mt-4 flex items-center gap-2 text-sm">
                            <Zap className="h-4 w-4 text-primary" />
                            <span className="text-primary font-semibold">AI-Optimized</span>
                            <span className="text-muted-foreground">across all channels</span>
                        </div>
                    </div>
                </div>

                {/* Bottom CTA */}
                <div className="mt-12 text-center glass-card p-8">
                    <p className="text-lg text-muted-foreground mb-4">
                        Join <span className="font-bold text-primary">250+ enterprise clients</span> achieving measurable results with AI-powered marketing
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span>Real-time optimization</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                            <span>Enterprise-grade security</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                            <span>Dedicated support</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function cn(...classes: (string | undefined | null | false)[]) {
    return classes.filter(Boolean).join(' ');
}

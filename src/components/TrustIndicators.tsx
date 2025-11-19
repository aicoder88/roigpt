'use client';

import React, { useEffect, useState } from 'react';
import { Shield, Award, Lock, CheckCircle, Sparkles } from 'lucide-react';

const enterpriseLogos = [
    { name: 'Microsoft', icon: '🏢' },
    { name: 'Salesforce', icon: '☁️' },
    { name: 'Adobe', icon: '🎨' },
    { name: 'Oracle', icon: '🔴' },
    { name: 'SAP', icon: '💼' },
    { name: 'IBM', icon: '🔷' },
    { name: 'Cisco', icon: '🌐' },
    { name: 'Dell', icon: '💻' },
];

const certifications = [
    {
        icon: Shield,
        title: 'SOC 2 Type II',
        description: 'Enterprise-grade security',
    },
    {
        icon: Lock,
        title: 'GDPR Compliant',
        description: 'Data privacy certified',
    },
    {
        icon: CheckCircle,
        title: 'ISO 27001',
        description: 'Information security',
    },
    {
        icon: Award,
        title: 'Best AI Platform 2024',
        description: 'Industry recognition',
    },
];

const stats = [
    { value: '250+', label: 'Enterprise Clients' },
    { value: '99.9%', label: 'Uptime SLA' },
    { value: '$127M', label: 'Revenue Generated' },
    { value: '50+', label: 'Countries' },
];

export function TrustIndicators() {
    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setScrollPosition((prev) => (prev + 1) % (enterpriseLogos.length * 2));
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="w-full py-20 px-4 md:px-8 lg:px-12 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5"></div>

            <div className="max-w-7xl mx-auto relative">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full mb-6">
                        <Shield className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium text-primary">Trusted by Industry Leaders</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
                        Enterprise-Grade Trust
                    </h2>
                    <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                        Join the world's leading enterprises who trust ROIGPT for their mission-critical marketing operations.
                    </p>
                </div>

                {/* Stats Bar */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="glass-card p-6 text-center hover:scale-105 transition-transform duration-300"
                        >
                            <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                                {stat.value}
                            </div>
                            <div className="text-sm text-muted-foreground">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Logo Carousel */}
                <div className="mb-16 overflow-hidden">
                    <div className="glass-card p-8">
                        <h3 className="text-xl font-semibold text-center mb-8 text-foreground">
                            Trusted by Leading Enterprises
                        </h3>
                        <div className="relative">
                            <div className="flex gap-8 animate-scroll">
                                {[...enterpriseLogos, ...enterpriseLogos].map((logo, index) => (
                                    <div
                                        key={index}
                                        className="flex-shrink-0 w-32 h-20 glass rounded-xl flex flex-col items-center justify-center hover:scale-110 transition-transform duration-300 group"
                                    >
                                        <div className="text-4xl mb-2 group-hover:scale-125 transition-transform">
                                            {logo.icon}
                                        </div>
                                        <div className="text-xs text-muted-foreground font-medium">
                                            {logo.name}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Certifications Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {certifications.map((cert, index) => (
                        <div
                            key={index}
                            className="glass-card p-6 hover:shadow-2xl transition-all duration-300 group"
                        >
                            <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                <cert.icon className="h-6 w-6 text-primary" />
                            </div>
                            <h3 className="font-semibold text-lg mb-2 text-foreground">
                                {cert.title}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                {cert.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Security Features */}
                <div className="glass-card p-8 md:p-12">
                    <div className="text-center mb-8">
                        <Sparkles className="h-8 w-8 text-primary mx-auto mb-4" />
                        <h3 className="text-2xl md:text-3xl font-bold gradient-text mb-4">
                            Enterprise Security & Compliance
                        </h3>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Built from the ground up with enterprise security, compliance, and scalability in mind.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            {
                                title: 'Data Encryption',
                                description: 'End-to-end AES-256 encryption for all data',
                            },
                            {
                                title: 'SSO Integration',
                                description: 'SAML 2.0 and OAuth 2.0 support',
                            },
                            {
                                title: 'Role-Based Access',
                                description: 'Granular permissions and access controls',
                            },
                            {
                                title: 'Audit Logs',
                                description: 'Complete activity tracking and reporting',
                            },
                            {
                                title: 'Data Residency',
                                description: 'Choose your data storage location',
                            },
                            {
                                title: '24/7 Support',
                                description: 'Dedicated enterprise support team',
                            },
                        ].map((feature, index) => (
                            <div
                                key={index}
                                className="flex items-start gap-3 p-4 glass rounded-xl hover:bg-primary/5 transition-colors duration-300"
                            >
                                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="font-semibold text-foreground mb-1">
                                        {feature.title}
                                    </h4>
                                    <p className="text-sm text-muted-foreground">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 30s linear infinite;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
        </section>
    );
}

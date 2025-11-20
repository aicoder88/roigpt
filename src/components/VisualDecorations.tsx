'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface FloatingOrbProps {
    className?: string;
    delay?: number;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    color?: 'primary' | 'accent' | 'secondary';
}

export function FloatingOrb({
    className,
    delay = 0,
    size = 'md',
    color = 'primary'
}: FloatingOrbProps) {
    const sizeClasses = {
        sm: 'w-24 h-24',
        md: 'w-64 h-64',
        lg: 'w-96 h-96',
        xl: 'w-[500px] h-[500px]',
    };

    const colorClasses = {
        primary: 'bg-primary/20',
        accent: 'bg-accent/20',
        secondary: 'bg-secondary/20',
    };

    return (
        <div
            className={cn(
                'absolute rounded-full blur-3xl animate-float pointer-events-none',
                sizeClasses[size],
                colorClasses[color],
                className
            )}
            style={{ animationDelay: `${delay}s` }}
        />
    );
}

export function GridPattern({ className }: { className?: string }) {
    return (
        <div className={cn("absolute inset-0 -z-10 overflow-hidden pointer-events-none", className)}>
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px),
          linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
                    backgroundSize: '40px 40px',
                }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>
    );
}

export function GlowingParticle({
    className,
    delay = 0,
    style
}: {
    className?: string;
    delay?: number;
    style?: React.CSSProperties;
}) {
    return (
        <div
            className={cn(
                "absolute w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_currentColor]",
                className
            )}
            style={{ ...style, animationDelay: `${delay}s` }}
        />
    );
}

export function SectionDivider() {
    return (
        <div className="w-full h-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/50" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        </div>
    );
}

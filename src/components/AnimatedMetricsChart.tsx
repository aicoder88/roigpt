'use client';

import React, { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';

interface DataPoint {
  label: string;
  value: number;
  color?: string;
}

interface AnimatedMetricsChartProps {
  data: DataPoint[];
  type?: 'line' | 'bar' | 'area';
  height?: number;
  className?: string;
  animate?: boolean;
  showGrid?: boolean;
  showLabels?: boolean;
}

export function AnimatedMetricsChart({
  data,
  type = 'line',
  height = 300,
  className,
  animate = true,
  showGrid = true,
  showLabels = true,
}: AnimatedMetricsChartProps) {
  const [animationProgress, setAnimationProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (chartRef.current) {
      observer.observe(chartRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (isVisible && animate) {
      const duration = 1500;
      const startTime = Date.now();

      const animateChart = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function for smooth animation
        const eased = 1 - Math.pow(1 - progress, 3);
        setAnimationProgress(eased);

        if (progress < 1) {
          requestAnimationFrame(animateChart);
        }
      };

      requestAnimationFrame(animateChart);
    } else if (!animate) {
      setAnimationProgress(1);
    }
  }, [isVisible, animate]);

  const maxValue = Math.max(...data.map(d => d.value));
  const chartWidth = 100; // percentage
  const barWidth = chartWidth / data.length;

  const getYPosition = (value: number) => {
    return ((maxValue - value) / maxValue) * 100;
  };

  const renderLineChart = () => {
    const points = data.map((point, index) => {
      const x = (index / (data.length - 1)) * 100;
      const y = getYPosition(point.value * animationProgress);
      return `${x},${y}`;
    }).join(' ');

    const areaPoints = `0,100 ${points} 100,100`;

    return (
      <svg
        width="100%"
        height={height}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="overflow-visible"
      >
        {/* Grid lines */}
        {showGrid && (
          <g className="opacity-20">
            {[0, 25, 50, 75, 100].map((y) => (
              <line
                key={y}
                x1="0"
                y1={y}
                x2="100"
                y2={y}
                stroke="currentColor"
                strokeWidth="0.2"
                vectorEffect="non-scaling-stroke"
              />
            ))}
          </g>
        )}

        {/* Area fill */}
        {type === 'area' && (
          <polygon
            points={areaPoints}
            fill="url(#gradient)"
            className="opacity-30"
          />
        )}

        {/* Line */}
        <polyline
          points={points}
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="drop-shadow-lg"
        />

        {/* Data points */}
        {data.map((point, index) => {
          const x = (index / (data.length - 1)) * 100;
          const y = getYPosition(point.value * animationProgress);
          return (
            <circle
              key={index}
              cx={x}
              cy={y}
              r="1.5"
              fill="hsl(var(--primary))"
              className="drop-shadow-md animate-pulse"
              style={{ animationDelay: `${index * 100}ms` }}
            />
          );
        })}

        {/* Gradient definition */}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    );
  };

  const renderBarChart = () => {
    return (
      <svg width="100%" height={height} viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Grid lines */}
        {showGrid && (
          <g className="opacity-20">
            {[0, 25, 50, 75, 100].map((y) => (
              <line
                key={y}
                x1="0"
                y1={y}
                x2="100"
                y2={y}
                stroke="currentColor"
                strokeWidth="0.2"
                vectorEffect="non-scaling-stroke"
              />
            ))}
          </g>
        )}

        {/* Bars */}
        {data.map((point, index) => {
          const x = (index * barWidth) + (barWidth * 0.1);
          const barWidthActual = barWidth * 0.8;
          const barHeight = (point.value / maxValue) * 100 * animationProgress;
          const y = 100 - barHeight;

          return (
            <g key={index}>
              <rect
                x={x}
                y={y}
                width={barWidthActual}
                height={barHeight}
                fill={point.color || 'hsl(var(--primary))'}
                className="transition-all duration-300 hover:opacity-80"
                rx="1"
              />
              <rect
                x={x}
                y={y}
                width={barWidthActual}
                height={barHeight}
                fill="url(#barGradient)"
                className="opacity-50"
                rx="1"
              />
            </g>
          );
        })}

        <defs>
          <linearGradient id="barGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="white" stopOpacity="0.3" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    );
  };

  return (
    <div ref={chartRef} className={cn('w-full', className)}>
      <div className="relative" style={{ height: `${height}px` }}>
        {type === 'bar' ? renderBarChart() : renderLineChart()}
      </div>

      {/* Labels */}
      {showLabels && (
        <div className="flex justify-between mt-4 px-2">
          {data.map((point, index) => (
            <div
              key={index}
              className="text-xs text-muted-foreground text-center"
              style={{ width: `${100 / data.length}%` }}
            >
              {point.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

interface CountUpProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}

export function CountUp({
  end,
  duration = 2000,
  prefix = '',
  suffix = '',
  decimals = 0,
  className,
}: CountUpProps) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const countRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (isVisible) {
      const startTime = Date.now();
      const startValue = 0;

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = startValue + (end - startValue) * eased;

        setCount(current);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setCount(end);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [isVisible, end, duration]);

  return (
    <span ref={countRef} className={className}>
      {prefix}
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
}

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
  type?: 'line' | 'bar' | 'area' | 'pie' | 'radar';
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
          className="drop-shadow-[0_0_10px_rgba(var(--primary),0.5)]"
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
              r="2"
              fill="hsl(var(--background))"
              stroke="hsl(var(--primary))"
              strokeWidth="1"
              className="drop-shadow-md animate-pulse"
              style={{ animationDelay: `${index * 100}ms` }}
            />
          );
        })}

        {/* Gradient definition */}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.5" />
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
                className="transition-all duration-300 hover:opacity-80 drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]"
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

  const renderPieChart = () => {
    let accumulatedAngle = 0;
    const total = data.reduce((acc, curr) => acc + curr.value, 0);
    const radius = 40;
    const center = 50;

    return (
      <svg width="100%" height={height} viewBox="0 0 100 100" className="overflow-visible">
        {data.map((point, index) => {
          const percentage = point.value / total;
          const angle = percentage * 360 * animationProgress;
          const startAngle = accumulatedAngle;
          accumulatedAngle += angle;

          const x1 = center + radius * Math.cos((Math.PI * startAngle) / 180);
          const y1 = center + radius * Math.sin((Math.PI * startAngle) / 180);
          const x2 = center + radius * Math.cos((Math.PI * (startAngle + angle)) / 180);
          const y2 = center + radius * Math.sin((Math.PI * (startAngle + angle)) / 180);

          const largeArcFlag = angle > 180 ? 1 : 0;

          const pathData = `M ${center} ${center} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;

          return (
            <path
              key={index}
              d={pathData}
              fill={point.color || `hsl(var(--chart-${(index % 5) + 1}))`}
              className="hover:scale-105 transition-transform duration-300 origin-center drop-shadow-md"
              stroke="hsl(var(--background))"
              strokeWidth="1"
            />
          );
        })}
      </svg>
    );
  };

  const renderRadarChart = () => {
    const radius = 40;
    const center = 50;
    const angleStep = (Math.PI * 2) / data.length;

    const points = data.map((point, index) => {
      const value = (point.value / maxValue) * radius * animationProgress;
      const x = center + value * Math.cos(index * angleStep - Math.PI / 2);
      const y = center + value * Math.sin(index * angleStep - Math.PI / 2);
      return `${x},${y}`;
    }).join(' ');

    const gridPoints = [0.25, 0.5, 0.75, 1].map(scale => {
      return data.map((_, index) => {
        const value = radius * scale;
        const x = center + value * Math.cos(index * angleStep - Math.PI / 2);
        const y = center + value * Math.sin(index * angleStep - Math.PI / 2);
        return `${x},${y}`;
      }).join(' ');
    });

    return (
      <svg width="100%" height={height} viewBox="0 0 100 100" className="overflow-visible">
        {/* Grid */}
        {gridPoints.map((points, i) => (
          <polygon
            key={i}
            points={points}
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.2"
            strokeWidth="0.5"
          />
        ))}

        {/* Data Area */}
        <polygon
          points={points}
          fill="hsl(var(--primary))"
          fillOpacity="0.3"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
          className="drop-shadow-[0_0_10px_rgba(var(--primary),0.5)]"
        />

        {/* Points */}
        {data.map((point, index) => {
          const value = (point.value / maxValue) * radius * animationProgress;
          const x = center + value * Math.cos(index * angleStep - Math.PI / 2);
          const y = center + value * Math.sin(index * angleStep - Math.PI / 2);
          return (
            <circle
              key={index}
              cx={x}
              cy={y}
              r="2"
              fill="hsl(var(--background))"
              stroke="hsl(var(--primary))"
              strokeWidth="1"
              className="animate-pulse"
            />
          );
        })}
      </svg>
    );
  };

  const renderChart = () => {
    switch (type) {
      case 'bar': return renderBarChart();
      case 'pie': return renderPieChart();
      case 'radar': return renderRadarChart();
      case 'area':
      case 'line':
      default: return renderLineChart();
    }
  };

  return (
    <div ref={chartRef} className={cn('w-full', className)}>
      <div className="relative" style={{ height: `${height}px` }}>
        {renderChart()}
      </div>

      {/* Labels */}
      {showLabels && type !== 'pie' && type !== 'radar' && (
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

      {/* Legend for Pie/Radar */}
      {showLabels && (type === 'pie' || type === 'radar') && (
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          {data.map((point, index) => (
            <div key={index} className="flex items-center gap-2 text-xs text-muted-foreground">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: point.color || `hsl(var(--chart-${(index % 5) + 1}))` }}
              />
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

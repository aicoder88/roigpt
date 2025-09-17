'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Sun, Moon, Monitor } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="ghost" size="sm" className="glass rounded-full p-2" aria-label="Loading theme">
        <Monitor className="h-4 w-4" />
      </Button>
    );
  }

  const effective = (resolvedTheme || theme) as 'light' | 'dark';

  const IconWithBadge = () => {
    const baseIcon =
      effective === 'light' ? (
        <Sun className="h-4 w-4 text-amber-400" />
      ) : (
        <Moon className="h-4 w-4 text-blue-300" />
      );

    // Show a small system badge when theme is set to 'system'
    if (theme === 'system') {
      return (
        <span className="relative inline-flex">
          {baseIcon}
          <span className="absolute -bottom-1 -right-1 inline-flex h-3 w-3 items-center justify-center rounded-full bg-background/80 border border-border">
            <Monitor className="h-2.5 w-2.5" />
          </span>
        </span>
      );
    }
    return baseIcon;
  };

  const label = `Theme: ${effective}${theme === 'system' ? ' (System)' : ''}`;

  return (
    <TooltipProvider>
      <DropdownMenu>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button
                aria-label={`${label}. Open theme menu.`}
                variant="ghost"
                size="sm"
                className="glass rounded-full p-2 hover:bg-white/10 transition-all duration-300"
              >
                <IconWithBadge />
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent side="bottom">{label}</TooltipContent>
        </Tooltip>
        <DropdownMenuContent align="end" className="glass-card border-white/20">
          <DropdownMenuItem
            onClick={() => setTheme('light')}
            className="cursor-pointer hover:bg-white/10"
          >
            <Sun className="mr-2 h-4 w-4" />
            Light
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setTheme('dark')}
            className="cursor-pointer hover:bg-white/10"
          >
            <Moon className="mr-2 h-4 w-4" />
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setTheme('system')}
            className="cursor-pointer hover:bg-white/10"
          >
            <Monitor className="mr-2 h-4 w-4" />
            System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </TooltipProvider>
  );
}

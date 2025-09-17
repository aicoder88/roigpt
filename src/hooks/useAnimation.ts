import { useEffect, useState } from 'react';
import { animations, durations, easings } from '@/lib/animations';

interface UseAnimationOptions {
  duration?: keyof typeof durations;
  easing?: keyof typeof easings;
  delay?: number;
  autoPlay?: boolean;
}

export function useAnimation(
  animationName: keyof typeof animations,
  options: UseAnimationOptions = {}
) {
  const {
    duration = 'normal',
    easing = 'easeOut',
    delay = 0,
    autoPlay = true
  } = options;

  const [isPlaying, setIsPlaying] = useState(autoPlay);

  const play = () => setIsPlaying(true);
  const pause = () => setIsPlaying(false);
  const reset = () => {
    setIsPlaying(false);
    setTimeout(() => setIsPlaying(true), 50);
  };

  const animationStyle = {
    animation: isPlaying
      ? `${animations[animationName].replace(/(\d+(?:\.\d+)?)s/, durations[duration]).replace(/ease-\w+/, easings[easing])}`
      : 'none',
    animationDelay: `${delay}ms`,
  };

  return {
    animationStyle,
    isPlaying,
    play,
    pause,
    reset,
  };
}

export function useStaggeredAnimations(
  animationName: keyof typeof animations,
  itemCount: number,
  staggerDelay = 100
) {
  const [playingStates, setPlayingStates] = useState<boolean[]>(
    new Array(itemCount).fill(false)
  );

  const playAll = () => {
    setPlayingStates(new Array(itemCount).fill(false));

    for (let i = 0; i < itemCount; i++) {
      setTimeout(() => {
        setPlayingStates(prev => {
          const newStates = [...prev];
          newStates[i] = true;
          return newStates;
        });
      }, i * staggerDelay);
    }
  };

  const resetAll = () => {
    setPlayingStates(new Array(itemCount).fill(false));
  };

  const getItemAnimation = (index: number) => ({
    animation: playingStates[index] ? animations[animationName] : 'none',
    animationDelay: `${index * staggerDelay}ms`,
  });

  useEffect(() => {
    if (playingStates.every(state => !state)) {
      const timer = setTimeout(playAll, 100);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, []);

  return {
    playAll,
    resetAll,
    getItemAnimation,
    playingStates,
  };
}
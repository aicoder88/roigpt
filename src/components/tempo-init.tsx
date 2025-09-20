"use client";

/* import { TempoDevtools } from 'tempo-devtools'; [deprecated] */
import { useEffect } from "react";
import { getTempoConfig } from "@/lib/env";

export function TempoInit() {
  useEffect(() => {
    const tempoConfig = getTempoConfig();
    if (tempoConfig) {
      /* TempoDevtools.init() [deprecated] */;
    }
  }, []);

  return null;
}
"use client";

import { createContext, useContext, useSyncExternalStore, type ReactNode } from "react";

export const EASE_CURTAIN = [0.76, 0, 0.24, 1] as const;

/**
 * false during the hydration render of a hard load, true right after.
 * Hero entrances start on it so they play once the page is interactive.
 */
const IntroContext = createContext(true);
export const useIntroDone = () => useContext(IntroContext);

const noop = () => () => {};

export function IntroProvider({ children }: { children: ReactNode }) {
  const ready = useSyncExternalStore(noop, () => true, () => false);
  return <IntroContext.Provider value={ready}>{children}</IntroContext.Provider>;
}

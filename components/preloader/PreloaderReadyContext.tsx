"use client";

import { createContext, useContext } from "react";

const PreloaderReadyContext = createContext(false);

export function usePreloaderReady() {
  return useContext(PreloaderReadyContext);
}

export { PreloaderReadyContext };

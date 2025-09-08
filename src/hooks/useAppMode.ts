import { useState } from "react";
import type { AppMode } from "@/types/shared";

export const useAppMode = () => {
  const [mode, setMode] = useState<AppMode>('home');

  const goToHome = () => setMode('home');
  const goToChat = () => setMode('chat');
  const goToForm = () => setMode('form');

  return {
    mode,
    setMode,
    goToHome,
    goToChat,
    goToForm
  };
};
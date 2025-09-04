import React from 'react';

export enum AppState {
  BOOTING,
  LOCK_SCREEN,
  DESKTOP,
}

export type Theme = 'light' | 'dark';

export interface AppDefinition {
  id: string;
  title: string;
  icon: React.ReactElement;
  component: React.FC<{ onClose: () => void; onMinimize: () => void, isFocused: boolean, appId: string }>;
  defaultSize: { width: number; height: number };
}

export interface WindowInstance {
  id: string;
  appId: string;
  isMinimized: boolean;
  isMaximized: boolean;
  isFocused: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

export interface DesktopContextType {
  openWindows: WindowInstance[];
  openApp: (appId: string) => void;
  closeApp: (id:string) => void;
  focusApp: (id: string) => void;
  minimizeApp: (id: string) => void;
  toggleMaximizeApp: (id: string) => void;
  background: string;
  setBackground: (url: string) => void;
  theme: Theme;
  apps: AppDefinition[];
}

export interface ChatMessage {
    sender: 'user' | 'bot';
    text: string;
}
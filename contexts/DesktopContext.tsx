import React, { createContext, useState, useCallback, useMemo, useEffect, useContext } from 'react';
import { DesktopContextType, WindowInstance, Theme, AppDefinition } from '../types';

export const DesktopContext = createContext<DesktopContextType | undefined>(undefined);

const getImageBrightness = (imageUrl: string): Promise<Theme> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = imageUrl;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        return resolve('dark'); 
      }
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      let r, g, b, avg;
      let colorSum = 0;

      for(let x = 0, len = data.length; x < len; x += 4) {
          r = data[x];
          g = data[x+1];
          b = data[x+2];
          avg = Math.floor((r + g + b) / 3);
          colorSum += avg;
      }
      
      const brightness = Math.floor(colorSum / (img.width * img.height));
      resolve(brightness > 127.5 ? 'light' : 'dark');
    };
    img.onerror = () => {
      resolve('dark'); // Default to dark theme on image load error
    };
  });
};


export const DesktopProvider: React.FC<{ children: React.ReactNode; apps: AppDefinition[] }> = ({ children, apps }) => {
  const [openWindows, setOpenWindows] = useState<WindowInstance[]>([]);
  const [background, setBackground] = useState('https://images.unsplash.com/photo-1508615039623-a25605d2b022?q=80&w=1920&auto=format&fit=crop&h=1080');
  const [theme, setTheme] = useState<Theme>('dark');
  
  useEffect(() => {
    getImageBrightness(background)
      .then(setTheme)
      .catch(() => setTheme('dark'));
  }, [background]);

  const openApp = useCallback((appId: string) => {
    setOpenWindows(currentWindows => {
      const appDef = apps.find(app => app.id === appId);
      if (!appDef) return currentWindows;

      const existingWindow = currentWindows.find(w => w.appId === appId);

      if(existingWindow) {
         const focusedWindows = currentWindows.map(w =>
             w.id === existingWindow.id 
                 ? { ...w, isMinimized: false, isFocused: true }
                 : { ...w, isFocused: false }
         );
         return focusedWindows;
      }
      
      const newWindowId = `win-${Date.now()}`;
      const newWindow: WindowInstance = {
        id: newWindowId,
        appId: appId,
        isMinimized: false,
        isMaximized: false,
        isFocused: true,
        position: { x: Math.random() * 200 + 150, y: Math.random() * 100 + 100 },
        size: appDef.defaultSize,
      };

      const focusedWindows = currentWindows.map(w => ({ ...w, isFocused: false }));
      return [...focusedWindows, newWindow];
    });
  }, [apps]);

  const closeApp = useCallback((id: string) => {
    setOpenWindows(currentWindows => currentWindows.filter(w => w.id !== id));
  }, []);

  const focusApp = useCallback((id: string) => {
    setOpenWindows(currentWindows =>
      currentWindows.map(w => ({
        ...w,
        isFocused: w.id === id,
        isMinimized: w.id === id ? false : w.isMinimized,
      })).sort((a, b) => { // Bring focused window to the top
          if (a.id === id) return 1;
          if (b.id === id) return -1;
          return 0;
      })
    );
  }, []);
  
  const minimizeApp = useCallback((id: string) => {
    setOpenWindows(currentWindows =>
      currentWindows.map(w => (w.id === id ? { ...w, isMinimized: true, isFocused: false } : w))
    );
  }, []);

  const toggleMaximizeApp = useCallback((id: string) => {
    setOpenWindows(currentWindows =>
      currentWindows.map(w => (w.id === id ? { ...w, isMaximized: !w.isMaximized } : w))
    );
  }, []);

  const contextValue = useMemo(() => ({
    openWindows,
    openApp,
    closeApp,
    focusApp,
    minimizeApp,
    toggleMaximizeApp,
    background,
    setBackground,
    theme,
    apps,
  }), [openWindows, background, theme, apps, openApp, closeApp, focusApp, minimizeApp, toggleMaximizeApp]);

  return <DesktopContext.Provider value={contextValue}>{children}</DesktopContext.Provider>;
};

export const useDesktopContext = () => {
    const context = useContext(DesktopContext);
    if (context === undefined) {
        throw new Error('useDesktopContext deve ser usado dentro de um DesktopProvider');
    }
    return context;
};

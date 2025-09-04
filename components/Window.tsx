import React, { useState, useEffect, useRef, Suspense } from 'react';
import { WindowInstance, AppDefinition } from '../types';
import { useDesktopContext } from '../contexts/DesktopContext';

interface WindowProps {
  instance: WindowInstance;
  app: AppDefinition;
}

const Window: React.FC<WindowProps> = ({ instance, app }) => {
  const { closeApp, focusApp, minimizeApp, toggleMaximizeApp, theme } = useDesktopContext();

  const [position, setPosition] = useState(instance.position);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('.window-control')) return;
    setIsDragging(true);
    dragStartPos.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
    focusApp(instance.id);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || instance.isMaximized) return;

      const taskbarHeight = 48; 
      const titleBarHeight = 32;
      
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      const windowWidth = windowRef.current?.offsetWidth ?? 0;

      let newX = e.clientX - dragStartPos.current.x;
      let newY = e.clientY - dragStartPos.current.y;

      // Mantém a janela dentro dos limites horizontais
      newX = Math.max(-windowWidth + 120, Math.min(newX, viewportWidth - 120));
      // Mantém a janela dentro dos limites verticais
      newY = Math.max(0, Math.min(newY, viewportHeight - taskbarHeight - titleBarHeight));


      setPosition({
        x: newX,
        y: newY,
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, instance.isMaximized]);

  const AppContent = app.component;

  const windowClasses = `
    absolute flex flex-col rounded-lg shadow-2xl border border-gray-400/50
    transition-all duration-200 ease-in-out
    ${theme === 'dark' ? 'bg-gray-800/80 text-white' : 'bg-white/80 text-black'}
    ${instance.isMaximized ? 'w-full h-[calc(100vh-48px)] top-0 left-0 rounded-none' : ''}
  `;
  
  const windowStyle: React.CSSProperties = instance.isMaximized ? {} : {
    top: `${position.y}px`,
    left: `${position.x}px`,
    width: `${app.defaultSize.width}px`,
    height: `${app.defaultSize.height}px`,
    zIndex: instance.isFocused ? 50 : 40,
  };
  
  const titleBarBg = theme === 'dark' ? 'bg-gray-700/70' : 'bg-gray-200/70';
  const controlHoverBg = theme === 'dark' ? 'hover:bg-gray-600' : 'hover:bg-gray-300';
  const closeHoverBg = theme === 'dark' ? 'hover:bg-red-500 hover:text-white' : 'hover:bg-red-500 hover:text-white';


  return (
    <div
      ref={windowRef}
      className={windowClasses}
      style={windowStyle}
      onClick={() => focusApp(instance.id)}
    >
      <div
        className={`h-8 ${titleBarBg} flex items-center justify-between px-2 rounded-t-lg cursor-grab active:cursor-grabbing`}
        onMouseDown={handleMouseDown}
        onDoubleClick={() => toggleMaximizeApp(instance.id)}
      >
        <div className="flex items-center space-x-2">
            {/* Fix: Cast icon to allow passing className prop */}
            {React.cloneElement(app.icon as React.ReactElement<any>, { className: "w-4 h-4" })}
            <span className="text-xs font-semibold">{app.title}</span>
        </div>
        <div className="flex items-center space-x-1 window-control">
          <button onClick={() => minimizeApp(instance.id)} className={`w-6 h-6 rounded ${controlHoverBg} flex items-center justify-center`}>_</button>
          <button onClick={() => toggleMaximizeApp(instance.id)} className={`w-6 h-6 rounded ${controlHoverBg} flex items-center justify-center`}>
            {instance.isMaximized ? '❐' : '□'}
          </button>
          <button onClick={() => closeApp(instance.id)} className={`w-6 h-6 rounded ${closeHoverBg} flex items-center justify-center`}>×</button>
        </div>
      </div>
      <div className="flex-grow p-1 overflow-auto bg-white/95 dark:bg-gray-800/95 rounded-b-lg">
        <Suspense fallback={<div className="w-full h-full flex items-center justify-center">Carregando aplicativo...</div>}>
          <AppContent 
              onClose={() => closeApp(instance.id)} 
              onMinimize={() => minimizeApp(instance.id)}
              isFocused={instance.isFocused}
              appId={app.id}
          />
        </Suspense>
      </div>
    </div>
  );
};

export default Window;

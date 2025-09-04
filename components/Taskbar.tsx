import React, { useState, useRef, useEffect } from 'react';
import { useDesktopContext } from '../contexts/DesktopContext';
import { GeminiIcon } from './icons';
import { useTime } from '../hooks/useTime';
import StartMenu from './StartMenu';

const Taskbar: React.FC = () => {
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const { openWindows, focusApp, theme, apps } = useDesktopContext();
  const { time, date } = useTime();
  const startMenuRef = useRef<HTMLDivElement>(null);
  
  const taskbarBg = theme === 'dark' ? 'bg-gray-900/80 text-white' : 'bg-gray-200/80 text-gray-800';
  const buttonHover = theme === 'dark' ? 'hover:bg-gray-700/50' : 'hover:bg-white/50';
  const focusedAppBg = theme === 'dark' ? 'bg-blue-800/80' : 'bg-blue-200/80';


  const toggleStartMenu = () => setIsStartMenuOpen(prev => !prev);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (startMenuRef.current && !startMenuRef.current.contains(target) && !(target as HTMLElement).closest('.start-button')) {
        setIsStartMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`absolute bottom-0 left-0 right-0 h-12 ${taskbarBg} backdrop-blur-xl flex items-center justify-between px-2 shadow-lg z-[100]`}>
      <div className="flex items-center">
        <div ref={startMenuRef}>
          <button
            onClick={toggleStartMenu}
            className={`p-2 rounded ${buttonHover} start-button`}
          >
            <GeminiIcon className="w-6 h-6" />
          </button>
          {isStartMenuOpen && <StartMenu closeMenu={() => setIsStartMenuOpen(false)} />}
        </div>
        <div className="flex items-center ml-2 space-x-1">
          {openWindows.map(win => {
            const app = apps.find(a => a.id === win.appId);
            if (!app) return null;
            return (
              <button
                key={win.id}
                onClick={() => focusApp(win.id)}
                className={`p-2 rounded flex items-center h-10 transition-colors duration-200 ${win.isFocused ? focusedAppBg : buttonHover}`}
                title={app.title}
              >
                {/* Fix: Cast icon to allow passing className prop */}
                {React.cloneElement(app.icon as React.ReactElement<any>, { className: 'w-6 h-6' })}
              </button>
            )
          })}
        </div>
      </div>

      <div className="text-right px-2 text-sm">
        <div>{time}</div>
        <div>{date}</div>
      </div>
    </div>
  );
};

export default Taskbar;

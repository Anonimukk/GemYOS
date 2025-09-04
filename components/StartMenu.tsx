import React from 'react';
import { useDesktopContext } from '../contexts/DesktopContext';

interface StartMenuProps {
  closeMenu: () => void;
}

const StartMenu: React.FC<StartMenuProps> = ({ closeMenu }) => {
  const { openApp, theme, apps } = useDesktopContext();

  const handleAppClick = (appId: string) => {
    openApp(appId);
    closeMenu();
  };

  const menuBg = theme === 'dark' ? 'bg-gray-800/90 text-white' : 'bg-gray-100/90 text-black';
  const itemHoverBg = theme === 'dark' ? 'hover:bg-gray-700/60' : 'hover:bg-white/60';

  return (
    <div className={`absolute bottom-14 left-2 w-96 h-auto ${menuBg} backdrop-blur-xl rounded-lg shadow-2xl p-4 animate-fade-in-up`}>
      <div className="grid grid-cols-5 gap-4">
        {apps.map(app => (
          <div
            key={app.id}
            onClick={() => handleAppClick(app.id)}
            className={`flex flex-col items-center p-2 rounded-lg ${itemHoverBg} cursor-pointer`}
          >
            {/* Fix: Cast icon to allow passing className prop */}
            {React.cloneElement(app.icon as React.ReactElement<any>, { className: "w-10 h-10" })}
            <span className="text-xs mt-2 text-center break-words">{app.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = `
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translate3d(0, 10%, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}
.animate-fade-in-up {
  animation: fadeInUp 0.3s ease-out;
}
`;
if (!document.getElementById('start-menu-animation-styles')) {
    const styleSheet = document.createElement("style");
    styleSheet.id = 'start-menu-animation-styles';
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
}


export default StartMenu;

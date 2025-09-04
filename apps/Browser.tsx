import React, { useState, useRef } from 'react';
import { ReloadIcon, ArrowLeftIcon, ArrowRightIcon, LockIcon } from '../components/icons';
import { useDesktopContext } from '../contexts/DesktopContext';

interface BrowserProps {
    startUrl: string;
}

const Browser: React.FC<BrowserProps> = ({ startUrl }) => {
  const [url, setUrl] = useState(startUrl);
  const [inputValue, setInputValue] = useState(startUrl);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { theme } = useDesktopContext();

  const handleGo = (e: React.FormEvent) => {
    e.preventDefault();
    let finalUrl = inputValue;
    if (!/^https?:\/\//i.test(finalUrl)) {
      finalUrl = 'https://' + finalUrl;
    }
    setUrl(finalUrl);
  };
  
  const bgColor = theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black';
  const toolbarColor = theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200';
  const inputColor = theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black';

  return (
    <div className={`w-full h-full flex flex-col ${bgColor}`}>
      <div className={`p-2 ${toolbarColor}`}>
        <div className="flex items-center space-x-2">
          {/* Note: Cross-origin restrictions prevent these from working on most sites */}
          <button onClick={() => iframeRef.current?.contentWindow?.history.back()} className="p-1 rounded-full hover:bg-black/10 disabled:opacity-50" disabled><ArrowLeftIcon className="w-4 h-4" /></button>
          <button onClick={() => iframeRef.current?.contentWindow?.history.forward()} className="p-1 rounded-full hover:bg-black/10 disabled:opacity-50" disabled><ArrowRightIcon className="w-4 h-4" /></button>
          <button onClick={() => iframeRef.current?.contentWindow?.location.reload()} className="p-1 rounded-full hover:bg-black/10"><ReloadIcon className="w-4 h-4" /></button>
          <form onSubmit={handleGo} className="flex-grow relative flex items-center">
            <LockIcon className="absolute left-3 w-4 h-4 text-gray-500" />
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className={`w-full px-9 py-1 text-sm ${inputColor} rounded-full focus:outline-none`}
              placeholder="Pesquisar ou digitar URL"
            />
          </form>
        </div>
      </div>
      <iframe
        ref={iframeRef}
        src={url}
        className="w-full h-full border-none"
        title="Navegador"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        onError={() => alert(`Não foi possível carregar ${url}. Muitos sites bloqueiam o carregamento em iframes.`)}
      ></iframe>
    </div>
  );
};

export default Browser;

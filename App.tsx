
import React, { useState, useEffect } from 'react';
import { AppState } from './types';
import BootScreen from './components/BootScreen';
import LockScreen from './components/LockScreen';
import Desktop from './components/Desktop';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.BOOTING);

  useEffect(() => {
    if (appState === AppState.BOOTING) {
      const timer = setTimeout(() => {
        setAppState(AppState.LOCK_SCREEN);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [appState]);

  const handleUnlock = () => {
    setAppState(AppState.DESKTOP);
  };

  const renderContent = () => {
    switch (appState) {
      case AppState.BOOTING:
        return <BootScreen />;
      case AppState.LOCK_SCREEN:
        return <LockScreen onUnlock={handleUnlock} />;
      case AppState.DESKTOP:
        return <Desktop />;
      default:
        return <BootScreen />;
    }
  };

  return <div className="w-screen h-screen bg-black overflow-hidden">{renderContent()}</div>;
};

export default App;

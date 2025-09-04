import React, { useContext } from 'react';
import { DesktopProvider, DesktopContext } from '../contexts/DesktopContext';
import { APPS } from '../config/apps';
import DesktopIcon from './DesktopIcon';
import Window from './Window';
import Taskbar from './Taskbar';
import { AppDefinition } from '../types';

const DesktopView: React.FC = () => {
    const context = useContext(DesktopContext);

    if (!context) {
        return (
            <div className="w-full h-full bg-black text-red-400 flex flex-col items-center justify-center p-8 text-center">
                <h1 className="text-2xl font-bold mb-4">Erro Crítico de Renderização</h1>
                <p>O contexto da área de trabalho (DesktopContext) não pôde ser carregado.<br/>Isso é um erro inesperado que impede o sistema de iniciar.</p>
            </div>
        );
    }
    
    const { openWindows, background, openApp, apps } = context;

    const getAppDefinition = (appId: string): AppDefinition | undefined => {
        return apps.find(app => app.id === appId);
    };

    return (
        <div 
            className="w-full h-full bg-cover bg-center" 
            style={{ backgroundImage: `url(${background})` }}
        >
            <div className="absolute top-5 left-5 right-5 bottom-16 flex flex-col flex-wrap content-start items-start gap-4">
                {apps.map(app => (
                    <DesktopIcon
                        key={app.id}
                        title={app.title}
                        icon={app.icon}
                        onDoubleClick={() => openApp(app.id)}
                    />
                ))}
            </div>

            {openWindows.map((win) => {
                const appDef = getAppDefinition(win.appId);
                if (!appDef || win.isMinimized) return null;
                return (
                    <Window key={win.id} instance={win} app={appDef} />
                );
            })}
            
            <Taskbar />
        </div>
    );
}

const Desktop: React.FC = () => (
    <DesktopProvider apps={APPS}>
        <DesktopView />
    </DesktopProvider>
);

export default Desktop;
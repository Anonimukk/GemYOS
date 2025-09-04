import React from 'react';
import { useDesktopContext } from '../contexts/DesktopContext';

const PlayStore: React.FC = () => {
    const { theme, openApp, apps } = useDesktopContext();
    const bgColor = theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black';
    const cardBgColor = theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100';
    
    // Filtra para não mostrar a própria Play Store dentro dela
    const appsToShow = apps.filter(app => app.id !== 'playstore');
    
    return (
        <div className={`w-full h-full p-6 overflow-y-auto ${bgColor}`}>
            <h1 className="text-3xl font-bold mb-4">Explorar Aplicativos</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {appsToShow.map(app => (
                    <div key={app.id} className={`p-4 rounded-xl shadow-md flex flex-col items-center text-center ${cardBgColor}`}>
                         <div className="w-20 h-20 mb-4 flex items-center justify-center">
                            {React.cloneElement(app.icon as React.ReactElement<any>, { className: "w-full h-full" })}
                         </div>
                        <h2 className="font-semibold mb-2">{app.title}</h2>
                        <button 
                            onClick={() => openApp(app.id)}
                            className="mt-auto w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors"
                        >
                            {app.id === 'minecraft' ? 'Jogar' : 'Abrir'}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PlayStore;

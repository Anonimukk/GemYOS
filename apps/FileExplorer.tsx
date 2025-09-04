import React from 'react';
import { useDesktopContext } from '../contexts/DesktopContext';

const FolderIcon = () => (
    <svg xmlns="http://www.w.org/2000/svg" className="h-10 w-10 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
    </svg>
);

const FileIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
);


const FileExplorer: React.FC = () => {
    const { theme } = useDesktopContext();
    const bgColor = theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black';
    const sidebarBgColor = theme === 'dark' ? 'bg-gray-900 border-gray-700' : 'bg-gray-100 border-r';
    const hoverBgColor = theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-blue-100';
    const itemHoverBgColor = theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-200';

    const files = [
        { name: 'Documentos', type: 'folder' },
        { name: 'Downloads', type: 'folder' },
        { name: 'Músicas', type: 'folder' },
        { name: 'Imagens', type: 'folder' },
        { name: 'Vídeos', type: 'folder' },
        { name: 'trabalho_final.docx', type: 'file' },
        { name: 'foto_ferias.jpg', type: 'file' },
    ];
    
    return (
        <div className={`w-full h-full flex ${bgColor}`}>
            <div className={`w-48 p-2 ${sidebarBgColor}`}>
                <h2 className="font-bold text-sm mb-2">Acesso Rápido</h2>
                <ul>
                    <li className={`p-1 rounded cursor-pointer text-sm ${itemHoverBgColor}`}>Área de Trabalho</li>
                    <li className={`p-1 rounded cursor-pointer text-sm ${itemHoverBgColor}`}>Downloads</li>
                    <li className={`p-1 rounded cursor-pointer text-sm ${itemHoverBgColor}`}>Documentos</li>
                </ul>
            </div>
            <div className="flex-grow p-4">
                <h1 className="text-lg font-semibold">Este Computador</h1>
                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-4">
                    {files.map(file => (
                        <div key={file.name} className={`flex flex-col items-center p-2 rounded cursor-pointer ${hoverBgColor}`}>
                            {file.type === 'folder' ? <FolderIcon /> : <FileIcon />}
                            <span className="text-xs text-center break-all mt-1">{file.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FileExplorer;

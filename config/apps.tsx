
import React from 'react';
import { AppDefinition } from '../types';
import { 
  NotepadIcon, 
  SettingsIcon, 
  FileExplorerIcon,
  GeminiIcon,
  ChromeIcon,
  PlayStoreIcon,
  GmailIcon,
  DriveIcon,
  YoutubeIcon,
  MinecraftIcon
} from '../components/icons';
import Notepad from '../apps/Notepad';
import Settings from '../apps/Settings';
import FileExplorer from '../apps/FileExplorer';
import Chrome from '../apps/Chrome';
import PlayStore from '../apps/PlayStore';
import Gmail from '../apps/Gmail';
import Drive from '../apps/Drive';
import YouTube from '../apps/YouTube';
import Gemini from '../apps/Gemini';


const MinecraftComponent: React.FC<{ onClose: () => void; onMinimize: () => void, isFocused: boolean, appId: string }> = () => {
  return (
    <div className="w-full h-full bg-black">
      <iframe
        src="https://eaglercraft.com/"
        className="w-full h-full border-none"
        title="Minecraft"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-pointer-lock"
      ></iframe>
    </div>
  );
};


export const APPS: AppDefinition[] = [
  {
    id: 'gemini',
    title: 'Gemini',
    icon: <GeminiIcon />,
    component: Gemini,
    defaultSize: { width: 650, height: 550 },
  },
  {
    id: 'chrome',
    title: 'Google Chrome',
    icon: <ChromeIcon />,
    component: Chrome,
    defaultSize: { width: 900, height: 650 },
  },
  {
    id: 'playstore',
    title: 'Play Store',
    icon: <PlayStoreIcon />,
    component: PlayStore,
    defaultSize: { width: 800, height: 600 },
  },
  {
    id: 'notepad',
    title: 'Bloco de Notas',
    icon: <NotepadIcon />,
    component: Notepad,
    defaultSize: { width: 600, height: 400 },
  },
  {
    id: 'settings',
    title: 'Configurações',
    icon: <SettingsIcon />,
    component: Settings,
    defaultSize: { width: 700, height: 500 },
  },
  {
    id: 'explorer',
    title: 'Explorador de Arquivos',
    icon: <FileExplorerIcon />,
    component: FileExplorer,
    defaultSize: { width: 750, height: 550 },
  },
  {
    id: 'gmail',
    title: 'Gmail',
    icon: <GmailIcon />,
    component: Gmail,
    defaultSize: { width: 850, height: 600 },
  },
  {
    id: 'drive',
    title: 'Google Drive',
    icon: <DriveIcon />,
    component: Drive,
    defaultSize: { width: 850, height: 600 },
  },
  {
    id: 'youtube',
    title: 'YouTube',
    icon: <YoutubeIcon />,
    component: YouTube,
    defaultSize: { width: 900, height: 650 },
  },
  {
    id: 'minecraft',
    title: 'Minecraft',
    icon: <MinecraftIcon />,
    component: MinecraftComponent,
    defaultSize: { width: 960, height: 640 },
  }
];
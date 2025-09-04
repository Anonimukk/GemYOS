
import React from 'react';

export const WindowsLogo: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" className={className}>
        <path fill="currentColor" d="M128 128h320v320H128V128zm0 448h320v320H128V576zm448-448h320v320H576V128zm0 448h320v320H576V576z"></path>
    </svg>
);

export const NotepadIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 17V7h4l4 4v6H8z" fill="#4285F4"/>
        <path d="M8 7h4l4 4H8V7z" fill="#A1C2FA"/>
        <path d="M16 17H8v-2h8v2zM16 13H8v-2h8v2z" fill="#FFF"/>
    </svg>
);

export const SettingsIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className}>
        <path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z" fill="#5F6368"/>
    </svg>
);

export const FileExplorerIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className}>
        <path d="M20 6h-8l-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z" fill="#4285F4"/>
    </svg>
);

export const GeminiIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M3.75 12a8.25 8.25 0 0 0 16.5 0H3.75Z" fill="url(#gemini-gradient-1)"></path>
    <path d="M12 20.25a8.25 8.25 0 0 0 8.25-8.25h-8.25v8.25Z" fill="url(#gemini-gradient-2)"></path>
    <path d="M12 3.75a8.25 8.25 0 0 0-8.25 8.25h8.25V3.75Z" fill="url(#gemini-gradient-3)"></path>
    <defs>
      <linearGradient id="gemini-gradient-1" x1="12" y1="3.75" x2="12" y2="20.25" gradientUnits="userSpaceOnUse">
        <stop stopColor="#A8C7FA"></stop><stop offset="1" stopColor="#8AB4F8"></stop>
      </linearGradient>
      <linearGradient id="gemini-gradient-2" x1="20.25" y1="12" x2="3.75" y2="12" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F2B200"></stop><stop offset="1" stopColor="#FBC02D"></stop>
      </linearGradient>
      <linearGradient id="gemini-gradient-3" x1="12" y1="3.75" x2="12" y2="20.25" gradientUnits="userSpaceOnUse">
        <stop stopColor="#C6A7FF"></stop><stop offset="1" stopColor="#B388FF"></stop>
      </linearGradient>
    </defs>
  </svg>
);

export const ChromeIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className}>
        <path fill="#4285F4" d="M12 12m-10 0a10 10 0 1 0 20 0a10 10 0 1 0-20 0"></path>
        <path fill="#34A853" d="M12 12m-8 0a8 8 0 1 0 16 0a8 8 0 1 0-16 0"></path>
        <path fill="#EA4335" d="M20.5 11h-15a7.5 7.5 0 0 0 14.28 3.5A8 8 0 0 1 12 4a8 8 0 0 1 8 8h.5z"></path>
        <path fill="#FBBC05" d="M4.5 13h15a7.5 7.5 0 0 1-14.28-3.5A8 8 0 0 0 12 20a8 8 0 0 0-7.5-7h0z"></path>
        <circle cx="12" cy="12" r="3" fill="#FFF"></circle>
    </svg>
);

export const PlayStoreIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className}>
        <path d="M3 2v20l18-10L3 2z" fill="#00A040"/>
        <path d="M3 2l9 5.06L3 12.12V2z" fill="#FFC107"/>
        <path d="M3 22l9-5.06L3 11.88V22z" fill="#F44336"/>
        <path d="M21 12l-9 5.06V6.94L21 12z" fill="#2196F3"/>
    </svg>
);
export const GmailIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className}>
        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z" fill="#4285F4"/>
        <path d="M12 12.7L4.5 8.1C4.2 7.9 4 8.1 4 8.5v11c0 .6.4 1 1 1h14c.6 0 1-.4 1-1V8.5c0-.4-.2-.6-.5-.4L12 12.7z" fill="#EA4335"/>
        <path d="M20 8.5V6l-8 5-8-5v2.5l8 4.5 8-4.5z" fill="#34A853"/>
        <path d="M4 6h16v.1L12 11 4 6.1V6z" fill="#FBBC05"/>
    </svg>
);
// FIX: The DriveIcon component had malformed SVG syntax with stray </tspan> and </path> tags.
// These have been removed to fix the JSX parsing errors.
export const DriveIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className}>
        <path d="M7.71 14.73L2 21.99l2.84-12.02L7.71 14.73z" fill="#00A040"/>
        <path d="M16.29 14.73L22 21.99l-2.84-12.02-2.87 4.76z" fill="#FFC107"/>
        <path d="M12 2L2 9.97h20L12 2z" fill="#4285F4"/>
    </svg>
);

export const YoutubeIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className}>
        <path fill="#FF0000" d="M21.58 7.19c-.23-.86-.9-1.52-1.76-1.76C18.25 5 12 5 12 5s-6.25 0-7.82.43c-.86.24-1.53.9-1.76 1.76C2 8.75 2 12 2 12s0 3.25.43 4.81c.23.86.9 1.52 1.76 1.76C5.75 19 12 19 12 19s6.25 0 7.82-.43c.86-.24 1.53-.9 1.76-1.76C22 15.25 22 12 22 12s0-3.25-.42-4.81z"></path>
        <path fill="#FFFFFF" d="M10 15.5l6-3.5-6-3.5z"></path>
    </svg>
);

export const MinecraftIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className} imageRendering="pixelated">
        <path d="M4 8h16v12H4z" fill="#9C6B42" />
        <path d="M4 8h16v4H4z" fill="#71A03B" />
        <path d="M6 10h2v2H6z" fill="#84B948" />
        <path d="M10 10h2v2h-2z" fill="#84B948" />
        <path d="M14 10h2v2h-2z" fill="#84B948" />
        <path d="M18 8h2v2h-2z" fill="#84B948" />
        <path d="M4 8h2v2H4z" fill="#84B948" />
    </svg>
);


export const ReloadIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h5M20 20v-5h-5M4 4a8 8 0 0113.881 5.014M20 20a8 8 0 01-13.88-5.013" />
  </svg>
);

export const ArrowLeftIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
);

export const ArrowRightIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

export const LockIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
);
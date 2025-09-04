
import React from 'react';
import { useTime } from '../hooks/useTime';

interface LockScreenProps {
  onUnlock: () => void;
}

const LockScreen: React.FC<LockScreenProps> = ({ onUnlock }) => {
  const { time, date } = useTime();

  return (
    <div
      className="w-full h-full bg-cover bg-center cursor-pointer flex flex-col items-center justify-center text-white"
      style={{ backgroundImage: `url(https://images.unsplash.com/photo-1508615039623-a25605d2b022?q=80&w=1920&auto=format&fit=crop&h=1080)` }}
      onClick={onUnlock}
    >
      <div className="absolute bottom-1/2 translate-y-1/2 flex flex-col items-center backdrop-blur-sm bg-black/20 p-8 rounded-xl transition-all duration-300 hover:scale-105">
        <h1 className="text-8xl font-thin">{time}</h1>
        <p className="text-2xl mt-2">{date}</p>
      </div>
      <div className="absolute bottom-16 text-center">
        <p className="text-xl">Clique ou pressione uma tecla para desbloquear</p>
      </div>
    </div>
  );
};

export default LockScreen;

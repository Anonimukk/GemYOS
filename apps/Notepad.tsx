
import React from 'react';

const Notepad: React.FC = () => {
  return (
    <div className="w-full h-full bg-white">
      <textarea
        className="w-full h-full resize-none border-none outline-none p-2 font-mono text-sm"
        placeholder="Digite seu texto aqui..."
      />
    </div>
  );
};

export default Notepad;

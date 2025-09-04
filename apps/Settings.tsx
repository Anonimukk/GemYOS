
import React, { useContext, useState } from 'react';
import { DesktopContext } from '../contexts/DesktopContext';

const Settings: React.FC = () => {
  const context = useContext(DesktopContext);
  const [newBg, setNewBg] = useState('');

  if (!context) return null;

  const { background, setBackground } = context;

  const handleApply = () => {
    if (newBg) {
      setBackground(newBg);
    }
  };

  return (
    <div className="p-4 bg-gray-50 h-full text-gray-800">
      <h1 className="text-2xl font-bold mb-4">Configurações</h1>
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">Plano de Fundo da Área de Trabalho</h2>
          <div className="mt-2 p-2 border rounded-md bg-gray-100">
            <p className="text-sm mb-2">Plano de Fundo Atual:</p>
            <img src={background} alt="Plano de fundo atual" className="w-48 h-auto rounded-md shadow-md"/>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Nova URL de Imagem:
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <input
                type="text"
                value={newBg}
                onChange={(e) => setNewBg(e.target.value)}
                className="flex-1 block w-full rounded-none rounded-l-md sm:text-sm border-gray-300 p-2 border"
                placeholder="https://exemplo.com/imagem.jpg"
              />
              <button
                onClick={handleApply}
                className="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 text-gray-700 text-sm hover:bg-gray-100"
              >
                Aplicar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;

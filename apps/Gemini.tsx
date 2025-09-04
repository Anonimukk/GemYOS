import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Chat } from '@google/genai';
import { useDesktopContext } from '../contexts/DesktopContext';
import { ChatMessage } from '../types';
import { GeminiIcon } from '../components/icons';


const Gemini: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { sender: 'bot', text: 'Olá! Como posso ajudar hoje? Você pode conversar comigo ou me dar comandos como "abra o bloco de notas".' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { openApp, theme, apps } = useDesktopContext();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [chat, setChat] = useState<Chat | null>(null);

  useEffect(() => {
    try {
      if (!process.env.API_KEY) {
        throw new Error("A chave da API do Gemini não foi encontrada. Verifique a configuração do ambiente.");
      }
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const newChat = ai.chats.create({
        model: 'gemini-2.5-flash',
      });
      setChat(newChat);
    } catch (e) {
      console.error("Erro ao inicializar Gemini:", e);
      setError(e instanceof Error ? e.message : 'Falha ao inicializar o assistente Gemini.');
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);
  
  const handleCommand = async (command: string): Promise<boolean> => {
      const lowerCommand = command.toLowerCase();
      const match = lowerCommand.match(/^(?:abra|abrir|iniciar|execute)\s+(.+)$/);
      if(!match) return false;
      
      const appName = match[1].trim();
      const app = apps.find(a => a.title.toLowerCase().includes(appName));

      if(app) {
          openApp(app.id);
          setMessages(prev => [...prev, {sender: 'bot', text: `Abrindo ${app.title}...`}]);
          return true;
      } else {
          setMessages(prev => [...prev, {sender: 'bot', text: `Desculpe, não encontrei o aplicativo "${appName}".`}]);
          return true;
      }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || !chat) return;

    const userMessage: ChatMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    if (await handleCommand(currentInput)) {
        setIsLoading(false);
        return;
    }

    try {
      const response = await chat.sendMessage({ message: currentInput });
      const botMessage: ChatMessage = { sender: 'bot', text: response.text };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error(error);
      const errorMessage: ChatMessage = { sender: 'bot', text: 'Desculpe, ocorreu um erro ao me conectar. Tente novamente.' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const bgColor = theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black';
  const inputBgColor = theme === 'dark' ? 'bg-gray-700' : 'bg-white';
  const botBubbleColor = theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200';
  const userBubbleColor = theme === 'dark' ? 'bg-blue-800' : 'bg-blue-500';

  if (error) {
    return <div className={`w-full h-full flex items-center justify-center p-4 ${bgColor} text-red-500`}>{error}</div>
  }

  return (
    <div className={`w-full h-full flex flex-col ${bgColor}`}>
      <div className="flex-grow p-4 overflow-y-auto space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.sender === 'bot' && <GeminiIcon className="w-6 h-6 self-start flex-shrink-0" />}
            <div className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-2xl ${msg.sender === 'user' ? `${userBubbleColor} text-white rounded-br-none` : `${botBubbleColor} rounded-bl-none`}`}>
                <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
            </div>
          </div>
        ))}
        {isLoading && (
            <div className="flex items-end gap-2 justify-start">
                 <GeminiIcon className="w-6 h-6 self-start flex-shrink-0" />
                 <div className={`px-4 py-2 rounded-2xl ${botBubbleColor} rounded-bl-none`}>
                    <div className="flex items-center justify-center gap-1">
                        <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                        <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                        <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></span>
                    </div>
                 </div>
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="p-2 border-t border-gray-300/50">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Digite sua mensagem..."
          className={`w-full p-2 rounded-lg border-none outline-none ${inputBgColor}`}
          disabled={isLoading || !chat}
        />
      </form>
    </div>
  );
};

export default Gemini;

import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Menu, FileDown, CheckCircle } from 'lucide-react';
import { Message, Role, RecueilData } from '../types';
import { streamChatResponse } from '../services/geminiService';
import { streamOllamaResponse } from '../services/ollamaService';
import MarkdownRenderer from './MarkdownRenderer';
import { APP_NAME, SUGGESTED_QUESTIONS } from '../constants';
import { generateRecueilPDF } from '../utils/pdfGenerator';
import { useAuth } from '../contexts/AuthContext';

interface ChatInterfaceProps {
  toggleSidebar: () => void;
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  systemInstruction?: string;
  customSuggestions?: string[];
  welcomeTitle?: string;
  welcomeMessage?: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  toggleSidebar,
  messages,
  setMessages,
  systemInstruction,
  customSuggestions,
  welcomeTitle,
  welcomeMessage
}) => {
  const { profile } = useAuth();
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [recueilJson, setRecueilJson] = useState<RecueilData | null>(null);

  console.log('[ChatInterface] System instruction received:', systemInstruction ? systemInstruction.substring(0, 150) + '...' : 'UNDEFINED');

  const activeSuggestions = customSuggestions || SUGGESTED_QUESTIONS;
  const activeTitle = welcomeTitle || "Bienvenue, Référent IA";
  const activeMessage = welcomeMessage || "Je suis votre assistant pour vous accompagner dans vos missions";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Reset internal state if messages are cleared externally
  useEffect(() => {
    if (messages.length === 0) {
      setRecueilJson(null);
      setIsLoading(false);
      setInput('');
    }
  }, [messages]);

  // Check for Recueil JSON in the last message
  useEffect(() => {
    if (messages.length > 0) {
      const lastMsg = messages[messages.length - 1];
      if (lastMsg.role === Role.MODEL && !lastMsg.isStreaming) {
        try {
          // Extract JSON from markdown code blocks
          const jsonMatch = lastMsg.text.match(/```json\s*(\{[\s\S]*?\})\s*```/);
          if (jsonMatch && jsonMatch[1]) {
            const data = JSON.parse(jsonMatch[1]) as RecueilData;
            setRecueilJson(data);
          }
        } catch (e) {
          console.error("Failed to parse Recueil JSON", e);
        }
      }
    }
  }, [messages]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 160)}px`;
    }
  }, [input]);

  const handleSendMessage = async (text: string = input) => {
    if (!text.trim() || isLoading) return;

    // Reset JSON state when starting new message to avoid stale state
    if (recueilJson) setRecueilJson(null);

    const userMsg: Message = {
      id: Date.now().toString(),
      role: Role.USER,
      text: text.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    // Placeholder for AI message
    const aiMsgId = (Date.now() + 1).toString();
    const aiMsgPlaceholder: Message = {
      id: aiMsgId,
      role: Role.MODEL,
      text: '',
      timestamp: new Date(),
      isStreaming: true
    };
    
    setMessages(prev => [...prev, aiMsgPlaceholder]);

    const preferredProvider = profile?.preferred_model_provider || 'gemini';
    const preferredOllamaModel = profile?.preferred_ollama_model;

    const callGemini = async () => {
      await streamChatResponse(
        [...messages, userMsg],
        text,
        (chunk) => {
          setMessages(prev => prev.map(msg =>
            msg.id === aiMsgId
              ? { ...msg, text: msg.text + chunk }
              : msg
          ));
        },
        systemInstruction
      );
    };

    const callOllama = async () => {
      await streamOllamaResponse(
        [...messages, userMsg],
        text,
        (chunk) => {
          setMessages(prev => prev.map(msg =>
            msg.id === aiMsgId
              ? { ...msg, text: msg.text + chunk }
              : msg
          ));
        },
        systemInstruction,
        preferredOllamaModel
      );
    };

    try {
      if (preferredProvider === 'ollama') {
        await callOllama();
      } else {
        await callGemini();
      }
    } catch (error) {
      console.warn(`${preferredProvider} failed, trying fallback...`, error);

      try {
        setMessages(prev => prev.map(msg =>
          msg.id === aiMsgId
            ? { ...msg, text: "" }
            : msg
        ));

        if (preferredProvider === 'ollama') {
          await callGemini();
        } else {
          await callOllama();
        }
      } catch (fallbackError) {
        console.error("Both providers failed:", fallbackError);
        setMessages(prev => prev.map(msg =>
          msg.id === aiMsgId
            ? { ...msg, text: "Désolé, une erreur est survenue lors de la connexion aux assistants IA. Veuillez vérifier votre connexion et réessayer." }
            : msg
        ));
      }
    } finally {
      setIsLoading(false);
      setMessages(prev => prev.map(msg =>
        msg.id === aiMsgId
          ? { ...msg, isStreaming: false }
          : msg
      ));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleDownloadPDF = () => {
    if (recueilJson) {
      generateRecueilPDF(recueilJson);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-50 dark:bg-slate-950 relative transition-colors duration-300">
      {/* Header Mobile */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-4 flex items-center md:hidden sticky top-0 z-10">
        <button onClick={toggleSidebar} className="mr-3 text-slate-600 dark:text-slate-300">
          <Menu size={24} />
        </button>
        <h1 className="font-semibold text-slate-800 dark:text-white">{APP_NAME}</h1>
      </header>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 scrollbar-thin">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full max-w-3xl mx-auto space-y-8 py-8">
            <div className="text-center mb-4">
              <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-3">{activeTitle}</h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg">
                {activeMessage}
              </p>
            </div>

            <div className="w-full">
              <div className="relative flex items-end gap-2">
                <div className="relative w-full">
                  <textarea
                    ref={textareaRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Posez votre question..."
                    className="w-full pl-5 pr-14 py-4 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-ref-blue/50 focus:border-ref-blue outline-none resize-none max-h-48 min-h-[56px] text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 shadow-lg transition-all text-base leading-relaxed"
                    rows={1}
                    style={{ overflow: 'hidden' }}
                  />
                  <button
                    onClick={() => handleSendMessage()}
                    disabled={!input.trim() || isLoading}
                    className={`
                      absolute right-2 bottom-2 p-2.5 rounded-xl transition-all duration-200 flex items-center justify-center
                      ${!input.trim() || isLoading
                        ? 'bg-transparent text-slate-300 dark:text-slate-600 cursor-not-allowed'
                        : 'bg-ref-blue text-white shadow-md hover:bg-sky-600 hover:scale-105'}
                    `}
                  >
                    {isLoading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
                  </button>
                </div>
              </div>
            </div>

            <div className="w-full">
              <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3 text-center">Exemples de questions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full text-left">
                {activeSuggestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(q)}
                    className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-ref-blue dark:hover:border-ref-blue hover:shadow-md transition-all text-sm text-slate-700 dark:text-slate-300 font-medium"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex ${msg.role === Role.USER ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`
                    max-w-[90%] md:max-w-[80%] rounded-2xl p-4 shadow-sm
                    ${msg.role === Role.USER 
                      ? 'bg-ref-blue text-white rounded-br-none' 
                      : 'bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-none'}
                  `}
                >
                  {msg.role === Role.USER ? (
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                  ) : (
                    <div>
                      {/* Hide JSON block from view but process it */}
                      <MarkdownRenderer content={msg.text.replace(/```json[\s\S]*?```/g, '')} />
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {/* Download Button if PDF data detected */}
            {recueilJson && !isLoading && (
               <div className="flex justify-start">
                 <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800 rounded-2xl p-6 rounded-bl-none shadow-sm flex flex-col space-y-3 max-w-[80%]">
                   <div className="flex items-center space-x-2 text-emerald-800 dark:text-emerald-400 font-bold">
                     <CheckCircle size={20} />
                     <span>Entretien terminé !</span>
                   </div>
                   <p className="text-sm text-emerald-700 dark:text-emerald-300">
                     J'ai collecté toutes les informations nécessaires. Vous pouvez maintenant télécharger la fiche de recueil officielle au format PDF.
                   </p>
                   <button 
                    onClick={handleDownloadPDF}
                    className="flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-lg transition-colors shadow-sm"
                   >
                     <FileDown size={18} />
                     <span>Télécharger la Fiche de Recueil (PDF)</span>
                   </button>
                 </div>
               </div>
            )}

            {isLoading && messages[messages.length - 1]?.role === Role.USER && (
               <div className="flex justify-start">
                 <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-4 rounded-bl-none shadow-sm flex items-center space-x-2 text-slate-500 dark:text-slate-400 text-sm">
                   <Loader2 className="animate-spin" size={16} />
                   <span>Analyse en cours...</span>
                 </div>
               </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Area - Only show when there are messages */}
      {messages.length > 0 && (
        <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 transition-colors duration-300">
          <div className="max-w-3xl mx-auto relative flex items-end gap-2">
            <div className="relative w-full">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Posez votre question..."
                className="w-full pl-5 pr-14 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-ref-blue/50 focus:border-ref-blue outline-none resize-none max-h-48 min-h-[56px] text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 shadow-sm transition-all text-sm leading-relaxed"
                rows={1}
                style={{ overflow: 'hidden' }}
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!input.trim() || isLoading}
                className={`
                  absolute right-2 bottom-2 p-2.5 rounded-xl transition-all duration-200 flex items-center justify-center
                  ${!input.trim() || isLoading
                    ? 'bg-transparent text-slate-300 dark:text-slate-600 cursor-not-allowed'
                    : 'bg-ref-blue text-white shadow-md hover:bg-sky-600 hover:scale-105'}
                `}
              >
                {isLoading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
              </button>
            </div>
          </div>
          <p className="text-center text-[10px] md:text-xs text-slate-400 dark:text-slate-500 mt-3 select-none">
            L'IA peut faire des erreurs. Vérifiez les informations auprès de votre direction juridique ou DSI.
          </p>
        </div>
      )}
    </div>
  );
};

export default ChatInterface;

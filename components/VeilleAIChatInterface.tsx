import React, { useState, useEffect } from 'react';
import { MessageCircle, Send, Loader2, Sparkles, Users, TrendingUp, FileText, Globe, Menu, ArrowLeft } from 'lucide-react';
import { perplexityService } from '../services/perplexityService';
import { AppView } from '../types';
import SpaceBackground from './SpaceBackground';
import { useAuth } from '../contexts/AuthContext';

interface VeilleAIChatInterfaceProps {
  toggleSidebar: () => void;
  onNavigate?: (view: AppView) => void;
}

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  isLoading?: boolean;
}

const VeilleAIChatInterface: React.FC<VeilleAIChatInterfaceProps> = ({ toggleSidebar, onNavigate }) => {
  const { profile } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [dailyQuestion, setDailyQuestion] = useState<string>('');
  const [webSearchEnabled, setWebSearchEnabled] = useState(true);

  const exampleQuestions = [
    "Quels sont les nouveaux référents IA nommés cette semaine ?",
    "Analyse les opportunités de contenu IA pour mon ministère",
    "Quels experts IA sont les plus actifs actuellement ?",
    "Synthèse hebdomadaire de l'actualité IA administrative"
  ];

  useEffect(() => {
    loadDailyQuestion();
    perplexityService.setWebSearchEnabled(webSearchEnabled);
    const welcomeMessage: Message = {
      id: '1',
      text: 'Bonjour ! Je suis votre assistant de veille IA pour l\'administration publique française. Posez-moi vos questions ou utilisez les exemples ci-dessus.',
      isUser: false,
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
  }, [webSearchEnabled]);

  const loadDailyQuestion = async () => {
    try {
      const question = await perplexityService.getDailyQuestion();
      setDailyQuestion(question);
    } catch (error) {
      console.error('Erreur lors du chargement de la question du jour:', error);
      setDailyQuestion('Quelle est la priorité stratégique IA de votre ministère cette semaine ?');
    }
  };

  const toggleWebSearch = () => {
    const newState = !webSearchEnabled;
    setWebSearchEnabled(newState);
    perplexityService.setWebSearchEnabled(newState);
  };

  const handleSendMessage = async (text?: string) => {
    const messageText = text || inputValue.trim();
    if (!messageText || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      isUser: true,
      timestamp: new Date()
    };

    const loadingMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: 'Analyse en cours...',
      isUser: false,
      timestamp: new Date(),
      isLoading: true
    };

    setMessages(prev => [...prev, userMessage, loadingMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await perplexityService.askCustomQuestion(messageText);

      const aiMessage: Message = {
        id: (Date.now() + 2).toString(),
        text: response,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => prev.filter(m => !m.isLoading).concat([aiMessage]));
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        text: 'Désolé, une erreur s\'est produite lors de l\'analyse. Veuillez réessayer.',
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => prev.filter(m => !m.isLoading).concat([errorMessage]));
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-slate-200 via-blue-50 to-white dark:from-[#0f172a] dark:via-[#0f172a] dark:to-[#0f172a] overflow-hidden relative">
      <SpaceBackground satellitesEnabled={profile?.satellites_enabled || false} />

      <div className="relative z-10 flex flex-col h-full">
        <div className="p-6 flex justify-between items-start bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border-b border-white/30 dark:border-white/10">
          <div className="flex items-center gap-4">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-full hover:bg-white/10 text-slate-600 dark:text-white/80 transition-colors md:hidden"
            >
              <Menu size={28} />
            </button>
            {onNavigate && (
              <button
                onClick={() => onNavigate('navigation-hub')}
                className="p-2 rounded-full hover:bg-white/10 text-slate-600 dark:text-white/80 transition-colors"
              >
                <ArrowLeft size={28} />
              </button>
            )}
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <MessageCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Veille IA Administration</h1>
                <p className="text-slate-600 dark:text-slate-400">Assistant de veille stratégique</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6 relative z-10">
          <div className="max-w-5xl mx-auto space-y-6">
            {messages.length === 1 ? (
              <div className="flex flex-col items-center justify-center space-y-6 py-8">
                <div className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-md rounded-2xl p-6 border border-white/50 dark:border-white/10 shadow-xl w-full">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      <span className="font-semibold text-slate-900 dark:text-white">Question prioritaire du jour</span>
                    </div>
                    <button
                      onClick={toggleWebSearch}
                      className={`flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                        webSearchEnabled
                          ? 'bg-green-500/20 hover:bg-green-500/30 text-green-700 dark:text-green-400'
                          : 'bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <Globe className="w-3 h-3" />
                      {webSearchEnabled ? 'Web ON' : 'Web OFF'}
                    </button>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 italic mb-3">"{dailyQuestion}"</p>
                  <div className="text-xs">
                    {webSearchEnabled ? (
                      <span className="text-green-700 dark:text-green-400 bg-green-500/10 px-2 py-1 rounded">
                        🌐 Recherche web activée - Données en temps réel
                      </span>
                    ) : (
                      <span className="text-slate-600 dark:text-slate-400 bg-slate-500/10 px-2 py-1 rounded">
                        🔒 Mode hors ligne - Connaissances pré-entraînées uniquement
                      </span>
                    )}
                  </div>
                </div>

                <div className="w-full">
                  <div className="flex gap-2">
                    <textarea
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Posez votre question sur l'IA dans l'administration..."
                      className="flex-1 p-4 bg-white/80 dark:bg-slate-800/50 backdrop-blur-md border-2 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white rounded-xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-lg text-base"
                      rows={2}
                      disabled={isLoading}
                    />
                    <button
                      onClick={() => handleSendMessage()}
                      disabled={!inputValue.trim() || isLoading}
                      className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2 self-end shadow-lg"
                    >
                      {isLoading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <Send className="w-5 h-5" />
                      )}
                      <span className="hidden sm:inline">Envoyer</span>
                    </button>
                  </div>
                </div>

                <div className="w-full">
                  <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3 text-center">Exemples de questions</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {exampleQuestions.map((question, index) => {
                      const icons = [Users, FileText, TrendingUp, MessageCircle];
                      const Icon = icons[index];
                      return (
                        <button
                          key={index}
                          onClick={() => handleSendMessage(question)}
                          className="flex items-center gap-3 p-4 bg-white/80 dark:bg-slate-800/50 backdrop-blur-md border border-white/50 dark:border-white/10 hover:border-blue-300 dark:hover:border-blue-500 hover:bg-white dark:hover:bg-slate-700 rounded-xl transition-all text-sm text-left text-slate-700 dark:text-slate-300 hover:text-blue-700 dark:hover:text-blue-400 shadow-sm hover:shadow-md"
                          disabled={isLoading}
                        >
                          <Icon className="w-5 h-5 flex-shrink-0" />
                          <span className="truncate">{question}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-3xl p-4 rounded-2xl shadow-md ${
                        message.isUser
                          ? 'bg-blue-600 text-white'
                          : 'bg-white/80 dark:bg-slate-800/50 backdrop-blur-md text-slate-800 dark:text-slate-200 border border-white/50 dark:border-white/10'
                      }`}
                    >
                      {message.isLoading ? (
                        <div className="flex items-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>{message.text}</span>
                        </div>
                      ) : (
                        <div className="whitespace-pre-wrap">{message.text}</div>
                      )}
                      <div className={`text-xs mt-2 ${message.isUser ? 'opacity-70' : 'opacity-50'}`}>
                        {message.timestamp.toLocaleTimeString('fr-FR', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Input Area - Only show when there are messages beyond welcome */}
        {messages.length > 1 && (
          <div className="relative z-10 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border-t border-white/30 dark:border-white/10 p-4">
            <div className="max-w-5xl mx-auto flex gap-2">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Posez votre question sur l'IA dans l'administration..."
                className="flex-1 p-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white rounded-xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={2}
                disabled={isLoading}
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputValue.trim() || isLoading}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2 self-end"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
                <span className="hidden sm:inline">Envoyer</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VeilleAIChatInterface;

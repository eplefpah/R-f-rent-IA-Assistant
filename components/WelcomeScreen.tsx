
import React from 'react';
import { MessageSquare, FolderOpen, Users, Settings, Menu } from 'lucide-react';
import { AppView } from '../types';

interface WelcomeScreenProps {
  onNavigate: (view: AppView) => void;
  toggleSidebar: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onNavigate, toggleSidebar }) => {
  return (
    <div className="h-full w-full relative overflow-hidden flex flex-col">
      {/* Background Gradient - Adapts to Dark Mode */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-200 via-blue-50 to-white dark:from-[#1e1b4b] dark:via-[#172554] dark:to-[#0f172a] z-0" />
      
      {/* Top Bar (Mobile only or decorative) */}
      <div className="relative z-10 w-full p-6 flex justify-between items-start">
        <button 
          onClick={toggleSidebar}
          className="p-2 rounded-full hover:bg-white/10 text-slate-600 dark:text-white/80 transition-colors md:hidden"
        >
          <Menu size={28} />
        </button>
        <div className="flex-1" /> {/* Spacer */}
        <button 
          className="p-2 rounded-full hover:bg-white/10 text-slate-400 dark:text-white/60 transition-colors"
          title="Paramètres"
        >
          <Settings size={28} strokeWidth={1.5} />
        </button>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 -mt-10">
        
        {/* Title Section */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-slate-800 dark:text-white mb-16 tracking-tight">
          Bienvenue, Référent IA
        </h1>

        {/* Curved Container visual effect */}
        <div className="w-full max-w-5xl relative">
          {/* Decorative Arc */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[500px] bg-white/50 dark:bg-[#1e1b4b]/40 blur-3xl rounded-[100%] -z-10" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 justify-items-center">
            
            {/* Card 1: Mon Coach */}
            <button 
              onClick={() => onNavigate('chat')}
              className="group flex flex-col items-center space-y-4 transition-transform hover:scale-105 focus:outline-none"
            >
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-3xl border border-slate-300 dark:border-white/20 bg-white/50 dark:bg-white/5 backdrop-blur-sm flex items-center justify-center group-hover:border-ref-blue group-hover:shadow-lg group-hover:shadow-ref-blue/20 transition-all duration-300">
                <MessageSquare 
                  size={48} 
                  strokeWidth={1} 
                  className="text-slate-700 dark:text-white group-hover:text-ref-blue transition-colors" 
                />
              </div>
              <span className="text-lg font-medium text-slate-700 dark:text-white tracking-widest uppercase">Mon Coach</span>
            </button>

            {/* Card 2: Mes Ressources */}
            <button 
              onClick={() => onNavigate('docs')}
              className="group flex flex-col items-center space-y-4 transition-transform hover:scale-105 focus:outline-none"
            >
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-3xl border border-slate-300 dark:border-white/20 bg-white/50 dark:bg-white/5 backdrop-blur-sm flex items-center justify-center group-hover:border-ref-green group-hover:shadow-lg group-hover:shadow-ref-green/20 transition-all duration-300">
                <FolderOpen 
                  size={48} 
                  strokeWidth={1} 
                  className="text-slate-700 dark:text-white group-hover:text-ref-green transition-colors" 
                />
              </div>
              <span className="text-lg font-medium text-slate-700 dark:text-white tracking-widest uppercase">Mes Ressources</span>
            </button>

            {/* Card 3: Mon Réseau */}
            <button 
              onClick={() => onNavigate('contacts')}
              className="group flex flex-col items-center space-y-4 transition-transform hover:scale-105 focus:outline-none"
            >
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-3xl border border-slate-300 dark:border-white/20 bg-white/50 dark:bg-white/5 backdrop-blur-sm flex items-center justify-center group-hover:border-ref-yellow group-hover:shadow-lg group-hover:shadow-ref-yellow/20 transition-all duration-300">
                <Users 
                  size={48} 
                  strokeWidth={1} 
                  className="text-slate-700 dark:text-white group-hover:text-ref-yellow transition-colors" 
                />
              </div>
              <span className="text-lg font-medium text-slate-700 dark:text-white tracking-widest uppercase">Mon Réseau</span>
            </button>

          </div>
        </div>

        {/* Footer Text */}
        <div className="mt-20 max-w-2xl mx-auto px-6">
          <p className="text-center text-slate-500 dark:text-slate-300 text-sm md:text-lg font-light leading-relaxed uppercase tracking-wide">
            Félicitations pour votre nomination en tant que<br/>
            <span className="font-normal text-slate-800 dark:text-white block mt-2 text-xl md:text-2xl">Référent Intelligence Artificielle !</span>
          </p>
        </div>

      </div>
    </div>
  );
};

export default WelcomeScreen;

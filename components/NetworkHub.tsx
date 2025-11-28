import React from 'react';
import { Users, ClipboardList, MessagesSquare, Menu, ArrowLeft } from 'lucide-react';
import { AppView } from '../types';
import Card3D from './Card3D';
import SpaceBackground from './SpaceBackground';

interface NetworkHubProps {
  onNavigate: (view: AppView) => void;
  toggleSidebar: () => void;
}

const NetworkHub: React.FC<NetworkHubProps> = ({ onNavigate, toggleSidebar }) => {
  return (
    <div className="h-full w-full relative overflow-hidden flex flex-col">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-200 via-blue-50 to-white dark:from-[#1e1b4b] dark:via-[#172554] dark:to-[#0f172a] z-0" />
      <SpaceBackground />

      <div className="relative z-10 w-full p-6 flex justify-between items-start">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-full hover:bg-white/10 text-slate-600 dark:text-white/80 transition-colors md:hidden"
        >
          <Menu size={28} />
        </button>
        <button
          onClick={() => onNavigate('welcome')}
          className="p-2 rounded-full hover:bg-white/10 text-slate-600 dark:text-white/80 transition-colors"
          title="Retour à l'accueil"
        >
          <ArrowLeft size={28} />
        </button>
      </div>

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 -mt-10">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-slate-800 dark:text-white mb-6 tracking-tight">
          Mon Réseau
        </h1>

        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-16 font-light leading-relaxed px-4">
          Retrouvez ici les contacts et l'aide nécessaires à l'élaboration de projets qui émanent des agents.
        </p>

        <div className="w-full max-w-5xl relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[500px] bg-white/50 dark:bg-[#1e1b4b]/40 blur-3xl rounded-[100%] -z-10" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 justify-items-center">
            <Card3D
              icon={<Users size={48} strokeWidth={1} />}
              label="Annuaire"
              onClick={() => onNavigate('contacts')}
              hoverColor="ref-yellow"
              shadowColor="ref-yellow/20"
            />
            <Card3D
              icon={<ClipboardList size={48} strokeWidth={1} />}
              label="Projets"
              onClick={() => onNavigate('projects')}
              hoverColor="ref-yellow"
              shadowColor="ref-yellow/20"
            />
            <Card3D
              icon={<MessagesSquare size={48} strokeWidth={1} />}
              label="Forum"
              onClick={() => onNavigate('forum')}
              hoverColor="ref-yellow"
              shadowColor="ref-yellow/20"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetworkHub;


import React from 'react';
import { MessageSquare, FolderOpen, Users, Settings, Menu } from 'lucide-react';
import { AppView } from '../types';
import Card3D from './Card3D';
import SpaceBackground from './SpaceBackground';
import { useAuth } from '../contexts/AuthContext';

interface WelcomeScreenProps {
  onNavigate: (view: AppView) => void;
  toggleSidebar: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onNavigate, toggleSidebar }) => {
  const { profile } = useAuth();
  const showTooltips = profile?.tooltips_enabled !== false;

  return (
    <div className="h-full w-full relative overflow-hidden flex flex-col">
      {/* Background Gradient - Adapts to Dark Mode */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-200 via-blue-50 to-white dark:from-[#0f172a] dark:via-[#0f172a] dark:to-[#0f172a] z-0" />

      {/* Space Background with Stars and Satellites */}
      <SpaceBackground satellitesEnabled={profile?.satellites_enabled || false} />
      
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
          onClick={() => onNavigate('dashboard')}
          className="p-2 rounded-full hover:bg-white/10 text-slate-400 dark:text-white/60 transition-colors"
          title="Tableau de bord"
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
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[500px] bg-white/50 dark:bg-transparent blur-3xl rounded-[100%] -z-10" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 justify-items-center">
            <Card3D
              icon={<MessageSquare size={48} strokeWidth={1} />}
              label="Ma navigation IA"
              onClick={() => onNavigate('navigation-hub')}
              hoverColor="ref-blue"
              shadowColor="ref-blue/20"
              tooltip={showTooltips ? "Accédez à vos outils de navigation IA : questions, onboarding, recueil d'usages" : undefined}
            />
            <Card3D
              icon={<FolderOpen size={48} strokeWidth={1} />}
              label="Mes Ressources"
              onClick={() => onNavigate('resources-hub')}
              hoverColor="ref-green"
              shadowColor="ref-green/20"
              tooltip={showTooltips ? "Explorez les ressources documentaires, outils et formations IA" : undefined}
            />
            <Card3D
              icon={<Users size={48} strokeWidth={1} />}
              label="Mon Réseau"
              onClick={() => onNavigate('network-hub')}
              hoverColor="ref-yellow"
              shadowColor="ref-yellow/20"
              tooltip={showTooltips ? "Connectez-vous avec la communauté des Référents IA" : undefined}
            />
          </div>
        </div>

        {/* Footer Text */}
        <div className="mt-20 max-w-2xl mx-auto px-6">
          <p className="text-center text-slate-500 dark:text-slate-300 text-sm md:text-lg font-light leading-relaxed uppercase tracking-wide">
            Félicitations pour votre nomination en tant que<br/>
            <span className="font-normal text-slate-800 dark:text-white block mt-2 text-xl md:text-2xl">Référent Intelligence Artificielle !</span>
          </p>

          <div className="flex justify-center mt-8">
            <button
              onClick={() => onNavigate('onboarding-choice')}
              className="px-8 py-4 bg-white/10 dark:bg-white/5 text-[#6B9BD2] dark:text-cyan-300 rounded-xl font-medium backdrop-blur-md border border-white/30 dark:border-white/10 hover:bg-white/20 dark:hover:bg-white/10 hover:shadow-lg transform hover:-translate-y-0.5 transition-all text-lg shadow-xl"
              title={showTooltips ? "Démarrez votre parcours d'intégration en tant que Référent IA" : undefined}
            >
              Je suis nouvelle / nouveau
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default WelcomeScreen;

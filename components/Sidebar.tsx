
import React, { useState, useEffect } from 'react';
import { MessageSquare, BookOpen, X, Users, Map, ClipboardList, Newspaper, GraduationCap, Cpu, Activity, ChevronDown, ChevronRight, LogOut, Sun, Moon, ShieldCheck, Target, Scale, Leaf, FileText, MessagesSquare, Settings } from 'lucide-react';
import { AppView } from '../types';
import { useAuth } from '../contexts/AuthContext';

// Icône Hamburger personnalisée (traits épais)
const ThickHamburger = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24">
    <path d="M3 6H21" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
    <path d="M3 12H21" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
    <path d="M3 18H21" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
  </svg>
);

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  isCollapsed: boolean;
  toggleCollapse: () => void;
  onClearChat: () => void;
  currentView: AppView;
  onNavigate: (view: AppView) => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  toggleSidebar,
  isCollapsed,
  toggleCollapse,
  onClearChat,
  currentView,
  onNavigate,
  isDarkMode,
  toggleTheme
}) => {
  const { signOut, profile } = useAuth();
  const [openSection, setOpenSection] = useState<'coach' | 'resources' | 'network' | null>('coach');

  // Ouvrir automatiquement la bonne section en fonction de la vue courante
  useEffect(() => {
    if (['chat', 'parcours', 'recueil', 'veille-chat'].includes(currentView)) {
      setOpenSection('coach');
    } else if (['tools', 'training', 'veille', 'missions', 'ethics', 'charters', 'environmental'].includes(currentView)) {
      setOpenSection('resources');
    } else if (['contacts', 'projects', 'forum'].includes(currentView)) {
      setOpenSection('network');
    }
  }, [currentView]);

  const handleNavigation = (view: AppView) => {
    onNavigate(view);
    if (window.innerWidth < 768) {
      toggleSidebar();
    }
  };

  const toggleSection = (section: 'coach' | 'resources' | 'network') => {
    if (isCollapsed) {
        // Si réduit, on ne fait rien ou on ouvre le menu complet
        toggleCollapse();
        setOpenSection(section);
    } else {
        setOpenSection(openSection === section ? null : section);
    }
  };

  const NavItem = ({ view, icon: Icon, label, tooltip }: { view: AppView, icon: any, label: string, tooltip?: string }) => {
    const isActive = currentView === view;
    const showTooltip = profile?.tooltips_enabled !== false && !isCollapsed && tooltip;

    return (
      <button
        onClick={() => handleNavigation(view)}
        title={isCollapsed ? label : (showTooltip ? tooltip : undefined)}
        className={`
          w-full flex items-center space-x-3 px-4 py-2.5 transition-all duration-200 rounded-lg mb-1 group relative
          ${isActive
            ? 'bg-ref-blue/10 text-ref-blue'
            : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'}
          ${isCollapsed ? 'justify-center px-2' : 'ml-2 w-[calc(100%-8px)]'}
        `}
      >
        <Icon size={18} className={isActive ? 'text-ref-blue' : ''} strokeWidth={2} />
        {!isCollapsed && <span className="text-sm font-medium">{label}</span>}
      </button>
    );
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden backdrop-blur-sm"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar Container */}
      <div className={`
        fixed md:static inset-y-0 left-0 z-30
        bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 
        text-slate-900 dark:text-white transform transition-all duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        ${isCollapsed ? 'md:w-20' : 'md:w-72'}
        flex flex-col h-full shadow-2xl md:shadow-none
      `}>
        
        {/* Header Logo */}
        <div className={`p-4 border-b border-slate-200 dark:border-slate-800 flex items-center h-20 ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
          <button 
            onClick={() => handleNavigation('welcome')}
            className="flex items-center space-x-3 group"
            title="Retour à l'accueil"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-ref-blue to-blue-600 flex-shrink-0 flex items-center justify-center shadow-lg group-hover:shadow-ref-blue/30 transition-all">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            {!isCollapsed && (
              <div className="flex flex-col items-start">
                <span className="font-bold text-lg tracking-tight text-slate-900 dark:text-white leading-none">Référent IA</span>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold mt-1">Assistant</span>
              </div>
            )}
          </button>
          <button onClick={toggleSidebar} className="md:hidden text-slate-400 hover:text-slate-900 dark:hover:text-white p-2">
            <X size={24} />
          </button>
        </div>

        {/* Navigation Accordéon */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden py-6 px-3 scrollbar-thin space-y-4">
          
          {/* Section Coach */}
          <div className="flex flex-col">
            <button 
                onClick={() => toggleSection('coach')}
                className={`flex items-center justify-between w-full p-2 text-xs font-bold text-slate-400 uppercase tracking-wider hover:text-ref-blue transition-colors ${isCollapsed ? 'justify-center' : ''}`}
            >
                {!isCollapsed && <span>MA NAVIGATION IA</span>}
                {isCollapsed ? (
                    <MessageSquare size={20} className={openSection === 'coach' ? 'text-ref-blue' : ''} />
                ) : (
                    openSection === 'coach' ? <ChevronDown size={14} /> : <ChevronRight size={14} />
                )}
            </button>
            
            <div className={`
                overflow-hidden transition-all duration-300 ease-in-out space-y-1 mt-1
                ${openSection === 'coach' || isCollapsed ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
            `}>
                <NavItem view="chat" icon={MessageSquare} label="J'ai une question !" tooltip="Posez vos questions à votre assistant virtuel sur tout ce qui concerne les informations présentes sur la plateforme" />
                <NavItem view="parcours" icon={Map} label="Mon onboarding" tooltip="Découvrez votre parcours personnalisé de Référent IA" />
                <NavItem view="recueil" icon={ClipboardList} label="Je recueille des usages" tooltip="Identifiez et documentez les cas d'usage IA dans votre organisation" />
                <NavItem view="veille-chat" icon={Newspaper} label="Veille IA" tooltip="Accédez aux dernières actualités et tendances en IA" />
            </div>
          </div>

          {/* Section Ressources */}
          <div className="flex flex-col">
            <button 
                onClick={() => toggleSection('resources')}
                className={`flex items-center justify-between w-full p-2 text-xs font-bold text-slate-400 uppercase tracking-wider hover:text-ref-blue transition-colors ${isCollapsed ? 'justify-center' : ''}`}
            >
                {!isCollapsed && <span>MES RESSOURCES</span>}
                {isCollapsed ? (
                    <BookOpen size={20} className={openSection === 'resources' ? 'text-ref-blue' : ''} />
                ) : (
                    openSection === 'resources' ? <ChevronDown size={14} /> : <ChevronRight size={14} />
                )}
            </button>
            
            <div className={`
                overflow-hidden transition-all duration-300 ease-in-out space-y-1 mt-1
                ${openSection === 'resources' || isCollapsed ? 'max-h-[700px] opacity-100' : 'max-h-0 opacity-0'}
            `}>
                <NavItem view="missions" icon={Target} label="Missions du Réf'IA" tooltip="Consultez vos missions et responsabilités en tant que Référent IA" />
                <NavItem view="ethics" icon={Scale} label="Déontologie & éthique" tooltip="Explorez les principes éthiques et déontologiques de l'IA" />
                <NavItem view="charters" icon={FileText} label="Charte du Réf'IA" tooltip="Accédez aux chartes et documents de référence" />
                <NavItem view="environmental" icon={Leaf} label="Impact Environnemental" tooltip="Découvrez l'impact environnemental de l'IA" />
                <NavItem view="tools" icon={Cpu} label="Outils disponibles" tooltip="Explorez le catalogue d'outils IA recommandés" />
                <NavItem view="training" icon={GraduationCap} label="Formations IA" tooltip="Trouvez des formations adaptées à votre niveau" />
                <NavItem view="veille" icon={Activity} label="Veille IA (live)" tooltip="Suivez les actualités IA en temps réel" />
            </div>
          </div>

          {/* Section Mon Réseau */}
          <div className="flex flex-col">
            <button
                onClick={() => toggleSection('network')}
                className={`flex items-center justify-between w-full p-2 text-xs font-bold text-slate-400 uppercase tracking-wider hover:text-ref-blue transition-colors ${isCollapsed ? 'justify-center' : ''}`}
            >
                {!isCollapsed && <span>MON RÉSEAU</span>}
                {isCollapsed ? (
                    <Users size={20} className={openSection === 'network' ? 'text-ref-blue' : ''} />
                ) : (
                    openSection === 'network' ? <ChevronDown size={14} /> : <ChevronRight size={14} />
                )}
            </button>

            <div className={`
                overflow-hidden transition-all duration-300 ease-in-out space-y-1 mt-1
                ${openSection === 'network' || isCollapsed ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
            `}>
                <NavItem view="contacts" icon={Users} label="Annuaire" tooltip="Consultez l'annuaire des Référents IA et experts" />
                <NavItem view="projects" icon={ClipboardList} label="Projets" tooltip="Gérez vos projets et recueils d'usages" />
                <NavItem view="forum" icon={MessagesSquare} label="Forum" tooltip="Échangez avec la communauté des Référents IA" />
            </div>
          </div>

        </nav>

        {/* Footer Actions */}
        <div className="border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 p-3 space-y-2">
            {/* User Profile Info */}
            {!isCollapsed && profile && (
              <div className="px-3 py-2 mb-2 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                  {profile.full_name || profile.email}
                </p>
                {profile.organization && (
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                    {profile.organization}
                  </p>
                )}
              </div>
            )}

            {/* Profile Button */}
            <button
              onClick={() => handleNavigation('profile')}
              className={`w-full flex items-center px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 rounded-lg transition-all shadow-sm hover:shadow ${isCollapsed ? 'justify-center' : 'space-x-3'}`}
              title="Mon profil"
            >
              <Settings size={18} />
              {!isCollapsed && <span className="text-sm font-medium">Mon Profil</span>}
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`w-full flex items-center px-3 py-2 text-slate-500 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 rounded-lg transition-all shadow-sm hover:shadow ${isCollapsed ? 'justify-center' : 'space-x-3'}`}
              title={isDarkMode ? "Passer en mode clair" : "Passer en mode sombre"}
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
              {!isCollapsed && <span className="text-sm font-medium">Mode {isDarkMode ? 'Clair' : 'Sombre'}</span>}
            </button>

            {/* Logout Button */}
            <button
              onClick={signOut}
              className={`w-full flex items-center px-3 py-2 text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all ${isCollapsed ? 'justify-center' : 'space-x-3'}`}
              title="Se déconnecter"
            >
              <LogOut size={18} />
              {!isCollapsed && <span className="text-sm font-medium">Déconnexion</span>}
            </button>

            {/* Collapse Toggle (Desktop) */}
            <button
              onClick={toggleCollapse}
              className="hidden md:flex w-full items-center justify-center py-2 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              title={isCollapsed ? "Déplier le menu" : "Réduire le menu"}
            >
              <div className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700">
                {isCollapsed ? <ThickHamburger className="w-5 h-5" /> : <ThickHamburger className="w-5 h-5" />}
              </div>
            </button>
        </div>

        {/* Action Button (Recommencer) */}
        {(['chat', 'parcours', 'recueil'].includes(currentView)) && (
          <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <button 
              onClick={onClearChat}
              title={isCollapsed ? "Nouvelle conversation" : undefined}
              className={`
                w-full py-2.5 bg-ref-blue hover:bg-sky-600 text-white rounded-xl transition-all shadow-md shadow-ref-blue/20 flex items-center justify-center font-medium
                ${isCollapsed ? 'px-0' : 'space-x-2'}
              `}
            >
              <LogOut size={18} />
              {!isCollapsed && <span>Nouvelle discussion</span>}
            </button>
          </div>
        )}
        
        {/* Version Info */}
        {!isCollapsed && (
          <div className="py-2 text-[10px] text-slate-400 text-center bg-slate-50 dark:bg-slate-950">
            v1.5.0 &bull; Kit Référent IA
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;

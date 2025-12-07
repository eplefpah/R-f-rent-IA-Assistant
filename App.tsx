
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ChatInterface from './components/ChatInterface';
import ResourcesInterface from './components/ResourcesInterface';
import ContactsInterface from './components/ContactsInterface';
import MissionsInterface from './components/MissionsInterface';
import EthicsInterface from './components/EthicsInterface';
import ChartersInterface from './components/ChartersInterface';
import EnvironmentalImpactInterface from './components/EnvironmentalImpactInterface';
import ProjectsInterface from './components/ProjectsInterface';
import ForumInterface from './components/ForumInterface';
import WelcomeScreen from './components/WelcomeScreen';
import NavigationHub from './components/NavigationHub';
import ResourcesHub from './components/ResourcesHub';
import NetworkHub from './components/NetworkHub';
import OnboardingChoice from './components/OnboardingChoice';
import OnboardingManual from './components/OnboardingManual';
import CompetencyEvaluationInterface from './components/CompetencyEvaluationInterface';
import ProfileInterface from './components/ProfileInterface';
import DashboardInterface from './components/DashboardInterface';
import VeilleAIChatInterface from './components/VeilleAIChatInterface';
import { AuthPage } from './components/AuthPage';
import { useAuth } from './contexts/AuthContext';
import { Message, AppView } from './types';
import { PARCOURS_SYSTEM_INSTRUCTION, PARCOURS_SUGGESTIONS, RECUEIL_SYSTEM_INSTRUCTION, RECUEIL_SUGGESTIONS } from './constants';

// Icône Hamburger pour le bouton flottant
const FloatingHamburger = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-slate-700 dark:text-slate-200">
    <path d="M3 6H21" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
    <path d="M3 12H21" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
    <path d="M3 18H21" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
  </svg>
);

const App: React.FC = () => {
  const { user, loading } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [parcoursMessages, setParcoursMessages] = useState<Message[]>([]);
  const [recueilMessages, setRecueilMessages] = useState<Message[]>([]);
  const [currentView, setCurrentView] = useState<AppView>('welcome');
  const [resetKey, setResetKey] = useState(0);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleSidebarCollapse = () => setIsSidebarCollapsed(!isSidebarCollapsed);
  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    const handleCustomNavigate = (event: CustomEvent<string>) => {
      setCurrentView(event.detail as AppView);
    };
    window.addEventListener('navigate' as any, handleCustomNavigate);
    return () => window.removeEventListener('navigate' as any, handleCustomNavigate);
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gradient-to-br from-[#0A1628] via-[#1a2942] to-[#0f1c33]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
          <p className="text-white text-lg">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthPage />;
  }

  const handleClearChat = () => {
    // Action immédiate sans confirmation
    if (currentView === 'chat') {
      setMessages([]);
    } else if (currentView === 'parcours') {
      setParcoursMessages([]);
    } else if (currentView === 'recueil') {
      setRecueilMessages([]);
    }
    
    // Incrémenter la clé pour forcer un montage propre du composant (Hard Reset)
    // Cela garantit que l'état interne du chat (texte saisi, fichiers) est bien purgé
    setResetKey(prev => prev + 1);
    
    if (window.innerWidth < 768) {
       setIsSidebarOpen(false);
    }
  };

  const handleNavigate = (view: AppView) => {
    setCurrentView(view);
  };

  const renderView = () => {
    switch (currentView) {
      case 'welcome':
        return (
            <WelcomeScreen
                onNavigate={handleNavigate}
                toggleSidebar={toggleSidebar}
            />
        );
      case 'navigation-hub':
        return <NavigationHub onNavigate={handleNavigate} toggleSidebar={toggleSidebar} />;
      case 'resources-hub':
        return <ResourcesHub onNavigate={handleNavigate} toggleSidebar={toggleSidebar} />;
      case 'network-hub':
        return <NetworkHub onNavigate={handleNavigate} toggleSidebar={toggleSidebar} />;
      case 'onboarding-choice':
        return <OnboardingChoice onNavigate={handleNavigate} toggleSidebar={toggleSidebar} />;
      case 'onboarding-manual':
        return <OnboardingManual onNavigate={handleNavigate} toggleSidebar={toggleSidebar} />;
      case 'competency-evaluation':
        return <CompetencyEvaluationInterface toggleSidebar={toggleSidebar} onComplete={() => handleNavigate('onboarding-manual')} onBack={() => handleNavigate('onboarding-manual')} />;
      case 'profile':
        return <ProfileInterface toggleSidebar={toggleSidebar} />;
      case 'dashboard':
        return <DashboardInterface onNavigate={handleNavigate} toggleSidebar={toggleSidebar} />;
      case 'chat':
        return (
          <ChatInterface 
            key={`chat-${resetKey}`} // Force refresh
            toggleSidebar={toggleSidebar} 
            messages={messages}
            setMessages={setMessages}
          />
        );
      case 'parcours':
        return (
          <ChatInterface 
            key={`parcours-${resetKey}`} // Force refresh
            toggleSidebar={toggleSidebar} 
            messages={parcoursMessages}
            setMessages={setParcoursMessages}
            systemInstruction={PARCOURS_SYSTEM_INSTRUCTION}
            customSuggestions={PARCOURS_SUGGESTIONS}
            welcomeTitle="Parcours Initiatique"
            welcomeMessage="Bienvenue dans votre parcours d'intégration. Je suis là pour vous guider pas à pas, diagnostiquer votre profil et vous proposer un accompagnement sur mesure."
          />
        );
      case 'recueil':
        return (
          <ChatInterface 
            key={`recueil-${resetKey}`} // Force refresh
            toggleSidebar={toggleSidebar} 
            messages={recueilMessages}
            setMessages={setRecueilMessages}
            systemInstruction={RECUEIL_SYSTEM_INSTRUCTION}
            customSuggestions={RECUEIL_SUGGESTIONS}
            welcomeTitle="Assistant Recueil de Besoin"
            welcomeMessage="Bonjour. Je suis là pour vous aider à qualifier un besoin IA. Nous allons remplir ensemble le formulaire de recueil des exigences, question par question. A la fin, je pourrai vous proposer une solution ou envoyer le cas à la DINUM."
          />
        );
      case 'tools':
        return <ResourcesInterface toggleSidebar={toggleSidebar} activeTab="outils" />;
      case 'training':
        return <ResourcesInterface toggleSidebar={toggleSidebar} activeTab="formations" />;
      case 'veille':
        return <ResourcesInterface toggleSidebar={toggleSidebar} activeTab="veille" />;
      case 'veille-chat':
        return <VeilleAIChatInterface toggleSidebar={toggleSidebar} onNavigate={handleNavigate} />;
      case 'contacts':
        return (
          <ContactsInterface
            toggleSidebar={toggleSidebar}
          />
        );
      case 'missions':
        return (
          <MissionsInterface
            toggleSidebar={toggleSidebar}
          />
        );
      case 'ethics':
        return (
          <EthicsInterface
            toggleSidebar={toggleSidebar}
          />
        );
      case 'charters':
        return (
          <ChartersInterface
            toggleSidebar={toggleSidebar}
          />
        );
      case 'environmental':
        return (
          <EnvironmentalImpactInterface
            toggleSidebar={toggleSidebar}
          />
        );
      case 'projects':
        return (
          <ProjectsInterface
            toggleSidebar={toggleSidebar}
          />
        );
      case 'forum':
        return (
          <ForumInterface
            toggleSidebar={toggleSidebar}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={`flex h-screen w-full bg-slate-50 dark:bg-slate-950 overflow-hidden transition-colors duration-300 ${isDarkMode ? 'dark' : ''}`}>
      <Sidebar 
        isOpen={isSidebarOpen} 
        toggleSidebar={toggleSidebar} 
        isCollapsed={isSidebarCollapsed}
        toggleCollapse={toggleSidebarCollapse}
        onClearChat={handleClearChat}
        currentView={currentView}
        onNavigate={handleNavigate}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
      />
      
      <main className="flex-1 relative overflow-hidden flex flex-col">
        
        {/* Bouton Hamburger Flottant pour ouvrir le menu s'il est réduit sur desktop ou mobile */}
        <div className={`absolute top-4 left-4 z-50 transition-opacity duration-300 ${isSidebarCollapsed ? 'opacity-0 hover:opacity-100 md:opacity-0' : 'opacity-0 pointer-events-none'}`}>
             {/* Ce bouton est géré principalement par le Sidebar lui-même, mais on peut en ajouter un ici si nécessaire.
                 Pour l'instant, le Sidebar a son propre bouton de collapse. */}
        </div>
        
        {renderView()}
      </main>
    </div>
  );
};

export default App;

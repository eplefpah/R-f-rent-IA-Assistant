import React, { useState, useEffect } from 'react';
import {
  Menu,
  ArrowLeft,
  Plus,
  X,
  BarChart3,
  FolderOpen,
  Users,
  MessageSquare,
  Newspaper,
  GraduationCap,
  ClipboardList,
  Target,
  Award,
  Scale,
  FileText,
  Leaf,
  Wrench,
  Settings,
  TrendingUp,
  Activity
} from 'lucide-react';
import { AppView, DashboardWidget, DashboardConfig, WidgetType, WidgetStatus } from '../types';
import { useAuth } from '../contexts/AuthContext';
import SpaceBackground from './SpaceBackground';
import { supabase } from '../services/supabaseClient';

interface DashboardInterfaceProps {
  onNavigate: (view: AppView) => void;
  toggleSidebar: () => void;
}

interface WidgetMetadata {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  targetView: AppView;
}

const WIDGET_METADATA: Record<WidgetType, WidgetMetadata> = {
  resources: {
    icon: <FolderOpen size={32} />,
    title: 'Ressources',
    description: 'Documentations et guides',
    color: 'from-green-500 to-emerald-600',
    targetView: 'resources-hub'
  },
  projects: {
    icon: <Target size={32} />,
    title: 'Projets',
    description: 'Gestion des projets IA',
    color: 'from-blue-500 to-cyan-600',
    targetView: 'projects'
  },
  contacts: {
    icon: <Users size={32} />,
    title: 'Annuaire',
    description: 'Réseau des référents',
    color: 'from-purple-500 to-pink-600',
    targetView: 'contacts'
  },
  forum: {
    icon: <MessageSquare size={32} />,
    title: 'Forum',
    description: 'Discussions communautaires',
    color: 'from-orange-500 to-red-600',
    targetView: 'forum'
  },
  veille: {
    icon: <Newspaper size={32} />,
    title: 'Veille',
    description: 'Actualités IA',
    color: 'from-indigo-500 to-blue-600',
    targetView: 'veille'
  },
  training: {
    icon: <GraduationCap size={32} />,
    title: 'Formations',
    description: 'Parcours de formation',
    color: 'from-teal-500 to-green-600',
    targetView: 'training'
  },
  requirements: {
    icon: <ClipboardList size={32} />,
    title: 'Recueil des besoins',
    description: 'Analyse des besoins',
    color: 'from-yellow-500 to-orange-600',
    targetView: 'recueil'
  },
  missions: {
    icon: <Target size={32} />,
    title: 'Missions',
    description: 'Lettres de mission',
    color: 'from-red-500 to-pink-600',
    targetView: 'missions'
  },
  competency: {
    icon: <Award size={32} />,
    title: 'Compétences',
    description: 'Évaluation des compétences',
    color: 'from-amber-500 to-yellow-600',
    targetView: 'competency-evaluation'
  },
  ethics: {
    icon: <Scale size={32} />,
    title: 'Éthique',
    description: 'Principes éthiques',
    color: 'from-slate-500 to-gray-600',
    targetView: 'ethics'
  },
  charters: {
    icon: <FileText size={32} />,
    title: 'Chartes',
    description: 'Chartes et règlements',
    color: 'from-sky-500 to-blue-600',
    targetView: 'charters'
  },
  environmental: {
    icon: <Leaf size={32} />,
    title: 'Impact environnemental',
    description: 'Empreinte carbone',
    color: 'from-green-600 to-lime-700',
    targetView: 'environmental'
  },
  tools: {
    icon: <Wrench size={32} />,
    title: 'Catalogue Outils',
    description: 'Outils IA disponibles',
    color: 'from-violet-500 to-purple-600',
    targetView: 'tools'
  }
};

const DEFAULT_WIDGETS: DashboardWidget[] = [
  { id: '1', type: 'resources', enabled: true, order: 1, status: 'in_progress', progress: 45 },
  { id: '2', type: 'projects', enabled: true, order: 2, status: 'in_progress', progress: 60 },
  { id: '3', type: 'contacts', enabled: true, order: 3, status: 'not_started', progress: 0 },
  { id: '4', type: 'forum', enabled: true, order: 4, status: 'in_progress', progress: 30 },
  { id: '5', type: 'training', enabled: true, order: 5, status: 'in_progress', progress: 75 },
  { id: '6', type: 'competency', enabled: true, order: 6, status: 'not_started', progress: 0 }
];

const STATUS_LABELS: Record<WidgetStatus, string> = {
  not_started: 'Non démarré',
  in_progress: 'En cours',
  completed: 'Terminé'
};

const STATUS_COLORS: Record<WidgetStatus, string> = {
  not_started: 'bg-slate-500',
  in_progress: 'bg-blue-500',
  completed: 'bg-green-500'
};

const DashboardInterface: React.FC<DashboardInterfaceProps> = ({ onNavigate, toggleSidebar }) => {
  const { profile, user } = useAuth();
  const [widgets, setWidgets] = useState<DashboardWidget[]>(DEFAULT_WIDGETS);
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (profile?.dashboard_config) {
      setWidgets(profile.dashboard_config.widgets);
    }
  }, [profile]);

  const saveDashboardConfig = async (newWidgets: DashboardWidget[]) => {
    if (!user) return;

    setIsSaving(true);
    try {
      const config: DashboardConfig = {
        widgets: newWidgets,
        updated_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from('profiles')
        .update({ dashboard_config: config })
        .eq('id', user.id);

      if (error) throw error;
    } catch (error) {
      console.error('Error saving dashboard config:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const toggleWidget = (type: WidgetType) => {
    const existingWidget = widgets.find(w => w.type === type);

    let newWidgets: DashboardWidget[];
    if (existingWidget) {
      newWidgets = widgets.map(w =>
        w.type === type ? { ...w, enabled: !w.enabled } : w
      );
    } else {
      const newWidget: DashboardWidget = {
        id: `${Date.now()}`,
        type,
        enabled: true,
        order: widgets.length + 1,
        status: 'not_started',
        progress: 0
      };
      newWidgets = [...widgets, newWidget];
    }

    setWidgets(newWidgets);
    saveDashboardConfig(newWidgets);
  };

  const handleWidgetClick = (targetView: AppView) => {
    if (!isCustomizing) {
      onNavigate(targetView);
    }
  };

  const activeWidgets = widgets.filter(w => w.enabled).sort((a, b) => a.order - b.order);
  const availableTypes = Object.keys(WIDGET_METADATA) as WidgetType[];

  return (
    <div className="h-full w-full relative overflow-hidden flex flex-col bg-gradient-to-br from-slate-200 via-blue-50 to-white dark:from-[#0f172a] dark:via-[#0f172a] dark:to-[#0f172a]">
      <SpaceBackground satellitesEnabled={profile?.satellites_enabled || false} />

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
        >
          <ArrowLeft size={28} />
        </button>
      </div>

      <div className="relative z-10 flex-1 overflow-y-auto px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-light text-slate-800 dark:text-white mb-2">
                Tableau de bord
              </h1>
              <p className="text-slate-600 dark:text-slate-300">
                Vue d'ensemble de vos activités et progrès
              </p>
            </div>
            <button
              onClick={() => setIsCustomizing(!isCustomizing)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl backdrop-blur-md border transition-all ${
                isCustomizing
                  ? 'bg-red-500/20 border-red-500/50 text-red-600 dark:text-red-400'
                  : 'bg-white/10 dark:bg-white/5 border-white/30 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-white/20 dark:hover:bg-white/10'
              }`}
            >
              {isCustomizing ? (
                <>
                  <X size={20} />
                  <span>Terminer</span>
                </>
              ) : (
                <>
                  <Settings size={20} />
                  <span>Personnaliser</span>
                </>
              )}
            </button>
          </div>

          {isCustomizing && (
            <div className="mb-6 p-4 bg-white/50 dark:bg-white/5 backdrop-blur-md rounded-xl border border-white/30 dark:border-white/10">
              <h3 className="text-lg font-medium text-slate-800 dark:text-white mb-3">
                Widgets disponibles
              </h3>
              <div className="flex flex-wrap gap-2">
                {availableTypes.map(type => {
                  const widget = widgets.find(w => w.type === type);
                  const isEnabled = widget?.enabled || false;
                  const metadata = WIDGET_METADATA[type];

                  return (
                    <button
                      key={type}
                      onClick={() => toggleWidget(type)}
                      className={`px-4 py-2 rounded-lg border transition-all ${
                        isEnabled
                          ? 'bg-blue-500/20 border-blue-500/50 text-blue-700 dark:text-blue-300'
                          : 'bg-white/30 dark:bg-white/5 border-white/30 dark:border-white/10 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {isEnabled ? '✓' : '+'} {metadata.title}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeWidgets.map(widget => {
              const metadata = WIDGET_METADATA[widget.type];

              return (
                <div
                  key={widget.id}
                  onClick={() => handleWidgetClick(metadata.targetView)}
                  className={`relative group bg-white/80 dark:bg-slate-800/50 backdrop-blur-md rounded-2xl border border-white/50 dark:border-white/10 p-6 transition-all ${
                    isCustomizing ? 'cursor-default' : 'cursor-pointer hover:shadow-2xl hover:-translate-y-1'
                  }`}
                >
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${metadata.color} opacity-0 group-hover:opacity-10 transition-opacity`} />

                  <div className="relative">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${metadata.color} text-white`}>
                        {metadata.icon}
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${STATUS_COLORS[widget.status]} text-white`}>
                          {STATUS_LABELS[widget.status]}
                        </span>
                        {widget.progress > 0 && (
                          <div className="flex items-center gap-1 text-sm text-slate-600 dark:text-slate-300">
                            <TrendingUp size={14} />
                            <span>{widget.progress}%</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <h3 className="text-xl font-medium text-slate-800 dark:text-white mb-1">
                      {metadata.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                      {metadata.description}
                    </p>

                    {widget.progress > 0 && (
                      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${metadata.color} transition-all duration-500`}
                          style={{ width: `${widget.progress}%` }}
                        />
                      </div>
                    )}

                    {widget.status === 'completed' && (
                      <div className="absolute top-4 right-4 bg-green-500 text-white rounded-full p-1">
                        <Activity size={16} />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {isCustomizing && (
              <button
                onClick={() => setIsCustomizing(true)}
                className="flex items-center justify-center gap-3 bg-white/50 dark:bg-white/5 backdrop-blur-md rounded-2xl border-2 border-dashed border-white/50 dark:border-white/20 p-6 hover:bg-white/60 dark:hover:bg-white/10 transition-all text-slate-600 dark:text-slate-400"
              >
                <Plus size={32} />
                <span>Ajouter un widget</span>
              </button>
            )}
          </div>

          {isSaving && (
            <div className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg">
              Enregistrement...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardInterface;

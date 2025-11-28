
import React, { useState, useEffect } from 'react';
import { Menu, Trophy, Target, Cpu, Shield, Scale, FileText, ExternalLink, CheckCircle, GraduationCap, Clock, Euro, MapPin, Loader2 } from 'lucide-react';
import { KNOWLEDGE_BASE_SECTIONS } from '../constants';
import { TRAINING_COURSES } from '../trainingData';
import { aiToolsService } from '../services/aiToolsService';
import { AiTool } from '../types';
import MarkdownRenderer from './MarkdownRenderer';
import VeilleInterface from './VeilleInterface';

type ResourceTab = 'docs' | 'veille' | 'outils' | 'formations';

interface ResourcesInterfaceProps {
  toggleSidebar: () => void;
  activeTab: ResourceTab;
}

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'Trophy': return <Trophy size={24} />;
    case 'Target': return <Target size={24} />;
    case 'Cpu': return <Cpu size={24} />;
    case 'Shield': return <Shield size={24} />;
    case 'Scale': return <Scale size={24} />;
    default: return <FileText size={24} />;
  }
};

const ResourcesInterface: React.FC<ResourcesInterfaceProps> = ({ toggleSidebar, activeTab }) => {
  const [aiTools, setAiTools] = useState<AiTool[]>([]);
  const [loadingTools, setLoadingTools] = useState(false);

  useEffect(() => {
    if (activeTab === 'outils') {
      loadAiTools();
    }
  }, [activeTab]);

  const loadAiTools = async () => {
    setLoadingTools(true);
    try {
      const tools = await aiToolsService.getAllTools();
      setAiTools(tools);
    } catch (error) {
      console.error('Failed to load AI tools:', error);
    } finally {
      setLoadingTools(false);
    }
  };

  const getDifficultyColor = (level: string) => {
    switch (level?.toLowerCase()) {
      case 'débutant': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400';
      case 'intermédiaire': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      case 'avancé': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400';
      default: return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400';
    }
  };

  const getLevelColor = (level: string) => {
      if (level.includes('Niveau 1')) return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400';
      if (level.includes('Niveau 2')) return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      if (level.includes('Niveau 3')) return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400';
      return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
  };

  const getTitle = () => {
      switch (activeTab) {
          case 'docs': return 'Base Documentaire';
          case 'outils': return 'Catalogue Outils';
          case 'formations': return 'Catalogue Formations';
          case 'veille': return 'Veille IA (Live)';
          default: return 'Ressources';
      }
  };

  const getDescription = () => {
      switch (activeTab) {
          case 'docs': return 'L\'essentiel des connaissances pour le Référent IA.';
          case 'outils': return 'Solutions IA validées et recommandées.';
          case 'formations': return 'Parcours de montée en compétences.';
          case 'veille': return 'Actualités et analyse en temps réel.';
          default: return '';
      }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-50 dark:bg-slate-950 relative overflow-hidden transition-colors duration-300">
      {/* Header Mobile */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-4 flex items-center md:hidden sticky top-0 z-10">
        <button onClick={toggleSidebar} className="mr-3 text-slate-600 dark:text-slate-300">
          <Menu size={24} />
        </button>
        <h1 className="font-semibold text-slate-800 dark:text-white">{getTitle()}</h1>
      </header>

      {/* Header Desktop */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-8 py-6 hidden md:block transition-colors duration-300">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white">{getTitle()}</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">{getDescription()}</p>
          </div>
        </div>
      </header>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 scrollbar-thin">
        
        {activeTab === 'docs' && (
          <div className="max-w-5xl mx-auto">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {KNOWLEDGE_BASE_SECTIONS.map((section) => (
                <div 
                  key={section.id} 
                  className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden group"
                >
                  {/* Card Header */}
                  <div className="p-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 group-hover:bg-ref-blue/5 dark:group-hover:bg-ref-blue/10 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-2 py-1 bg-slate-200/60 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300 text-xs font-medium rounded-full uppercase tracking-wider">
                        {section.category}
                      </span>
                      <div className="text-ref-blue dark:text-blue-400">
                        {getIcon(section.icon)}
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 dark:text-white leading-tight">
                      {section.title}
                    </h3>
                  </div>
                  
                  {/* Card Content */}
                  <div className="p-5 flex-1 text-sm text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900">
                    <div className="prose prose-sm prose-slate max-w-none dark:prose-invert">
                      <div className="line-clamp-[12] group-hover:line-clamp-none transition-all">
                          <MarkdownRenderer content={section.content} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-12 p-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-100 dark:border-yellow-900/50">
              <h3 className="font-bold text-yellow-800 dark:text-yellow-500 mb-2">Note de version</h3>
              <p className="text-sm text-yellow-700 dark:text-yellow-600">
                Ce contenu est basé sur l'analyse du "Kit Référent IA - Conception complète" (v1.0). 
                Pour toute question spécifique non traitée ici, utilisez l'Assistant Conversationnel.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'outils' && (
          <div className="max-w-6xl mx-auto">
            {loadingTools ? (
              <div className="flex flex-col items-center justify-center h-64 space-y-4">
                <Loader2 className="w-10 h-10 text-ref-blue animate-spin" />
                <p className="text-slate-500 dark:text-slate-400">Chargement des outils IA...</p>
              </div>
            ) : aiTools.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 space-y-4">
                <Cpu className="w-16 h-16 text-slate-300 dark:text-slate-700" />
                <p className="text-slate-500 dark:text-slate-400">Aucun outil disponible</p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {aiTools.map((tool) => (
                <div key={tool.id} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col">
                   <div className="p-5 border-b border-slate-50 dark:border-slate-800 flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">{tool.name}</h3>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <span className={`px-2 py-0.5 rounded text-xs font-semibold ${getDifficultyColor(tool.difficulty_level)}`}>
                            {tool.difficulty_level}
                          </span>
                          {tool.hosting_type === 'SecNumCloud' && (
                             <span className="px-2 py-0.5 rounded text-xs font-semibold bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 flex items-center">
                               <Shield size={10} className="mr-1" /> SecNumCloud
                             </span>
                          )}
                        </div>
                      </div>
                      {tool.is_validated && (
                        <div title="Outil validé">
                          <CheckCircle size={20} className="text-ref-blue dark:text-blue-400" />
                        </div>
                      )}
                   </div>
                   
                   <div className="p-5 flex-1">
                     <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 min-h-[40px]">{tool.description}</p>
                     
                     <div className="space-y-3">
                       <div>
                         <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase">Usage</span>
                         <div className="flex flex-wrap gap-1 mt-1">
                           {tool.usage_domains.map((domain, idx) => (
                             <span key={idx} className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] rounded-full border border-slate-200 dark:border-slate-700">
                               {domain}
                             </span>
                           ))}
                         </div>
                       </div>
                       
                       <div>
                         <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase">Hébergement</span>
                         <p className="text-xs text-slate-700 dark:text-slate-300 mt-0.5 font-medium">{tool.hosting_type} ({tool.sector})</p>
                       </div>
                     </div>
                   </div>

                   <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                         {tool.cost ? tool.cost : 'Coût non précisé'}
                      </span>
                      {tool.documentation_url && (
                        <a 
                          href={tool.documentation_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-xs font-semibold text-ref-blue dark:text-blue-400 hover:underline flex items-center"
                        >
                          Documentation <ExternalLink size={12} className="ml-1" />
                        </a>
                      )}
                   </div>
                </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'formations' && (
            <div className="max-w-6xl mx-auto">
                <div className="mb-6 flex justify-between items-center">
                   <div className="text-sm text-slate-500 dark:text-slate-400">
                      <span className="font-semibold text-slate-700 dark:text-slate-200">{TRAINING_COURSES.length}</span> formations identifiées
                   </div>
                   <div className="text-xs text-slate-400 dark:text-slate-500">Mise à jour : Octobre 2025</div>
                </div>
                
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {TRAINING_COURSES.map((course) => (
                        <div key={course.id} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col relative">
                            {course.isRecommended && (
                                <div className="absolute top-0 right-0 bg-ref-yellow dark:bg-amber-500 text-amber-800 dark:text-amber-950 text-[10px] font-bold px-2 py-1 rounded-bl-lg rounded-tr-lg border-l border-b border-amber-100 dark:border-amber-600 shadow-sm">
                                    ⭐ Recommandé
                                </div>
                            )}
                            
                            <div className="p-5 border-b border-slate-50 dark:border-slate-800">
                                <span className={`px-2 py-0.5 rounded text-xs font-bold tracking-wide uppercase ${getLevelColor(course.level)}`}>
                                    {course.level.split(' - ')[1] || course.level}
                                </span>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-3 leading-snug">{course.title}</h3>
                                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1 uppercase">{course.organizer}</p>
                            </div>

                            <div className="p-5 flex-1">
                                <div className="space-y-3 mb-4">
                                    <div className="flex items-center text-sm text-slate-600 dark:text-slate-300">
                                        <MapPin size={16} className="mr-2 text-slate-400 dark:text-slate-500" />
                                        <span className="truncate" title={course.modality}>{course.modality}</span>
                                    </div>
                                    <div className="flex items-center text-sm text-slate-600 dark:text-slate-300">
                                        <Clock size={16} className="mr-2 text-slate-400 dark:text-slate-500" />
                                        <span>{course.duration}</span>
                                    </div>
                                     <div className="flex items-center text-sm text-slate-600 dark:text-slate-300">
                                        <Euro size={16} className="mr-2 text-slate-400 dark:text-slate-500" />
                                        <span>{course.cost}</span>
                                    </div>
                                </div>

                                <div>
                                    <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase">Objectifs</span>
                                    <ul className="mt-2 space-y-1">
                                        {course.objectives.slice(0, 2).map((obj, idx) => (
                                            <li key={idx} className="text-xs text-slate-600 dark:text-slate-400 flex items-start">
                                                <span className="mr-1.5 mt-1 w-1 h-1 bg-ref-blue dark:bg-blue-500 rounded-full flex-shrink-0"></span>
                                                {obj}
                                            </li>
                                        ))}
                                        {course.objectives.length > 2 && (
                                            <li className="text-xs text-slate-400 dark:text-slate-500 italic pl-2.5">
                                                +{course.objectives.length - 2} autres objectifs
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            </div>
                            
                            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                                 <button className="text-xs font-semibold text-ref-blue dark:text-blue-400 hover:underline flex items-center">
                                     En savoir plus <ExternalLink size={12} className="ml-1" />
                                 </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}

        {activeTab === 'veille' && (
          <div className="max-w-5xl mx-auto">
            <VeilleInterface />
          </div>
        )}

      </div>
    </div>
  );
};

export default ResourcesInterface;

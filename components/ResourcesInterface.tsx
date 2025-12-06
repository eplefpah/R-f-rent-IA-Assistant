
import React, { useState, useEffect } from 'react';
import { Menu, Trophy, Target, Cpu, Shield, Scale, FileText, ExternalLink, CheckCircle, GraduationCap, Clock, Euro, MapPin, Loader2, HelpCircle, X } from 'lucide-react';
import { KNOWLEDGE_BASE_SECTIONS } from '../constants';
import { TRAINING_COURSES } from '../trainingData';
import { aiToolsService } from '../services/aiToolsService';
import { AiTool } from '../types';
import MarkdownRenderer from './MarkdownRenderer';
import VeilleInterface from './VeilleInterface';

type ResourceTab = 'veille' | 'outils' | 'formations';

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
  const [filterLevel, setFilterLevel] = useState<string>('all');
  const [filterModality, setFilterModality] = useState<string>('all');
  const [filterCost, setFilterCost] = useState<string>('all');

  // Filtres pour les outils IA
  const [filterToolDifficulty, setFilterToolDifficulty] = useState<string>('all');
  const [filterToolHosting, setFilterToolHosting] = useState<string>('all');
  const [filterToolSector, setFilterToolSector] = useState<string>('all');
  const [showHostingHelp, setShowHostingHelp] = useState(false);

  useEffect(() => {
    if (activeTab === 'outils') {
      loadAiTools();
    }
  }, [activeTab]);

  const loadAiTools = async () => {
    setLoadingTools(true);
    try {
      const tools = await aiToolsService.getAllTools();
      console.log('Loaded tools:', tools.length, tools);
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
          case 'outils': return 'Catalogue Outils';
          case 'formations': return 'Catalogue Formations';
          case 'veille': return 'Veille IA (Live)';
          default: return 'Ressources';
      }
  };

  const getDescription = () => {
      switch (activeTab) {
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
              <>
                {/* Filtres pour les outils */}
                <div className="mb-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4">
                  <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Filtres</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Filtre Niveau de difficulté */}
                    <div>
                      <label className="text-xs font-medium text-slate-600 dark:text-slate-400 mb-2 block">Niveau de difficulté</label>
                      <select
                        value={filterToolDifficulty}
                        onChange={(e) => setFilterToolDifficulty(e.target.value)}
                        className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-ref-blue dark:focus:ring-blue-500 text-slate-700 dark:text-slate-300"
                      >
                        <option value="all">Tous les niveaux</option>
                        <option value="Débutant">Débutant</option>
                        <option value="Intermédiaire">Intermédiaire</option>
                        <option value="Avancé">Avancé</option>
                      </select>
                    </div>

                    {/* Filtre Type d'hébergement */}
                    <div>
                      <label className="text-xs font-medium text-slate-600 dark:text-slate-400 mb-2 flex items-center">
                        Type d'hébergement
                        <button
                          onClick={() => setShowHostingHelp(true)}
                          className="ml-2 text-ref-blue dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                          title="Aide sur les types d'hébergement"
                        >
                          <HelpCircle size={14} />
                        </button>
                      </label>
                      <select
                        value={filterToolHosting}
                        onChange={(e) => setFilterToolHosting(e.target.value)}
                        className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-ref-blue dark:focus:ring-blue-500 text-slate-700 dark:text-slate-300"
                      >
                        <option value="all">Tous les types</option>
                        <option value="SecNumCloud">SecNumCloud</option>
                        <option value="Cloud">Cloud</option>
                        <option value="Hybride">Hybride</option>
                        <option value="On-premise">On-premise</option>
                      </select>
                    </div>

                    {/* Filtre Secteur */}
                    <div>
                      <label className="text-xs font-medium text-slate-600 dark:text-slate-400 mb-2 block">Secteur d'usage</label>
                      <select
                        value={filterToolSector}
                        onChange={(e) => setFilterToolSector(e.target.value)}
                        className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-ref-blue dark:focus:ring-blue-500 text-slate-700 dark:text-slate-300"
                      >
                        <option value="all">Tous les secteurs</option>
                        <option value="Transversal">Transversal</option>
                        <option value="Juridique">Juridique</option>
                        <option value="Santé">Santé</option>
                        <option value="Culture et patrimoine">Culture et patrimoine</option>
                        <option value="Education/Recherche scientifique">Éducation/Recherche</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Compteur de résultats */}
                <div className="mb-6 flex justify-between items-center">
                  <div className="text-sm text-slate-500 dark:text-slate-400">
                    <span className="font-semibold text-slate-700 dark:text-slate-200">
                      {aiTools.filter(tool => {
                        const difficultyMatch = filterToolDifficulty === 'all' || tool.difficulty_level === filterToolDifficulty;
                        const hostingMatch = filterToolHosting === 'all' || tool.hosting_type === filterToolHosting;
                        const sectorMatch = filterToolSector === 'all' ||
                          tool.usage_domains.some(domain => domain.includes(filterToolSector)) ||
                          (filterToolSector === 'Transversal' && tool.usage_domains.includes('Usage transversal'));
                        return difficultyMatch && hostingMatch && sectorMatch;
                      }).length}
                    </span> outils trouvés
                  </div>
                  <div className="text-xs text-slate-400 dark:text-slate-500">Mise à jour : Décembre 2025</div>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {aiTools.filter(tool => {
                  const difficultyMatch = filterToolDifficulty === 'all' || tool.difficulty_level === filterToolDifficulty;
                  const hostingMatch = filterToolHosting === 'all' || tool.hosting_type === filterToolHosting;
                  const sectorMatch = filterToolSector === 'all' ||
                    tool.usage_domains.some(domain => domain.includes(filterToolSector)) ||
                    (filterToolSector === 'Transversal' && tool.usage_domains.includes('Usage transversal'));
                  return difficultyMatch && hostingMatch && sectorMatch;
                }).map((tool) => (
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
              </>
            )}
          </div>
        )}

        {activeTab === 'formations' && (
            <div className="max-w-6xl mx-auto">
                {/* Filtres */}
                <div className="mb-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4">
                  <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Filtres</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Filtre Niveau */}
                    <div>
                      <label className="text-xs font-medium text-slate-600 dark:text-slate-400 mb-2 block">Niveau</label>
                      <select
                        value={filterLevel}
                        onChange={(e) => setFilterLevel(e.target.value)}
                        className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-ref-blue dark:focus:ring-blue-500 text-slate-700 dark:text-slate-300"
                      >
                        <option value="all">Tous les niveaux</option>
                        <option value="Niveau 1 - Distant">Niveau 1 - Distant</option>
                        <option value="Niveau 2 - Confirmé">Niveau 2 - Confirmé</option>
                        <option value="Niveau 3 - Expert">Niveau 3 - Expert</option>
                        <option value="Transversal">Transversal</option>
                      </select>
                    </div>

                    {/* Filtre Modalité */}
                    <div>
                      <label className="text-xs font-medium text-slate-600 dark:text-slate-400 mb-2 block">Modalité</label>
                      <select
                        value={filterModality}
                        onChange={(e) => setFilterModality(e.target.value)}
                        className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-ref-blue dark:focus:ring-blue-500 text-slate-700 dark:text-slate-300"
                      >
                        <option value="all">Toutes les modalités</option>
                        <option value="À distance">À distance</option>
                        <option value="Présentiel">Présentiel</option>
                        <option value="Hybride">Hybride</option>
                      </select>
                    </div>

                    {/* Filtre Coût */}
                    <div>
                      <label className="text-xs font-medium text-slate-600 dark:text-slate-400 mb-2 block">Coût</label>
                      <select
                        value={filterCost}
                        onChange={(e) => setFilterCost(e.target.value)}
                        className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-ref-blue dark:focus:ring-blue-500 text-slate-700 dark:text-slate-300"
                      >
                        <option value="all">Tous les coûts</option>
                        <option value="Gratuit">Gratuit</option>
                        <option value="Payant">Payant</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="mb-6 flex justify-between items-center">
                   <div className="text-sm text-slate-500 dark:text-slate-400">
                      <span className="font-semibold text-slate-700 dark:text-slate-200">
                        {TRAINING_COURSES.filter(course => {
                          const levelMatch = filterLevel === 'all' || course.level === filterLevel;
                          const modalityMatch = filterModality === 'all' || course.modality.includes(filterModality);
                          const costMatch = filterCost === 'all' ||
                            (filterCost === 'Gratuit' && course.cost === 'Gratuit') ||
                            (filterCost === 'Payant' && course.cost !== 'Gratuit');
                          return levelMatch && modalityMatch && costMatch;
                        }).length}
                      </span> formations trouvées
                   </div>
                   <div className="text-xs text-slate-400 dark:text-slate-500">Mise à jour : Octobre 2025</div>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {TRAINING_COURSES.filter(course => {
                      const levelMatch = filterLevel === 'all' || course.level === filterLevel;
                      const modalityMatch = filterModality === 'all' || course.modality.includes(filterModality);
                      const costMatch = filterCost === 'all' ||
                        (filterCost === 'Gratuit' && course.cost === 'Gratuit') ||
                        (filterCost === 'Payant' && course.cost !== 'Gratuit');
                      return levelMatch && modalityMatch && costMatch;
                    }).map((course) => (
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

      {/* Modal d'aide pour les types d'hébergement */}
      {showHostingHelp && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowHostingHelp(false)}>
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="sticky top-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Types d'hébergement : Guide pratique</h3>
              <button
                onClick={() => setShowHostingHelp(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* SecNumCloud */}
              <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-xl p-4">
                <div className="flex items-start">
                  <Shield className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-indigo-900 dark:text-indigo-300 mb-2">SecNumCloud</h4>
                    <p className="text-sm text-slate-700 dark:text-slate-300">
                      C'est un cloud <strong>certifié et ultra-sécurisé</strong>, approuvé par l'<strong>ANSSI</strong> (l'agence française de cybersécurité).
                      En gros, c'est du cloud "made in France" avec des garanties fortes sur la protection des données sensibles.
                    </p>
                    <div className="mt-2 inline-flex items-center px-2 py-1 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-800 dark:text-indigo-300 text-xs rounded-full">
                      <Shield size={12} className="mr-1" /> Recommandé pour données sensibles
                    </div>
                  </div>
                </div>
              </div>

              {/* Cloud */}
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
                <div className="flex items-start">
                  <Cpu className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-blue-900 dark:text-blue-300 mb-2">Cloud</h4>
                    <p className="text-sm text-slate-700 dark:text-slate-300">
                      Les données et logiciels sont hébergés sur <strong>internet</strong> (dans des serveurs à distance, souvent gérés par des
                      entreprises comme AWS, Microsoft, Google, etc.). Tu n'as rien à entretenir localement.
                    </p>
                    <div className="mt-2 inline-flex items-center px-2 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 text-xs rounded-full">
                      Accessible partout, maintenance simplifiée
                    </div>
                  </div>
                </div>
              </div>

              {/* Hybride */}
              <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-xl p-4">
                <div className="flex items-start">
                  <Target className="w-5 h-5 text-purple-600 dark:text-purple-400 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-purple-900 dark:text-purple-300 mb-2">Hybride</h4>
                    <p className="text-sm text-slate-700 dark:text-slate-300">
                      Une combinaison du cloud et de serveurs locaux. Par exemple, <strong>les données sensibles restent chez toi</strong>, mais
                      le reste est dans le cloud. C'est un peu le meilleur des deux mondes.
                    </p>
                    <div className="mt-2 inline-flex items-center px-2 py-1 bg-purple-100 dark:bg-purple-900/40 text-purple-800 dark:text-purple-300 text-xs rounded-full">
                      Flexibilité et contrôle sélectif
                    </div>
                  </div>
                </div>
              </div>

              {/* On-premise */}
              <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl p-4">
                <div className="flex items-start">
                  <Scale className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-emerald-900 dark:text-emerald-300 mb-2">On-premise (sur site)</h4>
                    <p className="text-sm text-slate-700 dark:text-slate-300">
                      Tout est hébergé et géré dans <strong>tes propres locaux</strong>, sur tes machines. Tu as le contrôle total,
                      mais cela demande plus d'entretien et de compétences techniques.
                    </p>
                    <div className="mt-2 inline-flex items-center px-2 py-1 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300 text-xs rounded-full">
                      Contrôle maximal, maintenance requise
                    </div>
                  </div>
                </div>
              </div>

              {/* Note de bas de page */}
              <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg p-4 mt-6">
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  <strong>Conseil :</strong> Pour les administrations publiques, privilégiez les solutions <strong>SecNumCloud</strong> ou
                  <strong> On-premise</strong> pour les données sensibles, conformément aux recommandations de l'ANSSI.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-slate-200 dark:border-slate-800 px-6 py-4 flex justify-end">
              <button
                onClick={() => setShowHostingHelp(false)}
                className="px-4 py-2 bg-ref-blue dark:bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-700 transition-colors font-medium text-sm"
              >
                J'ai compris
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResourcesInterface;

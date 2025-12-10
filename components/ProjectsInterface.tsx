import React, { useState, useEffect } from 'react';
import { Menu, Plus, FileText, AlertCircle, Loader2, Sparkles, TrendingUp, Users, Download, BookOpen, Activity } from 'lucide-react';
import { supabase } from '../services/supabaseClient';
import { RequirementForm } from '../types';
import RequirementsFormModal from './RequirementsFormModal';
import { generateAISolution } from '../services/aiSolutionService';
import MarkdownRenderer from './MarkdownRenderer';
import { getProjectKPIs, trackProjectView, trackResourceDownload, ProjectKPI, getEngagementLevel } from '../services/projectKpiService';

interface ProjectsInterfaceProps {
  toggleSidebar: () => void;
}

const ProjectsInterface: React.FC<ProjectsInterfaceProps> = ({ toggleSidebar }) => {
  const [loading, setLoading] = useState(true);
  const [requirementsForms, setRequirementsForms] = useState<RequirementForm[]>([]);
  const [selectedRequirement, setSelectedRequirement] = useState<RequirementForm | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [generatingSolution, setGeneratingSolution] = useState<string | null>(null);
  const [aiSolution, setAiSolution] = useState<string>('');
  const [showSolutionModal, setShowSolutionModal] = useState(false);
  const [projectKPIs, setProjectKPIs] = useState<Map<string, ProjectKPI>>(new Map());

  useEffect(() => {
    loadRequirementsForms();
    loadKPIs();
  }, []);

  const loadKPIs = async () => {
    try {
      const kpis = await getProjectKPIs();
      const kpiMap = new Map<string, ProjectKPI>();
      kpis.forEach(kpi => {
        kpiMap.set(kpi.project_id, kpi);
      });
      setProjectKPIs(kpiMap);
    } catch (error) {
      console.error('Error loading KPIs:', error);
    }
  };

  const loadRequirementsForms = async () => {
    try {
      const { data, error } = await supabase
        .from('requirements_forms')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRequirementsForms(data || []);
    } catch (error) {
      console.error('Error loading requirements forms:', error);
    } finally {
      setLoading(false);
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'faible':
        return 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800';
      case 'moyen':
        return 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800';
      case 'fort':
        return 'bg-orange-50 dark:bg-orange-900/20 text-orange-900 dark:text-orange-300 border-orange-200 dark:border-orange-800';
      case 'critique':
        return 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800';
      default:
        return 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700';
    }
  };

  const getImpactIcon = (impact: string) => {
    switch (impact) {
      case 'faible':
        return '●';
      case 'moyen':
        return '●●';
      case 'fort':
        return '●●●';
      case 'critique':
        return '⚠';
      default:
        return '○';
    }
  };

  const getImpactLabel = (impact: string) => {
    switch (impact) {
      case 'faible':
        return 'Impact faible';
      case 'moyen':
        return 'Impact moyen';
      case 'fort':
        return 'Impact fort';
      case 'critique':
        return 'Impact critique';
      default:
        return 'Non défini';
    }
  };

  const handleViewRequirement = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('requirements_forms')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setSelectedRequirement(data);

      await trackProjectView(id);
      loadKPIs();
    } catch (error) {
      console.error('Error loading requirement details:', error);
    }
  };

  const handleGenerateSolution = async (requirement: RequirementForm) => {
    setGeneratingSolution(requirement.id);
    setAiSolution('');
    setShowSolutionModal(true);

    try {
      await generateAISolution(
        requirement,
        (chunk) => {
          setAiSolution(prev => prev + chunk);
        }
      );
    } catch (error) {
      console.error('Error generating solution:', error);
      setAiSolution('Erreur lors de la génération de la solution. Veuillez réessayer.');
    } finally {
      setGeneratingSolution(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="sticky top-0 z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center justify-between p-4 max-w-6xl mx-auto">
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleSidebar}
              className="md:hidden p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition"
            >
              <Menu size={24} className="text-slate-600 dark:text-slate-400" />
            </button>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Diagnostics de besoins métier</h1>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Identifiez et documentez les besoins terrain pour orienter les solutions IA
              </p>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-ref-blue to-blue-500 dark:from-blue-600 dark:to-blue-700 text-white rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all font-medium"
            >
              <Plus className="w-5 h-5" />
              <span className="hidden sm:inline">Créer un projet</span>
            </button>
          </div>
        </div>
      </div>

      <div className="p-6 max-w-6xl mx-auto">
        {loading ? (
          <div className="text-center py-20">
            <Loader2 className="w-10 h-10 text-ref-blue dark:text-blue-500 animate-spin mx-auto mb-4" />
            <p className="text-slate-600 dark:text-slate-400">Chargement...</p>
          </div>
        ) : requirementsForms.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 p-12">
            <div className="max-w-md mx-auto text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-ref-blue/20 to-blue-400/20 dark:from-blue-500/20 dark:to-blue-600/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <FileText className="w-10 h-10 text-ref-blue dark:text-blue-500" />
              </div>

              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                Aucun diagnostic pour le moment
              </h2>

              <p className="text-slate-600 dark:text-slate-400 mb-8 text-lg leading-relaxed">
                Créez votre premier diagnostic de besoin pour identifier les opportunités d'automatisation par l'IA.
              </p>

              <button
                onClick={() => setShowForm(true)}
                className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-ref-blue to-blue-500 dark:from-blue-600 dark:to-blue-700 text-white rounded-xl hover:shadow-xl transform hover:-translate-y-1 transition-all text-lg font-semibold"
              >
                <Plus className="w-6 h-6" />
                <span>Créer mon premier diagnostic</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-ref-blue dark:bg-blue-600 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">
                    {requirementsForms.length} diagnostic{requirementsForms.length > 1 ? 's' : ''} enregistré{requirementsForms.length > 1 ? 's' : ''}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Triés du plus récent au plus ancien</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {requirementsForms.map((form) => {
                const kpi = projectKPIs.get(form.id);
                const engagement = kpi ? getEngagementLevel(kpi) : null;

                return (
                  <div
                    key={form.id}
                    className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-ref-blue dark:hover:border-blue-600 hover:shadow-lg transition-all group"
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start space-x-4 mb-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-ref-blue/10 to-blue-400/10 dark:from-blue-500/10 dark:to-blue-600/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:from-ref-blue/20 group-hover:to-blue-400/20 dark:group-hover:from-blue-500/20 dark:group-hover:to-blue-600/20 transition">
                              <FileText className="w-6 h-6 text-ref-blue dark:text-blue-500" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-ref-blue dark:group-hover:text-blue-500 transition mb-2">
                                {form.title}
                              </h3>
                              <div className="flex flex-wrap items-center gap-3 mb-3">
                                <span className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border ${getImpactColor(form.business_impact)}`}>
                                  <span>{getImpactIcon(form.business_impact)}</span>
                                  <span>{getImpactLabel(form.business_impact)}</span>
                                </span>
                                {engagement && (
                                  <span className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold ${engagement.color}`}>
                                    <Activity className="w-3 h-3" />
                                    <span>{engagement.label}</span>
                                  </span>
                                )}
                                <span className="text-sm text-slate-500 dark:text-slate-400">
                                  Créé le {new Date(form.created_at).toLocaleDateString('fr-FR', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric'
                                  })}
                                </span>
                              </div>

                              {form.problem_description && (
                                <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-4">
                                  {form.problem_description}
                                </p>
                              )}

                              {kpi && (
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                                  <div className="flex items-center space-x-2">
                                    <div className="w-8 h-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                                      <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <div>
                                      <p className="text-xs text-slate-500 dark:text-slate-400">Connexions</p>
                                      <p className="text-sm font-bold text-slate-900 dark:text-white">
                                        {kpi.monthly_logins}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <div className="w-8 h-8 bg-green-50 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                                      <BookOpen className="w-4 h-4 text-green-600 dark:text-green-400" />
                                    </div>
                                    <div>
                                      <p className="text-xs text-slate-500 dark:text-slate-400">Parcours</p>
                                      <p className="text-sm font-bold text-slate-900 dark:text-white">
                                        {kpi.trainings_completed}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <div className="w-8 h-8 bg-purple-50 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                                      <Download className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                                    </div>
                                    <div>
                                      <p className="text-xs text-slate-500 dark:text-slate-400">Téléchargements</p>
                                      <p className="text-sm font-bold text-slate-900 dark:text-white">
                                        {kpi.resources_downloaded}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <div className="w-8 h-8 bg-orange-50 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
                                      <TrendingUp className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                                    </div>
                                    <div>
                                      <p className="text-xs text-slate-500 dark:text-slate-400">Activités</p>
                                      <p className="text-sm font-bold text-slate-900 dark:text-white">
                                        {kpi.total_activities}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="ml-6 flex flex-col space-y-2">
                          <button
                            onClick={() => handleViewRequirement(form.id)}
                            className="px-6 py-2.5 bg-gradient-to-r from-ref-blue to-blue-500 dark:from-blue-600 dark:to-blue-700 text-white rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all text-sm font-medium whitespace-nowrap"
                          >
                            Consulter
                          </button>
                          <button
                            onClick={() => handleGenerateSolution(form)}
                            disabled={generatingSolution === form.id}
                            className="px-6 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 dark:from-purple-600 dark:to-pink-600 text-white rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all text-sm font-medium whitespace-nowrap flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {generatingSolution === form.id ? (
                              <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                <span>Génération...</span>
                              </>
                            ) : (
                              <>
                                <Sparkles className="w-4 h-4" />
                                <span>Solution IA</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {showForm && (
          <RequirementsFormModal
            onClose={() => setShowForm(false)}
            onSuccess={() => {
              setShowForm(false);
              loadRequirementsForms();
            }}
          />
        )}

        {selectedRequirement && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{selectedRequirement.title}</h2>
                <button
                  onClick={() => setSelectedRequirement(null)}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition"
                >
                  <span className="text-2xl text-slate-400 dark:text-slate-500">&times;</span>
                </button>
              </div>

              <div className="p-6 space-y-6">
                <div className="flex items-center space-x-3">
                  <span className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border ${getImpactColor(selectedRequirement.business_impact)}`}>
                    <span>{getImpactIcon(selectedRequirement.business_impact)}</span>
                    <span>{getImpactLabel(selectedRequirement.business_impact)}</span>
                  </span>
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    Créé le {new Date(selectedRequirement.created_at).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </span>
                </div>

                {selectedRequirement.business_context && (
                  <div>
                    <h3 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase mb-2">Contexte métier</h3>
                    <p className="text-slate-700 dark:text-slate-300">{selectedRequirement.business_context}</p>
                  </div>
                )}

                {selectedRequirement.problem_description && (
                  <div>
                    <h3 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase mb-2">Description du problème</h3>
                    <p className="text-slate-700 dark:text-slate-300">{selectedRequirement.problem_description}</p>
                  </div>
                )}

                {selectedRequirement.frequency && (
                  <div>
                    <h3 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase mb-2">Fréquence</h3>
                    <p className="text-slate-700 dark:text-slate-300">{selectedRequirement.frequency}</p>
                  </div>
                )}

                {selectedRequirement.desired_deadline && (
                  <div>
                    <h3 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase mb-2">Délai souhaité</h3>
                    <p className="text-slate-700 dark:text-slate-300">{selectedRequirement.desired_deadline}</p>
                  </div>
                )}

                {selectedRequirement.data_resources && (
                  <div>
                    <h3 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase mb-2">Ressources de données</h3>
                    <p className="text-slate-700 dark:text-slate-300">{selectedRequirement.data_resources}</p>
                  </div>
                )}

                {selectedRequirement.specific_constraints && (
                  <div>
                    <h3 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase mb-2">Contraintes spécifiques</h3>
                    <p className="text-slate-700 dark:text-slate-300">{selectedRequirement.specific_constraints}</p>
                  </div>
                )}

                {selectedRequirement.current_solutions && (
                  <div>
                    <h3 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase mb-2">Solutions actuelles</h3>
                    <p className="text-slate-700 dark:text-slate-300">{selectedRequirement.current_solutions}</p>
                  </div>
                )}

                {selectedRequirement.ai_summary && (
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <h3 className="text-sm font-bold text-blue-900 dark:text-blue-300 uppercase mb-2 flex items-center">
                      <AlertCircle size={16} className="mr-2" />
                      Résumé IA
                    </h3>
                    <p className="text-blue-800 dark:text-blue-200">{selectedRequirement.ai_summary}</p>
                  </div>
                )}

                {selectedRequirement.attachments && selectedRequirement.attachments.length > 0 && (
                  <div>
                    <h3 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase mb-2">Pièces jointes</h3>
                    <div className="space-y-2">
                      {selectedRequirement.attachments.map((file, idx) => (
                        <div key={idx} className="flex items-center justify-between bg-slate-50 dark:bg-slate-800 rounded-lg p-3 border border-slate-200 dark:border-slate-700">
                          <div className="flex items-center space-x-3">
                            <FileText size={20} className="text-slate-400 dark:text-slate-500" />
                            <div>
                              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{file.name}</p>
                              <p className="text-xs text-slate-500 dark:text-slate-400">
                                {(file.size / 1024).toFixed(2)} KB
                              </p>
                            </div>
                          </div>
                          <a
                            href={file.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={async () => {
                              await trackResourceDownload(selectedRequirement.id, file.name);
                              loadKPIs();
                            }}
                            className="text-xs font-semibold text-ref-blue dark:text-blue-400 hover:underline"
                          >
                            Télécharger
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {showSolutionModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-gradient-to-r from-purple-500 to-pink-500 dark:from-purple-600 dark:to-pink-600 text-white p-6 flex items-center justify-between rounded-t-2xl z-10">
                <div className="flex items-center space-x-3">
                  <Sparkles className="w-6 h-6" />
                  <h2 className="text-2xl font-bold">Solution IA Générée</h2>
                </div>
                <button
                  onClick={() => {
                    setShowSolutionModal(false);
                    setAiSolution('');
                  }}
                  className="p-2 hover:bg-white/20 rounded-lg transition"
                >
                  <span className="text-2xl">&times;</span>
                </button>
              </div>

              <div className="p-6">
                {generatingSolution ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="w-8 h-8 text-purple-500 dark:text-purple-400 animate-spin" />
                    <span className="ml-3 text-slate-600 dark:text-slate-400">Génération de la solution en cours...</span>
                  </div>
                ) : aiSolution ? (
                  <div className="prose prose-slate dark:prose-invert max-w-none">
                    <MarkdownRenderer content={aiSolution} />
                  </div>
                ) : (
                  <div className="text-center py-8 text-slate-600 dark:text-slate-400">
                    Aucune solution générée
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsInterface;

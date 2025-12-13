import React, { useState, useEffect } from 'react';
import { Menu, User, Building2, Briefcase, Award, Calendar, Save, Edit2, X, CheckCircle, Sparkles, Brain, Cloud, Server } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import SpaceBackground from './SpaceBackground';
import { AVAILABLE_OLLAMA_MODELS, OllamaModel } from '../services/ollamaService';

interface ProfileInterfaceProps {
  toggleSidebar: () => void;
}

const ProfileInterface: React.FC<ProfileInterfaceProps> = ({ toggleSidebar }) => {
  const { profile, user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    organization: '',
    role: '',
    satellites_enabled: false,
    tooltips_enabled: true,
    allow_contact: true,
    preferred_model_provider: 'gemini' as 'gemini' | 'ollama',
    preferred_ollama_model: ''
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || '',
        organization: profile.organization || '',
        role: profile.role || '',
        satellites_enabled: profile.satellites_enabled || false,
        tooltips_enabled: profile.tooltips_enabled !== false,
        allow_contact: profile.allow_contact !== false,
        preferred_model_provider: (profile.preferred_model_provider as 'gemini' | 'ollama') || 'gemini',
        preferred_ollama_model: profile.preferred_ollama_model || ''
      });
    }
  }, [profile]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const { error } = await updateProfile(formData);
      if (error) {
        console.error('Error updating profile:', error);
        alert('Erreur lors de la mise à jour du profil');
      } else {
        setIsEditing(false);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Erreur lors de la mise à jour du profil');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      full_name: profile?.full_name || '',
      organization: profile?.organization || '',
      role: profile?.role || '',
      satellites_enabled: profile?.satellites_enabled || false,
      tooltips_enabled: profile?.tooltips_enabled !== false,
      allow_contact: profile?.allow_contact !== false,
      preferred_model_provider: (profile?.preferred_model_provider as 'gemini' | 'ollama') || 'gemini',
      preferred_ollama_model: profile?.preferred_ollama_model || ''
    });
    setIsEditing(false);
  };

  const getCompetencyLevelColor = (level: string | null | undefined) => {
    if (!level) return 'gray';
    if (level.includes('Niveau 1')) return 'yellow';
    if (level.includes('Niveau 2')) return 'blue';
    if (level.includes('Niveau 3')) return 'green';
    return 'gray';
  };

  const getCompetencyLevelBadge = (level: string | null | undefined) => {
    const color = getCompetencyLevelColor(level);
    const colorClasses = {
      gray: 'bg-gray-100 dark:bg-gray-500/20 text-gray-600 dark:text-gray-400',
      yellow: 'bg-yellow-100 dark:bg-yellow-500/20 text-yellow-700 dark:text-yellow-400',
      blue: 'bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400',
      green: 'bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400'
    };

    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${colorClasses[color]}`}>
        {level || 'Non évalué'}
      </span>
    );
  };

  return (
    <div className="h-full w-full relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white dark:from-[#0A1628] dark:via-[#1a2942] dark:to-[#0f1c33] z-0" />
      <SpaceBackground satellitesEnabled={profile?.satellites_enabled || false} />

      <div className="relative z-10 h-full overflow-y-auto">
        <div className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-white/10 shadow-sm">
          <div className="max-w-6xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={toggleSidebar}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-slate-600 dark:text-white transition-colors md:hidden"
                >
                  <Menu size={24} />
                </button>
                <h1 className="text-xl font-bold text-gray-800 dark:text-white">Mon Profil</h1>
              </div>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-[#6B9BD2] to-[#90E4C1] text-white rounded-lg font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
                >
                  <Edit2 size={18} />
                  <span>Modifier</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {showSuccess && (
          <div className="max-w-4xl mx-auto px-6 pt-6">
            <div className="bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/30 rounded-xl p-4 flex items-center gap-3">
              <CheckCircle className="text-green-500 dark:text-green-400" size={24} />
              <div className="flex-1">
                <h3 className="text-green-700 dark:text-green-400 font-semibold">Profil mis à jour</h3>
                <p className="text-green-600 dark:text-green-300 text-sm">Vos informations ont été enregistrées avec succès</p>
              </div>
            </div>
          </div>
        )}

        <div className="max-w-4xl mx-auto px-6 py-12 space-y-6">
          <div className="bg-white dark:bg-white/5 rounded-2xl p-8 border border-gray-200 dark:border-white/10 shadow-sm">
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-[#6B9BD2] to-[#90E4C1] rounded-full flex items-center justify-center">
                <User size={40} className="text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                  {profile?.full_name || 'Référent IA'}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">{profile?.email || user?.email}</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <div className="flex items-center space-x-2">
                    <User size={16} />
                    <span>Nom complet</span>
                  </div>
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#6B9BD2]"
                    placeholder="Votre nom complet"
                  />
                ) : (
                  <div className="px-4 py-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-gray-800 dark:text-white">
                    {profile?.full_name || 'Non renseigné'}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <div className="flex items-center space-x-2">
                    <Building2 size={16} />
                    <span>Organisation / Institution</span>
                  </div>
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#6B9BD2]"
                    placeholder="Nom de votre organisation"
                  />
                ) : (
                  <div className="px-4 py-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-gray-800 dark:text-white">
                    {profile?.organization || 'Non renseigné'}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <div className="flex items-center space-x-2">
                    <Briefcase size={16} />
                    <span>Fonction / Poste</span>
                  </div>
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#6B9BD2]"
                    placeholder="Votre fonction"
                  />
                ) : (
                  <div className="px-4 py-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-gray-800 dark:text-white">
                    {profile?.role || 'Non renseigné'}
                  </div>
                )}
              </div>

              {isEditing && (
                <div className="flex items-center space-x-4 pt-4">
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-[#6B9BD2] to-[#90E4C1] text-white rounded-lg font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    <Save size={18} />
                    <span>{isSaving ? 'Enregistrement...' : 'Enregistrer'}</span>
                  </button>
                  <button
                    onClick={handleCancel}
                    disabled={isSaving}
                    className="flex items-center space-x-2 px-6 py-3 bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-white/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <X size={18} />
                    <span>Annuler</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white dark:bg-white/5 rounded-2xl p-8 border border-gray-200 dark:border-white/10 shadow-sm">
            <div className="flex items-center space-x-3 mb-6">
              <Award className="w-8 h-8 text-[#6B9BD2]" />
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">Niveau de compétence IA</h3>
            </div>

            {profile?.competency_level ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 dark:text-gray-300">Niveau actuel</span>
                  {getCompetencyLevelBadge(profile.competency_level)}
                </div>

                {profile.competency_score !== undefined && profile.competency_score !== null && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700 dark:text-gray-300">Score</span>
                    <span className="text-2xl font-bold text-[#6B9BD2] dark:text-[#90E4C1]">
                      {profile.competency_score}/100
                    </span>
                  </div>
                )}

                {profile.competency_evaluated_at && (
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                    <Calendar size={16} />
                    <span>
                      Évalué le {new Date(profile.competency_evaluated_at).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                )}

                <div className="pt-4 border-t border-gray-200 dark:border-white/10">
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      window.dispatchEvent(new CustomEvent('navigate', { detail: 'competency-evaluation' }));
                    }}
                    className="text-[#6B9BD2] hover:text-[#90E4C1] font-medium transition"
                  >
                    Refaire l'évaluation →
                  </a>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-gray-400 dark:text-gray-600" />
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Vous n'avez pas encore évalué votre niveau de compétence en IA
                </p>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    window.dispatchEvent(new CustomEvent('navigate', { detail: 'competency-evaluation' }));
                  }}
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-[#6B9BD2] to-[#90E4C1] text-white rounded-lg font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
                >
                  <Award size={18} />
                  <span>Commencer l'évaluation</span>
                </a>
              </div>
            )}
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-slate-50 dark:from-blue-500/10 dark:to-slate-500/10 rounded-2xl p-8 border border-blue-200 dark:border-blue-500/20">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Informations du compte</h3>
            <div className="space-y-4">
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Email</span>
                  <span className="text-gray-800 dark:text-white font-medium">{user?.email}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Membre depuis</span>
                  <span className="text-gray-800 dark:text-white font-medium">
                    {profile?.created_at ? new Date(profile.created_at).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    }) : 'N/A'}
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-blue-200 dark:border-blue-500/20">
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="allow_contact"
                    checked={formData.allow_contact}
                    onChange={(e) => {
                      const newValue = e.target.checked;
                      setFormData({ ...formData, allow_contact: newValue });
                      if (!isEditing) {
                        updateProfile({ allow_contact: newValue });
                      }
                    }}
                    className="mt-1 w-5 h-5 rounded border-gray-300 dark:border-gray-600 text-[#6B9BD2] focus:ring-[#6B9BD2] dark:bg-white/10"
                  />
                  <label htmlFor="allow_contact" className="flex-1 cursor-pointer">
                    <div className="font-medium text-gray-800 dark:text-white mb-1 text-sm">
                      Autoriser les autres utilisateurs à me contacter
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Votre adresse email sera visible dans l'annuaire des Référents IA
                    </p>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-white/5 rounded-2xl p-8 border border-gray-200 dark:border-white/10 shadow-sm">
            <div className="flex items-center space-x-3 mb-6">
              <Sparkles className="w-8 h-8 text-[#6B9BD2]" />
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">Préférences</h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-4 p-4 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/10">
                <input
                  type="checkbox"
                  id="satellites_enabled"
                  checked={formData.satellites_enabled}
                  onChange={(e) => {
                    const newValue = e.target.checked;
                    setFormData({ ...formData, satellites_enabled: newValue });
                    if (!isEditing) {
                      updateProfile({ satellites_enabled: newValue });
                    }
                  }}
                  className="mt-1 w-5 h-5 rounded border-gray-300 dark:border-gray-600 text-[#6B9BD2] focus:ring-[#6B9BD2] dark:bg-white/10"
                />
                <label htmlFor="satellites_enabled" className="flex-1 cursor-pointer">
                  <div className="font-medium text-gray-800 dark:text-white mb-1">
                    Animations spatiales
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Activer les satellites animés en mode sombre pour une expérience visuelle immersive
                  </p>
                </label>
              </div>

              <div className="flex items-start space-x-4 p-4 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/10">
                <input
                  type="checkbox"
                  id="tooltips_enabled"
                  checked={formData.tooltips_enabled}
                  onChange={(e) => {
                    const newValue = e.target.checked;
                    setFormData({ ...formData, tooltips_enabled: newValue });
                    if (!isEditing) {
                      updateProfile({ tooltips_enabled: newValue });
                    }
                  }}
                  className="mt-1 w-5 h-5 rounded border-gray-300 dark:border-gray-600 text-[#6B9BD2] focus:ring-[#6B9BD2] dark:bg-white/10"
                />
                <label htmlFor="tooltips_enabled" className="flex-1 cursor-pointer">
                  <div className="font-medium text-gray-800 dark:text-white mb-1">
                    Infos-bulles de navigation
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Afficher des descriptions au survol des éléments de navigation pour faciliter votre orientation
                  </p>
                </label>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-white/5 rounded-2xl p-8 border border-gray-200 dark:border-white/10 shadow-sm">
            <div className="flex items-center space-x-3 mb-6">
              <Brain className="w-8 h-8 text-[#6B9BD2]" />
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">Modèle d'IA</h3>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Fournisseur d'IA
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      const newProvider = 'gemini';
                      setFormData({ ...formData, preferred_model_provider: newProvider });
                      if (!isEditing) {
                        updateProfile({ preferred_model_provider: newProvider });
                      }
                    }}
                    className={`flex items-center space-x-3 p-4 rounded-xl border-2 transition-all ${
                      formData.preferred_model_provider === 'gemini'
                        ? 'border-[#6B9BD2] bg-blue-50 dark:bg-blue-500/10'
                        : 'border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20'
                    }`}
                  >
                    <Cloud className={`w-6 h-6 ${
                      formData.preferred_model_provider === 'gemini'
                        ? 'text-[#6B9BD2]'
                        : 'text-gray-400 dark:text-gray-600'
                    }`} />
                    <div className="flex-1 text-left">
                      <div className={`font-semibold ${
                        formData.preferred_model_provider === 'gemini'
                          ? 'text-[#6B9BD2]'
                          : 'text-gray-700 dark:text-gray-300'
                      }`}>
                        Gemini
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Cloud Google</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      const newProvider = 'ollama';
                      setFormData({ ...formData, preferred_model_provider: newProvider });
                      if (!isEditing) {
                        updateProfile({ preferred_model_provider: newProvider });
                      }
                    }}
                    className={`flex items-center space-x-3 p-4 rounded-xl border-2 transition-all ${
                      formData.preferred_model_provider === 'ollama'
                        ? 'border-[#90E4C1] bg-green-50 dark:bg-green-500/10'
                        : 'border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20'
                    }`}
                  >
                    <Server className={`w-6 h-6 ${
                      formData.preferred_model_provider === 'ollama'
                        ? 'text-[#90E4C1]'
                        : 'text-gray-400 dark:text-gray-600'
                    }`} />
                    <div className="flex-1 text-left">
                      <div className={`font-semibold ${
                        formData.preferred_model_provider === 'ollama'
                          ? 'text-[#90E4C1]'
                          : 'text-gray-700 dark:text-gray-300'
                      }`}>
                        Ollama
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">On-premise</div>
                    </div>
                  </button>
                </div>
              </div>

              {formData.preferred_model_provider === 'ollama' && (
                <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-white/10">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Modèle Ollama
                  </label>

                  {['recommended', 'optimized', 'specialized', 'generalist'].map((category) => {
                    const categoryModels = AVAILABLE_OLLAMA_MODELS.filter(m => m.category === category);
                    if (categoryModels.length === 0) return null;

                    const categoryLabels = {
                      recommended: '🚀 Recommandés',
                      optimized: '⚡ Optimisés',
                      specialized: '🎯 Spécialisés',
                      generalist: '💬 Généralistes'
                    };

                    return (
                      <div key={category} className="space-y-2">
                        <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                          {categoryLabels[category as keyof typeof categoryLabels]}
                        </div>
                        <div className="grid gap-2">
                          {categoryModels.map((model) => (
                            <button
                              key={model.name}
                              type="button"
                              onClick={() => {
                                const newModel = model.name;
                                setFormData({ ...formData, preferred_ollama_model: newModel });
                                if (!isEditing) {
                                  updateProfile({ preferred_ollama_model: newModel });
                                }
                              }}
                              className={`flex items-start p-3 rounded-lg border transition-all text-left ${
                                formData.preferred_ollama_model === model.name
                                  ? 'border-[#90E4C1] bg-green-50 dark:bg-green-500/10'
                                  : 'border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20'
                              }`}
                            >
                              <div className="flex-1">
                                <div className={`font-medium text-sm ${
                                  formData.preferred_ollama_model === model.name
                                    ? 'text-[#90E4C1]'
                                    : 'text-gray-800 dark:text-white'
                                }`}>
                                  {model.displayName}
                                </div>
                                <div className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                                  {model.description}
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {formData.preferred_model_provider === 'gemini' && (
                <div className="p-4 bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 rounded-lg">
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    Gemini est un modèle cloud performant de Google. Idéal pour une utilisation immédiate sans configuration.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInterface;

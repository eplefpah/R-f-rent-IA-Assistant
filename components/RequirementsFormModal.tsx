import React, { useState } from 'react';
import { Save, X, AlertCircle, Upload, File, Trash2 } from 'lucide-react';
import { supabase } from '../services/supabaseClient';
import { AttachmentFile } from '../types';

interface RequirementsFormData {
  title: string;
  business_context: string;
  problem_description: string;
  frequency: string;
  business_impact: 'faible' | 'moyen' | 'fort' | 'critique';
  desired_deadline: string;
  data_resources: string;
  specific_constraints: string;
  current_solutions: string;
}

interface RequirementsFormModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

const RequirementsFormModal: React.FC<RequirementsFormModalProps> = ({ onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [attachments, setAttachments] = useState<AttachmentFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState<RequirementsFormData>({
    title: '',
    business_context: '',
    problem_description: '',
    frequency: '',
    business_impact: 'moyen',
    desired_deadline: '',
    data_resources: '',
    specific_constraints: '',
    current_solutions: '',
  });

  const handleChange = (field: keyof RequirementsFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setError(null);

    try {
      const uploadedFiles: AttachmentFile[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        if (file.size > 10 * 1024 * 1024) {
          setError(`Le fichier "${file.name}" dépasse la limite de 10 MB`);
          continue;
        }

        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `requirements-attachments/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('documents')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('documents')
          .getPublicUrl(filePath);

        uploadedFiles.push({
          name: file.name,
          url: publicUrl,
          type: file.type,
          size: file.size,
          uploaded_at: new Date().toISOString(),
        });
      }

      setAttachments(prev => [...prev, ...uploadedFiles]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du téléchargement');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleRemoveAttachment = async (index: number) => {
    const attachment = attachments[index];

    try {
      const filePath = attachment.url.split('/documents/')[1];
      if (filePath) {
        await supabase.storage
          .from('documents')
          .remove([filePath]);
      }

      setAttachments(prev => prev.filter((_, i) => i !== index));
    } catch (err) {
      console.error('Error removing file:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.title.trim()) {
      setError('Le titre du besoin est obligatoire');
      return;
    }

    setLoading(true);
    try {
      const { error: submitError } = await supabase
        .from('requirements_forms')
        .insert([
          {
            user_id: '00000000-0000-0000-0000-000000000000',
            ...formData,
            attachments: attachments,
          }
        ]);

      if (submitError) throw submitError;
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la sauvegarde');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-3xl w-full my-8 shadow-2xl border border-slate-200 dark:border-slate-800">
        <div className="sticky top-0 bg-gradient-to-r from-ref-blue to-blue-500 dark:from-blue-600 dark:to-blue-700 text-white p-6 flex items-center justify-between rounded-t-2xl z-10 shadow-lg">
          <h2 className="text-2xl font-bold">Formulaire de recueil des exigences</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8 max-h-[calc(100vh-200px)] overflow-y-auto">
          {error && (
            <div className="flex items-start space-x-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-red-700 dark:text-red-300">{error}</p>
            </div>
          )}

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
            <p className="text-sm text-blue-900 dark:text-blue-200 leading-relaxed">
              Ce formulaire aide à diagnostiquer précisément un besoin métier exprimé par un agent.
              Le résultat sera un document synthétique exploitable par les experts IA pour concevoir une solution adaptée.
            </p>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-3">
              1. Titre du besoin *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="Ex: Procès-verbal automatisé des réunions CLSSCT"
              className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg focus:ring-2 focus:ring-ref-blue dark:focus:ring-blue-600 focus:border-transparent outline-none"
            />
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              Un titre court, explicite et évocateur résumant la problématique.
            </p>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-3">
              2. Contexte métier
            </label>
            <textarea
              value={formData.business_context}
              onChange={(e) => handleChange('business_context', e.target.value)}
              placeholder="Ex: Commission locale Santé Sécurité Conditions de Travail (CLSSCT) rattachée au Secrétariat Général..."
              rows={4}
              className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg focus:ring-2 focus:ring-ref-blue dark:focus:ring-blue-600 focus:border-transparent outline-none resize-none"
            />
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              Le service ou l'équipe concernée, la mission principale, et le contexte opérationnel.
            </p>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-3">
              3. Description détaillée du problème (irritants)
            </label>
            <textarea
              value={formData.problem_description}
              onChange={(e) => handleChange('problem_description', e.target.value)}
              placeholder="Ex: Le secrétaire doit rédiger manuellement un PV de 20 pages..."
              rows={5}
              className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg focus:ring-2 focus:ring-ref-blue dark:focus:ring-blue-600 focus:border-transparent outline-none resize-none"
            />
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              Quelles tâches posent difficulté ? Listez les irritants rencontrés.
            </p>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-3">
              4. Fréquence d'occurrence
            </label>
            <input
              type="text"
              value={formData.frequency}
              onChange={(e) => handleChange('frequency', e.target.value)}
              placeholder="Ex: 4 fois par an + sessions extraordinaires"
              className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg focus:ring-2 focus:ring-ref-blue dark:focus:ring-blue-600 focus:border-transparent outline-none"
            />
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              À quelle fréquence le problème se produit ? (quotidien, hebdo, mensuel...)
            </p>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-3">
              5. Impact métier
            </label>
            <select
              value={formData.business_impact}
              onChange={(e) => handleChange('business_impact', e.target.value as 'faible' | 'moyen' | 'fort' | 'critique')}
              className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg focus:ring-2 focus:ring-ref-blue dark:focus:ring-blue-600 focus:border-transparent outline-none"
            >
              <option value="faible">Faible - Amélioration mineure</option>
              <option value="moyen">Moyen - Optimisation modérée</option>
              <option value="fort">Fort - Impact significatif</option>
              <option value="critique">Critique - Blocage majeur</option>
            </select>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              Évaluation de l'impact : perte de temps, risques d'erreur...
            </p>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-3">
              6. Délai souhaité pour la solution
            </label>
            <input
              type="text"
              value={formData.desired_deadline}
              onChange={(e) => handleChange('desired_deadline', e.target.value)}
              placeholder="Ex: D'ici 1 mois"
              className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg focus:ring-2 focus:ring-ref-blue dark:focus:ring-blue-600 focus:border-transparent outline-none"
            />
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              Urgence ou horizon temporel attendu.
            </p>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-3">
              7. Données et ressources disponibles
            </label>
            <textarea
              value={formData.data_resources}
              onChange={(e) => handleChange('data_resources', e.target.value)}
              placeholder="Ex: Notes manuscrites, enregistrements audio..."
              rows={4}
              className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg focus:ring-2 focus:ring-ref-blue dark:focus:ring-blue-600 focus:border-transparent outline-none resize-none"
            />
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              Documents, données ou supports existants disponibles.
            </p>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-3">
              8. Fichiers joints (optionnel)
            </label>

            <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg p-6 hover:border-ref-blue dark:hover:border-blue-600 transition">
              <div className="text-center">
                <Upload className="w-10 h-10 text-slate-400 dark:text-slate-500 mx-auto mb-3" />
                <label className="cursor-pointer">
                  <span className="text-sm font-medium text-ref-blue dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-500">
                    Cliquez pour télécharger des fichiers
                  </span>
                  <input
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    disabled={uploading}
                    className="hidden"
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.txt,.mp3,.wav,.m4a,.jpg,.jpeg,.png"
                  />
                </label>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                  PDF, Word, Excel, Audio, Images - Max 10 MB
                </p>
              </div>
            </div>

            {uploading && (
              <div className="mt-4 text-center text-sm text-slate-600 dark:text-slate-400">
                Téléchargement en cours...
              </div>
            )}

            {attachments.length > 0 && (
              <div className="mt-4 space-y-2">
                {attachments.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700"
                  >
                    <div className="flex items-center space-x-3 flex-1 min-w-0">
                      <File className="w-5 h-5 text-slate-400 dark:text-slate-500 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                          {file.name}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {formatFileSize(file.size)}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveAttachment(index)}
                      className="ml-3 p-1.5 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition flex-shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-3">
              9. Contraintes spécifiques
            </label>
            <textarea
              value={formData.specific_constraints}
              onChange={(e) => handleChange('specific_constraints', e.target.value)}
              placeholder="Ex: Données sensibles, RGPD..."
              rows={4}
              className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg focus:ring-2 focus:ring-ref-blue dark:focus:ring-blue-600 focus:border-transparent outline-none resize-none"
            />
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              Aspects réglementaires, sécurité, RGPD...
            </p>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-3">
              10. Solutions actuelles
            </label>
            <textarea
              value={formData.current_solutions}
              onChange={(e) => handleChange('current_solutions', e.target.value)}
              placeholder="Ex: Un prototype a été testé..."
              rows={4}
              className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg focus:ring-2 focus:ring-ref-blue dark:focus:ring-blue-600 focus:border-transparent outline-none resize-none"
            />
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              Une solution partielle existe-t-elle ?
            </p>
          </div>

          <div className="flex items-center space-x-3 pt-6 border-t border-slate-200 dark:border-slate-800 sticky bottom-0 bg-white dark:bg-slate-900">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition font-medium"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading || uploading}
              className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-ref-blue to-blue-500 dark:from-blue-600 dark:to-blue-700 text-white rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              <Save className="w-4 h-4" />
              <span>{loading ? 'Sauvegarde...' : 'Sauvegarder'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequirementsFormModal;

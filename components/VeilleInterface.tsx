
import React, { useEffect, useState } from 'react';
import { perplexityService } from '../services/perplexityService';
import { VeilleNewsResponse } from '../types';
import { Loader2, RefreshCw, Newspaper, Users, Zap, AlertTriangle, Lightbulb, ArrowRight } from 'lucide-react';
import MarkdownRenderer from './MarkdownRenderer';

const VeilleInterface: React.FC = () => {
  const [dailyQuestion, setDailyQuestion] = useState<string | null>(null);
  const [newsData, setNewsData] = useState<VeilleNewsResponse | null>(null);
  const [experts, setExperts] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      // Exécuter les requêtes en parallèle
      const [questionRes, newsRes, expertsRes] = await Promise.allSettled([
        perplexityService.getDailyQuestion(),
        perplexityService.getWeeklyAINews(),
        perplexityService.searchAIExperts()
      ]);

      // Gestion de la question du jour
      if (questionRes.status === 'fulfilled') {
        setDailyQuestion(questionRes.value);
      }

      // Gestion des news JSON
      if (newsRes.status === 'fulfilled') {
        try {
          // Nettoyage simple au cas où le modèle renvoie du markdown ```json
          let cleanJson = newsRes.value.replace(/```json|```/g, '').trim();
          // Parfois le modèle rajoute du texte avant ou après, on essaie d'extraire le JSON
          const jsonMatch = cleanJson.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            cleanJson = jsonMatch[0];
          }
          
          const parsedNews = JSON.parse(cleanJson) as VeilleNewsResponse;
          setNewsData(parsedNews);
        } catch (e) {
          console.error("Erreur parsing JSON news:", e);
          // On continue sans crasher, newsData restera null ou partiel
        }
      }

      // Gestion des experts
      if (expertsRes.status === 'fulfilled') {
        setExperts(expertsRes.value);
      }

    } catch (err) {
      setError("Impossible de charger les données de veille. Vérifiez votre connexion ou la clé API.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-96 space-y-4">
        <Loader2 className="w-10 h-10 text-ref-blue animate-spin" />
        <p className="text-slate-500 dark:text-slate-400">Analyse de l'actualité IA secteur public en cours...</p>
        <p className="text-xs text-slate-400 dark:text-slate-500">Propulsé par Perplexity Sonar Pro</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-96 space-y-4 p-6 text-center">
        <div className="w-16 h-16 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center">
          <AlertTriangle className="w-8 h-8 text-red-500" />
        </div>
        <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Erreur de chargement</h3>
        <p className="text-slate-600 dark:text-slate-400 max-w-md">{error}</p>
        <button 
          onClick={fetchData}
          className="px-4 py-2 bg-ref-blue text-white rounded-lg hover:bg-sky-600 transition-colors flex items-center space-x-2"
        >
          <RefreshCw size={16} />
          <span>Réessayer</span>
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      {/* Section Question du Jour */}
      {dailyQuestion && (
        <div className="bg-gradient-to-br from-ref-blue to-sky-600 rounded-xl p-6 text-white relative overflow-hidden shadow-lg">
          <div className="absolute top-0 right-0 p-4 opacity-10">
             <Zap size={100} />
          </div>
          <div className="relative z-10">
            <h3 className="text-xs font-bold text-sky-100 uppercase tracking-wider mb-3 flex items-center">
              <Zap size={16} className="mr-2 text-ref-yellow" />
              La Question Prioritaire du Jour
            </h3>
            <p className="text-xl md:text-2xl font-bold leading-tight text-white">
              "{dailyQuestion}"
            </p>
          </div>
        </div>
      )}

      {/* Section Actualités & Référents */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Colonne Principale : Actualités */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center">
            <Newspaper size={20} className="mr-2 text-ref-blue dark:text-blue-400" />
            Actualités de la Semaine
          </h3>
          
          {newsData?.actualites && newsData.actualites.length > 0 ? (
            <div className="space-y-4">
              {newsData.actualites.map((item, idx) => (
                <div key={idx} className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-xs font-bold px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded uppercase tracking-wider">
                      {item.categorie}
                    </span>
                    <span className="text-xs text-slate-400 dark:text-slate-500 flex items-center">
                      {item.source}
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-800 dark:text-white mb-2 text-lg">{item.titre}</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-3">{item.impact}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-500 dark:text-slate-400 italic">Aucune actualité majeure détectée cette semaine.</p>
          )}

           {/* Opportunités */}
           {newsData?.opportunites && newsData.opportunites.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4 flex items-center">
                <Lightbulb size={20} className="mr-2 text-amber-500" />
                Opportunités Stratégiques
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                {newsData.opportunites.map((op, idx) => (
                  <div key={idx} className="bg-amber-50/50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800 p-4 rounded-xl">
                    <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2">{op.sujet}</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-2"><span className="font-semibold text-amber-700 dark:text-amber-500">Manque :</span> {op.gap}</p>
                    <div className="flex items-start mt-3 text-sm text-ref-blue dark:text-blue-400 font-medium">
                      <ArrowRight size={16} className="mr-1 mt-0.5 flex-shrink-0" />
                      {op.action_suggeree}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Colonne Latérale : Référents & Experts */}
        <div className="space-y-6">
          {/* Nouveaux Référents (JSON) */}
          {newsData?.referents && newsData.referents.length > 0 && (
             <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="text-md font-bold text-slate-800 dark:text-white mb-4 flex items-center">
                <Users size={18} className="mr-2 text-ref-green dark:text-emerald-400" />
                Mouvements & Nominations
              </h3>
              <ul className="space-y-4">
                {newsData.referents.map((ref, idx) => (
                  <li key={idx} className="pb-3 border-b border-slate-50 dark:border-slate-800 last:border-0 last:pb-0">
                    <div className="font-bold text-slate-700 dark:text-slate-200">{ref.name}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 uppercase mt-0.5">{ref.organization}</div>
                    <div className="text-xs text-slate-400 dark:text-slate-500 mt-1 italic">Source : {ref.source}</div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Cartographie Experts (Markdown) */}
          {experts && (
            <div className="bg-slate-50 dark:bg-slate-900/50 p-5 rounded-xl border border-slate-200 dark:border-slate-800">
               <h3 className="text-md font-bold text-slate-800 dark:text-white mb-3 flex items-center">
                <Users size={18} className="mr-2 text-ref-blue dark:text-blue-400" />
                Cartographie Experts
              </h3>
              <div className="prose prose-xs max-w-none text-slate-600 dark:text-slate-300 dark:prose-invert">
                <MarkdownRenderer content={experts} />
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="text-center pt-8 border-t border-slate-100 dark:border-slate-800">
         <button 
            onClick={fetchData}
            className="text-sm text-slate-400 dark:text-slate-500 hover:text-ref-blue dark:hover:text-blue-400 flex items-center justify-center mx-auto space-x-2 transition-colors bg-white dark:bg-slate-900 px-4 py-2 rounded-full border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow"
         >
           <RefreshCw size={14} />
           <span>Actualiser la veille</span>
         </button>
      </div>
    </div>
  );
};

export default VeilleInterface;

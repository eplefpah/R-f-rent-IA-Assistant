import React from 'react';
import { Menu, Target, TrendingUp, Rocket, CheckCircle, Circle, Award, Download } from 'lucide-react';

interface MissionsInterfaceProps {
  toggleSidebar: () => void;
}

const MissionsInterface: React.FC<MissionsInterfaceProps> = ({ toggleSidebar }) => {
  const handleDownloadMissions = async () => {
    try {
      const response = await fetch('https://pe2.eu/refia/docs/Lettres-missions-refia.pdf');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Lettres-missions-refia.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Erreur lors du téléchargement:', error);
      window.open('https://pe2.eu/refia/docs/Lettres-missions-refia.pdf', '_blank');
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-50 dark:bg-slate-950 relative overflow-hidden transition-colors duration-300">
      {/* Header Mobile */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-4 flex items-center md:hidden sticky top-0 z-10">
        <button onClick={toggleSidebar} className="mr-3 text-slate-600 dark:text-slate-300">
          <Menu size={24} />
        </button>
        <h1 className="font-semibold text-slate-800 dark:text-white">Missions du Référent IA</h1>
      </header>

      {/* Header Desktop */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-8 py-6 hidden md:block transition-colors duration-300">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Les missions du Référent IA</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Un référent en intelligence artificielle (IA) est un agent chargé de promouvoir et encadrer l'usage de l'IA au sein de son administration. Découvrez les missions selon votre niveau d'expertise, des concepts de base aux enjeux RGPD et d'éthique.
          </p>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 md:px-8 py-8 scrollbar-thin">
        <div className="max-w-5xl mx-auto space-y-8">

          {/* Lettres de missions - Download Button */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 rounded-xl border border-blue-200 dark:border-blue-800 p-6 shadow-sm">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <Download className="text-ref-blue dark:text-blue-400 flex-shrink-0 mt-1" size={24} />
                <div>
                  <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-1">Lettres de missions RefIA</h2>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    Le document officiel détaillant les missions par niveau d'expertise
                  </p>
                </div>
              </div>
              <button
                onClick={handleDownloadMissions}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 dark:bg-white/5 text-[#6B9BD2] dark:text-cyan-400 rounded-lg hover:bg-white/20 dark:hover:bg-white/10 backdrop-blur-sm border border-white/20 dark:border-white/10 transition-all text-sm font-medium shadow-lg flex-shrink-0"
              >
                <Download size={18} />
                <span>Télécharger (PDF)</span>
              </button>
            </div>
          </div>

          {/* Rôle et responsabilités */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
            <div className="flex items-start gap-3 mb-4">
              <Target className="text-ref-blue dark:text-blue-400 flex-shrink-0" size={28} />
              <div>
                <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Rôle et responsabilités</h2>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Le référent IA joue le rôle d'ambassadeur de l'IA et de relais de la stratégie numérique dans son entité. Ses missions couvrent un spectre large, depuis la sensibilisation jusqu'à la co-construction de solutions IA, en passant par l'expérimentation et le conseil. Il doit maîtriser les concepts techniques (machine learning, LLM, API) tout en comprenant les enjeux éthiques et réglementaires (RGPD, AI Act).
                </p>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed mt-3">
                  Ces missions s'enrichissent avec l'expérience, suivant trois niveaux de maturité : débutant, confirmé et expert.
                </p>
              </div>
            </div>
          </div>

          {/* Niveau Débutant */}
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 rounded-xl border border-emerald-200 dark:border-emerald-800 overflow-hidden shadow-sm">
            <div className="bg-emerald-600 dark:bg-emerald-700 text-white px-6 py-4 flex items-center gap-3">
              <TrendingUp size={24} />
              <div>
                <h3 className="text-lg font-bold">Niveau Débutant - Le Référent IA "Médiateur"</h3>
                <p className="text-emerald-100 text-sm">Contexte : Nouveau référent IA, ayant besoin d'acculturation et de structuration</p>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex gap-4 text-sm">
                <div className="bg-white dark:bg-slate-800 px-4 py-2 rounded-lg border border-emerald-200 dark:border-emerald-800">
                  <span className="font-semibold text-slate-600 dark:text-slate-300">Durée :</span> 1 an (10% de décharge horaire)
                </div>
                <div className="bg-white dark:bg-slate-800 px-4 py-2 rounded-lg border border-emerald-200 dark:border-emerald-800">
                  <span className="font-semibold text-slate-600 dark:text-slate-300">Outils :</span> Hub
                  RefIA, plateforme de formation, mentorat
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-800 dark:text-white mb-3 flex items-center gap-2">
                  <CheckCircle size={18} className="text-emerald-600 dark:text-emerald-400" />
                  Missions principales
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                    <CheckCircle size={16} className="text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>Participer au parcours d'onboarding Niveau 1 (durée : 6 semaines)</span>
                  </li>
                  <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                    <CheckCircle size={16} className="text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>Alimenter et maintenir une veille réglementaire et écologique autour de l'IA</span>
                  </li>
                  <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                    <CheckCircle size={16} className="text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>Animer des ateliers de sensibilisation aux bases de l'IA</span>
                  </li>
                  <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                    <CheckCircle size={16} className="text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>Documenter les cas d'usage élémentaires de l'IA dans l'organisation</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-slate-800 dark:text-white mb-3 flex items-center gap-2">
                  <Circle size={18} className="text-slate-400 dark:text-slate-500" />
                  Missions secondaires
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-slate-600 dark:text-slate-400">
                    <Circle size={16} className="text-slate-400 dark:text-slate-500 flex-shrink-0 mt-0.5" />
                    <span>Contribuer au forum interne et y partager des retours d'expérience</span>
                  </li>
                  <li className="flex items-start gap-2 text-slate-600 dark:text-slate-400">
                    <Circle size={16} className="text-slate-400 dark:text-slate-500 flex-shrink-0 mt-0.5" />
                    <span>Suivre les formations e-learning obligatoires liées à l'IA</span>
                  </li>
                  <li className="flex items-start gap-2 text-slate-600 dark:text-slate-400">
                    <Circle size={16} className="text-slate-400 dark:text-slate-500 flex-shrink-0 mt-0.5" />
                    <span>Réaliser un bilan trimestriel d'activité (compte-rendu, résultats, difficultés)</span>
                  </li>
                </ul>
              </div>

              <div className="bg-emerald-100 dark:bg-emerald-900/30 p-4 rounded-lg border border-emerald-200 dark:border-emerald-800">
                <h4 className="font-bold text-emerald-800 dark:text-emerald-400 mb-2 flex items-center gap-2">
                  <Award size={18} />
                  Indicateurs de performance
                </h4>
                <ul className="space-y-1.5 text-sm text-emerald-700 dark:text-emerald-300">
                  <li className="flex items-start gap-2">
                    <Target size={14} className="flex-shrink-0 mt-0.5" />
                    <span>Taux de complétion du parcours d'onboarding ≥ 90%</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Target size={14} className="flex-shrink-0 mt-0.5" />
                    <span>Nombre d'ateliers de sensibilisation animés ≥ 2 par an</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Target size={14} className="flex-shrink-0 mt-0.5" />
                    <span>Qualité des retours d'expérience partagés (feedback collègues ≥ 4/5)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Niveau Confirmé */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 rounded-xl border border-blue-200 dark:border-blue-800 overflow-hidden shadow-sm">
            <div className="bg-blue-600 dark:bg-blue-700 text-white px-6 py-4 flex items-center gap-3">
              <Target size={24} />
              <div>
                <h3 className="text-lg font-bold">Niveau Confirmé - Référent IA Expérimenté</h3>
                <p className="text-blue-100 text-sm">Contexte : Référent IA expérimenté, occupant un rôle de conseil et d'accompagnement avancé</p>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex gap-4 text-sm">
                <div className="bg-white dark:bg-slate-800 px-4 py-2 rounded-lg border border-blue-200 dark:border-blue-800">
                  <span className="font-semibold text-slate-600 dark:text-slate-300">Durée :</span> 1 an renouvelable (20% de décharge horaire)
                </div>
                <div className="bg-white dark:bg-slate-800 px-4 py-2 rounded-lg border border-blue-200 dark:border-blue-800">
                  <span className="font-semibold text-slate-600 dark:text-slate-300">Outils :</span> Plateforme avancée, RAG, outils audit RGPD
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-800 dark:text-white mb-3 flex items-center gap-2">
                  <CheckCircle size={18} className="text-blue-600 dark:text-blue-400" />
                  Missions principales
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                    <CheckCircle size={16} className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                    <span>Piloter le parcours d'onboarding Niveau 2 (durée : 4 semaines) pour les nouveaux référents ou utilisateurs avancés</span>
                  </li>
                  <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                    <CheckCircle size={16} className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                    <span>Auditer la conformité des projets IA vis-à-vis des réglementations (RGPD, AI Act) et préconiser des actions correctives</span>
                  </li>
                  <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                    <CheckCircle size={16} className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                    <span>Conseiller les équipes sur le choix des outils d'IA et promouvoir l'écoconception de ces solutions</span>
                  </li>
                  <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                    <CheckCircle size={16} className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                    <span>Animer des formations thématiques avancées sur l'IA (ex: IA responsable, techniques avancées)</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-slate-800 dark:text-white mb-3 flex items-center gap-2">
                  <Circle size={18} className="text-slate-400 dark:text-slate-500" />
                  Missions secondaires
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-slate-600 dark:text-slate-400">
                    <Circle size={16} className="text-slate-400 dark:text-slate-500 flex-shrink-0 mt-0.5" />
                    <span>Assurer un mentorat auprès des référents IA débutants (coaching, suivi, conseils)</span>
                  </li>
                  <li className="flex items-start gap-2 text-slate-600 dark:text-slate-400">
                    <Circle size={16} className="text-slate-400 dark:text-slate-500 flex-shrink-0 mt-0.5" />
                    <span>Contribuer à la mise à jour de la charte interne d'utilisation de l'IA</span>
                  </li>
                  <li className="flex items-start gap-2 text-slate-600 dark:text-slate-400">
                    <Circle size={16} className="text-slate-400 dark:text-slate-500 flex-shrink-0 mt-0.5" />
                    <span>Réaliser un rapport semestriel évaluant l'impact écologique et la conformité réglementaire des initiatives IA</span>
                  </li>
                </ul>
              </div>

              <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                <h4 className="font-bold text-blue-800 dark:text-blue-400 mb-2 flex items-center gap-2">
                  <Award size={18} />
                  Indicateurs de performance
                </h4>
                <ul className="space-y-1.5 text-sm text-blue-700 dark:text-blue-300">
                  <li className="flex items-start gap-2">
                    <Target size={14} className="flex-shrink-0 mt-0.5" />
                    <span>Conformité des projets IA audités : 100% respectent les normes (aucun manquement majeur RGPD/AI Act)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Target size={14} className="flex-shrink-0 mt-0.5" />
                    <span>Satisfaction aux formations dispensées : note moyenne ≥ 4,5/5 des participants</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Target size={14} className="flex-shrink-0 mt-0.5" />
                    <span>Réduction de l'empreinte carbone des solutions IA ≥ 10% en moyenne sur l'année</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Niveau Expert */}
          <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 rounded-xl border border-orange-200 dark:border-orange-800 overflow-hidden shadow-sm">
            <div className="bg-orange-600 dark:bg-orange-700 text-white px-6 py-4 flex items-center gap-3">
              <Rocket size={24} />
              <div>
                <h3 className="text-lg font-bold">Niveau Expert - Le Référent IA "Leader Stratégique"</h3>
                <p className="text-orange-100 text-sm">Contexte : Référent IA de niveau expert, leader en charge de la stratégie IA et de l'innovation</p>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex gap-4 text-sm">
                <div className="bg-white dark:bg-slate-800 px-4 py-2 rounded-lg border border-orange-200 dark:border-orange-800">
                  <span className="font-semibold text-slate-600 dark:text-slate-300">Durée :</span> 2 ans (30% de décharge horaire)
                </div>
                <div className="bg-white dark:bg-slate-800 px-4 py-2 rounded-lg border border-orange-200 dark:border-orange-800">
                  <span className="font-semibold text-slate-600 dark:text-slate-300">Outils :</span> Veille stratégique premium, budget innovation IA
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-800 dark:text-white mb-3 flex items-center gap-2">
                  <CheckCircle size={18} className="text-orange-600 dark:text-orange-400" />
                  Missions principales
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                    <CheckCircle size={16} className="text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" />
                    <span>Coordonner la veille stratégique sur l'IA (prospective à horizon 2025 et au-delà), identifier les tendances émergentes et opportunités</span>
                  </li>
                  <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                    <CheckCircle size={16} className="text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" />
                    <span>Animer le réseau des référents IA (tous niveaux) et former les mentors pour diffuser les bonnes pratiques</span>
                  </li>
                  <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                    <CheckCircle size={16} className="text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" />
                    <span>Contribuer aux évolutions du portail des chartes IA (amélioration des directives internes sur l'IA responsable, éthique, sécurité)</span>
                  </li>
                  <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                    <CheckCircle size={16} className="text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" />
                    <span>Piloter des projets IA complexes, impliquant de multiples acteurs, en veillant à leur caractère écoresponsable et innovant</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-slate-800 dark:text-white mb-3 flex items-center gap-2">
                  <Circle size={18} className="text-slate-400 dark:text-slate-500" />
                  Missions secondaires
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-slate-600 dark:text-slate-400">
                    <Circle size={16} className="text-slate-400 dark:text-slate-500 flex-shrink-0 mt-0.5" />
                    <span>Publier un retour d'expérience en tant qu'expert (article, livre blanc, étude de cas)</span>
                  </li>
                  <li className="flex items-start gap-2 text-slate-600 dark:text-slate-400">
                    <Circle size={16} className="text-slate-400 dark:text-slate-500 flex-shrink-0 mt-0.5" />
                    <span>Organiser un webinaire national sur l'IA responsable, en partenariat avec d'autres experts ou institutions</span>
                  </li>
                  <li className="flex items-start gap-2 text-slate-600 dark:text-slate-400">
                    <Circle size={16} className="text-slate-400 dark:text-slate-500 flex-shrink-0 mt-0.5" />
                    <span>Participer à l'élaboration de la prochaine version de l'AI Act (groupes de travail, retours d'expérience terrain)</span>
                  </li>
                </ul>
              </div>

              <div className="bg-orange-100 dark:bg-orange-900/30 p-4 rounded-lg border border-orange-200 dark:border-orange-800">
                <h4 className="font-bold text-orange-800 dark:text-orange-400 mb-2 flex items-center gap-2">
                  <Award size={18} />
                  Indicateurs de performance
                </h4>
                <ul className="space-y-1.5 text-sm text-orange-700 dark:text-orange-300">
                  <li className="flex items-start gap-2">
                    <Target size={14} className="flex-shrink-0 mt-0.5" />
                    <span>Nombre de publications ou événements organisés par l'expert ≥ 3 par an</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Target size={14} className="flex-shrink-0 mt-0.5" />
                    <span>Taux d'adoption des bonnes pratiques IA ≥ 80% des projets intègrent les recommandations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Target size={14} className="flex-shrink-0 mt-0.5" />
                    <span>Nombre de nouveaux projets IA innovants labellisés ≥ 2 par an</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Points clés */}
          <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-900/50 p-6">
            <h3 className="font-bold text-yellow-800 dark:text-yellow-500 mb-3">Points clés à retenir</h3>
            <ol className="space-y-2 text-sm text-yellow-700 dark:text-yellow-600 list-decimal list-inside">
              <li>Le rôle du référent IA évolue avec l'expérience : de la sensibilisation vers l'expertise technique et éthique.</li>
              <li>Chaque niveau apporte une valeur spécifique : acculturation, expérimentation puis gouvernance responsable.</li>
              <li>La mission centrale reste l'accompagnement humain du changement technologique dans l'administration.</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionsInterface;

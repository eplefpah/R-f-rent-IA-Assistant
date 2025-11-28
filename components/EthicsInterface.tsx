import React from 'react';
import { Menu, Scale, Shield, FileText, AlertTriangle, BookOpen, Phone, Mail, ExternalLink, Download } from 'lucide-react';

interface EthicsInterfaceProps {
  toggleSidebar: () => void;
}

const EthicsInterface: React.FC<EthicsInterfaceProps> = ({ toggleSidebar }) => {
  return (
    <div className="flex-1 flex flex-col h-full bg-slate-50 dark:bg-slate-950 relative overflow-hidden transition-colors duration-300">
      {/* Header Mobile */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-4 flex items-center md:hidden sticky top-0 z-10">
        <button onClick={toggleSidebar} className="mr-3 text-slate-600 dark:text-slate-300">
          <Menu size={24} />
        </button>
        <h1 className="font-semibold text-slate-800 dark:text-white">•	Déontologie & éthique</h1>
      </header>

      {/* Header Desktop */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-8 py-6 hidden md:block transition-colors duration-300">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Vade-mecum juridique et éthique pour l'IA dans le service public</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Cette rubrique constitue votre guide essentiel pour garantir une utilisation conforme et responsable de l'intelligence artificielle dans l'administration publique.
          </p>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 md:px-8 py-8 scrollbar-thin">
        <div className="max-w-5xl mx-auto space-y-8">

          {/* Cadres réglementaires */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <Scale className="text-ref-blue dark:text-blue-400" size={28} />
              <h2 className="text-xl font-bold text-slate-800 dark:text-white">Cadres réglementaires</h2>
            </div>

            {/* Loi Informatique et Libertés / RGPD */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">
                Loi Informatique et Libertés (1978) et RGPD (2018)
              </h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Protection des données personnelles. La CNIL assure le respect de ces lois et peut sanctionner les manquements. Ces textes fondamentaux encadrent tout traitement de données personnelles et imposent des obligations strictes de transparence, de sécurité et de respect des droits des personnes.
              </p>
            </div>

            {/* AI Act */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-3">AI Act (2024)</h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                Première réglementation européenne des systèmes d'IA. Ce règlement classifie les systèmes selon leur niveau de risque et impose des exigences proportionnées :
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                  <div className="w-6 h-6 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  </div>
                  <div>
                    <span className="font-semibold">Haut risque :</span> éducation, recrutement, services essentiels
                  </div>
                </li>
                <li className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                  <div className="w-6 h-6 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                  </div>
                  <div>
                    <span className="font-semibold">Risque limité :</span> chatbots, reconnaissance d'image
                  </div>
                </li>
                <li className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                  <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div>
                    <span className="font-semibold">Risque minimal :</span> filtres anti-spam, jeux vidéo
                  </div>
                </li>
              </ul>
            </div>

            {/* Usage services externes */}
            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-900/50 p-6">
              <div className="flex items-start gap-3 mb-3">
                <AlertTriangle className="text-amber-600 dark:text-amber-500 flex-shrink-0" size={24} />
                <h3 className="text-lg font-bold text-amber-800 dark:text-amber-400">Usage de services externes (ex. ChatGPT)</h3>
              </div>
              <ul className="space-y-2 text-amber-700 dark:text-amber-300 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 dark:text-amber-500 mt-1">•</span>
                  <span>Consulter systématiquement le DPO avant tout déploiement.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 dark:text-amber-500 mt-1">•</span>
                  <span>Vérifier la localisation des données et leur traitement.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 dark:text-amber-500 mt-1">•</span>
                  <span>Analyser les garanties contractuelles de protection.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 dark:text-amber-500 mt-1">•</span>
                  <span>Documenter précisément l'usage et les données traitées.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 dark:text-amber-500 mt-1">•</span>
                  <span className="font-semibold">Privilégier les solutions souveraines comme Albert API.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Principes éthiques */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="text-ref-blue dark:text-blue-400" size={28} />
              <h2 className="text-xl font-bold text-slate-800 dark:text-white">Principes éthiques</h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {/* Respect de la vie privée */}
              <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
                <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-3 flex items-center gap-2">
                  <Shield size={20} className="text-ref-blue dark:text-blue-400" />
                  Respect de la vie privée
                </h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>Minimisation des données collectées</span>
                  </li>
                  <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>Réalisation d'impact assessment (AIPD)</span>
                  </li>
                  <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>Consultation systématique du DPO</span>
                  </li>
                  <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>Documentation complète des traitements</span>
                  </li>
                </ul>
              </div>

              {/* Transparence et explicabilité */}
              <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
                <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-3 flex items-center gap-2">
                  <FileText size={20} className="text-ref-blue dark:text-blue-400" />
                  Transparence et explicabilité
                </h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>Décrire le fonctionnement du système</span>
                  </li>
                  <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>Documenter les critères de décision</span>
                  </li>
                  <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>Prévoir des recours humains</span>
                  </li>
                  <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>Informer les utilisateurs clairement</span>
                  </li>
                </ul>
              </div>

              {/* Non-discrimination et équité */}
              <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
                <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-3 flex items-center gap-2">
                  <Scale size={20} className="text-ref-blue dark:text-blue-400" />
                  Non-discrimination et équité
                </h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>Tester sur différentes populations</span>
                  </li>
                  <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>Contrôler les métriques d'équité</span>
                  </li>
                  <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>Corriger activement les biais détectés</span>
                  </li>
                  <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>Former les équipes aux risques de biais</span>
                  </li>
                </ul>
              </div>

              {/* Contrôle humain */}
              <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
                <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-3 flex items-center gap-2">
                  <span className="text-2xl">👤</span>
                  Contrôle humain
                </h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>Maintenir la supervision par un agent</span>
                  </li>
                  <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>Conserver la responsabilité humaine</span>
                  </li>
                  <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>Permettre la révision des décisions</span>
                  </li>
                  <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>Former aux limites des systèmes IA</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Guide pratique */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="text-ref-blue dark:text-blue-400" size={24} />
              <h2 className="text-xl font-bold text-slate-800 dark:text-white">Guide pratique pour la conformité</h2>
            </div>
            <ol className="space-y-4 list-decimal list-inside text-slate-700 dark:text-slate-300">
              <li>
                <span className="font-semibold">Évaluation préliminaire</span>
                <p className="ml-6 mt-1 text-sm">Identifier l'usage et sa catégorie de risque selon l'AI Act. Consulter le DPO dès cette phase.</p>
              </li>
              <li>
                <span className="font-semibold">Analyse d'impact (AIPD)</span>
                <p className="ml-6 mt-1 text-sm">Évaluer les effets sur les droits et libertés des personnes. Définir les mesures de protection adaptées.</p>
              </li>
              <li>
                <span className="font-semibold">Conception éthique</span>
                <p className="ml-6 mt-1 text-sm">Assurer transparence, équité et contrôle humain. Réaliser des tests anti-biais systématiques.</p>
              </li>
              <li>
                <span className="font-semibold">Documentation et traçabilité</span>
                <p className="ml-6 mt-1 text-sm">Tenir un registre des traitements. Documenter précisément les décisions algorithmiques.</p>
              </li>
              <li>
                <span className="font-semibold">Surveillance et amélioration continue</span>
                <p className="ml-6 mt-1 text-sm">Monitorer la performance. Prévoir des audits réguliers. Corriger rapidement les dérives détectées.</p>
              </li>
            </ol>
          </div>

          {/* Ressources téléchargeables */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <Download className="text-ref-blue dark:text-blue-400" size={24} />
              <h2 className="text-xl font-bold text-slate-800 dark:text-white">Ressources téléchargeables</h2>
            </div>
            <div className="grid gap-3">
              {[
                { title: "Check-list RGPD", desc: "Check-list officielle CNIL pour TPE/PME.", source: "CNIL", url: "https://www.cnil.fr/sites/default/files/atoms/files/check-list_rgpd_pour_les_tpe-pme.pdf" },
                { title: "Modèle d'AIPD", desc: "Modèles PIA officiels de la CNIL (février 2018).", source: "CNIL", url: "https://www.cnil.fr/sites/default/files/atoms/files/cnil-pia-2-fr-modeles.pdf" },
                { title: "Guide AIPD complet", desc: "Guide Inserm pour la rédaction d'une AIPD (56 pages).", source: "Inserm", url: "https://sesstim.univ-amu.fr/sites/default/files/2024-09/inserm_guide_aipd_pia_20220316.pdf" },
                { title: "Guide AI Act", desc: "Guide de mise en œuvre CIGREF - Points clés (2025).", source: "CIGREF", url: "https://www.cigref.fr/wp/wp-content/uploads/2025/01/Guide-mise-en-oeuvre-AI-Act-points-cles-introduction-2025.pdf" },
                { title: "AI Act Explorer", desc: "Version interactive du texte complet de l'AI Act.", source: "UE", url: "https://artificialintelligenceact.eu/fr/ai-act-explorer/" },
                { title: "Grille évaluation biais IA", desc: "Grille d'évaluation de l'utilisation d'un outil d'IA.", source: "UdeS", url: "https://zenodo.org/records/15388598/files/grille_eval_utilisation_IA_SSF_UdeS.pdf" },
                { title: "Guide gestion des biais", desc: "Gérer les biais des modèles d'IA générative.", source: "IMPACT AI", url: "https://www.impact-ai.fr/app/uploads/2024/12/IMPACT-AI-Brief-de-lIA-Responsable-4-Gerer-les-biais-des-modeles-dIA-gen-19122024.pdf" },
                { title: "Registre des traitements (ODS)", desc: "Modèle de registre RGPD simplifié au format tableur.", source: "CNIL", url: "https://www.cnil.fr/sites/default/files/atoms/files/registre-traitement-simplifie.ods" },
                { title: "Registre des traitements (PDF)", desc: "Modèle de registre RGPD basique au format PDF.", source: "CNIL", url: "https://www.cnil.fr/sites/cnil/files/atoms/files/registre_rgpd_basique.pdf" },
                { title: "Sécurité des données", desc: "Check-list évaluation du niveau de sécurité.", source: "CNIL", url: "https://www.cnil.fr/sites/cnil/files/atoms/files/check_list_0.pdf" }
              ].map((resource, idx) => (
                <a
                  key={idx}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-ref-blue dark:hover:border-blue-500 hover:shadow-md transition-all group"
                >
                  <FileText className="text-ref-blue dark:text-blue-400 flex-shrink-0 mt-1" size={20} />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-slate-800 dark:text-white group-hover:text-ref-blue dark:group-hover:text-blue-400 transition-colors">
                      {resource.title}
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{resource.desc}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-500 mt-1 font-medium">(Source : {resource.source})</p>
                  </div>
                  <ExternalLink className="text-slate-400 group-hover:text-ref-blue dark:group-hover:text-blue-400 flex-shrink-0 transition-colors" size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Contacts */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <Phone className="text-ref-blue dark:text-blue-400" size={24} />
              <h2 className="text-xl font-bold text-slate-800 dark:text-white">Contacts</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                <h3 className="font-bold text-slate-800 dark:text-white mb-2 flex items-center gap-2">
                  <Phone size={18} />
                  CNIL
                </h3>
                <ul className="space-y-1 text-sm text-slate-600 dark:text-slate-400">
                  <li className="flex items-center gap-2">
                    <ExternalLink size={14} />
                    <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="hover:text-ref-blue dark:hover:text-blue-400">cnil.fr</a>
                  </li>
                  <li className="flex items-center gap-2">
                    <Phone size={14} />
                    <span>01 53 73 22 22</span>
                  </li>
                </ul>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                <h3 className="font-bold text-slate-800 dark:text-white mb-2 flex items-center gap-2">
                  <Mail size={18} />
                  DINUM
                </h3>
                <ul className="space-y-1 text-sm text-slate-600 dark:text-slate-400">
                  <li className="flex items-center gap-2">
                    <ExternalLink size={14} />
                    <a href="https://www.numerique.gouv.fr" target="_blank" rel="noopener noreferrer" className="hover:text-ref-blue dark:hover:text-blue-400">numerique.gouv.fr</a>
                  </li>
                  <li className="flex items-center gap-2">
                    <Mail size={14} />
                    <a href="mailto:lab-ia@modernisation.gouv.fr" className="hover:text-ref-blue dark:hover:text-blue-400">lab-ia@modernisation.gouv.fr</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Points clés */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-900/50 p-6">
            <h3 className="font-bold text-blue-800 dark:text-blue-400 mb-3 flex items-center gap-2">
              <span className="text-xl">💡</span>
              Points clés à retenir
            </h3>
            <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
              <li className="flex items-start gap-2">
                <span className="mt-1">•</span>
                <span><strong>Garantir la conformité RGPD</strong> lors du traitement de données personnelles.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1">•</span>
                <span><strong>Respecter les obligations de l'AI Act</strong> pour les systèmes à haut risque.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1">•</span>
                <span><strong>Privilégier la transparence, l'explicabilité et le contrôle humain</strong> dans tous vos projets IA.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EthicsInterface;

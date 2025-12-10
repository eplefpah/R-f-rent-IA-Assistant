import React, { useState } from 'react';
import { Menu, BookOpen, Search } from 'lucide-react';

interface GlossaryInterfaceProps {
  toggleSidebar: () => void;
}

interface GlossaryTerm {
  term: string;
  definition: string;
}

const glossaryData: GlossaryTerm[] = [
  {
    term: "Référent IA",
    definition: "Agent public désigné pour accompagner, sensibiliser et coordonner les usages de l'intelligence artificielle dans son organisation. Il agit comme un facilitateur, pas nécessairement comme un expert technique."
  },
  {
    term: "IA (Intelligence Artificielle)",
    definition: "Ensemble de technologies capables d'imiter certaines tâches humaines, comme classer des documents, analyser du texte, prédire des comportements ou générer des contenus."
  },
  {
    term: "Acculturation IA",
    definition: "Démarche progressive pour s'approprier les notions de base de l'IA et pouvoir en parler, l'expliquer ou y recourir dans le cadre professionnel."
  },
  {
    term: "Onboarding",
    definition: "Parcours d'intégration prévu pour les nouveaux référents IA, afin de les guider pas à pas dans la prise en main de leur rôle. Il comprend des contenus explicatifs, des outils, et un assistant conversationnel."
  },
  {
    term: "Charte du Référent IA",
    definition: "Document officiel définissant les principes d'action, les responsabilités et les engagements du référent IA dans l'administration. Elle constitue un cadre commun."
  },
  {
    term: "Lettre de mission",
    definition: "Document de cadrage remis à un référent IA, précisant ses missions spécifiques dans sa structure (ex : sensibiliser les équipes, accompagner un projet, veiller aux usages)."
  },
  {
    term: "Parcours initiatique",
    definition: "Parcours guidé d'introduction proposé sur la plateforme, permettant au référent IA de découvrir ses missions via un échange interactif avec un assistant IA."
  },
  {
    term: "Assistant IA (chatbot)",
    definition: "Outil de conversation présent sur la plateforme qui répond aux questions du référent et peut le guider dans ses démarches ou ses parcours de formation."
  },
  {
    term: "Recueil de besoin IA",
    definition: "Formulaire guidé ou parcours conversationnel permettant d'évaluer si un besoin exprimé (par un collègue ou une direction) peut donner lieu à un projet utilisant l'IA."
  },
  {
    term: "Projet IA",
    definition: "Initiative intégrant l'intelligence artificielle pour répondre à un besoin métier, comme trier des emails, détecter des anomalies, automatiser une tâche. Le référent IA peut aider à cadrer ce projet."
  },
  {
    term: "Catalogue d'outils IA",
    definition: "Liste structurée d'outils d'intelligence artificielle sélectionnés pour leur pertinence dans la fonction publique. Chaque outil est présenté avec ses usages types, son niveau de difficulté et ses contraintes."
  },
  {
    term: "MOOC",
    definition: "Cours de formation en ligne, souvent gratuit, permettant de se former à l'intelligence artificielle à son rythme. Le Kit propose des MOOC recommandés (ex : Elements of AI)."
  },
  {
    term: "FAQ IA",
    definition: "Foire aux questions regroupant les interrogations fréquentes des agents sur l'IA (ex : \"L'IA va-t-elle remplacer les agents ?\"), avec des réponses prêtes à l'emploi pour harmoniser les discours."
  },
  {
    term: "Veille IA",
    definition: "Activité de suivi des actualités, tendances, usages, réglementations et innovations en matière d'IA. Le kit propose un assistant et des ressources pour suivre ces évolutions."
  },
  {
    term: "Accès à l'annuaire",
    definition: "Module permettant au référent IA d'identifier ses homologues dans d'autres structures publiques (ex : dans une autre préfecture ou ministère), pour créer des synergies ou poser des questions."
  },
  {
    term: "Forum communautaire",
    definition: "Espace (en construction) dédié aux échanges entre référents IA. Il permet de partager des retours d'expérience, poser des questions ou proposer des ressources utiles."
  },
  {
    term: "Charte éthique de l'IA",
    definition: "Référentiel précisant les principes fondamentaux à respecter dans les projets IA publics : transparence, protection des données, non-discrimination, explicabilité, sobriété numérique, etc."
  },
  {
    term: "RGPD",
    definition: "Règlement européen sur la protection des données. Il s'applique à tout projet manipulant des données personnelles, y compris ceux impliquant de l'IA. Le référent IA doit connaître ses grands principes."
  },
  {
    term: "AI Act",
    definition: "Réglementation européenne à venir sur les systèmes d'IA. Elle classifie les usages selon leur niveau de risque et impose des obligations selon leur finalité (IA à haut risque, IA interdite, etc.)."
  },
  {
    term: "Sobriété numérique / Impact environnemental",
    definition: "Prise en compte de l'empreinte énergétique des technologies, notamment de l'IA. Certains modèles sont gourmands en ressources : le référent IA peut être un relais de sensibilisation."
  }
];

const GlossaryInterface: React.FC<GlossaryInterfaceProps> = ({ toggleSidebar }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTerms = glossaryData.filter(item =>
    item.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.definition.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-50 dark:bg-slate-950 relative overflow-hidden transition-colors duration-300">
      {/* Header Mobile */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-4 flex items-center md:hidden sticky top-0 z-10">
        <button onClick={toggleSidebar} className="mr-3 text-slate-600 dark:text-slate-300">
          <Menu size={24} />
        </button>
        <h1 className="font-semibold text-slate-800 dark:text-white">Glossaire IA</h1>
      </header>

      {/* Header Desktop */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-8 py-6 hidden md:block transition-colors duration-300">
        <div className="flex items-start gap-4">
          <BookOpen className="text-ref-blue dark:text-blue-400 flex-shrink-0 mt-1" size={32} />
          <div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Glossaire de l'IA</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">
              Retrouvez tous les termes clés de l'intelligence artificielle pour mieux comprendre votre rôle de référent IA et les enjeux technologiques, éthiques et réglementaires.
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mt-6 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Rechercher un terme..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-ref-blue dark:focus:ring-blue-500 transition-all"
          />
        </div>
      </header>

      {/* Search Bar Mobile */}
      <div className="md:hidden px-4 py-3 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Rechercher..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-ref-blue dark:focus:ring-blue-500 transition-all"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 md:px-8 py-8 scrollbar-thin">
        <div className="max-w-5xl mx-auto">
          {filteredTerms.length > 0 ? (
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-bold text-slate-700 dark:text-slate-300 w-1/4">
                        Terme
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-slate-700 dark:text-slate-300">
                        Définition
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                    {filteredTerms.map((item, index) => (
                      <tr key={index} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                        <td className="px-6 py-4 align-top">
                          <span className="font-semibold text-slate-800 dark:text-white">
                            {item.term}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                            {item.definition}
                          </p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-12 text-center">
              <Search className="mx-auto text-slate-300 dark:text-slate-600 mb-4" size={48} />
              <p className="text-slate-500 dark:text-slate-400 text-lg">
                Aucun terme trouvé pour "{searchQuery}"
              </p>
              <p className="text-slate-400 dark:text-slate-500 text-sm mt-2">
                Essayez avec un autre mot-clé
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GlossaryInterface;

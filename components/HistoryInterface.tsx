import React from 'react';
import { Menu, Clock, Lightbulb, Download, Award } from 'lucide-react';

interface HistoryInterfaceProps {
  toggleSidebar: () => void;
}

interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  description: string;
  category: 'milestone' | 'application' | 'research' | 'regulation';
  image?: string;
}

const timelineData: TimelineEvent[] = [
  {
    id: '1',
    year: '1950',
    title: 'Test de Turing',
    description: 'Alan Turing propose un test pour déterminer si une machine peut démontrer un comportement intelligent équivalent à celui d\'un humain.',
    category: 'milestone',
    image: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '2',
    year: '1956',
    title: 'Conférence de Dartmouth',
    description: 'Naissance officielle du terme "Intelligence Artificielle" lors de cette conférence organisée par John McCarthy, considérée comme l\'acte fondateur de la discipline.',
    category: 'milestone',
    image: 'https://images.pexels.com/photos/3760607/pexels-photo-3760607.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '3',
    year: '1966',
    title: 'ELIZA, premier chatbot',
    description: 'Joseph Weizenbaum crée ELIZA, le premier programme capable de simuler une conversation avec un humain, en l\'occurrence un psychothérapeute.',
    category: 'application',
    image: 'https://images.pexels.com/photos/7567442/pexels-photo-7567442.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '4',
    year: '1980s',
    title: 'Premier "Hiver de l\'IA"',
    description: 'Après une phase d\'optimisme, l\'enthousiasme pour l\'IA diminue face aux limitations des approches alors utilisées, entraînant une baisse des financements.',
    category: 'milestone'
  },
  {
    id: '5',
    year: '1997',
    title: 'Deep Blue bat Kasparov',
    description: 'Le superordinateur d\'IBM bat le champion du monde d\'échecs Garry Kasparov, un moment symbolique dans l\'histoire de l\'IA.',
    category: 'milestone',
    image: 'https://images.pexels.com/photos/4709285/pexels-photo-4709285.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '6',
    year: '2011',
    title: 'Watson gagne à Jeopardy!',
    description: 'Le système d\'IA d\'IBM remporte le jeu télévisé Jeopardy! contre les meilleurs champions humains, démontrant sa capacité à comprendre le langage naturel.',
    category: 'application'
  },
  {
    id: '7',
    year: '2012',
    title: 'Percée du Deep Learning',
    description: 'L\'algorithme AlexNet remporte la compétition de reconnaissance d\'images ImageNet, marquant la renaissance des réseaux de neurones profonds.',
    category: 'research',
    image: 'https://images.pexels.com/photos/8386362/pexels-photo-8386362.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '8',
    year: '2016',
    title: 'AlphaGo bat le champion de Go',
    description: 'Le programme d\'IA de DeepMind bat Lee Sedol, champion du monde de Go, un jeu considéré comme bien plus complexe que les échecs.',
    category: 'milestone',
    image: 'https://images.pexels.com/photos/4709289/pexels-photo-4709289.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '9',
    year: '2018',
    title: 'Création du Lab IA de l\'État en France',
    description: 'Lancement officiel du Laboratoire d\'Intelligence Artificielle pour l\'administration publique française, tournant institutionnel important.',
    category: 'milestone'
  },
  {
    id: '10',
    year: '2020',
    title: 'GPT-3 et IA générative',
    description: 'OpenAI lance GPT-3, un modèle de langage capable de générer des textes cohérents et d\'effectuer diverses tâches linguistiques.',
    category: 'research',
    image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '11',
    year: '2023',
    title: 'Démocratisation de l\'IA générative',
    description: 'Explosion de l\'usage de l\'IA générative avec des outils comme ChatGPT, DALL-E et Midjourney, entraînant un débat sociétal sur ses implications.',
    category: 'application'
  },
  {
    id: '12',
    year: '2024',
    title: 'AI Act Européen',
    description: 'Entrée en vigueur du premier cadre réglementaire complet sur l\'IA au monde, imposant des exigences strictes pour les systèmes à haut risque.',
    category: 'regulation'
  }
];

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'milestone': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400';
    case 'research': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
    case 'application': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
    case 'regulation': return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400';
    default: return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400';
  }
};

const getCategoryLabel = (category: string) => {
  switch (category) {
    case 'milestone': return 'Événement clé';
    case 'research': return 'Recherche';
    case 'application': return 'Application';
    case 'regulation': return 'Réglementation';
    default: return category;
  }
};

const HistoryInterface: React.FC<HistoryInterfaceProps> = ({ toggleSidebar }) => {
  return (
    <div className="flex-1 flex flex-col h-full bg-slate-50 dark:bg-slate-950 relative overflow-hidden transition-colors duration-300">
      {/* Header Mobile */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-4 flex items-center md:hidden sticky top-0 z-10">
        <button onClick={toggleSidebar} className="mr-3 text-slate-600 dark:text-slate-300">
          <Menu size={24} />
        </button>
        <h1 className="font-semibold text-slate-800 dark:text-white">Histoire de l'IA</h1>
      </header>

      {/* Header Desktop */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-8 py-6 hidden md:block transition-colors duration-300">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center">
            <Clock className="mr-3 text-ref-blue dark:text-blue-400" size={28} />
            Histoire de l'Intelligence Artificielle
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Frise chronologique illustrée retraçant les grandes étapes de l'IA, des débuts jusqu'à aujourd'hui.
          </p>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 md:px-8 py-8 scrollbar-thin">
        <div className="max-w-6xl mx-auto space-y-8">

          {/* Le saviez-vous ? */}
          <div className="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20 rounded-xl border border-amber-200 dark:border-amber-800 p-6">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center mb-4">
              <Lightbulb className="mr-2 text-amber-600 dark:text-amber-400" size={24} />
              Le saviez-vous ?
            </h2>
            <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
              <p>
                <strong className="text-slate-900 dark:text-white">Le terme "intelligence artificielle" a été inventé en 1956</strong> lors de la conférence de Dartmouth,
                organisée par John McCarthy. Cette conférence de 6 semaines a réuni les pionniers du domaine et est considérée
                comme l'acte de naissance officiel de l'IA.
              </p>
              <p>
                <strong className="text-slate-900 dark:text-white">L'IA a connu plusieurs "hivers"</strong> - des périodes où les financements et l'intérêt ont diminué
                face aux attentes déçues. Le premier hiver de l'IA a eu lieu dans les années 1970, suivi d'un second dans les
                années 1980-90. Aujourd'hui, nous sommes dans ce qu'on pourrait appeler un "été de l'IA".
              </p>
              <p>
                <strong className="text-slate-900 dark:text-white">Le jeu de Go était considéré comme impossible à maîtriser par une IA</strong> jusqu'en 2016.
                Sa complexité (plus de possibilités que d'atomes dans l'univers observable) en faisait le "Saint Graal"
                de l'IA. La victoire d'AlphaGo a marqué un tournant historique.
              </p>
            </div>
          </div>

          {/* Pourquoi connaître l'histoire de l'IA */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
              Pourquoi connaître l'histoire de l'IA ?
            </h2>
            <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed mb-6">
              Comprendre l'évolution historique de l'IA permet de mettre en perspective les avancées actuelles, de mieux appréhender les cycles d'enthousiasme et de déception qui ont jalonné son développement, et d'anticiper les tendances futures. Cette connaissance est particulièrement utile pour un référent IA qui doit pouvoir expliquer l'état actuel de la technologie en la situant dans son contexte historique.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Légende */}
              <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-3 text-sm">Légende</h3>
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <div className="w-3 h-3 bg-purple-600 rounded-full mr-2"></div>
                    <span className="text-slate-600 dark:text-slate-300">Événement clé</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <div className="w-3 h-3 bg-blue-600 rounded-full mr-2"></div>
                    <span className="text-slate-600 dark:text-slate-300">Recherche</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <div className="w-3 h-3 bg-green-600 rounded-full mr-2"></div>
                    <span className="text-slate-600 dark:text-slate-300">Application</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <div className="w-3 h-3 bg-orange-600 rounded-full mr-2"></div>
                    <span className="text-slate-600 dark:text-slate-300">Réglementation</span>
                  </div>
                </div>
              </div>

              {/* Anecdote */}
              <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2 text-sm flex items-center">
                  <Lightbulb className="mr-2 text-yellow-600 dark:text-yellow-400" size={18} />
                  Anecdote historique
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Le premier programme d'IA, Logic Theorist, créé en 1955, a réussi à prouver 38 des 52 théorèmes
                  du chapitre 2 des Principia Mathematica de Russell et Whitehead. Ses créateurs ont même soumis
                  un article co-signé par le programme, mais il a été rejeté car les éditeurs ne voulaient pas
                  d'un "auteur" non-humain !
                </p>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
              <Clock className="mr-2 text-ref-blue dark:text-blue-400" size={24} />
              Chronologie de l'IA
            </h2>

            <div className="relative">
              {/* Ligne verticale centrale pour desktop */}
              <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-slate-200 dark:bg-slate-700 h-full"></div>

              {/* Events */}
              <div className="space-y-8">
                {timelineData.map((event, index) => {
                  const isLeft = index % 2 === 0;
                  return (
                    <div key={event.id} className={`relative flex ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} items-center`}>
                      {/* Point central */}
                      <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-ref-blue dark:bg-blue-500 rounded-full border-4 border-white dark:border-slate-900 z-10"></div>

                      {/* Contenu */}
                      <div className={`flex-1 ${isLeft ? 'md:pr-8 md:text-right' : 'md:pl-8 md:text-left'}`}>
                        <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow">
                          {event.image && (
                            <img
                              src={event.image}
                              alt={event.title}
                              className="w-full h-32 object-cover rounded-lg mb-3"
                            />
                          )}
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-lg font-bold text-ref-blue dark:text-blue-400">{event.year}</span>
                            <span className={`px-2 py-0.5 rounded text-xs font-semibold ${getCategoryColor(event.category)}`}>
                              {getCategoryLabel(event.category)}
                            </span>
                          </div>
                          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">{event.title}</h3>
                          <p className="text-sm text-slate-600 dark:text-slate-400">{event.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Points clés à retenir */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center">
              <Award className="mr-2 text-ref-blue dark:text-blue-400" size={24} />
              Points clés à retenir
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2 text-sm">L'IA n'est pas nouvelle</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Le domaine de l'IA existe depuis plus de 70 ans, avec des périodes d'avancées significatives suivies de ralentissements. Les technologies que nous voyons aujourd'hui sont le fruit de décennies de recherche.
                </p>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2 text-sm">Des cycles d'enthousiasme</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  L'histoire de l'IA est marquée par des cycles d'optimisme excessif suivis de périodes de déception. Comprendre ces cycles aide à garder une perspective réaliste sur les promesses actuelles.
                </p>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2 text-sm">Du symbolique au connexionniste</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  L'IA a évolué des approches symboliques (basées sur des règles) vers des approches connexionnistes (apprentissage automatique et réseaux de neurones), particulièrement avec la renaissance du deep learning depuis 2012.
                </p>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2 text-sm">La régulation suit l'innovation</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  L'adoption massive de l'IA a entraîné la mise en place de cadres réglementaires, comme l'AI Act européen, pour garantir un développement responsable et éthique de ces technologies.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default HistoryInterface;

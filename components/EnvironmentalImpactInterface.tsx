import React from 'react';
import { Menu, Leaf, TrendingUp, Zap, Target, Server, Droplet, AlertTriangle, Lightbulb, CheckCircle2 } from 'lucide-react';

interface EnvironmentalImpactInterfaceProps {
  toggleSidebar: () => void;
}

const EnvironmentalImpactInterface: React.FC<EnvironmentalImpactInterfaceProps> = ({ toggleSidebar }) => {
  return (
    <div className="flex-1 flex flex-col h-full bg-slate-50 dark:bg-slate-950 relative overflow-hidden transition-colors duration-300">
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-4 flex items-center md:hidden sticky top-0 z-10">
        <button onClick={toggleSidebar} className="mr-3 text-slate-600 dark:text-slate-300">
          <Menu size={24} />
        </button>
        <h1 className="font-semibold text-slate-800 dark:text-white">Impact Environnemental</h1>
      </header>

      <div className="flex-1 overflow-y-auto px-4 md:px-8 py-8 scrollbar-thin">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 dark:from-emerald-950/30 dark:via-green-950/30 dark:to-teal-950/30 rounded-2xl p-8 border-2 border-emerald-200 dark:border-emerald-800">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-emerald-600 dark:bg-emerald-700 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Leaf className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-3">
                    Impact Environnemental de l'Intelligence Artificielle
                  </h1>
                  <p className="text-lg text-gray-700 dark:text-slate-300 leading-relaxed">
                    Guide didactique pour les référents IA de l'administration publique
                  </p>
                  <p className="text-gray-600 dark:text-slate-400 mt-4 leading-relaxed">
                    L'intelligence artificielle transforme nos administrations, mais cette révolution a un coût environnemental
                    considérable et souvent invisible. Ce guide présente de manière accessible et chiffrée l'empreinte
                    environnementale réelle de l'IA, avec des équivalences concrètes pour mieux appréhender ces enjeux.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-gray-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">L'IA dans le monde : une consommation énergétique explosive</h2>
              </div>

              <div className="space-y-6">
                <div className="bg-blue-50 dark:bg-blue-950/30 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
                  <p className="text-gray-800 dark:text-slate-300 leading-relaxed mb-4">
                    En 2025, les datacenters et l'intelligence artificielle représentent <strong className="text-blue-700 dark:text-blue-400">550 TWh</strong> de
                    consommation électrique mondiale, soit <strong className="text-blue-700 dark:text-blue-400">2,2% de la consommation mondiale d'électricité</strong>,
                    équivalent à la consommation annuelle de l'Allemagne. L'IA seule représente désormais <strong className="text-blue-700 dark:text-blue-400">15%</strong> de
                    cette consommation et ce chiffre ne cesse de croître.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-gray-800 dark:text-white mb-4 text-lg">Les projections alarmantes</h3>
                  <p className="text-gray-700 dark:text-slate-300 leading-relaxed mb-4">
                    Selon l'Agence Internationale de l'Énergie et The Shift Project, la consommation pourrait
                    quadrupler d'ici 2030. Les centres de données, qui consommaient 460 TWh en 2022, pourraient
                    atteindre <strong>945 TWh en 2030</strong> (équivalent du Japon) et <strong>1 840 TWh en 2050</strong>.
                  </p>
                  <p className="text-gray-700 dark:text-slate-300 leading-relaxed">
                    En France, les datacenters consomment <strong>10 TWh/an</strong> (2% de la consommation nationale),
                    et la demande électrique pour l'IA en Europe est estimée à <strong>35 GW</strong>, nécessitant
                    l'équivalent de 35 réacteurs nucléaires.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-950/30 dark:to-blue-950/30 rounded-xl p-6 border border-cyan-200 dark:border-cyan-800">
                  <img
                    src="/images/environmental-impact-ia/chart.png"
                    alt="Évolution et projection de la consommation énergétique mondiale des datacenters avec la part croissante de l'IA"
                    className="w-full rounded-lg shadow-md"
                  />
                  <p className="text-xs text-gray-600 dark:text-slate-400 mt-3 text-center italic">
                    Évolution et projection de la consommation énergétique mondiale des datacenters avec la part croissante de l'IA
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-gray-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Consommation par requête : l'usage quotidien décrypté</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-gray-800 dark:text-white mb-4 text-lg">Comparaison des principaux modèles d'IA</h3>
                  <p className="text-gray-700 dark:text-slate-300 leading-relaxed mb-4">
                    Les données récentes révèlent des chiffres 10 fois inférieurs aux premières estimations de 2023,
                    grâce aux progrès techniques. Une requête ChatGPT (GPT-4o) consomme aujourd'hui environ
                    <strong className="text-purple-700 dark:text-purple-400"> 0,3 wattheure (Wh)</strong>, soit autant qu'une recherche Google.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
                  <img
                    src="/images/environmental-impact-ia/chart (1).png"
                    alt="Consommation énergétique par requête des principaux modèles d'IA comparée à une recherche Google"
                    className="w-full rounded-lg shadow-md"
                  />
                  <p className="text-xs text-gray-600 dark:text-slate-400 mt-3 text-center italic">
                    Consommation énergétique par requête des principaux modèles d'IA comparée à une recherche Google
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-gray-800 dark:text-white mb-4 text-lg">Équivalences concrètes</h3>
                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 rounded-xl p-6 border border-amber-200 dark:border-amber-800">
                    <p className="font-semibold text-gray-800 dark:text-white mb-3">1 requête ChatGPT (0,3 Wh) équivaut à :</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-amber-500 dark:bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-gray-700 dark:text-slate-300">1 minute 48 secondes d'une ampoule LED de 10W allumée</p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-amber-500 dark:bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-gray-700 dark:text-slate-300">1/50ème d'une recharge complète de smartphone</p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-amber-500 dark:bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-gray-700 dark:text-slate-300">10 secondes de fonctionnement d'un réfrigérateur</p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-amber-500 dark:bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-gray-700 dark:text-slate-300">1/75ème de l'énergie pour faire bouillir une tasse de thé</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-slate-400 mt-4 font-medium">
                      En perspective : <strong>41 096 requêtes ChatGPT</strong> = consommation électrique quotidienne
                      d'un foyer français moyen.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-gray-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Impact selon les profils d'utilisateurs</h2>
              </div>

              <p className="text-gray-700 dark:text-slate-300 leading-relaxed mb-6">
                Les scénarios d'usage révèlent des impacts variables selon l'intensité d'utilisation :
              </p>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-xl p-6 border border-green-200 dark:border-green-800 mb-6">
                <img
                  src="/images/environmental-impact-ia/co2_usage_chart.png"
                  alt="Impact carbone annuel de ChatGPT selon différents profils d'utilisateurs"
                  className="w-full rounded-lg shadow-md"
                />
                <p className="text-xs text-gray-600 dark:text-slate-400 mt-3 text-center italic">
                  Impact carbone annuel de ChatGPT selon différents profils d'utilisateurs avec équivalence en kilomètres parcourus en voiture
                </p>
              </div>

              <div className="bg-red-50 dark:bg-red-950/30 rounded-xl p-6 border border-red-200 dark:border-red-800">
                <p className="text-gray-800 dark:text-slate-300 leading-relaxed">
                  Un usage professionnel intensif (500 requêtes/jour) génère <strong className="text-red-700 dark:text-red-400">281 kg de CO₂ par an</strong>,
                  équivalent à <strong className="text-red-700 dark:text-red-400">1 405 km en voiture</strong>. Cela représente environ
                  <strong className="text-red-700 dark:text-red-400"> 3% de l'empreinte carbone annuelle moyenne d'un Français</strong> (9 tonnes de CO₂).
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-gray-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-600 to-red-600 rounded-xl flex items-center justify-center">
                  <Server className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">L'entraînement : le coût caché des modèles</h2>
              </div>

              <div className="space-y-6">
                <p className="text-gray-700 dark:text-slate-300 leading-relaxed">
                  L'entraînement d'un modèle d'IA est bien plus coûteux énergétiquement que son utilisation quotidienne.
                  L'entraînement de GPT-3 a nécessité <strong>1 287 MWh</strong> et généré <strong>502 tonnes de CO₂</strong>.
                  Pour GPT-4, les estimations varient entre <strong>10 000 et 50 000 MWh</strong>, avec des émissions
                  pouvant atteindre <strong>14 000 tonnes de CO₂</strong>.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/30 dark:to-red-950/30 rounded-xl p-6 border border-orange-200 dark:border-orange-800">
                    <img
                      src="/images/environmental-impact-ia/chart (2).png"
                      alt="Consommation énergétique de l'entraînement des grands modèles de langage"
                      className="w-full rounded-lg shadow-md"
                    />
                    <p className="text-xs text-gray-600 dark:text-slate-400 mt-3 text-center italic">
                      Consommation énergétique de l'entraînement des grands modèles de langage (échelle logarithmique)
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-950/30 dark:to-pink-950/30 rounded-xl p-6 border border-red-200 dark:border-red-800">
                    <img
                      src="/images/environmental-impact-ia/chart (3).png"
                      alt="Coût environnemental de l'entraînement des grands modèles d'IA"
                      className="w-full rounded-lg shadow-md"
                    />
                    <p className="text-xs text-gray-600 dark:text-slate-400 mt-3 text-center italic">
                      Coût environnemental de l'entraînement des grands modèles d'IA avec équivalences concrètes
                    </p>
                  </div>
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-950/30 rounded-xl p-6 border-2 border-yellow-300 dark:border-yellow-700">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-6 h-6 text-yellow-700 dark:text-yellow-400 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-bold text-yellow-900 dark:text-yellow-200 mb-2">Chiffre marquant</p>
                      <p className="text-yellow-900 dark:text-yellow-100">
                        L'entraînement de GPT-4 a nécessité l'équivalent de <strong>3 jours de consommation électrique
                        de la ville de San Francisco</strong>.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-gray-800 dark:text-white mb-4 text-lg">Le renversement de l'équation</h3>
                  <p className="text-gray-700 dark:text-slate-300 leading-relaxed">
                    Avec ChatGPT et ses 1 milliard de requêtes quotidiennes, l'usage dépasse l'entraînement en
                    seulement <strong>4,3 jours</strong>. Selon Sasha Luccioni (Hugging Face), dès 100 millions d'utilisations,
                    la phase d'inférence devient plus énergivore que l'entraînement. Pour les modèles populaires,
                    l'impact de l'usage quotidien dépasse largement celui de leur création.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-gray-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-600 to-blue-600 rounded-xl flex items-center justify-center">
                  <Droplet className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">La consommation d'eau : l'impact oublié</h2>
              </div>

              <div className="space-y-6">
                <div className="bg-cyan-50 dark:bg-cyan-950/30 rounded-xl p-6 border border-cyan-200 dark:border-cyan-800">
                  <p className="text-gray-700 dark:text-slate-300 leading-relaxed">
                    Les datacenters utilisent d'énormes quantités d'eau pour refroidir leurs serveurs. Une requête Gemini
                    consomme environ <strong>5 gouttes d'eau (0,26 mL)</strong>, tandis qu'une requête ChatGPT (10-50 réponses)
                    nécessite environ <strong>500 mL</strong>.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 dark:bg-blue-950/30 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
                    <h3 className="font-bold text-gray-800 dark:text-white mb-3">Google (2023)</h3>
                    <p className="text-gray-700 dark:text-slate-300">
                      <strong>24 millions de m³</strong> d'eau consommés<br/>
                      <span className="text-sm">(9 600 piscines olympiques)</span><br/>
                      <span className="text-red-600 dark:text-red-400 font-medium">+14% d'augmentation</span>
                    </p>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-950/30 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
                    <h3 className="font-bold text-gray-800 dark:text-white mb-3">Microsoft (2023)</h3>
                    <p className="text-gray-700 dark:text-slate-300">
                      <strong>7,8 millions de m³</strong> d'eau consommés<br/>
                      <span className="text-red-600 dark:text-red-400 font-medium">+22% d'augmentation</span>
                    </p>
                  </div>
                </div>

                <div className="bg-red-50 dark:bg-red-950/30 rounded-xl p-6 border-2 border-red-200 dark:border-red-800">
                  <p className="text-gray-800 dark:text-slate-300 leading-relaxed">
                    L'entraînement de GPT-3 a nécessité environ <strong className="text-red-700 dark:text-red-400">700 000 litres d'eau</strong>.
                    Les projections estiment que les besoins mondiaux pourraient atteindre
                    <strong className="text-red-700 dark:text-red-400"> 4,2 à 6,6 milliards de m³/an d'ici 2030</strong>,
                    soit environ la moitié de la consommation du Royaume-Uni.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-gray-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-orange-600 rounded-xl flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Émissions de CO₂ et mix énergétique</h2>
              </div>

              <div className="space-y-6">
                <div className="bg-amber-50 dark:bg-amber-950/30 rounded-xl p-6 border border-amber-200 dark:border-amber-800">
                  <p className="text-gray-700 dark:text-slate-300 leading-relaxed">
                    L'impact CO₂ de l'IA dépend fortement de la source d'électricité. En France (nucléaire),
                    l'intensité carbone est d'environ <strong>60 g CO₂/kWh</strong>, contre
                    <strong> 400-600 g CO₂/kWh</strong> aux États-Unis. Entraîner un modèle aux USA émet
                    ainsi <strong className="text-red-700 dark:text-red-400">10 fois plus de CO₂ qu'en France</strong>.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-gray-800 dark:text-white mb-4 text-lg">Conséquences climatiques préoccupantes</h3>
                  <div className="bg-red-50 dark:bg-red-950/30 rounded-xl p-6 border-2 border-red-300 dark:border-red-800">
                    <p className="text-gray-800 dark:text-slate-300 leading-relaxed mb-4">
                      L'explosion de la demande électrique pour l'IA provoque le report de fermeture de centrales
                      à charbon (Mississippi, Géorgie, Nebraska) et la construction de <strong>44 GW de nouveaux
                      projets de centrales à gaz dans le monde</strong>, dont 37 GW aux USA. Ces décisions
                      compromettent les objectifs de l'Accord de Paris.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-red-200 dark:border-red-700">
                        <p className="font-semibold text-red-700 dark:text-red-400">Google</p>
                        <p className="text-gray-800 dark:text-slate-300"><strong>+48%</strong> d'émissions depuis 2019</p>
                      </div>
                      <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-red-200 dark:border-red-700">
                        <p className="font-semibold text-red-700 dark:text-red-400">Microsoft</p>
                        <p className="text-gray-800 dark:text-slate-300"><strong>+22%</strong> d'émissions en 2023</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-gray-800 dark:text-white mb-4 text-lg">Impact en France et en Europe</h3>
                  <div className="bg-blue-50 dark:bg-blue-950/30 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
                    <p className="font-semibold text-gray-800 dark:text-white mb-3">Selon GreenIT.fr, l'impact environnemental de l'IA en 2025 :</p>
                    <div className="space-y-2">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-gray-700 dark:text-slate-300"><strong>41 millions de tonnes éq. CO₂</strong> (réchauffement global)</p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-gray-700 dark:text-slate-300"><strong>376 tonnes éq. antimoine</strong> (épuisement des ressources)</p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-gray-700 dark:text-slate-300"><strong>5 décès/jour</strong> (particules fines)</p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-gray-700 dark:text-slate-300"><strong>19 123 tonnes éq. Phosphore</strong> (eutrophisation)</p>
                      </div>
                    </div>
                    <p className="text-gray-700 dark:text-slate-300 mt-4">
                      L'IA représente <strong>2% de l'impact du numérique français</strong> et
                      <strong> 10% du budget soutenable de l'UE</strong>. L'ADEME et l'Arcep prévoient qu'en 2050,
                      l'IA pourrait générer <strong className="text-red-700 dark:text-red-400">50 millions de tonnes de CO₂ en France</strong>,
                      soit une multiplication par 3.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-gray-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-green-600 rounded-xl flex items-center justify-center">
                  <Lightbulb className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Recommandations pour les référents IA</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-white dark:from-blue-950/30 dark:to-slate-900 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-800 dark:text-white mb-3">Principe de sobriété numérique</h3>
                  <ul className="space-y-2 text-sm text-gray-700 dark:text-slate-300">
                    <li className="flex items-start space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                      <span>Favoriser les modèles légers pour les tâches simples</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                      <span>Optimiser les prompts pour réduire le nombre de tokens</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                      <span>Limiter les requêtes inutiles ou redondantes</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-white dark:from-purple-950/30 dark:to-slate-900 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
                  <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                    <AlertTriangle className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-800 dark:text-white mb-3">Transparence et sensibilisation</h3>
                  <ul className="space-y-2 text-sm text-gray-700 dark:text-slate-300">
                    <li className="flex items-start space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-purple-600 dark:text-purple-400 mt-0.5 flex-shrink-0" />
                      <span>Informer les agents sur l'impact environnemental</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-purple-600 dark:text-purple-400 mt-0.5 flex-shrink-0" />
                      <span>Publier les métriques de consommation</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-purple-600 dark:text-purple-400 mt-0.5 flex-shrink-0" />
                      <span>Former aux bonnes pratiques d'utilisation responsable</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-white dark:from-green-950/30 dark:to-slate-900 rounded-xl p-6 border border-green-200 dark:border-green-800">
                  <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                    <Server className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-800 dark:text-white mb-3">Choix des infrastructures</h3>
                  <ul className="space-y-2 text-sm text-gray-700 dark:text-slate-300">
                    <li className="flex items-start space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Privilégier les datacenters à faible intensité carbone (France, Norvège, Islande)</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Exiger des fournisseurs d'IA des rapports de durabilité</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Favoriser les énergies renouvelables</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-white dark:from-orange-950/30 dark:to-slate-900 rounded-xl p-6 border border-orange-200 dark:border-orange-800">
                  <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center mb-4">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-800 dark:text-white mb-3">Évaluation d'impact</h3>
                  <ul className="space-y-2 text-sm text-gray-700 dark:text-slate-300">
                    <li className="flex items-start space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-orange-600 dark:text-orange-400 mt-0.5 flex-shrink-0" />
                      <span>Mesurer systématiquement l'empreinte carbone des projets IA</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-orange-600 dark:text-orange-400 mt-0.5 flex-shrink-0" />
                      <span>Adopter des outils de monitoring (Eco2AI, CodeCarbon)</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-orange-600 dark:text-orange-400 mt-0.5 flex-shrink-0" />
                      <span>Mettre en balance bénéfice fonctionnel et coût environnemental</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-teal-50 to-white dark:from-teal-950/30 dark:to-slate-900 rounded-xl p-6 border border-teal-200 dark:border-teal-800">
                  <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center mb-4">
                    <Leaf className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-800 dark:text-white mb-3">Mutualisation et réutilisation</h3>
                  <ul className="space-y-2 text-sm text-gray-700 dark:text-slate-300">
                    <li className="flex items-start space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-teal-600 dark:text-teal-400 mt-0.5 flex-shrink-0" />
                      <span>Partager les modèles entraînés plutôt que ré-entraîner</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-teal-600 dark:text-teal-400 mt-0.5 flex-shrink-0" />
                      <span>Utiliser des modèles open source quand c'est possible</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-teal-600 dark:text-teal-400 mt-0.5 flex-shrink-0" />
                      <span>Favoriser le fine-tuning plutôt que l'entraînement complet</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-emerald-600 to-green-700 dark:from-emerald-800 dark:to-green-900 rounded-2xl p-8 text-white shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Vers une IA responsable dans l'administration</h2>
              <p className="text-white/90 leading-relaxed mb-6">
                L'intelligence artificielle offre des opportunités considérables pour moderniser le service public,
                mais son déploiement doit s'inscrire dans une logique de durabilité et de responsabilité environnementale.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-white mb-2">Mesurer</h3>
                  <p className="text-white/90 text-sm">Connaître précisément l'impact de nos usages</p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-white mb-2">Optimiser</h3>
                  <p className="text-white/90 text-sm">Choisir les solutions les moins énergivores</p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                    <Lightbulb className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-white mb-2">Sensibiliser</h3>
                  <p className="text-white/90 text-sm">Former tous les agents aux enjeux environnementaux</p>
                </div>
              </div>

              <p className="text-white/90 leading-relaxed">
                En tant que référents IA, vous êtes en première ligne pour promouvoir ces pratiques et garantir
                que la transformation numérique de l'administration se fasse dans le respect des objectifs
                climatiques de la France.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnvironmentalImpactInterface;

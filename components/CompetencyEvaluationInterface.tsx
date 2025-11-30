import React, { useState, useRef, useEffect } from 'react';
import { ChevronRight, ChevronLeft, Menu, CheckCircle, Award, AlertCircle, ArrowLeft } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import SpaceBackground from './SpaceBackground';

interface CompetencyEvaluationProps {
  toggleSidebar: () => void;
  onComplete?: () => void;
  onBack?: () => void;
}

interface Answer {
  questionId: number;
  value: string | string[];
  score: number;
}

const CompetencyEvaluationInterface: React.FC<CompetencyEvaluationProps> = ({ toggleSidebar, onComplete, onBack }) => {
  const { updateProfile, profile } = useAuth();
  const [currentSection, setCurrentSection] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentSection]);

  const sections = [
    {
      title: 'Profil professionnel',
      maxPoints: 10,
      questions: [
        {
          id: 1,
          text: 'Quelle est votre fonction actuelle dans l\'administration ?',
          type: 'single',
          options: [
            { label: 'Agent ou employé sans fonction d\'encadrement', value: 'A', score: 0 },
            { label: 'Cadre intermédiaire / Chef de projet', value: 'B', score: 2 },
            { label: 'Responsable de service ou direction', value: 'C', score: 4 }
          ]
        },
        {
          id: 2,
          text: 'Combien d\'années d\'expérience professionnelle avez-vous ?',
          type: 'single',
          options: [
            { label: 'Moins de 3 ans', value: 'A', score: 0 },
            { label: '3 à 5 ans', value: 'B', score: 1 },
            { label: '5 à 10 ans', value: 'C', score: 2 },
            { label: 'Plus de 10 ans', value: 'D', score: 3 }
          ]
        },
        {
          id: 3,
          text: 'Avez-vous déjà encadré un projet numérique ou innovant ?',
          type: 'single',
          options: [
            { label: 'Non, jamais', value: 'A', score: 0 },
            { label: 'Oui, en tant que membre d\'une équipe projet', value: 'B', score: 1 },
            { label: 'Oui, en tant que chef de projet sur une initiative', value: 'C', score: 2 },
            { label: 'Oui, plusieurs projets menés de bout en bout', value: 'D', score: 3 }
          ]
        }
      ]
    },
    {
      title: 'Parcours de formation IA',
      maxPoints: 20,
      questions: [
        {
          id: 4,
          text: 'Quel est votre niveau de formation initiale en lien avec l\'IA ou la data ?',
          type: 'single',
          options: [
            { label: 'Aucun cursus spécifique en informatique/IA', value: 'A', score: 0 },
            { label: 'Cursus scientifique/technique hors IA', value: 'B', score: 1 },
            { label: 'Formation supérieure avec option en data/IA', value: 'C', score: 3 },
            { label: 'Diplôme spécialisé en IA/data', value: 'D', score: 5 }
          ]
        },
        {
          id: 5,
          text: 'Combien d\'heures de formation continue sur l\'IA avez-vous suivies ?',
          type: 'single',
          options: [
            { label: 'Aucune formation suivie', value: 'A', score: 0 },
            { label: 'Moins de 10 heures', value: 'B', score: 1 },
            { label: 'Environ 10 à 30 heures', value: 'C', score: 2 },
            { label: 'Environ 30 à 60 heures', value: 'D', score: 3 },
            { label: 'Plus de 60 heures', value: 'E', score: 5 }
          ]
        },
        {
          id: 6,
          text: 'Avez-vous une certification ou une formation longue spécifique en IA/data ?',
          type: 'single',
          options: [
            { label: 'Non, aucune certification ni formation longue', value: 'A', score: 0 },
            { label: 'Oui, formation courte (non certifiante)', value: 'B', score: 1 },
            { label: 'Oui, certification en cours d\'obtention', value: 'C', score: 3 },
            { label: 'Oui, certification déjà obtenue en IA/data', value: 'D', score: 5 }
          ]
        },
        {
          id: 7,
          text: 'Menez-vous une veille ou suivez-vous régulièrement des formations sur l\'IA ?',
          type: 'single',
          options: [
            { label: 'Pas du tout', value: 'A', score: 0 },
            { label: 'Rarement', value: 'B', score: 1 },
            { label: 'Occasionnellement', value: 'C', score: 3 },
            { label: 'Régulièrement', value: 'D', score: 5 }
          ]
        }
      ]
    },
    {
      title: 'Usage actuel de l\'IA',
      maxPoints: 15,
      questions: [
        {
          id: 8,
          text: 'À quelle fréquence utilisez-vous des outils d\'IA dans votre travail ?',
          type: 'single',
          options: [
            { label: 'Jamais', value: 'A', score: 0 },
            { label: 'Rarement', value: 'B', score: 1 },
            { label: 'Occasionnellement', value: 'C', score: 3 },
            { label: 'Fréquemment', value: 'D', score: 5 }
          ]
        },
        {
          id: 9,
          text: 'Avez-vous déjà contribué à un projet intégrant de l\'IA ?',
          type: 'single',
          options: [
            { label: 'Non, aucun projet IA à ce jour', value: 'A', score: 0 },
            { label: 'Pas encore, mais un projet est en préparation', value: 'B', score: 3 },
            { label: 'Oui, participation à un projet pilote', value: 'C', score: 4 },
            { label: 'Oui, pilotage d\'un ou plusieurs projets IA', value: 'D', score: 5 }
          ]
        },
        {
          id: 10,
          text: 'Quels types d\'outils d\'IA avez-vous utilisés ?',
          type: 'multiple',
          maxScore: 5,
          options: [
            { label: 'Assistants conversationnels', value: 'chatbots', score: 1 },
            { label: 'Analyse prédictive', value: 'predictive', score: 1 },
            { label: 'Vision artificielle', value: 'vision', score: 1 },
            { label: 'Traitement du langage naturel', value: 'nlp', score: 1 },
            { label: 'Automatisation intelligente', value: 'automation', score: 1 },
            { label: 'Autre', value: 'other', score: 1 }
          ]
        }
      ]
    },
    {
      title: 'Connaissances techniques',
      maxPoints: 30,
      questions: [
        {
          id: 11,
          text: 'Votre connaissance des concepts fondamentaux de l\'IA ?',
          type: 'scale',
          min: 1,
          max: 5,
          labels: ['Aucune notion', 'Notions élémentaires', 'Connaissances de base', 'Bonne connaissance', 'Maîtrise avancée']
        },
        {
          id: 12,
          text: 'Votre familiarité avec les outils IA (Python, R, SQL, etc.) ?',
          type: 'single',
          options: [
            { label: 'Aucune connaissance', value: 'A', score: 0 },
            { label: 'Notions de base', value: 'B', score: 1 },
            { label: 'Utilisation occasionnelle', value: 'C', score: 3 },
            { label: 'Bonne maîtrise', value: 'D', score: 5 }
          ]
        },
        {
          id: 13,
          text: 'Votre connaissance des cadres juridiques et éthiques (RGPD, règlement IA, etc.) ?',
          type: 'single',
          options: [
            { label: 'Aucune notion', value: 'A', score: 0 },
            { label: 'Notions basiques', value: 'B', score: 1 },
            { label: 'Connaissance générale', value: 'C', score: 3 },
            { label: 'Bonne maîtrise', value: 'D', score: 5 }
          ]
        },
        {
          id: 14,
          text: 'Êtes-vous informé des stratégies IA de votre administration ?',
          type: 'single',
          options: [
            { label: 'Pas du tout', value: 'A', score: 0 },
            { label: 'Je sais qu\'il existe des orientations', value: 'B', score: 1 },
            { label: 'J\'ai pris connaissance de documents', value: 'C', score: 3 },
            { label: 'Oui, je maîtrise ces référentiels', value: 'D', score: 5 }
          ]
        },
        {
          id: 15,
          text: 'Quelles notions techniques maîtrisez-vous ?',
          type: 'multiple',
          maxScore: 5,
          options: [
            { label: 'Apprentissage supervisé', value: 'supervised', score: 1 },
            { label: 'Apprentissage non supervisé', value: 'unsupervised', score: 1 },
            { label: 'Réseaux de neurones', value: 'neural', score: 1 },
            { label: 'Traitement du langage naturel', value: 'nlp', score: 1 },
            { label: 'Vision par ordinateur', value: 'vision', score: 1 },
            { label: 'Autre notion avancée', value: 'other', score: 1 }
          ]
        },
        {
          id: 16,
          text: 'Comprenez-vous les étapes clés d\'un projet IA ?',
          type: 'single',
          options: [
            { label: 'Pas du tout', value: 'A', score: 0 },
            { label: 'Vaguement', value: 'B', score: 2 },
            { label: 'Oui, bonne compréhension', value: 'C', score: 5 }
          ]
        }
      ]
    },
    {
      title: 'Compétences opérationnelles',
      maxPoints: 25,
      questions: [
        {
          id: 17,
          text: 'Savez-vous identifier des cas d\'usage IA dans votre domaine ?',
          type: 'single',
          options: [
            { label: 'Non, pas du tout', value: 'A', score: 0 },
            { label: 'Avec de l\'aide extérieure', value: 'B', score: 1 },
            { label: 'Oui, quelques idées', value: 'C', score: 3 },
            { label: 'Oui, plusieurs cas identifiés', value: 'D', score: 5 }
          ]
        },
        {
          id: 18,
          text: 'Pouvez-vous superviser la préparation des données pour un projet IA ?',
          type: 'single',
          options: [
            { label: 'Non, aucune expérience', value: 'A', score: 0 },
            { label: 'Notions de base', value: 'B', score: 1 },
            { label: 'Oui, j\'ai déjà contribué', value: 'C', score: 3 },
            { label: 'Oui, en autonomie', value: 'D', score: 5 }
          ]
        },
        {
          id: 19,
          text: 'Pouvez-vous expliquer les principes de l\'IA à des non-spécialistes ?',
          type: 'single',
          options: [
            { label: 'Non, pas du tout à l\'aise', value: 'A', score: 0 },
            { label: 'C\'est difficile pour moi', value: 'B', score: 1 },
            { label: 'Oui, je peux vulgariser', value: 'C', score: 3 },
            { label: 'Oui, j\'ai déjà animé des formations', value: 'D', score: 5 }
          ]
        },
        {
          id: 20,
          text: 'Êtes-vous à l\'aise pour piloter une solution IA ?',
          type: 'single',
          options: [
            { label: 'Pas du tout à l\'aise', value: 'A', score: 0 },
            { label: 'Peu à l\'aise', value: 'B', score: 1 },
            { label: 'Relativement à l\'aise', value: 'C', score: 3 },
            { label: 'Très à l\'aise', value: 'D', score: 5 }
          ]
        },
        {
          id: 21,
          text: 'Avez-vous déjà réalisé un prototype IA ?',
          type: 'single',
          options: [
            { label: 'Non, jamais', value: 'A', score: 0 },
            { label: 'Quelques tests basiques', value: 'B', score: 2 },
            { label: 'Oui, développé un prototype', value: 'C', score: 5 }
          ]
        }
      ]
    }
  ];

  const handleAnswer = (questionId: number, value: string | string[], score: number) => {
    setAnswers(prev => {
      const existing = prev.findIndex(a => a.questionId === questionId);
      if (existing >= 0) {
        const updated = [...prev];
        updated[existing] = { questionId, value, score };
        return updated;
      }
      return [...prev, { questionId, value, score }];
    });
  };

  const getAnswer = (questionId: number) => {
    return answers.find(a => a.questionId === questionId);
  };

  const calculateScore = () => {
    return answers.reduce((total, answer) => total + answer.score, 0);
  };

  const getLevel = (score: number) => {
    if (score <= 40) return 'Niveau 1 - Distant';
    if (score <= 70) return 'Niveau 2 - Confirmé';
    return 'Niveau 3 - Expert';
  };

  const handleSubmit = async () => {
    setLoading(true);
    const totalScore = calculateScore();
    const level = getLevel(totalScore);

    try {
      await updateProfile({
        competency_score: totalScore,
        competency_level: level,
        competency_evaluated_at: new Date().toISOString()
      });
      setShowResults(true);
    } catch (error) {
      console.error('Error saving evaluation:', error);
      alert('Erreur lors de l\'enregistrement de l\'évaluation');
    } finally {
      setLoading(false);
    }
  };

  const renderQuestion = (question: any) => {
    const answer = getAnswer(question.id);

    if (question.type === 'single') {
      return (
        <div className="space-y-3">
          {question.options.map((option: any) => (
            <label
              key={option.value}
              className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-white/5 rounded-lg border border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/10 cursor-pointer transition-all"
            >
              <input
                type="radio"
                name={`question-${question.id}`}
                value={option.value}
                checked={answer?.value === option.value}
                onChange={() => handleAnswer(question.id, option.value, option.score)}
                className="mt-1"
              />
              <span className="text-gray-800 dark:text-white text-sm">{option.label}</span>
            </label>
          ))}
        </div>
      );
    }

    if (question.type === 'multiple') {
      return (
        <div className="space-y-3">
          {question.options.map((option: any) => {
            const selectedValues = (answer?.value as string[]) || [];
            const isChecked = selectedValues.includes(option.value);

            return (
              <label
                key={option.value}
                className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-white/5 rounded-lg border border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/10 cursor-pointer transition-all"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={(e) => {
                    let newValues: string[];
                    if (e.target.checked) {
                      newValues = [...selectedValues, option.value];
                    } else {
                      newValues = selectedValues.filter(v => v !== option.value);
                    }
                    const newScore = Math.min(newValues.length, question.maxScore || 5);
                    handleAnswer(question.id, newValues, newScore);
                  }}
                  className="mt-1"
                />
                <span className="text-gray-800 dark:text-white text-sm">{option.label}</span>
              </label>
            );
          })}
        </div>
      );
    }

    if (question.type === 'scale') {
      return (
        <div className="space-y-4">
          <div className="flex justify-between gap-2">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                onClick={() => handleAnswer(question.id, value.toString(), value)}
                className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                  answer?.value === value.toString()
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-500/20'
                    : 'border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10'
                }`}
              >
                <div className="text-2xl font-bold text-gray-800 dark:text-white mb-1">{value}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">{question.labels[value - 1]}</div>
              </button>
            ))}
          </div>
        </div>
      );
    }

    return null;
  };

  if (showResults) {
    const score = calculateScore();
    const level = getLevel(score);

    return (
      <div className="h-full w-full relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white dark:from-[#0A1628] dark:via-[#1a2942] dark:to-[#0f1c33] z-0" />
        <SpaceBackground />

        <div className="relative z-10 h-full overflow-y-auto">
          <div className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-white/10 shadow-sm">
            <div className="max-w-6xl mx-auto px-6 py-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={toggleSidebar}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-slate-600 dark:text-white transition-colors md:hidden"
                >
                  <Menu size={24} />
                </button>
                <h1 className="text-xl font-bold text-gray-800 dark:text-white">Résultats de l'évaluation</h1>
              </div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto px-6 py-12">
            <div className="text-center space-y-6">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full shadow-lg">
                <Award size={48} className="text-white" />
              </div>

              <div>
                <h2 className="text-4xl font-bold mb-2 text-gray-800 dark:text-white">Évaluation terminée !</h2>
                <p className="text-gray-600 dark:text-gray-400">Votre profil a été mis à jour avec votre niveau de compétence</p>
              </div>

              <div className="bg-white dark:bg-white/5 rounded-2xl p-8 border border-gray-200 dark:border-white/10 shadow-lg">
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Score total</div>
                    <div className="text-5xl font-bold text-blue-600 dark:text-blue-400">{score}/100</div>
                  </div>

                  <div className="h-px bg-gray-200 dark:bg-white/10"></div>

                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">Niveau attribué</div>
                    <div className="text-2xl font-bold text-gray-800 dark:text-white">{level}</div>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-white/5 rounded-xl p-6 border border-gray-200 dark:border-white/10 shadow text-left space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-800 dark:text-white">
                  <CheckCircle className="text-green-500 dark:text-green-400" size={20} />
                  Recommandations
                </h3>
                {score <= 40 && (
                  <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    <p>• Commencez par le parcours initiatique pour découvrir les bases de l'IA</p>
                    <p>• Consultez le catalogue de formations pour identifier des modules adaptés</p>
                    <p>• Explorez les outils IA disponibles pour vous familiariser avec leur usage</p>
                  </div>
                )}
                {score > 40 && score <= 70 && (
                  <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    <p>• Approfondissez vos connaissances avec des formations avancées</p>
                    <p>• Participez aux projets IA de votre administration</p>
                    <p>• Rejoignez le forum pour échanger avec d'autres référents</p>
                  </div>
                )}
                {score > 70 && (
                  <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    <p>• Partagez votre expertise sur le forum de la communauté</p>
                    <p>• Pilotez des projets IA stratégiques dans votre administration</p>
                    <p>• Contribuez à la veille et aux ressources de la plateforme</p>
                  </div>
                )}
              </div>

              <button
                onClick={() => onComplete?.()}
                className="px-8 py-3 bg-gradient-to-r from-[#6B9BD2] to-[#90E4C1] text-white rounded-lg font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
              >
                Retour à l'accueil
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentSectionData = sections[currentSection];
  const isLastSection = currentSection === sections.length - 1;
  const sectionAnswers = answers.filter(a =>
    currentSectionData.questions.some(q => q.id === a.questionId)
  );
  const allQuestionsAnswered = sectionAnswers.length === currentSectionData.questions.length;

  return (
    <div className="h-full w-full relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white dark:from-[#0A1628] dark:via-[#1a2942] dark:to-[#0f1c33] z-0" />
      <SpaceBackground />

      <div className="relative z-10 h-full overflow-y-auto">
        <div className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-white/10 shadow-sm">
          <div className="max-w-6xl mx-auto px-6 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-slate-600 dark:text-white transition-colors md:hidden"
              >
                <Menu size={24} />
              </button>
              {onBack && (
                <button
                  onClick={onBack}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-slate-600 dark:text-white transition-colors"
                  title="Retour"
                >
                  <ArrowLeft size={24} />
                </button>
              )}
              <div className="flex-1">
                <h1 className="text-xl font-bold text-gray-800 dark:text-white">Évaluation des compétences</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Section {currentSection + 1} / {sections.length}</p>
              </div>
            </div>
          </div>
        </div>

        <div ref={scrollContainerRef} className="max-w-4xl mx-auto px-6 py-8">
          <div className="space-y-6">
            <div className="bg-white dark:bg-white/5 rounded-xl p-6 border border-gray-200 dark:border-white/10 shadow">
              <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">{currentSectionData.title}</h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Maximum {currentSectionData.maxPoints} points</p>
            </div>

            {showAlert && (
              <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-xl p-4 flex items-start gap-3">
                <AlertCircle className="text-red-500 dark:text-red-400 flex-shrink-0 mt-0.5" size={20} />
                <div className="flex-1">
                  <h3 className="text-red-700 dark:text-red-400 font-semibold mb-1">Questions non répondues</h3>
                  <p className="text-red-600 dark:text-red-300 text-sm">Veuillez répondre à toutes les questions avant de passer à la section suivante.</p>
                </div>
              </div>
            )}

            <div className="space-y-6">
              {currentSectionData.questions.map((question, idx) => {
                const isAnswered = getAnswer(question.id);
                return (
                  <div
                    key={question.id}
                    id={`question-${question.id}`}
                    className={`bg-white dark:bg-white/5 rounded-xl p-6 border shadow transition-colors ${
                      showAlert && !isAnswered
                        ? 'border-red-300 dark:border-red-500/50 bg-red-50/50 dark:bg-red-500/5'
                        : 'border-gray-200 dark:border-white/10'
                    }`}
                  >
                    <div className="mb-4">
                      <span className="text-blue-600 dark:text-blue-400 font-semibold">Question {idx + 1}</span>
                      {showAlert && !isAnswered && (
                        <span className="ml-2 text-red-500 dark:text-red-400 text-sm font-medium">• Non répondue</span>
                      )}
                      <h3 className="text-lg font-medium mt-1 text-gray-800 dark:text-white">{question.text}</h3>
                    </div>
                    {renderQuestion(question)}
                  </div>
                );
              })}
            </div>

            <div className="flex justify-between gap-4 pt-6">
              <button
                onClick={() => {
                  setShowAlert(false);
                  setCurrentSection(s => Math.max(0, s - 1));
                }}
                disabled={currentSection === 0}
                className="flex items-center gap-2 px-6 py-3 bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors text-gray-800 dark:text-white font-medium"
              >
                <ChevronLeft size={20} />
                Précédent
              </button>

              {isLastSection ? (
                <button
                  onClick={() => {
                    if (!allQuestionsAnswered) {
                      setShowAlert(true);
                      const firstUnanswered = currentSectionData.questions.find(
                        q => !getAnswer(q.id)
                      );
                      if (firstUnanswered) {
                        document.getElementById(`question-${firstUnanswered.id}`)?.scrollIntoView({
                          behavior: 'smooth',
                          block: 'center'
                        });
                      }
                    } else {
                      setShowAlert(false);
                      handleSubmit();
                    }
                  }}
                  disabled={loading}
                  className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-[#6B9BD2] to-[#90E4C1] text-white hover:shadow-lg transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none rounded-lg font-medium transition-all"
                >
                  {loading ? 'Enregistrement...' : 'Terminer l\'évaluation'}
                  <CheckCircle size={20} />
                </button>
              ) : (
                <button
                  onClick={() => {
                    if (!allQuestionsAnswered) {
                      setShowAlert(true);
                      const firstUnanswered = currentSectionData.questions.find(
                        q => !getAnswer(q.id)
                      );
                      if (firstUnanswered) {
                        document.getElementById(`question-${firstUnanswered.id}`)?.scrollIntoView({
                          behavior: 'smooth',
                          block: 'center'
                        });
                      }
                    } else {
                      setShowAlert(false);
                      setCurrentSection(s => Math.min(sections.length - 1, s + 1));
                    }
                  }}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#6B9BD2] to-[#90E4C1] text-white hover:shadow-lg transform hover:-translate-y-0.5 rounded-lg font-medium transition-all"
                >
                  Suivant
                  <ChevronRight size={20} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompetencyEvaluationInterface;

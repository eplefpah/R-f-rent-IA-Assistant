import React, { useState, useEffect } from 'react';
import { CheckCircle2, ArrowRight, FileText, Target, GraduationCap, Wrench, ClipboardCheck, BookOpen, Shield, Users, TrendingUp, Menu, ArrowLeft } from 'lucide-react';
import { AppView } from '../types';
import SpaceBackground from './SpaceBackground';

interface OnboardingManualProps {
  onNavigate: (view: AppView) => void;
  toggleSidebar: () => void;
}

const OnboardingManual: React.FC<OnboardingManualProps> = ({ onNavigate, toggleSidebar }) => {
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const stepId = entry.target.id.replace('step-', '');
            setCurrentStep(parseInt(stepId));
          }
        });
      },
      { threshold: 0.5, rootMargin: '-100px 0px -50% 0px' }
    );

    const sections = document.querySelectorAll('[id^="step-"]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const scrollToStep = (step: number) => {
    const element = document.getElementById(`step-${step}`);
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const steps = [
    { id: 1, title: "Qu'est-ce qu'un RefIA ?", icon: BookOpen },
    { id: 2, title: "Vos missions", icon: Target },
    { id: 3, title: "La charte RefIA", icon: Shield },
    { id: 4, title: "Évaluez votre niveau", icon: ClipboardCheck },
    { id: 5, title: "Votre parcours de formation", icon: GraduationCap },
    { id: 6, title: "Vos outils disponibles", icon: Wrench }
  ];

  return (
    <div className="h-full w-full relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white z-0" />
      <SpaceBackground />

      <div className="relative z-10 h-full overflow-y-auto">
        <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
          <div className="max-w-6xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <button
                  onClick={toggleSidebar}
                  className="p-2 rounded-full hover:bg-gray-100 text-slate-600 transition-colors md:hidden"
                >
                  <Menu size={24} />
                </button>
                <button
                  onClick={() => onNavigate('onboarding-choice')}
                  className="p-2 rounded-full hover:bg-gray-100 text-slate-600 transition-colors"
                  title="Retour"
                >
                  <ArrowLeft size={24} />
                </button>
                <h1 className="text-xl font-bold text-gray-800">Kit Référent IA</h1>
              </div>
              <div className="text-sm text-gray-600">
                Étape <span className="font-bold text-[#6B9BD2]">{currentStep}</span>/6
              </div>
            </div>

            <div className="flex items-center space-x-2 overflow-x-auto pb-2">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <button
                    onClick={() => scrollToStep(step.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition whitespace-nowrap ${
                      currentStep === step.id
                        ? 'bg-[#6B9BD2] text-white'
                        : currentStep > step.id
                        ? 'bg-[#90E4C1]/20 text-[#90E4C1] hover:bg-[#90E4C1]/30'
                        : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                    }`}
                  >
                    {currentStep > step.id ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <step.icon className="w-4 h-4" />
                    )}
                    <span className="hidden md:inline">{step.title}</span>
                    <span className="md:hidden">{step.id}</span>
                  </button>
                  {index < steps.length - 1 && (
                    <ArrowRight className="w-4 h-4 text-gray-300 mx-1 flex-shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-12 space-y-24">
          <section id="step-1" className="scroll-mt-32">
            <div className="bg-gradient-to-br from-[#6B9BD2]/10 via-[#90E4C1]/10 to-[#FFEE8C]/10 rounded-2xl p-12 border border-[#6B9BD2]/20">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-[#6B9BD2] rounded-xl flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-sm text-[#6B9BD2] font-semibold">ÉTAPE 1</div>
                  <h2 className="text-3xl font-bold text-gray-800">Bienvenue dans votre Kit Référent IA</h2>
                </div>
              </div>

              <div className="space-y-6 text-gray-700 leading-relaxed">
                <p className="text-lg">
                  <strong>Félicitations pour votre nomination en tant que Référent Intelligence Artificielle !</strong> Ce parcours a été conçu pour vous accompagner pas à pas dans votre prise de fonction.
                </p>

                <p>
                  Un Référent IA (RefIA) est un acteur clé de la transformation numérique au sein de l'administration publique. Vous êtes le <strong>facilitateur entre les technologies d'IA et les besoins métiers</strong>, un ambassadeur de l'innovation responsable.
                </p>

                <p>
                  Votre rôle ne nécessite pas d'être expert technique, mais plutôt d'<strong>accompagner le changement</strong>, de conseiller sur les usages pertinents et de garantir une approche éthique et conforme aux réglementations.
                </p>

                <div className="bg-white rounded-xl p-6 border border-gray-200 mt-8">
                  <h3 className="font-bold text-gray-800 mb-4 flex items-center space-x-2">
                    <span className="text-[#6B9BD2]">→</span>
                    <span>Trois piliers de votre mission</span>
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start space-x-3">
                      <CheckCircle2 className="w-5 h-5 text-[#90E4C1] flex-shrink-0 mt-0.5" />
                      <span><strong>Acculturation :</strong> Former et sensibiliser vos collègues aux enjeux de l'IA</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle2 className="w-5 h-5 text-[#90E4C1] flex-shrink-0 mt-0.5" />
                      <span><strong>Conseil :</strong> Identifier les cas d'usage pertinents et orienter vers les bonnes solutions</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle2 className="w-5 h-5 text-[#90E4C1] flex-shrink-0 mt-0.5" />
                      <span><strong>Conformité :</strong> Veiller au respect du cadre éthique, juridique et réglementaire</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  onClick={() => onNavigate('competency-evaluation')}
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
                >
                  <ClipboardCheck className="w-5 h-5" />
                  <span>Évaluer mon niveau de compétence</span>
                </button>
                <button
                  onClick={() => scrollToStep(2)}
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-[#6B9BD2] to-[#90E4C1] text-white rounded-lg font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
                >
                  <span>Commencer mon parcours</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </section>

          <section id="step-2" className="scroll-mt-32">
            <div className="bg-white rounded-2xl p-12 border border-gray-200 shadow-sm">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-[#90E4C1] rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-sm text-[#90E4C1] font-semibold">ÉTAPE 2</div>
                  <h2 className="text-3xl font-bold text-gray-800">Vos missions en détail</h2>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed mb-8">
                En tant que Référent IA, vous aurez <strong>4 grandes missions transversales</strong> à accomplir au quotidien :
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-[#6B9BD2]/5 to-[#6B9BD2]/10 rounded-xl p-6 border border-[#6B9BD2]/20">
                  <div className="w-10 h-10 bg-[#6B9BD2] rounded-lg flex items-center justify-center mb-4">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <h3 className="font-bold text-gray-800 mb-3">Sensibilisation et formation</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start space-x-2">
                      <span className="text-[#6B9BD2]">•</span>
                      <span>Organiser des sessions d'acculturation IA pour différents publics</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-[#6B9BD2]">•</span>
                      <span>Créer et diffuser des contenus pédagogiques</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-[#6B9BD2]">•</span>
                      <span>Animer des ateliers pratiques (Cafés IA, webinaires)</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-[#90E4C1]/5 to-[#90E4C1]/10 rounded-xl p-6 border border-[#90E4C1]/20">
                  <div className="w-10 h-10 bg-[#90E4C1] rounded-lg flex items-center justify-center mb-4">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <h3 className="font-bold text-gray-800 mb-3">Accompagnement projet</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start space-x-2">
                      <span className="text-[#90E4C1]">•</span>
                      <span>Identifier et prioriser les cas d'usage pertinents</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-[#90E4C1]">•</span>
                      <span>Conseiller sur le choix des outils et solutions</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-[#90E4C1]">•</span>
                      <span>Accompagner le déploiement et l'adoption</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-[#FFEE8C]/5 to-[#FFEE8C]/20 rounded-xl p-6 border border-[#FFEE8C]">
                  <div className="w-10 h-10 bg-[#FFEE8C] rounded-lg flex items-center justify-center mb-4">
                    <span className="text-gray-800 font-bold">3</span>
                  </div>
                  <h3 className="font-bold text-gray-800 mb-3">Veille et innovation</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start space-x-2">
                      <span className="text-gray-600">•</span>
                      <span>Suivre les évolutions technologiques et réglementaires</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-gray-600">•</span>
                      <span>Partager les bonnes pratiques et retours d'expérience</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-gray-600">•</span>
                      <span>Participer au réseau des Référents IA</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-blue-100/50 to-blue-200/30 rounded-xl p-6 border border-blue-200">
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-white font-bold">4</span>
                  </div>
                  <h3 className="font-bold text-gray-800 mb-3">Conformité et éthique</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start space-x-2">
                      <span className="text-blue-600">•</span>
                      <span>Garantir le respect du RGPD et de l'IA Act</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-blue-600">•</span>
                      <span>Promouvoir une IA responsable et transparente</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-blue-600">•</span>
                      <span>Collaborer avec les DPO et RSSI</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex items-center space-x-4 mt-8">
                <button
                  onClick={() => onNavigate('missions')}
                  className="flex items-center space-x-2 px-6 py-3 bg-white border-2 border-[#90E4C1] text-[#90E4C1] rounded-lg font-medium hover:bg-[#90E4C1]/5 transition-all"
                >
                  <span>Référentiel IA → Missions</span>
                </button>
                <button
                  onClick={() => scrollToStep(3)}
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-[#90E4C1] to-[#FFEE8C] text-gray-800 rounded-lg font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
                >
                  <span>J'ai compris mes missions</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </section>

          <section id="step-3" className="scroll-mt-32">
            <div className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-2xl p-12 border border-blue-200">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-sm text-blue-600 font-semibold">ÉTAPE 3</div>
                  <h2 className="text-3xl font-bold text-gray-800">La Charte des Référents IA</h2>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed mb-8">
                En tant que Référent IA, vous vous engagez à respecter un cadre déontologique et des principes fondamentaux pour garantir une utilisation responsable de l'intelligence artificielle dans l'administration publique.
              </p>

              <div className="bg-white rounded-xl p-8 border border-gray-200 mb-6">
                <h3 className="font-bold text-gray-800 mb-6 text-xl">Nos 6 engagements</h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-[#6B9BD2] rounded-lg flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Placer l'humain au centre</h4>
                      <p className="text-sm text-gray-600">L'IA doit rester un outil au service des agents et des citoyens, jamais un substitut à la décision humaine dans les domaines sensibles.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-[#90E4C1] rounded-lg flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Garantir la transparence</h4>
                      <p className="text-sm text-gray-600">Expliquer clairement le fonctionnement des systèmes IA utilisés et leurs limites.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-[#FFEE8C] rounded-lg flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-5 h-5 text-gray-800" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Respecter la vie privée</h4>
                      <p className="text-sm text-gray-600">Appliquer rigoureusement le RGPD et minimiser la collecte de données personnelles.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Lutter contre les biais</h4>
                      <p className="text-sm text-gray-600">Identifier et corriger les biais discriminatoires dans les données et les algorithmes.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-slate-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Promouvoir la souveraineté numérique</h4>
                      <p className="text-sm text-gray-600">Privilégier les solutions européennes et respectant la sécurité nationale.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Agir de manière écoresponsable</h4>
                      <p className="text-sm text-gray-600">Mesurer et limiter l'impact environnemental des solutions IA déployées.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <button
                  onClick={() => onNavigate('charters')}
                  className="flex items-center space-x-2 px-6 py-3 bg-white border-2 border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-all"
                >
                  <FileText className="w-5 h-5" />
                  <span>Consulter les chartes complètes</span>
                </button>
                <button
                  onClick={() => scrollToStep(4)}
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-[#6B9BD2] text-white rounded-lg font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
                >
                  <span>J'ai pris connaissance de la charte</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </section>

          <section id="step-4" className="scroll-mt-32">
            <div className="bg-white rounded-2xl p-12 border border-gray-200 shadow-sm">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-[#6B9BD2] rounded-xl flex items-center justify-center">
                  <ClipboardCheck className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-sm text-[#6B9BD2] font-semibold">ÉTAPE 4</div>
                  <h2 className="text-3xl font-bold text-gray-800">Formations et montée en compétences</h2>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed mb-8">
                Pour vous accompagner dans votre rôle, nous mettons à disposition un catalogue complet de formations adaptées à tous les niveaux.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-xl p-6 border-2 border-green-200 hover:border-green-400 transition">
                  <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2">Parcours Débutant</h3>
                  <p className="text-sm text-gray-600 mb-4">Pour ceux qui découvrent l'IA et souhaitent acquérir les bases</p>
                  <ul className="space-y-2 text-xs text-gray-700">
                    <li>• MOOC Introduction à l'IA</li>
                    <li>• Parcours PIX IA</li>
                    <li>• Guide pratique du RefIA</li>
                    <li>• Café IA mensuel</li>
                  </ul>
                </div>

                <div className="bg-white rounded-xl p-6 border-2 border-blue-200 hover:border-blue-400 transition">
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2">Parcours Confirmé</h3>
                  <p className="text-sm text-gray-600 mb-4">Pour approfondir vos connaissances et devenir autonome</p>
                  <ul className="space-y-2 text-xs text-gray-700">
                    <li>• Formation RGPD & IA Act</li>
                    <li>• Prompt Engineering avancé</li>
                    <li>• Gestion de projet IA</li>
                    <li>• Ateliers sectoriels</li>
                  </ul>
                </div>

                <div className="bg-white rounded-xl p-6 border-2 border-amber-200 hover:border-amber-400 transition">
                  <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2">Parcours Expert</h3>
                  <p className="text-sm text-gray-600 mb-4">Pour devenir référence et former d'autres référents</p>
                  <ul className="space-y-2 text-xs text-gray-700">
                    <li>• Cycle supérieur IA (IHEMI)</li>
                    <li>• Gouvernance de l'IA</li>
                    <li>• IA responsable et éthique</li>
                    <li>• Communauté d'experts</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <button
                  onClick={() => onNavigate('training')}
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-[#6B9BD2] to-[#90E4C1] text-white rounded-lg font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
                >
                  <GraduationCap className="w-5 h-5" />
                  <span>Accéder au catalogue de formations</span>
                </button>
                <button
                  onClick={() => scrollToStep(5)}
                  className="flex items-center space-x-2 px-6 py-3 bg-white border-2 border-[#6B9BD2] text-[#6B9BD2] rounded-lg font-medium hover:bg-[#6B9BD2]/5 transition-all"
                >
                  <span>Continuer</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </section>

          <section id="step-5" className="scroll-mt-32">
            <div className="bg-gradient-to-br from-[#90E4C1]/10 via-[#6B9BD2]/10 to-[#FFEE8C]/10 rounded-2xl p-12 border border-[#90E4C1]/20">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-[#90E4C1] rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-sm text-[#90E4C1] font-semibold">ÉTAPE 5</div>
                  <h2 className="text-3xl font-bold text-gray-800">Ressources et documentation</h2>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed mb-8">
                Accédez à toutes les ressources nécessaires pour exercer votre rôle de Référent IA : missions, éthique, réglementation, impact environnemental et outils.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <button
                  onClick={() => onNavigate('missions')}
                  className="text-left bg-white rounded-xl p-6 border border-gray-200 hover:border-[#6B9BD2] hover:shadow-lg transition group"
                >
                  <div className="w-10 h-10 bg-[#6B9BD2] rounded-lg flex items-center justify-center mb-4">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2 group-hover:text-[#6B9BD2] transition">Missions détaillées</h3>
                  <p className="text-sm text-gray-600">Consultez le référentiel complet de vos missions</p>
                </button>

                <button
                  onClick={() => onNavigate('ethics')}
                  className="text-left bg-white rounded-xl p-6 border border-gray-200 hover:border-[#90E4C1] hover:shadow-lg transition group"
                >
                  <div className="w-10 h-10 bg-[#90E4C1] rounded-lg flex items-center justify-center mb-4">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2 group-hover:text-[#90E4C1] transition">Éthique et réglementation</h3>
                  <p className="text-sm text-gray-600">RGPD, IA Act et bonnes pratiques</p>
                </button>

                <button
                  onClick={() => onNavigate('tools')}
                  className="text-left bg-white rounded-xl p-6 border border-gray-200 hover:border-[#FFEE8C] hover:shadow-lg transition group"
                >
                  <div className="w-10 h-10 bg-[#FFEE8C] rounded-lg flex items-center justify-center mb-4">
                    <Wrench className="w-5 h-5 text-gray-800" />
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2 group-hover:text-gray-600 transition">Catalogue d'outils</h3>
                  <p className="text-sm text-gray-600">Découvrez les outils IA validés</p>
                </button>

                <button
                  onClick={() => onNavigate('veille')}
                  className="text-left bg-white rounded-xl p-6 border border-gray-200 hover:border-blue-400 hover:shadow-lg transition group"
                >
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition">Veille IA</h3>
                  <p className="text-sm text-gray-600">Restez informé des dernières actualités</p>
                </button>
              </div>

              <button
                onClick={() => scrollToStep(6)}
                className="mt-8 flex items-center space-x-2 px-6 py-3 bg-white border-2 border-[#90E4C1] text-[#90E4C1] rounded-lg font-medium hover:bg-[#90E4C1]/5 transition-all"
              >
                <span>Continuer vers le réseau</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </section>

          <section id="step-6" className="scroll-mt-32 pb-12">
            <div className="bg-white rounded-2xl p-12 border border-gray-200 shadow-sm">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-sm text-blue-600 font-semibold">ÉTAPE 6</div>
                  <h2 className="text-3xl font-bold text-gray-800">Rejoignez le réseau RefIA</h2>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed mb-8">
                Vous n'êtes pas seul ! Rejoignez la communauté des Référents IA pour échanger, collaborer et partager vos expériences.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <button
                  onClick={() => onNavigate('contacts')}
                  className="text-left bg-gradient-to-br from-[#6B9BD2]/5 to-[#6B9BD2]/10 rounded-xl p-6 border border-[#6B9BD2]/20 hover:border-[#6B9BD2] hover:shadow-lg transition group"
                >
                  <div className="w-10 h-10 bg-[#6B9BD2] rounded-lg flex items-center justify-center mb-4">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2 group-hover:text-[#6B9BD2] transition">Annuaire des Référents</h3>
                  <p className="text-sm text-gray-600">Trouvez et contactez d'autres référents IA par ministère, région ou expertise</p>
                </button>

                <button
                  onClick={() => onNavigate('projects')}
                  className="text-left bg-gradient-to-br from-[#90E4C1]/5 to-[#90E4C1]/10 rounded-xl p-6 border border-[#90E4C1]/20 hover:border-[#90E4C1] hover:shadow-lg transition group"
                >
                  <div className="w-10 h-10 bg-[#90E4C1] rounded-lg flex items-center justify-center mb-4">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2 group-hover:text-[#90E4C1] transition">Projets collaboratifs</h3>
                  <p className="text-sm text-gray-600">Participez à des projets IA interministériels et partagez vos expériences</p>
                </button>

                <button
                  onClick={() => onNavigate('forum')}
                  className="text-left bg-gradient-to-br from-[#FFEE8C]/5 to-[#FFEE8C]/20 rounded-xl p-6 border border-[#FFEE8C] hover:border-[#FFEE8C] hover:shadow-lg transition group"
                >
                  <div className="w-10 h-10 bg-[#FFEE8C] rounded-lg flex items-center justify-center mb-4">
                    <Users className="w-5 h-5 text-gray-800" />
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2 group-hover:text-gray-600 transition">Forum d'entraide</h3>
                  <p className="text-sm text-gray-600">Posez vos questions et échangez avec la communauté</p>
                </button>
              </div>

              <div className="mt-12 bg-gradient-to-r from-[#6B9BD2] to-[#90E4C1] rounded-xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Félicitations !</h3>
                <p className="text-white/90 mb-6">
                  Vous avez terminé le parcours d'accueil. Vous êtes maintenant prêt à exercer votre rôle de Référent IA avec tous les outils et connaissances nécessaires. Bonne mission !
                </p>
                <button
                  onClick={() => onNavigate('welcome')}
                  className="px-6 py-3 bg-white text-[#6B9BD2] rounded-lg font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
                >
                  Retour à l'accueil
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default OnboardingManual;

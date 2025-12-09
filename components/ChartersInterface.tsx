import React, { useEffect, useState } from 'react';
import { Menu, FileText, ExternalLink, Calendar, Building, Shield, Target, Download } from 'lucide-react';
import { supabase } from '../services/supabaseClient';

interface ChartersInterfaceProps {
  toggleSidebar: () => void;
}

interface Charter {
  id: string;
  niveau: string;
  organisation: string;
  nom_document: string;
  type: string;
  date_publication: string;
  statut: string;
  url: string;
  portee: string;
  description: string;
}

const ChartersInterface: React.FC<ChartersInterfaceProps> = ({ toggleSidebar }) => {
  const [charters, setCharters] = useState<Charter[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    loadCharters();
  }, []);

  const loadCharters = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('ia_charters')
        .select('*')
        .order('date_publication', { ascending: false });

      if (error) throw error;
      setCharters(data || []);
    } catch (error) {
      console.error('Erreur lors du chargement des chartes:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCharters = filter === 'all'
    ? charters
    : charters.filter(c => c.niveau === filter);

  const levels = ['all', ...Array.from(new Set(charters.map(c => c.niveau)))];

  const handleDownloadCharte = async () => {
    try {
      const response = await fetch('https://pe2.eu/refia/docs/Charte-referents-IA.pdf');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Charte-referents-IA.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Erreur lors du téléchargement:', error);
      window.open('https://pe2.eu/refia/docs/Charte-referents-IA.pdf', '_blank');
    }
  };

  const getLevelColor = (niveau: string) => {
    switch (niveau) {
      case 'Interministériel':
        return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400';
      case 'National':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      case 'Ministériel':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      default:
        return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400';
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-50 dark:bg-slate-950 relative overflow-hidden transition-colors duration-300">
      {/* Header Mobile */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-4 flex items-center md:hidden sticky top-0 z-10">
        <button onClick={toggleSidebar} className="mr-3 text-slate-600 dark:text-slate-300">
          <Menu size={24} />
        </button>
        <h1 className="font-semibold text-slate-800 dark:text-white">Chartes</h1>
      </header>

      {/* Header Desktop */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-8 py-6 hidden md:block transition-colors duration-300">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Chartes du Référent IA</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Retrouvez l'ensemble des cadres réglementaires, doctrines et stratégies d'usage de l'IA dans l'administration publique française. Ces documents structurent l'utilisation responsable et éthique de l'intelligence artificielle au service de l'intérêt général.
          </p>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 md:px-8 py-8 scrollbar-thin">
        <div className="max-w-6xl mx-auto">
          {/* Charte Référent IA - Featured */}
          <div className="mb-8 bg-gradient-to-r from-[#6B9BD2] to-[#90E4C1] rounded-xl p-6 shadow-lg">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                  <FileText className="text-white" size={24} />
                </div>
                <div className="text-white">
                  <h3 className="text-xl font-bold mb-1">Charte du Référent IA</h3>
                  <p className="text-white/90 text-sm">
                    Le document de référence pour tous les Référents IA de l'administration publique
                  </p>
                </div>
              </div>
              <button
                onClick={handleDownloadCharte}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 dark:bg-white/5 text-[#6B9BD2] dark:text-cyan-400 rounded-lg hover:bg-white/20 dark:hover:bg-white/10 backdrop-blur-sm border border-white/20 dark:border-white/10 transition-all text-sm font-medium shadow-lg flex-shrink-0"
              >
                <Download size={18} />
                <span>Télécharger la charte (PDF)</span>
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="mb-6 flex flex-wrap gap-2">
            {levels.map((level) => (
              <button
                key={level}
                onClick={() => setFilter(level)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === level
                    ? 'bg-ref-blue text-white dark:bg-blue-600'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-ref-blue dark:hover:border-blue-500'
                }`}
              >
                {level === 'all' ? 'Tous les niveaux' : level}
              </button>
            ))}
          </div>

          {/* Loading */}
          {loading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-ref-blue dark:border-blue-400"></div>
              <p className="mt-3 text-slate-600 dark:text-slate-400">Chargement des chartes...</p>
            </div>
          )}

          {/* Charters Grid */}
          {!loading && (
            <div className="grid gap-4">
              {filteredCharters.map((charter) => (
                <div
                  key={charter.id}
                  className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm hover:shadow-md transition-all group"
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    {/* Left side - Icon & Level */}
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-lg bg-ref-blue/10 dark:bg-blue-900/30 flex items-center justify-center">
                        <FileText className="text-ref-blue dark:text-blue-400" size={24} />
                      </div>
                      <span className={`mt-2 inline-block px-3 py-1 rounded-full text-xs font-medium ${getLevelColor(charter.niveau)}`}>
                        {charter.niveau}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2 group-hover:text-ref-blue dark:group-hover:text-blue-400 transition-colors">
                        {charter.nom_document}
                      </h3>

                      <div className="flex flex-wrap gap-3 mb-3 text-sm text-slate-600 dark:text-slate-400">
                        <div className="flex items-center gap-1">
                          <Building size={14} />
                          <span>{charter.organisation}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FileText size={14} />
                          <span>{charter.type}</span>
                        </div>
                        {charter.date_publication && (
                          <div className="flex items-center gap-1">
                            <Calendar size={14} />
                            <span>{new Date(charter.date_publication).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long' })}</span>
                          </div>
                        )}
                      </div>

                      {charter.description && (
                        <p className="text-slate-700 dark:text-slate-300 text-sm mb-3 leading-relaxed">
                          {charter.description}
                        </p>
                      )}

                      <div className="flex flex-wrap gap-4 text-xs text-slate-500 dark:text-slate-500">
                        {charter.portee && (
                          <div className="flex items-center gap-1">
                            <Target size={12} />
                            <span><strong>Portée :</strong> {charter.portee}</span>
                          </div>
                        )}
                        {charter.statut && (
                          <div className="flex items-center gap-1">
                            <Shield size={12} />
                            <span><strong>Statut :</strong> {charter.statut}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Right side - Link */}
                    {charter.url && (
                      <div className="flex-shrink-0">
                        <a
                          href={charter.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-ref-blue text-white rounded-lg hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 transition-colors text-sm font-medium"
                        >
                          <span>Consulter</span>
                          <ExternalLink size={16} />
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty state */}
          {!loading && filteredCharters.length === 0 && (
            <div className="text-center py-12">
              <FileText className="mx-auto text-slate-400 dark:text-slate-600 mb-3" size={48} />
              <p className="text-slate-600 dark:text-slate-400">Aucune charte trouvée</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChartersInterface;

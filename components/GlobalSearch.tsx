import React, { useState, useEffect, useRef } from 'react';
import { Search, X, MessageSquare, Users, FolderOpen, Wrench, FileText, GraduationCap, BookOpen, Loader2 } from 'lucide-react';
import { AppView } from '../types';
import { supabase } from '../services/supabaseClient';

interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: 'formation' | 'contact' | 'resource' | 'forum' | 'charter' | 'tool' | 'glossary';
  targetView: AppView;
  metadata?: any;
}

interface GlobalSearchProps {
  onNavigate: (view: AppView, metadata?: any) => void;
}

const TYPE_ICONS = {
  formation: <GraduationCap className="w-5 h-5" />,
  contact: <Users className="w-5 h-5" />,
  resource: <FolderOpen className="w-5 h-5" />,
  forum: <MessageSquare className="w-5 h-5" />,
  charter: <FileText className="w-5 h-5" />,
  tool: <Wrench className="w-5 h-5" />,
  glossary: <BookOpen className="w-5 h-5" />
};

const TYPE_LABELS = {
  formation: 'Formation',
  contact: 'Contact',
  resource: 'Ressource',
  forum: 'Forum',
  charter: 'Charte',
  tool: 'Outil IA',
  glossary: 'Glossaire'
};

const TYPE_COLORS = {
  formation: 'text-teal-600 dark:text-teal-400',
  contact: 'text-purple-600 dark:text-purple-400',
  resource: 'text-green-600 dark:text-green-400',
  forum: 'text-orange-600 dark:text-orange-400',
  charter: 'text-sky-600 dark:text-sky-400',
  tool: 'text-violet-600 dark:text-violet-400',
  glossary: 'text-blue-600 dark:text-blue-400'
};

const GlobalSearch: React.FC<GlobalSearchProps> = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query.trim()) {
        performSearch(query);
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const performSearch = async (searchQuery: string) => {
    setLoading(true);
    const searchResults: SearchResult[] = [];

    try {
      const normalizedQuery = searchQuery.toLowerCase();

      const { data: forumThreads } = await supabase
        .from('forum_threads')
        .select('id, title, content, category_id')
        .or(`title.ilike.%${searchQuery}%,content.ilike.%${searchQuery}%`)
        .limit(5);

      if (forumThreads) {
        forumThreads.forEach(thread => {
          searchResults.push({
            id: `forum-${thread.id}`,
            title: thread.title,
            description: thread.content.substring(0, 100) + '...',
            type: 'forum',
            targetView: 'forum',
            metadata: { threadId: thread.id, categoryId: thread.category_id }
          });
        });
      }

      const { data: contacts } = await supabase
        .from('profiles')
        .select('id, full_name, organization, role')
        .eq('allow_contact', true)
        .or(`full_name.ilike.%${searchQuery}%,organization.ilike.%${searchQuery}%,role.ilike.%${searchQuery}%`)
        .limit(5);

      if (contacts) {
        contacts.forEach(contact => {
          searchResults.push({
            id: `contact-${contact.id}`,
            title: contact.full_name,
            description: `${contact.role} - ${contact.organization}`,
            type: 'contact',
            targetView: 'contacts',
            metadata: { contactId: contact.id }
          });
        });
      }

      const staticContent = [
        {
          keywords: ['formation', 'cours', 'apprentissage', 'tutorial', 'apprendre'],
          result: {
            id: 'static-training',
            title: 'Formations IA',
            description: 'Parcours de formation et ressources pédagogiques',
            type: 'formation' as const,
            targetView: 'training' as AppView
          }
        },
        {
          keywords: ['charte', 'éthique', 'règles', 'principes', 'référent'],
          result: {
            id: 'static-charter',
            title: 'Chartes IA',
            description: 'Chartes et règlements pour les référents IA',
            type: 'charter' as const,
            targetView: 'charters' as AppView
          }
        },
        {
          keywords: ['outil', 'tool', 'logiciel', 'application', 'chatgpt', 'claude', 'mistral'],
          result: {
            id: 'static-tools',
            title: 'Catalogue Outils IA',
            description: 'Découvrez les outils IA disponibles',
            type: 'tool' as const,
            targetView: 'tools' as AppView
          }
        },
        {
          keywords: ['glossaire', 'définition', 'terme', 'vocabulaire', 'dictionnaire'],
          result: {
            id: 'static-glossary',
            title: 'Glossaire IA',
            description: 'Termes et définitions de l\'intelligence artificielle',
            type: 'glossary' as const,
            targetView: 'glossary' as AppView
          }
        },
        {
          keywords: ['ressource', 'documentation', 'guide', 'document'],
          result: {
            id: 'static-resources',
            title: 'Ressources',
            description: 'Documentation et guides pour les référents IA',
            type: 'resource' as const,
            targetView: 'resources-hub' as AppView
          }
        }
      ];

      staticContent.forEach(item => {
        if (item.keywords.some(keyword => normalizedQuery.includes(keyword) || keyword.includes(normalizedQuery))) {
          searchResults.push(item.result);
        }
      });

      setResults(searchResults.slice(0, 10));
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleResultClick = (result: SearchResult) => {
    setIsOpen(false);
    setQuery('');
    setResults([]);
    onNavigate(result.targetView, result.metadata);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setQuery('');
    setResults([]);
  };

  return (
    <div ref={searchRef} className="relative">
      <button
        onClick={handleOpen}
        className="p-2 rounded-full hover:bg-white/10 text-slate-400 dark:text-white/60 transition-colors"
        title="Rechercher"
      >
        <Search size={28} strokeWidth={1.5} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={handleClose}>
            <div
              className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3">
                  <Search className="w-5 h-5 text-slate-400 dark:text-slate-500 flex-shrink-0" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Rechercher dans la plateforme..."
                    className="flex-1 bg-transparent text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none text-lg"
                  />
                  {loading && (
                    <Loader2 className="w-5 h-5 text-blue-500 dark:text-blue-400 animate-spin flex-shrink-0" />
                  )}
                  {query && (
                    <button
                      onClick={() => setQuery('')}
                      className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition flex-shrink-0"
                    >
                      <X className="w-5 h-5 text-slate-400 dark:text-slate-500" />
                    </button>
                  )}
                  <button
                    onClick={handleClose}
                    className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition flex-shrink-0"
                  >
                    <X className="w-5 h-5 text-slate-400 dark:text-slate-500" />
                  </button>
                </div>
              </div>

              <div className="max-h-[500px] overflow-y-auto">
                {query && results.length === 0 && !loading && (
                  <div className="p-8 text-center">
                    <p className="text-slate-700 dark:text-slate-300 text-base font-medium">Aucun résultat trouvé</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                      Essayez avec d'autres mots-clés
                    </p>
                  </div>
                )}

                {!query && (
                  <div className="p-8 text-center">
                    <Search className="w-12 h-12 text-slate-400 dark:text-slate-600 mx-auto mb-3" />
                    <p className="text-slate-700 dark:text-slate-300 text-base">
                      Recherchez des formations, contacts, ressources...
                    </p>
                  </div>
                )}

                {results.length > 0 && (
                  <div className="py-2">
                    {results.map((result) => (
                      <button
                        key={result.id}
                        onClick={() => handleResultClick(result)}
                        className="w-full px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-left flex items-start gap-3"
                      >
                        <div className={`mt-0.5 ${TYPE_COLORS[result.type]} flex-shrink-0`}>
                          {TYPE_ICONS[result.type]}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-base text-slate-900 dark:text-white font-medium truncate">
                              {result.title}
                            </h3>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${TYPE_COLORS[result.type]} bg-current bg-opacity-10 flex-shrink-0`}>
                              {TYPE_LABELS[result.type]}
                            </span>
                          </div>
                          <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                            {result.description}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="px-4 py-3 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                <div className="flex items-center justify-end text-xs text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-2">
                    <kbd className="px-2 py-1 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded text-xs">ESC</kbd>
                    pour fermer
                  </span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default GlobalSearch;

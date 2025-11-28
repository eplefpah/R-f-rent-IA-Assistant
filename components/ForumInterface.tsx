import React, { useState, useEffect } from 'react';
import { Menu, Plus, MessageSquare, Eye, Clock, Pin, Lock, TrendingUp, Send, ThumbsUp, CheckCircle, ArrowLeft } from 'lucide-react';
import { supabase } from '../services/supabaseClient';
import { ForumCategory, ForumThread, ForumReply } from '../types';
import MarkdownRenderer from './MarkdownRenderer';

interface ForumInterfaceProps {
  toggleSidebar: () => void;
}

type ViewMode = 'categories' | 'threads' | 'thread-detail';

const ForumInterface: React.FC<ForumInterfaceProps> = ({ toggleSidebar }) => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<ForumCategory[]>([]);
  const [threads, setThreads] = useState<ForumThread[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<ForumCategory | null>(null);
  const [selectedThread, setSelectedThread] = useState<ForumThread | null>(null);
  const [replies, setReplies] = useState<ForumReply[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>('categories');
  const [showNewThreadModal, setShowNewThreadModal] = useState(false);
  const [newThreadTitle, setNewThreadTitle] = useState('');
  const [newThreadContent, setNewThreadContent] = useState('');
  const [newReplyContent, setNewReplyContent] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('forum_categories')
        .select('*')
        .order('order_index', { ascending: true });

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Error loading categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadThreads = async (categoryId: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('forum_threads')
        .select(`
          *,
          author:profiles!forum_threads_author_id_fkey(full_name, avatar_url, role),
          last_reply_author:profiles!forum_threads_last_reply_by_fkey(full_name, avatar_url)
        `)
        .eq('category_id', categoryId)
        .order('is_pinned', { ascending: false })
        .order('last_reply_at', { ascending: false, nullsFirst: false })
        .order('created_at', { ascending: false });

      if (error) throw error;
      setThreads(data || []);
    } catch (error) {
      console.error('Error loading threads:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadThreadDetail = async (threadId: string) => {
    try {
      setLoading(true);

      const { data: threadData, error: threadError } = await supabase
        .from('forum_threads')
        .select(`
          *,
          author:profiles!forum_threads_author_id_fkey(full_name, avatar_url, role, organization),
          category:forum_categories(name, color, icon)
        `)
        .eq('id', threadId)
        .single();

      if (threadError) throw threadError;

      await supabase
        .from('forum_threads')
        .update({ views_count: (threadData.views_count || 0) + 1 })
        .eq('id', threadId);

      const { data: repliesData, error: repliesError } = await supabase
        .from('forum_replies')
        .select(`
          *,
          author:profiles!forum_replies_author_id_fkey(full_name, avatar_url, role, organization)
        `)
        .eq('thread_id', threadId)
        .order('created_at', { ascending: true });

      if (repliesError) throw repliesError;

      setSelectedThread(threadData);
      setReplies(repliesData || []);
      setViewMode('thread-detail');
    } catch (error) {
      console.error('Error loading thread detail:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (category: ForumCategory) => {
    setSelectedCategory(category);
    loadThreads(category.id);
    setViewMode('threads');
  };

  const handleThreadClick = (thread: ForumThread) => {
    loadThreadDetail(thread.id);
  };

  const handleBackToCategories = () => {
    setViewMode('categories');
    setSelectedCategory(null);
    setThreads([]);
  };

  const handleBackToThreads = () => {
    setViewMode('threads');
    setSelectedThread(null);
    setReplies([]);
    if (selectedCategory) {
      loadThreads(selectedCategory.id);
    }
  };

  const handleCreateThread = async () => {
    if (!newThreadTitle.trim() || !newThreadContent.trim() || !selectedCategory) return;

    setSubmitting(true);
    try {
      const { error } = await supabase
        .from('forum_threads')
        .insert([{
          category_id: selectedCategory.id,
          author_id: '00000000-0000-0000-0000-000000000000',
          title: newThreadTitle,
          content: newThreadContent,
        }]);

      if (error) throw error;

      setNewThreadTitle('');
      setNewThreadContent('');
      setShowNewThreadModal(false);
      loadThreads(selectedCategory.id);
    } catch (error) {
      console.error('Error creating thread:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCreateReply = async () => {
    if (!newReplyContent.trim() || !selectedThread) return;

    setSubmitting(true);
    try {
      const { error } = await supabase
        .from('forum_replies')
        .insert([{
          thread_id: selectedThread.id,
          author_id: '00000000-0000-0000-0000-000000000000',
          content: newReplyContent,
        }]);

      if (error) throw error;

      await supabase
        .from('forum_threads')
        .update({
          replies_count: (selectedThread.replies_count || 0) + 1,
          last_reply_at: new Date().toISOString(),
          last_reply_by: '00000000-0000-0000-0000-000000000000',
        })
        .eq('id', selectedThread.id);

      setNewReplyContent('');
      loadThreadDetail(selectedThread.id);
    } catch (error) {
      console.error('Error creating reply:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'À l\'instant';
    if (diffMins < 60) return `Il y a ${diffMins} min`;
    if (diffHours < 24) return `Il y a ${diffHours}h`;
    if (diffDays < 7) return `Il y a ${diffDays}j`;
    return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="sticky top-0 z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center justify-between p-4 max-w-6xl mx-auto">
          <div className="flex items-center space-x-4 flex-1">
            <button
              onClick={toggleSidebar}
              className="md:hidden p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition"
            >
              <Menu size={24} className="text-slate-600 dark:text-slate-400" />
            </button>

            {viewMode !== 'categories' && (
              <button
                onClick={viewMode === 'threads' ? handleBackToCategories : handleBackToThreads}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition"
              >
                <ArrowLeft size={20} className="text-slate-600 dark:text-slate-400" />
              </button>
            )}

            <div className="flex-1">
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                {viewMode === 'categories' && 'Forum'}
                {viewMode === 'threads' && selectedCategory?.name}
                {viewMode === 'thread-detail' && 'Discussion'}
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                {viewMode === 'categories' && 'Échangez avec la communauté des référents IA'}
                {viewMode === 'threads' && selectedCategory?.description}
                {viewMode === 'thread-detail' && selectedThread?.title}
              </p>
            </div>

            {viewMode === 'threads' && (
              <button
                onClick={() => setShowNewThreadModal(true)}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-ref-blue to-blue-500 dark:from-blue-600 dark:to-blue-700 text-white rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all font-medium"
              >
                <Plus className="w-5 h-5" />
                <span className="hidden sm:inline">Nouveau sujet</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="p-6 max-w-6xl mx-auto">
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-10 h-10 border-4 border-ref-blue dark:border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-slate-600 dark:text-slate-400 mt-4">Chargement...</p>
          </div>
        ) : viewMode === 'categories' ? (
          <div className="space-y-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category)}
                className="w-full bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-ref-blue dark:hover:border-blue-600 hover:shadow-lg transition-all p-6 text-left group"
              >
                <div className="flex items-center space-x-4">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl"
                    style={{ backgroundColor: `${category.color}20` }}
                  >
                    {category.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-ref-blue dark:group-hover:text-blue-500 transition">
                      {category.name}
                    </h3>
                    {category.description && (
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                        {category.description}
                      </p>
                    )}
                  </div>
                  <MessageSquare className="w-6 h-6 text-slate-400 dark:text-slate-500 group-hover:text-ref-blue dark:group-hover:text-blue-500 transition" />
                </div>
              </button>
            ))}
          </div>
        ) : viewMode === 'threads' ? (
          <div className="space-y-4">
            {threads.length === 0 ? (
              <div className="bg-white dark:bg-slate-900 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 p-12 text-center">
                <MessageSquare className="w-16 h-16 text-slate-400 dark:text-slate-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  Aucune discussion pour le moment
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  Soyez le premier à lancer une discussion dans cette catégorie
                </p>
                <button
                  onClick={() => setShowNewThreadModal(true)}
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-ref-blue to-blue-500 dark:from-blue-600 dark:to-blue-700 text-white rounded-lg hover:shadow-lg transition-all font-medium"
                >
                  <Plus className="w-5 h-5" />
                  <span>Créer une discussion</span>
                </button>
              </div>
            ) : (
              threads.map((thread) => (
                <button
                  key={thread.id}
                  onClick={() => handleThreadClick(thread)}
                  className="w-full bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-ref-blue dark:hover:border-blue-600 hover:shadow-lg transition-all p-6 text-left"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-2">
                        {thread.is_pinned && (
                          <Pin className="w-4 h-4 text-amber-500 dark:text-amber-400 flex-shrink-0" />
                        )}
                        {thread.is_locked && (
                          <Lock className="w-4 h-4 text-slate-400 dark:text-slate-500 flex-shrink-0" />
                        )}
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white hover:text-ref-blue dark:hover:text-blue-500 transition truncate">
                          {thread.title}
                        </h3>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-3">
                        {thread.content}
                      </p>
                      <div className="flex items-center space-x-4 text-xs text-slate-500 dark:text-slate-400">
                        <span className="flex items-center space-x-1">
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>{thread.replies_count}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Eye className="w-3.5 h-3.5" />
                          <span>{thread.views_count}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{formatDate(thread.last_reply_at || thread.created_at)}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
        ) : (
          selectedThread && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                      {selectedThread.title}
                    </h2>
                    <div className="flex items-center space-x-3 text-sm text-slate-600 dark:text-slate-400">
                      <span className="font-medium">
                        {selectedThread.author?.full_name || 'Anonyme'}
                      </span>
                      <span>•</span>
                      <span>{formatDate(selectedThread.created_at)}</span>
                      <span>•</span>
                      <span className="flex items-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span>{selectedThread.views_count} vues</span>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="prose prose-slate dark:prose-invert max-w-none">
                  <MarkdownRenderer content={selectedThread.content} />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {replies.length} réponse{replies.length > 1 ? 's' : ''}
                </h3>
                {replies.map((reply) => (
                  <div
                    key={reply.id}
                    className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-ref-blue/20 to-blue-400/20 dark:from-blue-500/20 dark:to-blue-600/20 rounded-full flex items-center justify-center">
                          <span className="text-sm font-bold text-ref-blue dark:text-blue-500">
                            {reply.author?.full_name?.charAt(0) || 'A'}
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white">
                            {reply.author?.full_name || 'Anonyme'}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {reply.author?.organization} • {formatDate(reply.created_at)}
                          </p>
                        </div>
                      </div>
                      {reply.is_solution && (
                        <span className="flex items-center space-x-1 px-3 py-1 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-full text-xs font-semibold">
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>Solution</span>
                        </span>
                      )}
                    </div>
                    <div className="prose prose-slate dark:prose-invert max-w-none">
                      <MarkdownRenderer content={reply.content} />
                    </div>
                  </div>
                ))}
              </div>

              {!selectedThread.is_locked && (
                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                    Répondre à cette discussion
                  </h3>
                  <textarea
                    value={newReplyContent}
                    onChange={(e) => setNewReplyContent(e.target.value)}
                    placeholder="Écrivez votre réponse..."
                    rows={4}
                    className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg focus:ring-2 focus:ring-ref-blue dark:focus:ring-blue-600 focus:border-transparent outline-none resize-none"
                  />
                  <div className="flex justify-end mt-4">
                    <button
                      onClick={handleCreateReply}
                      disabled={submitting || !newReplyContent.trim()}
                      className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-ref-blue to-blue-500 dark:from-blue-600 dark:to-blue-700 text-white rounded-lg hover:shadow-lg transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-4 h-4" />
                      <span>{submitting ? 'Envoi...' : 'Envoyer'}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )
        )}
      </div>

      {showNewThreadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-2xl w-full">
            <div className="bg-gradient-to-r from-ref-blue to-blue-500 dark:from-blue-600 dark:to-blue-700 text-white p-6 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-2xl font-bold">Nouvelle discussion</h2>
              <button
                onClick={() => setShowNewThreadModal(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition"
              >
                <span className="text-2xl">&times;</span>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">
                  Titre de la discussion
                </label>
                <input
                  type="text"
                  value={newThreadTitle}
                  onChange={(e) => setNewThreadTitle(e.target.value)}
                  placeholder="Un titre clair et descriptif"
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg focus:ring-2 focus:ring-ref-blue dark:focus:ring-blue-600 focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">
                  Message
                </label>
                <textarea
                  value={newThreadContent}
                  onChange={(e) => setNewThreadContent(e.target.value)}
                  placeholder="Décrivez votre question ou sujet de discussion..."
                  rows={8}
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg focus:ring-2 focus:ring-ref-blue dark:focus:ring-blue-600 focus:border-transparent outline-none resize-none"
                />
              </div>
              <div className="flex items-center space-x-3 pt-4">
                <button
                  onClick={() => setShowNewThreadModal(false)}
                  className="flex-1 px-6 py-3 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition font-medium"
                >
                  Annuler
                </button>
                <button
                  onClick={handleCreateThread}
                  disabled={submitting || !newThreadTitle.trim() || !newThreadContent.trim()}
                  className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-ref-blue to-blue-500 dark:from-blue-600 dark:to-blue-700 text-white rounded-lg hover:shadow-lg transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                  <span>{submitting ? 'Création...' : 'Créer la discussion'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForumInterface;

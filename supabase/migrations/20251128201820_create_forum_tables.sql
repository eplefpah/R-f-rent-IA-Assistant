/*
  # Création des tables pour le forum

  ## Tables créées

  ### 1. forum_categories
  - `id` (uuid, clé primaire)
  - `name` (text) - Nom de la catégorie
  - `slug` (text, unique) - Identifiant URL-friendly
  - `description` (text) - Description de la catégorie
  - `icon` (text) - Icône pour la catégorie
  - `color` (text) - Couleur d'affichage
  - `order_index` (integer) - Ordre d'affichage
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 2. forum_threads
  - `id` (uuid, clé primaire)
  - `category_id` (uuid, FK vers forum_categories)
  - `author_id` (uuid, FK vers profiles)
  - `title` (text) - Titre du fil de discussion
  - `content` (text) - Contenu initial
  - `is_pinned` (boolean) - Épinglé en haut
  - `is_locked` (boolean) - Verrouillé (pas de nouvelles réponses)
  - `views_count` (integer) - Nombre de vues
  - `replies_count` (integer) - Nombre de réponses
  - `last_reply_at` (timestamptz) - Date de la dernière réponse
  - `last_reply_by` (uuid, FK vers profiles)
  - `tags` (jsonb) - Tags associés
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 3. forum_replies
  - `id` (uuid, clé primaire)
  - `thread_id` (uuid, FK vers forum_threads)
  - `author_id` (uuid, FK vers profiles)
  - `content` (text) - Contenu de la réponse
  - `is_solution` (boolean) - Marqué comme solution
  - `likes_count` (integer) - Nombre de likes
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ## Sécurité
  - RLS activé sur toutes les tables
  - Lecture publique pour tous (anon)
  - Création, modification et suppression réservées aux utilisateurs authentifiés
  - Les utilisateurs ne peuvent modifier/supprimer que leurs propres contenus
*/

-- Table des catégories du forum
CREATE TABLE IF NOT EXISTS forum_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  icon text,
  color text,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Table des fils de discussion
CREATE TABLE IF NOT EXISTS forum_threads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid REFERENCES forum_categories(id) ON DELETE CASCADE,
  author_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  title text NOT NULL,
  content text NOT NULL,
  is_pinned boolean DEFAULT false,
  is_locked boolean DEFAULT false,
  views_count integer DEFAULT 0,
  replies_count integer DEFAULT 0,
  last_reply_at timestamptz,
  last_reply_by uuid REFERENCES profiles(id) ON DELETE SET NULL,
  tags jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Table des réponses
CREATE TABLE IF NOT EXISTS forum_replies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  thread_id uuid REFERENCES forum_threads(id) ON DELETE CASCADE,
  author_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  content text NOT NULL,
  is_solution boolean DEFAULT false,
  likes_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Activer RLS sur toutes les tables
ALTER TABLE forum_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_threads ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_replies ENABLE ROW LEVEL SECURITY;

-- Politiques pour forum_categories (lecture publique)
DROP POLICY IF EXISTS "Categories are viewable by everyone" ON forum_categories;
CREATE POLICY "Categories are viewable by everyone"
  ON forum_categories
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Politiques pour forum_threads
DROP POLICY IF EXISTS "Threads are viewable by everyone" ON forum_threads;
CREATE POLICY "Threads are viewable by everyone"
  ON forum_threads
  FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "Authenticated users can create threads" ON forum_threads;
CREATE POLICY "Authenticated users can create threads"
  ON forum_threads
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = author_id);

DROP POLICY IF EXISTS "Users can update own threads" ON forum_threads;
CREATE POLICY "Users can update own threads"
  ON forum_threads
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = author_id)
  WITH CHECK (auth.uid() = author_id);

DROP POLICY IF EXISTS "Users can delete own threads" ON forum_threads;
CREATE POLICY "Users can delete own threads"
  ON forum_threads
  FOR DELETE
  TO authenticated
  USING (auth.uid() = author_id);

-- Politiques pour forum_replies
DROP POLICY IF EXISTS "Replies are viewable by everyone" ON forum_replies;
CREATE POLICY "Replies are viewable by everyone"
  ON forum_replies
  FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "Authenticated users can create replies" ON forum_replies;
CREATE POLICY "Authenticated users can create replies"
  ON forum_replies
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = author_id);

DROP POLICY IF EXISTS "Users can update own replies" ON forum_replies;
CREATE POLICY "Users can update own replies"
  ON forum_replies
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = author_id)
  WITH CHECK (auth.uid() = author_id);

DROP POLICY IF EXISTS "Users can delete own replies" ON forum_replies;
CREATE POLICY "Users can delete own replies"
  ON forum_replies
  FOR DELETE
  TO authenticated
  USING (auth.uid() = author_id);

-- Insérer des catégories par défaut
INSERT INTO forum_categories (name, slug, description, icon, color, order_index)
VALUES 
  ('Questions générales', 'questions-generales', 'Posez vos questions sur l''IA dans l''administration', '❓', '#3B82F6', 1),
  ('Partage d''expériences', 'partage-experiences', 'Partagez vos retours d''expérience et cas d''usage', '💡', '#10B981', 2),
  ('Outils et technologies', 'outils-technologies', 'Discussions sur les outils IA disponibles', '🛠️', '#8B5CF6', 3),
  ('Réglementation et éthique', 'reglementation-ethique', 'Questions juridiques, RGPD, éthique de l''IA', '⚖️', '#F59E0B', 4),
  ('Annonces', 'annonces', 'Actualités et annonces importantes', '📢', '#EF4444', 0)
ON CONFLICT (slug) DO NOTHING;

-- Index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_forum_threads_category ON forum_threads(category_id);
CREATE INDEX IF NOT EXISTS idx_forum_threads_author ON forum_threads(author_id);
CREATE INDEX IF NOT EXISTS idx_forum_threads_created ON forum_threads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_forum_threads_last_reply ON forum_threads(last_reply_at DESC);
CREATE INDEX IF NOT EXISTS idx_forum_replies_thread ON forum_replies(thread_id);
CREATE INDEX IF NOT EXISTS idx_forum_replies_author ON forum_replies(author_id);
CREATE INDEX IF NOT EXISTS idx_forum_replies_created ON forum_replies(created_at);

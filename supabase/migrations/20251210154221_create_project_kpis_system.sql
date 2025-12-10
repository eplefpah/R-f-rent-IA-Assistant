/*
  # Système de KPIs pour les projets
  
  1. Tables créées
    - `project_activities` : Table pour enregistrer toutes les activités liées aux projets
      - `id` (uuid, primary key) : Identifiant unique
      - `project_id` (uuid, foreign key) : Référence vers requirements_forms
      - `activity_type` (text) : Type d'activité (login, resource_download, training_completed, etc.)
      - `user_id` (uuid) : Identifiant de l'utilisateur (peut être anonyme)
      - `metadata` (jsonb) : Données supplémentaires contextuelles
      - `created_at` (timestamptz) : Date de l'activité
    
    - `project_kpis` : Vue pour agréger les KPIs par projet
      - Calcule automatiquement le nombre de connexions mensuelles
      - Calcule le nombre de parcours complétés
      - Calcule le nombre de ressources téléchargées
  
  2. Sécurité
    - Enable RLS sur project_activities
    - Politique permettant aux utilisateurs anonymes d'insérer des activités
    - Politique permettant la lecture des KPIs
*/

-- Table pour stocker les activités des projets
CREATE TABLE IF NOT EXISTS project_activities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES requirements_forms(id) ON DELETE CASCADE NOT NULL,
  activity_type text NOT NULL CHECK (activity_type IN ('login', 'resource_download', 'training_completed', 'page_view', 'document_consulted')),
  user_id uuid DEFAULT '00000000-0000-0000-0000-000000000000',
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

-- Index pour améliorer les performances des requêtes
CREATE INDEX IF NOT EXISTS idx_project_activities_project_id ON project_activities(project_id);
CREATE INDEX IF NOT EXISTS idx_project_activities_created_at ON project_activities(created_at);
CREATE INDEX IF NOT EXISTS idx_project_activities_type ON project_activities(activity_type);

-- Enable RLS
ALTER TABLE project_activities ENABLE ROW LEVEL SECURITY;

-- Politique pour permettre l'insertion d'activités (même anonyme)
CREATE POLICY "Anyone can insert project activities"
  ON project_activities
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Politique pour lire les activités
CREATE POLICY "Anyone can view project activities"
  ON project_activities
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Vue pour agréger les KPIs par projet
CREATE OR REPLACE VIEW project_kpis AS
SELECT 
  rf.id AS project_id,
  rf.title AS project_title,
  -- Nombre total d'activités
  COUNT(pa.id) AS total_activities,
  -- Connexions mensuelles (moyenne sur les 30 derniers jours)
  COUNT(DISTINCT CASE 
    WHEN pa.activity_type = 'login' 
    AND pa.created_at >= NOW() - INTERVAL '30 days' 
    THEN pa.user_id 
  END) AS monthly_unique_users,
  COUNT(CASE 
    WHEN pa.activity_type = 'login' 
    AND pa.created_at >= NOW() - INTERVAL '30 days' 
    THEN 1 
  END) AS monthly_logins,
  -- Parcours complétés
  COUNT(CASE 
    WHEN pa.activity_type = 'training_completed' 
    THEN 1 
  END) AS trainings_completed,
  -- Ressources téléchargées
  COUNT(CASE 
    WHEN pa.activity_type = 'resource_download' 
    THEN 1 
  END) AS resources_downloaded,
  -- Documents consultés
  COUNT(CASE 
    WHEN pa.activity_type = 'document_consulted' 
    THEN 1 
  END) AS documents_consulted,
  -- Dernière activité
  MAX(pa.created_at) AS last_activity_at
FROM requirements_forms rf
LEFT JOIN project_activities pa ON pa.project_id = rf.id
GROUP BY rf.id, rf.title;

-- Fonction pour incrémenter facilement un KPI
CREATE OR REPLACE FUNCTION track_project_activity(
  p_project_id uuid,
  p_activity_type text,
  p_user_id uuid DEFAULT '00000000-0000-0000-0000-000000000000',
  p_metadata jsonb DEFAULT '{}'::jsonb
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO project_activities (project_id, activity_type, user_id, metadata)
  VALUES (p_project_id, p_activity_type, p_user_id, p_metadata);
END;
$$;
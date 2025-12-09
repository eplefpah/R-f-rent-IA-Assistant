
export enum Role {
  USER = 'user',
  MODEL = 'model'
}

export interface Message {
  id: string;
  role: Role;
  text: string;
  timestamp: Date;
  isStreaming?: boolean;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
}

export interface KnowledgeBaseSection {
  id: string;
  title: string;
  icon: string;
  content: string;
  category: string;
}

export type AppView = 'welcome' | 'navigation-hub' | 'resources-hub' | 'network-hub' | 'chat' | 'parcours' | 'recueil' | 'tools' | 'training' | 'veille' | 'veille-chat' | 'contacts' | 'missions' | 'ethics' | 'charters' | 'environmental' | 'projects' | 'forum' | 'onboarding-choice' | 'onboarding-manual' | 'competency-evaluation' | 'profile' | 'dashboard' | 'history';

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  organization: string | null;
  role: string | null;
  competency_level: string | null;
  competency_score: number | null;
  competency_evaluated_at: string | null;
  satellites_enabled: boolean;
  tooltips_enabled: boolean;
  allow_contact: boolean;
  dashboard_config: DashboardConfig | null;
  created_at: string;
  updated_at: string;
}

// Types pour la Veille
export interface VeilleNewsItem {
  titre: string;
  categorie: string;
  source: string;
  impact: string;
}

export interface VeilleReferentItem {
  name: string;
  organization: string;
  source: string;
  impact?: string; // Added optional based on usage
}

export interface VeilleOpportunityItem {
  sujet: string;
  gap: string;
  action_suggeree: string;
}

export interface VeilleNewsResponse {
  referents: VeilleReferentItem[];
  actualites: VeilleNewsItem[];
  opportunites: VeilleOpportunityItem[];
}

// Types pour les Contacts
export interface Contact {
  id: string;
  email: string | null;
  full_name: string;
  role: string;
  organization: string;
  position: string;
  location: string | null;
  bio: string;
  expertise_areas: string[];
  avatar_url: string | null;
  linkedin_url: string | null;
  is_reference: boolean;
  contact_type: string | null;
  allow_contact?: boolean;
  created_at: string;
  updated_at: string;
}

// Types pour le Catalogue Outils
export interface AiTool {
  id: string;
  name: string;
  slug: string;
  description: string;
  category_id: string | null;
  difficulty_level: string;
  usage_domains: string[];
  hosting_type: string;
  sector: string;
  security_level: string | null;
  cost: string | null;
  documentation_url: string | null;
  logo_url: string | null;
  features: string[];
  rating_avg: string;
  rating_count: number;
  is_validated: boolean;
  created_at: string;
  updated_at: string;
}

// Types pour le Catalogue Formations
export interface TrainingCourse {
  id: string;
  title: string;
  organizer: string;
  modality: string; // 'Présentiel', 'À distance', 'Hybride'
  duration: string;
  cost: string;
  level: 'Niveau 1 - Distant' | 'Niveau 2 - Confirmé' | 'Niveau 3 - Expert' | 'Transversal';
  isRecommended: boolean;
  objectives: string[];
  url: string;
}

// Types pour l'Assistant Recueil
export interface RecueilData {
  titre: string;
  contexte: string;
  irritants: string;
  frequence: string;
  impact: string;
  delai: string;
  donnees: string;
  fichiers: string;
  contraintes: string;
  solutions_actuelles: string;
}

// Types pour les Projets
export interface RequirementForm {
  id: string;
  user_id: string;
  project_id: string | null;
  title: string;
  business_context: string | null;
  problem_description: string | null;
  frequency: string | null;
  business_impact: 'faible' | 'moyen' | 'fort' | 'critique';
  desired_deadline: string | null;
  data_resources: string | null;
  specific_constraints: string | null;
  current_solutions: string | null;
  ai_summary: string | null;
  attachments: AttachmentFile[];
  created_at: string;
  updated_at: string;
}

export interface AttachmentFile {
  name: string;
  url: string;
  type: string;
  size: number;
  uploaded_at: string;
}

// Types pour le Forum
export interface ForumCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  color: string | null;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface ForumThread {
  id: string;
  category_id: string;
  author_id: string;
  title: string;
  content: string;
  is_pinned: boolean;
  is_locked: boolean;
  views_count: number;
  replies_count: number;
  last_reply_at: string | null;
  last_reply_by: string | null;
  tags: string[];
  created_at: string;
  updated_at: string;
  author?: {
    full_name: string;
    avatar_url: string | null;
    role: string;
  };
  category?: ForumCategory;
  last_reply_author?: {
    full_name: string;
    avatar_url: string | null;
  };
}

export interface ForumReply {
  id: string;
  thread_id: string;
  author_id: string;
  content: string;
  is_solution: boolean;
  likes_count: number;
  created_at: string;
  updated_at: string;
  author?: {
    full_name: string;
    avatar_url: string | null;
    role: string;
    organization: string;
  };
}

export type WidgetType =
  | 'resources'
  | 'projects'
  | 'contacts'
  | 'forum'
  | 'veille'
  | 'training'
  | 'requirements'
  | 'missions'
  | 'competency'
  | 'ethics'
  | 'charters'
  | 'environmental'
  | 'tools';

export type WidgetStatus = 'not_started' | 'in_progress' | 'completed';

export interface DashboardWidget {
  id: string;
  type: WidgetType;
  enabled: boolean;
  order: number;
  status: WidgetStatus;
  progress: number;
  metadata?: Record<string, any>;
}

export interface DashboardConfig {
  widgets: DashboardWidget[];
  updated_at: string;
}
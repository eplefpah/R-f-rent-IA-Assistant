
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

export type AppView = 'welcome' | 'chat' | 'parcours' | 'recueil' | 'docs' | 'tools' | 'training' | 'veille' | 'contacts';

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
import { supabase } from './supabaseClient';

export interface ProjectKPI {
  project_id: string;
  project_title: string;
  total_activities: number;
  monthly_unique_users: number;
  monthly_logins: number;
  trainings_completed: number;
  resources_downloaded: number;
  documents_consulted: number;
  last_activity_at: string | null;
}

export type ActivityType =
  | 'login'
  | 'resource_download'
  | 'training_completed'
  | 'page_view'
  | 'document_consulted';

export async function trackActivity(
  projectId: string,
  activityType: ActivityType,
  userId: string = '00000000-0000-0000-0000-000000000000',
  metadata: Record<string, any> = {}
): Promise<void> {
  try {
    const { error } = await supabase.rpc('track_project_activity', {
      p_project_id: projectId,
      p_activity_type: activityType,
      p_user_id: userId,
      p_metadata: metadata
    });

    if (error) {
      console.error('Error tracking activity:', error);
      throw error;
    }
  } catch (err) {
    console.error('Error in trackActivity:', err);
  }
}

export async function getProjectKPIs(projectId?: string): Promise<ProjectKPI[]> {
  try {
    let query = supabase
      .from('project_kpis')
      .select('*');

    if (projectId) {
      query = query.eq('project_id', projectId);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data || [];
  } catch (err) {
    console.error('Error getting project KPIs:', err);
    return [];
  }
}

export async function trackProjectView(projectId: string, userId?: string): Promise<void> {
  await trackActivity(projectId, 'page_view', userId);
}

export async function trackResourceDownload(
  projectId: string,
  resourceName: string,
  userId?: string
): Promise<void> {
  await trackActivity(
    projectId,
    'resource_download',
    userId,
    { resource_name: resourceName }
  );
}

export async function trackTrainingCompleted(
  projectId: string,
  trainingName: string,
  userId?: string
): Promise<void> {
  await trackActivity(
    projectId,
    'training_completed',
    userId,
    { training_name: trainingName }
  );
}

export async function trackDocumentConsulted(
  projectId: string,
  documentName: string,
  userId?: string
): Promise<void> {
  await trackActivity(
    projectId,
    'document_consulted',
    userId,
    { document_name: documentName }
  );
}

export function getEngagementLevel(kpi: ProjectKPI): {
  level: 'low' | 'medium' | 'high';
  color: string;
  label: string;
} {
  const totalEngagement =
    kpi.monthly_logins +
    kpi.trainings_completed +
    kpi.resources_downloaded +
    kpi.documents_consulted;

  if (totalEngagement >= 50) {
    return {
      level: 'high',
      color: 'text-green-600 dark:text-green-400',
      label: 'Engagement élevé'
    };
  } else if (totalEngagement >= 20) {
    return {
      level: 'medium',
      color: 'text-blue-600 dark:text-blue-400',
      label: 'Engagement moyen'
    };
  } else {
    return {
      level: 'low',
      color: 'text-orange-600 dark:text-orange-400',
      label: 'Engagement faible'
    };
  }
}

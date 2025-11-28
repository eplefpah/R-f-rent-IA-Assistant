import { supabase } from './supabaseClient';
import { AiTool } from '../types';

export const aiToolsService = {
  async getAllTools(): Promise<AiTool[]> {
    try {
      const { data, error } = await supabase
        .from('ai_tools')
        .select('*')
        .eq('is_validated', true)
        .order('name', { ascending: true });

      if (error) {
        console.error('Error fetching AI tools:', error);
        throw error;
      }

      return data as AiTool[];
    } catch (error) {
      console.error('Failed to fetch AI tools:', error);
      return [];
    }
  },

  async getToolById(id: string): Promise<AiTool | null> {
    try {
      const { data, error } = await supabase
        .from('ai_tools')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) {
        console.error('Error fetching AI tool:', error);
        throw error;
      }

      return data as AiTool | null;
    } catch (error) {
      console.error('Failed to fetch AI tool:', error);
      return null;
    }
  },

  async getToolsByCategory(categoryId: string): Promise<AiTool[]> {
    try {
      const { data, error } = await supabase
        .from('ai_tools')
        .select('*')
        .eq('category_id', categoryId)
        .eq('is_validated', true)
        .order('name', { ascending: true });

      if (error) {
        console.error('Error fetching AI tools by category:', error);
        throw error;
      }

      return data as AiTool[];
    } catch (error) {
      console.error('Failed to fetch AI tools by category:', error);
      return [];
    }
  },

  async getToolsByDifficultyLevel(level: string): Promise<AiTool[]> {
    try {
      const { data, error } = await supabase
        .from('ai_tools')
        .select('*')
        .eq('difficulty_level', level)
        .eq('is_validated', true)
        .order('name', { ascending: true });

      if (error) {
        console.error('Error fetching AI tools by difficulty:', error);
        throw error;
      }

      return data as AiTool[];
    } catch (error) {
      console.error('Failed to fetch AI tools by difficulty:', error);
      return [];
    }
  }
};

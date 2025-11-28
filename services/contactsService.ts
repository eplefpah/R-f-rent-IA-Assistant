import { supabase } from './supabaseClient';
import { Contact } from '../types';

export const contactsService = {
  async getAllContacts(): Promise<Contact[]> {
    try {
      const { data, error } = await supabase
        .from('reference_contacts')
        .select('*')
        .order('full_name', { ascending: true });

      if (error) {
        console.error('Error fetching contacts:', error);
        return [];
      }

      return (data || []) as Contact[];
    } catch (error) {
      console.error('Failed to fetch contacts:', error);
      return [];
    }
  },

  async getContactById(id: string): Promise<Contact | null> {
    try {
      const { data, error } = await supabase
        .from('reference_contacts')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) {
        console.error('Error fetching contact:', error);
        return null;
      }

      return data as Contact | null;
    } catch (error) {
      console.error('Failed to fetch contact:', error);
      return null;
    }
  },

  async getContactsByType(type: string): Promise<Contact[]> {
    try {
      const { data, error } = await supabase
        .from('reference_contacts')
        .select('*')
        .eq('contact_type', type)
        .order('full_name', { ascending: true });

      if (error) {
        console.error('Error fetching contacts by type:', error);
        return [];
      }

      return (data || []) as Contact[];
    } catch (error) {
      console.error('Failed to fetch contacts by type:', error);
      return [];
    }
  }
};

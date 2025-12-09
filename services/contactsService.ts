import { supabase } from './supabaseClient';
import { Contact } from '../types';

export const contactsService = {
  async getAllContacts(): Promise<Contact[]> {
    try {
      const referenceContactsPromise = supabase
        .from('reference_contacts')
        .select('*')
        .order('full_name', { ascending: true });

      const profilesPromise = supabase
        .from('profiles')
        .select('*')
        .eq('allow_contact', true)
        .order('full_name', { ascending: true });

      const [referenceResult, profilesResult] = await Promise.all([
        referenceContactsPromise,
        profilesPromise
      ]);

      if (referenceResult.error) {
        console.error('Error fetching reference contacts:', referenceResult.error);
      }

      if (profilesResult.error) {
        console.error('Error fetching profiles:', profilesResult.error);
      }

      const referenceContacts = (referenceResult.data || []) as Contact[];
      const profiles = profilesResult.data || [];

      const profileContacts: Contact[] = profiles.map(profile => ({
        id: profile.id,
        email: profile.email,
        full_name: profile.full_name || '',
        organization: profile.organization || '',
        position: profile.position || profile.role || '',
        location: profile.location || '',
        bio: profile.bio || '',
        avatar_url: profile.avatar_url || '',
        linkedin_url: '',
        contact_type: 'Référent IA',
        role: profile.role || 'Référent IA',
        expertise_areas: profile.expertise_areas || [],
        is_reference: false,
        created_at: profile.created_at,
        updated_at: profile.updated_at
      }));

      const referenceEmails = new Set(referenceContacts.map(c => c.email));
      const uniqueProfileContacts = profileContacts.filter(
        pc => !referenceEmails.has(pc.email)
      );

      const allContacts = [...referenceContacts, ...uniqueProfileContacts];
      allContacts.sort((a, b) => a.full_name.localeCompare(b.full_name));

      return allContacts;
    } catch (error) {
      console.error('Failed to fetch contacts:', error);
      return [];
    }
  },

  async getContactById(id: string): Promise<Contact | null> {
    try {
      const referenceResult = await supabase
        .from('reference_contacts')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (referenceResult.data) {
        return referenceResult.data as Contact;
      }

      const profileResult = await supabase
        .from('profiles')
        .select('*')
        .eq('id', id)
        .eq('allow_contact', true)
        .maybeSingle();

      if (profileResult.error || !profileResult.data) {
        return null;
      }

      const profile = profileResult.data;
      return {
        id: profile.id,
        email: profile.email,
        full_name: profile.full_name || '',
        organization: profile.organization || '',
        position: profile.position || profile.role || '',
        location: profile.location || '',
        bio: profile.bio || '',
        avatar_url: profile.avatar_url || '',
        linkedin_url: '',
        contact_type: 'Référent IA',
        role: profile.role || 'Référent IA',
        expertise_areas: profile.expertise_areas || [],
        is_reference: false,
        created_at: profile.created_at,
        updated_at: profile.updated_at
      };
    } catch (error) {
      console.error('Failed to fetch contact:', error);
      return null;
    }
  },

  async getContactsByType(type: string): Promise<Contact[]> {
    try {
      const allContacts = await this.getAllContacts();
      return allContacts.filter(contact => contact.contact_type === type);
    } catch (error) {
      console.error('Failed to fetch contacts by type:', error);
      return [];
    }
  }
};

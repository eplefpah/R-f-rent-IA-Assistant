
import React, { useState, useMemo, useEffect } from 'react';
import { Menu, Search, MapPin, Building2, ExternalLink, Mail, BadgeCheck, Loader2 } from 'lucide-react';
import { contactsService } from '../services/contactsService';
import { Contact } from '../types';

interface ContactsInterfaceProps {
  toggleSidebar: () => void;
}

const ContactsInterface: React.FC<ContactsInterfaceProps> = ({ toggleSidebar }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('Tous');
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loadingContacts, setLoadingContacts] = useState(true);

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    setLoadingContacts(true);
    try {
      const data = await contactsService.getAllContacts();
      setContacts(data);
    } catch (error) {
      console.error('Failed to load contacts:', error);
    } finally {
      setLoadingContacts(false);
    }
  };

  const contactTypes = useMemo(() => {
    const types = new Set(contacts.map(c => c.contact_type).filter(Boolean));
    return ['Tous', ...Array.from(types)];
  }, [contacts]);

  const filteredContacts = useMemo(() => {
    return contacts.filter(contact => {
      const matchesSearch =
        contact.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.expertise_areas.some(area => area.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesType = selectedType === 'Tous' || contact.contact_type === selectedType;

      return matchesSearch && matchesType;
    });
  }, [contacts, searchQuery, selectedType]);

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-50 dark:bg-slate-950 relative overflow-hidden transition-colors duration-300">
      {/* Header Mobile */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-4 flex items-center md:hidden sticky top-0 z-10">
        <button onClick={toggleSidebar} className="mr-3 text-slate-600 dark:text-slate-300">
          <Menu size={24} />
        </button>
        <h1 className="font-semibold text-slate-800 dark:text-white">Annuaire Contacts</h1>
      </header>

      {/* Header Desktop */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-8 py-6 hidden md:block transition-colors duration-300">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Annuaire des Contacts</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">Experts, ministres et ambassadeurs IA de l'administration publique.</p>
          </div>
          <div className="bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full text-xs font-medium text-slate-600 dark:text-slate-300">
            {filteredContacts.length} contact{filteredContacts.length !== 1 ? 's' : ''} trouvé{filteredContacts.length !== 1 ? 's' : ''}
          </div>
        </div>
      </header>

      {/* Search & Filters */}
      <div className="px-4 md:px-8 py-6 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-500" size={20} />
            <input 
              type="text"
              placeholder="Rechercher par nom, expertise, organisation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 rounded-lg focus:ring-2 focus:ring-ref-blue focus:border-transparent outline-none text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 transition-colors"
            />
          </div>
          <div className="flex overflow-x-auto pb-2 md:pb-0 gap-2 no-scrollbar">
            {contactTypes.map(type => (
              <button
                key={type}
                onClick={() => setSelectedType(type as string)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedType === type 
                    ? 'bg-ref-blue text-white shadow-sm' 
                    : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Contacts Grid */}
      <div className="flex-1 overflow-y-auto px-4 md:px-8 pb-8 scrollbar-thin">
        {loadingContacts ? (
          <div className="flex flex-col items-center justify-center h-64 space-y-4">
            <Loader2 className="w-10 h-10 text-ref-blue animate-spin" />
            <p className="text-slate-500 dark:text-slate-400">Chargement des contacts...</p>
          </div>
        ) : filteredContacts.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {filteredContacts.map((contact) => (
              <div 
                key={contact.id} 
                className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col overflow-hidden"
              >
                {/* Header Card */}
                <div className="p-5 flex items-start space-x-4 border-b border-slate-50 dark:border-slate-800">
                  <div className="flex-shrink-0">
                    {contact.avatar_url ? (
                      <img 
                        src={contact.avatar_url} 
                        alt={contact.full_name} 
                        className="w-16 h-16 rounded-full object-cover border-2 border-slate-100 dark:border-slate-700"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-500 text-xl font-bold">
                        {contact.full_name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white truncate flex items-center gap-1">
                      {contact.full_name}
                      {contact.is_reference && <BadgeCheck size={16} className="text-ref-blue dark:text-blue-400" />}
                    </h3>
                    <p className="text-sm text-ref-blue dark:text-blue-400 font-medium truncate">{contact.role}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center truncate">
                      <Building2 size={12} className="mr-1" />
                      {contact.organization}
                    </p>
                  </div>
                </div>

                {/* Body Card */}
                <div className="p-5 flex-1 flex flex-col space-y-4">
                  <div className="text-sm text-slate-700 dark:text-slate-300 font-medium leading-snug">
                    {contact.position}
                  </div>
                  
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3">
                    {contact.bio}
                  </p>

                  {contact.expertise_areas.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
                      {contact.expertise_areas.slice(0, 3).map((area, idx) => (
                        <span key={idx} className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-semibold rounded-full uppercase tracking-wide">
                          {area}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer Card */}
                <div className="px-5 py-3 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs text-slate-500 dark:text-slate-400">
                   <div className="flex items-center">
                     <MapPin size={14} className="mr-1 text-slate-400 dark:text-slate-500" />
                     {contact.location || 'Non spécifié'}
                   </div>
                   <div className="flex space-x-3">
                     {contact.email && contact.allow_contact !== false && (
                       <a href={`mailto:${contact.email}`} className="text-slate-400 hover:text-ref-blue dark:hover:text-blue-400 transition-colors" title="Email">
                         <Mail size={16} />
                       </a>
                     )}
                     {contact.linkedin_url && (
                       <a href={contact.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-[#0077b5] transition-colors" title="LinkedIn">
                         <ExternalLink size={16} />
                       </a>
                     )}
                   </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-slate-500 dark:text-slate-400">
            <Search size={48} className="text-slate-200 dark:text-slate-700 mb-4" />
            <p className="text-lg font-medium">Aucun contact trouvé</p>
            <p className="text-sm">Essayez de modifier vos filtres ou votre recherche.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactsInterface;

import { Category, Session, Topic } from '../types';

export const demoCategories: Category[] = [
  { id: 'securite', name: 'Sécurité routière', color: '#7E8CE0' },
  { id: 'amenagement', name: 'Aménagement', color: '#A6C48A' },
  { id: 'immobilier', name: 'Développement immobilier', color: '#D9A5B3' },
  { id: 'circulation', name: 'Circulation lourde', color: '#F2C14E' }
];

export const demoSessions: Session[] = [
  {
    id: 'ccc-001',
    committee: 'CCC/CCSRM',
    sessionNumber: 'CCC-2024-01',
    date: '2024-02-15',
    pvUrl: 'https://exemple.com/pv-ccc-2024-01.pdf',
    agendaUrl: 'https://exemple.com/odj-ccc-2024-01.pdf'
  },
  {
    id: 'ccc-002',
    committee: 'CCC/CCSRM',
    sessionNumber: 'CCC-2024-02',
    date: '2024-03-20',
    pvUrl: 'https://exemple.com/pv-ccc-2024-02.pdf',
    agendaUrl: 'https://exemple.com/odj-ccc-2024-02.pdf'
  },
  {
    id: 'ccu-001',
    committee: 'CCU',
    sessionNumber: 'CCU-2024-01',
    date: '2024-02-05',
    pvUrl: 'https://exemple.com/pv-ccu-2024-01.pdf',
    agendaUrl: 'https://exemple.com/odj-ccu-2024-01.pdf'
  }
];

export const demoTopics: Topic[] = [
  {
    id: 't1',
    committee: 'CCC/CCSRM',
    sessionId: 'ccc-001',
    title: 'Sécurisation de la 5e Rue / 5e Avenue',
    description: 'Analyse des mesures de sécurité et demandes citoyennes.',
    resolutionNumber: 'R-2024-021',
    commentaryNumber: 'C-2024-004',
    relatedResolutions: ['R-2023-118'],
    categories: ['securite', 'circulation'],
    keywords: ['intersection', 'sécurité', 'piétons'],
    location: { label: '5e Rue et 5e Avenue', latitude: 48.1108, longitude: -77.7816 }
  },
  {
    id: 't2',
    committee: 'CCC/CCSRM',
    sessionId: 'ccc-002',
    title: 'Réaménagement du stationnement centre-ville',
    description: 'Plan de réaménagement pour optimiser les espaces.',
    resolutionNumber: 'R-2024-078',
    categories: ['amenagement'],
    keywords: ['stationnement', 'centre-ville'],
    location: { label: 'Stationnement 6e Rue', latitude: 48.095, longitude: -77.777 }
  },
  {
    id: 't3',
    committee: 'CCU',
    sessionId: 'ccu-001',
    title: 'Projet résidentiel des Pins',
    description: 'Demande de modification au zonage pour 40 unités.',
    resolutionNumber: 'R-2024-050',
    categories: ['immobilier'],
    keywords: ['zonage', 'résidentiel'],
    relatedResolutions: ['R-2023-200'],
    location: { label: 'Secteur des Pins', latitude: 48.102, longitude: -77.74 }
  }
];

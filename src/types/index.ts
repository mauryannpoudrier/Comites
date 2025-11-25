export type Committee = 'CCC/CCSRM' | 'CCU';

export interface Category {
  id: string;
  name: string;
  color?: string;
}

export interface Session {
  id: string;
  committee: Committee;
  sessionNumber: string;
  date: string;
  pvUrl?: string;
  agendaUrl?: string;
}

export interface TopicLocation {
  label: string;
  latitude: number;
  longitude: number;
}

export interface Topic {
  id: string;
  committee: Committee;
  sessionId: string;
  title: string;
  description: string;
  resolutionNumber?: string;
  commentaryNumber?: string;
  relatedResolutions?: string[];
  categories: string[];
  keywords: string[];
  location?: TopicLocation;
}

export interface Filters {
  search: string;
  resolution: string;
  categoryIds: string[];
  location: string;
  committee: Committee | 'Tous';
}

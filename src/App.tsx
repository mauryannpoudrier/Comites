import { useEffect, useMemo, useState } from 'react';
import { Filters, Session, Topic, Category, Committee } from './types';
import { demoCategories, demoSessions, demoTopics } from './data/demoData';
import { FiltersPanel } from './components/FiltersPanel';
import { CategoryManager } from './components/CategoryManager';
import { SessionForm } from './components/SessionForm';
import { TopicForm } from './components/TopicForm';
import { SessionBoard } from './components/SessionBoard';
import { SyncBar } from './components/SyncBar';
import { MapPanel } from './components/MapPanel';

const STORAGE_KEY = 'comites-data';

interface StoredData {
  sessions: Session[];
  topics: Topic[];
  categories: Category[];
  lastSync?: string;
}

const emptyFilters: Filters = {
  search: '',
  resolution: '',
  categoryIds: [],
  location: '',
  committee: 'Tous'
};

export default function App() {
  const [categories, setCategories] = useState<Category[]>(demoCategories);
  const [sessions, setSessions] = useState<Session[]>(demoSessions);
  const [topics, setTopics] = useState<Topic[]>(demoTopics);
  const [filters, setFilters] = useState<Filters>(emptyFilters);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'done'>('idle');
  const [lastSync, setLastSync] = useState<string | undefined>(undefined);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as StoredData;
      setCategories(parsed.categories);
      setSessions(parsed.sessions);
      setTopics(parsed.topics);
      setLastSync(parsed.lastSync);
    }
  }, []);

  useEffect(() => {
    const payload: StoredData = { categories, sessions, topics, lastSync };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }, [categories, sessions, topics, lastSync]);

  const addSession = (session: Session) => {
    setSessions([session, ...sessions]);
  };

  const addTopic = (topic: Topic) => {
    setTopics([topic, ...topics]);
  };

  const updateCategories = (next: Category[]) => {
    setCategories(next);
  };

  const handleSync = () => {
    setSyncStatus('syncing');
    setTimeout(() => {
      setSyncStatus('done');
      setLastSync(new Date().toISOString());
    }, 800);
  };

  const filteredTopics = useMemo(() => {
    const terms = filters.search.toLowerCase();
    const resolutionQuery = filters.resolution.toLowerCase();
    const locationQuery = filters.location.toLowerCase();

    return topics.filter((topic) => {
      if (filters.committee !== 'Tous' && topic.committee !== filters.committee) return false;
      if (filters.categoryIds.length && !filters.categoryIds.every((id) => topic.categories.includes(id))) return false;
      const searchFields = `${topic.title} ${topic.description} ${topic.keywords.join(' ')}`.toLowerCase();
      if (terms && !searchFields.includes(terms)) return false;
      const resolutionFields = `${topic.resolutionNumber || ''} ${topic.commentaryNumber || ''} ${(topic.relatedResolutions || []).join(' ')}`.toLowerCase();
      if (resolutionQuery && !resolutionFields.includes(resolutionQuery)) return false;
      if (locationQuery) {
        const label = topic.location?.label.toLowerCase() || '';
        if (!label.includes(locationQuery)) return false;
      }
      return true;
    });
  }, [topics, filters]);

  const sessionsByCommittee = useMemo(() => {
    const groups: Record<Committee, Session[]> = {
      'CCC/CCSRM': [],
      CCU: []
    };
    sessions.forEach((session) => {
      groups[session.committee].push(session);
    });
    Object.values(groups).forEach((list) => list.sort((a, b) => b.sessionNumber.localeCompare(a.sessionNumber)));
    return groups;
  }, [sessions]);

  return (
    <div className="page">
      <header className="hero">
        <div>
          <p className="eyebrow">Ville de Val-d'Or</p>
          <h1>Comités Ville de Val-d’Or</h1>
          <p className="intro">
            Suivi des sujets des comités CCC / CCSRM et CCU : résolution, commentaires, catégories, localisation et liens vers les
            documents officiels.
          </p>
        </div>
        <div className="hero-badge">
          <p>Prêt pour Firebase Hosting</p>
          <strong>Interface collaborative</strong>
        </div>
      </header>

      <SyncBar status={syncStatus} lastSync={lastSync} onSync={handleSync} />
      <FiltersPanel filters={filters} categories={categories} onUpdate={setFilters} />
      <CategoryManager categories={categories} onSave={updateCategories} />
      <SessionForm onCreate={addSession} />
      <TopicForm sessions={sessions} categories={categories} onCreate={addTopic} />

      <div className="section-title">
        <h2>Sujets CCC / CCSRM</h2>
        <p className="muted">Séances classées avec accès direct au PV et à l’ordre du jour.</p>
      </div>
      <SessionBoard
        sessions={sessionsByCommittee['CCC/CCSRM']}
        topics={filteredTopics.filter((topic) => topic.committee === 'CCC/CCSRM')}
        categories={categories}
        filterPredicate={() => true}
      />

      <div className="section-title">
        <h2>Sujets CCU</h2>
        <p className="muted">Réservé aux enjeux d’urbanisme, zonage et aménagement.</p>
      </div>
      <SessionBoard
        sessions={sessionsByCommittee.CCU}
        topics={filteredTopics.filter((topic) => topic.committee === 'CCU')}
        categories={categories}
        filterPredicate={() => true}
      />

      <MapPanel topics={filteredTopics.filter((topic) => topic.location)} />
    </div>
  );
}

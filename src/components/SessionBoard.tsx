import { Category, Session, Topic } from '../types';

interface Props {
  sessions: Session[];
  topics: Topic[];
  categories: Category[];
  filterPredicate: (topic: Topic) => boolean;
}

function TopicBadge({ topic, categories }: { topic: Topic; categories: Category[] }) {
  const topicCategories = categories.filter((c) => topic.categories.includes(c.id));
  return (
    <article className="topic">
      <header className="topic-header">
        <div>
          <p className="eyebrow">{topic.resolutionNumber || 'Sans numéro de résolution'}</p>
          <h4>{topic.title}</h4>
          <p className="muted">{topic.description}</p>
        </div>
        <div className="topic-meta">
          {topic.commentaryNumber && <span className="tag">Commentaire {topic.commentaryNumber}</span>}
          {topic.relatedResolutions?.length ? (
            <span className="tag">Liées: {topic.relatedResolutions.join(', ')}</span>
          ) : null}
        </div>
      </header>
      <footer className="topic-footer">
        <div className="tag-row">
          {topicCategories.map((category) => (
            <span key={category.id} className="tag" style={{ borderColor: category.color }}>
              {category.name}
            </span>
          ))}
          {topic.keywords.map((keyword) => (
            <span key={keyword} className="tag ghost-tag">
              #{keyword}
            </span>
          ))}
        </div>
        {topic.location && <p className="muted">📍 {topic.location.label}</p>}
      </footer>
    </article>
  );
}

export function SessionBoard({ sessions, topics, categories, filterPredicate }: Props) {
  return (
    <div className="session-grid">
      {sessions.map((session) => {
        const items = topics.filter((topic) => topic.sessionId === session.id && filterPredicate(topic));
        return (
          <div key={session.id} className="session-card">
            <div className="session-header">
              <div>
                <p className="eyebrow">{session.committee}</p>
                <h3>{session.sessionNumber}</h3>
                <p className="muted">{new Date(session.date).toLocaleDateString('fr-CA')}</p>
              </div>
              <div className="session-links">
                {session.agendaUrl && (
                  <a href={session.agendaUrl} target="_blank" rel="noreferrer">
                    Ordre du jour
                  </a>
                )}
                {session.pvUrl && (
                  <a href={session.pvUrl} target="_blank" rel="noreferrer">
                    PV
                  </a>
                )}
              </div>
            </div>
            <div className="topics-column">
              {items.length ? (
                items.map((topic) => <TopicBadge key={topic.id} topic={topic} categories={categories} />)
              ) : (
                <p className="muted">Aucun sujet ne correspond aux filtres.</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

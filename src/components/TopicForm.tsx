import { useMemo, useState } from 'react';
import { Category, Committee, Session, Topic } from '../types';

interface Props {
  sessions: Session[];
  categories: Category[];
  onCreate: (topic: Topic) => void;
}

const committees: Committee[] = ['CCC/CCSRM', 'CCU'];

export function TopicForm({ sessions, categories, onCreate }: Props) {
  const [form, setForm] = useState({
    committee: 'CCC/CCSRM' as Committee,
    sessionId: '',
    title: '',
    description: '',
    resolutionNumber: '',
    commentaryNumber: '',
    relatedResolutions: '',
    categoryIds: [] as string[],
    keywords: '',
    locationLabel: '',
    latitude: '',
    longitude: ''
  });

  const availableSessions = useMemo(
    () => sessions.filter((s) => s.committee === form.committee),
    [sessions, form.committee]
  );

  const toggleCategory = (id: string) => {
    const active = form.categoryIds.includes(id);
    const next = active ? form.categoryIds.filter((c) => c !== id) : [...form.categoryIds, id];
    setForm({ ...form, categoryIds: next });
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.sessionId) return;
    const payload: Topic = {
      id: crypto.randomUUID(),
      committee: form.committee,
      sessionId: form.sessionId,
      title: form.title.trim(),
      description: form.description.trim(),
      resolutionNumber: form.resolutionNumber.trim() || undefined,
      commentaryNumber: form.commentaryNumber.trim() || undefined,
      relatedResolutions: form.relatedResolutions
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean),
      categories: form.categoryIds,
      keywords: form.keywords
        .split(',')
        .map((word) => word.trim())
        .filter(Boolean),
      location:
        form.locationLabel && form.latitude && form.longitude
          ? {
              label: form.locationLabel,
              latitude: Number(form.latitude),
              longitude: Number(form.longitude)
            }
          : undefined
    };
    onCreate(payload);
    setForm({
      committee: 'CCC/CCSRM',
      sessionId: '',
      title: '',
      description: '',
      resolutionNumber: '',
      commentaryNumber: '',
      relatedResolutions: '',
      categoryIds: [],
      keywords: '',
      locationLabel: '',
      latitude: '',
      longitude: ''
    });
  };

  return (
    <section className="card">
      <div className="card-header">
        <div>
          <p className="eyebrow">Sujets</p>
          <h2>Ajouter un sujet</h2>
        </div>
      </div>
      <form className="grid" onSubmit={submit}>
        <label className="field">
          <span>Comité</span>
          <select value={form.committee} onChange={(e) => setForm({ ...form, committee: e.target.value as Committee, sessionId: '' })}>
            {committees.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
        <label className="field">
          <span>Séance</span>
          <select
            required
            value={form.sessionId}
            onChange={(e) => setForm({ ...form, sessionId: e.target.value })}
          >
            <option value="">Choisir une séance</option>
            {availableSessions.map((session) => (
              <option key={session.id} value={session.id}>
                {session.sessionNumber} — {session.date}
              </option>
            ))}
          </select>
        </label>
        <label className="field">
          <span>Titre</span>
          <input
            required
            type="text"
            placeholder="Nom du sujet"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </label>
        <label className="field">
          <span>Description</span>
          <textarea
            required
            rows={3}
            placeholder="Détails succincts"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </label>
        <label className="field">
          <span>Numéro de résolution</span>
          <input
            type="text"
            placeholder="R-2024-021"
            value={form.resolutionNumber}
            onChange={(e) => setForm({ ...form, resolutionNumber: e.target.value })}
          />
        </label>
        <label className="field">
          <span>Numéro de commentaire</span>
          <input
            type="text"
            placeholder="C-2024-004"
            value={form.commentaryNumber}
            onChange={(e) => setForm({ ...form, commentaryNumber: e.target.value })}
          />
        </label>
        <label className="field">
          <span>Résolutions liées</span>
          <input
            type="text"
            placeholder="R-2023-118, R-2022-090"
            value={form.relatedResolutions}
            onChange={(e) => setForm({ ...form, relatedResolutions: e.target.value })}
          />
        </label>
        <label className="field">
          <span>Mots-clés (séparés par des virgules)</span>
          <input
            type="text"
            placeholder="sécurité, piétons, intersection"
            value={form.keywords}
            onChange={(e) => setForm({ ...form, keywords: e.target.value })}
          />
        </label>
        <div className="field">
          <span>Catégories</span>
          <div className="chips">
            {categories.map((category) => {
              const active = form.categoryIds.includes(category.id);
              return (
                <button
                  type="button"
                  key={category.id}
                  className={`chip ${active ? 'chip-active' : ''}`}
                  style={{ borderColor: category.color || '#6c63ff' }}
                  onClick={() => toggleCategory(category.id)}
                >
                  {category.name}
                </button>
              );
            })}
          </div>
        </div>
        <label className="field">
          <span>Localisation (nom ou intersection)</span>
          <input
            type="text"
            placeholder="5e Rue et 5e Avenue"
            value={form.locationLabel}
            onChange={(e) => setForm({ ...form, locationLabel: e.target.value })}
          />
        </label>
        <label className="field">
          <span>Latitude</span>
          <input
            type="number"
            step="0.0001"
            value={form.latitude}
            onChange={(e) => setForm({ ...form, latitude: e.target.value })}
          />
        </label>
        <label className="field">
          <span>Longitude</span>
          <input
            type="number"
            step="0.0001"
            value={form.longitude}
            onChange={(e) => setForm({ ...form, longitude: e.target.value })}
          />
        </label>
        <div className="actions">
          <button type="submit">Enregistrer le sujet</button>
        </div>
      </form>
    </section>
  );
}

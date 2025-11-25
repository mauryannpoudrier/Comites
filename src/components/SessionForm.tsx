import { useState } from 'react';
import { Committee, Session } from '../types';

interface Props {
  onCreate: (session: Session) => void;
}

const committees: Committee[] = ['CCC/CCSRM', 'CCU'];

export function SessionForm({ onCreate }: Props) {
  const [form, setForm] = useState({
    committee: 'CCC/CCSRM' as Committee,
    sessionNumber: '',
    date: '',
    pvUrl: '',
    agendaUrl: ''
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.sessionNumber || !form.date) return;
    const payload: Session = {
      ...form,
      id: crypto.randomUUID()
    };
    onCreate(payload);
    setForm({ committee: 'CCC/CCSRM', sessionNumber: '', date: '', pvUrl: '', agendaUrl: '' });
  };

  return (
    <section className="card">
      <div className="card-header">
        <div>
          <p className="eyebrow">Nouvelle séance</p>
          <h2>Ajouter une séance</h2>
        </div>
      </div>
      <form className="grid" onSubmit={submit}>
        <label className="field">
          <span>Comité</span>
          <select value={form.committee} onChange={(e) => setForm({ ...form, committee: e.target.value as Committee })}>
            {committees.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
        <label className="field">
          <span>Numéro de séance</span>
          <input
            required
            type="text"
            placeholder="CCC-2024-03"
            value={form.sessionNumber}
            onChange={(e) => setForm({ ...form, sessionNumber: e.target.value })}
          />
        </label>
        <label className="field">
          <span>Date</span>
          <input required type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
        </label>
        <label className="field">
          <span>PV (lien PDF)</span>
          <input type="url" placeholder="https://" value={form.pvUrl} onChange={(e) => setForm({ ...form, pvUrl: e.target.value })} />
        </label>
        <label className="field">
          <span>Ordre du jour (PDF)</span>
          <input
            type="url"
            placeholder="https://"
            value={form.agendaUrl}
            onChange={(e) => setForm({ ...form, agendaUrl: e.target.value })}
          />
        </label>
        <div className="actions">
          <button type="submit">Enregistrer la séance</button>
        </div>
      </form>
    </section>
  );
}

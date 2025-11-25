interface Props {
  status: 'idle' | 'syncing' | 'done';
  lastSync?: string;
  onSync: () => void;
}

export function SyncBar({ status, lastSync, onSync }: Props) {
  return (
    <section className="card">
      <div className="card-header">
        <div>
          <p className="eyebrow">Synchronisation</p>
          <h2>Firebase / sauvegarde</h2>
          <p className="muted">Les données sont conservées localement et prêtes à être synchronisées avec Firestore.</p>
        </div>
        <button onClick={onSync} disabled={status === 'syncing'}>
          {status === 'syncing' ? 'Synchronisation…' : 'Synchroniser maintenant'}
        </button>
      </div>
      <p className="muted">Dernière sync: {lastSync ? new Date(lastSync).toLocaleString('fr-CA') : '—'}</p>
    </section>
  );
}

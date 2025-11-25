import { Filters, Category, Committee } from '../types';

interface FiltersPanelProps {
  filters: Filters;
  categories: Category[];
  onUpdate: (filters: Filters) => void;
}

const committees: (Committee | 'Tous')[] = ['Tous', 'CCC/CCSRM', 'CCU'];

export function FiltersPanel({ filters, categories, onUpdate }: FiltersPanelProps) {
  const toggleCategory = (id: string) => {
    const already = filters.categoryIds.includes(id);
    const next = already
      ? filters.categoryIds.filter((c) => c !== id)
      : [...filters.categoryIds, id];
    onUpdate({ ...filters, categoryIds: next });
  };

  return (
    <section className="card">
      <div className="card-header">
        <div>
          <p className="eyebrow">Filtrer rapidement</p>
          <h2>Filtres</h2>
        </div>
        <button className="ghost" onClick={() => onUpdate({ ...filters, search: '', resolution: '', categoryIds: [], location: '', committee: 'Tous' })}>
          Réinitialiser
        </button>
      </div>
      <div className="filters-grid">
        <label className="field">
          <span>Mots-clés</span>
          <input
            type="text"
            placeholder="Sujet, mot-clé, description"
            value={filters.search}
            onChange={(e) => onUpdate({ ...filters, search: e.target.value })}
          />
        </label>
        <label className="field">
          <span>Résolution / commentaire</span>
          <input
            type="text"
            placeholder="Ex. R-2024-021"
            value={filters.resolution}
            onChange={(e) => onUpdate({ ...filters, resolution: e.target.value })}
          />
        </label>
        <label className="field">
          <span>Recherche cartographique</span>
          <input
            type="text"
            placeholder="Nom de lieu ou intersection"
            value={filters.location}
            onChange={(e) => onUpdate({ ...filters, location: e.target.value })}
          />
        </label>
        <label className="field">
          <span>Comité</span>
          <select value={filters.committee} onChange={(e) => onUpdate({ ...filters, committee: e.target.value as Filters['committee'] })}>
            {committees.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="chips">
        {categories.map((category) => {
          const active = filters.categoryIds.includes(category.id);
          return (
            <button
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
    </section>
  );
}

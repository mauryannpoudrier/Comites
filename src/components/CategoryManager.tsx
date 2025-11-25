import { useState } from 'react';
import { Category } from '../types';

interface Props {
  categories: Category[];
  onSave: (categories: Category[]) => void;
}

export function CategoryManager({ categories, onSave }: Props) {
  const [name, setName] = useState('');
  const [color, setColor] = useState('#6c63ff');

  const addCategory = () => {
    if (!name.trim()) return;
    const newCategory: Category = {
      id: name.toLowerCase().replace(/[^a-z0-9]+/gi, '-'),
      name: name.trim(),
      color
    };
    onSave([...categories, newCategory]);
    setName('');
  };

  const removeCategory = (id: string) => {
    onSave(categories.filter((c) => c.id !== id));
  };

  return (
    <section className="card">
      <div className="card-header">
        <div>
          <p className="eyebrow">Administration</p>
          <h2>Catégories</h2>
        </div>
      </div>
      <div className="category-form">
        <input
          type="text"
          placeholder="Nom de la catégorie"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
        <button onClick={addCategory}>Ajouter</button>
      </div>
      <div className="pill-row">
        {categories.map((category) => (
          <span key={category.id} className="pill" style={{ background: `${category.color}22`, borderColor: category.color }}>
            {category.name}
            <button className="pill-delete" aria-label={`Supprimer ${category.name}`} onClick={() => removeCategory(category.id)}>
              ✕
            </button>
          </span>
        ))}
      </div>
    </section>
  );
}

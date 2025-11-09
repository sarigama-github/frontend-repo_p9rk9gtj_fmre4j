import { useEffect, useMemo, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CompanyGrid from './components/CompanyGrid';
import CompanyForm from './components/CompanyForm';

function uid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export default function App() {
  const [companies, setCompanies] = useState(() => {
    try {
      const saved = localStorage.getItem('companies');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [openForm, setOpenForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({ type: '', location: '', sort: 'new' });

  useEffect(() => {
    localStorage.setItem('companies', JSON.stringify(companies));
  }, [companies]);

  const filtered = useMemo(() => {
    let list = [...companies];

    // Search across fields
    const q = search.trim().toLowerCase();
    if (q) {
      list = list.filter(c => [c.name, c.contact, c.location, c.type]
        .filter(Boolean)
        .some(v => String(v).toLowerCase().includes(q))
      );
    }

    // Filters
    if (filters.type) list = list.filter(c => c.type === filters.type);
    if (filters.location) list = list.filter(c => c.location === filters.location);

    // Sort
    if (filters.sort === 'name') list.sort((a, b) => a.name.localeCompare(b.name));
    if (filters.sort === 'new') list.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
    if (filters.sort === 'old') list.sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0));

    return list;
  }, [companies, search, filters]);

  const handleSubmit = (payload) => {
    if (payload.id) {
      setCompanies(prev => prev.map(c => c.id === payload.id ? { ...c, ...payload, updatedAt: Date.now() } : c));
    } else {
      setCompanies(prev => [{ id: uid(), ...payload, createdAt: Date.now() }, ...prev]);
    }
    setOpenForm(false);
    setEditing(null);
  };

  const handleEdit = (company) => {
    setEditing(company);
    setOpenForm(true);
  };

  const handleView = (company) => {
    alert(`Company: ${company.name}\nType: ${company.type || '—'}\nContact: ${company.contact || '—'}\nLocation: ${company.location || '—'}${company.notes ? `\nNotes: ${company.notes}` : ''}`);
  };

  const handleDelete = (company) => {
    if (confirm(`Delete ${company.name}? This cannot be undone.`)) {
      setCompanies(prev => prev.filter(c => c.id !== company.id));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-neutral-950 dark:via-neutral-950 dark:to-neutral-900 text-neutral-900 dark:text-neutral-100">
      <Navbar
        onAddNew={() => { setEditing(null); setOpenForm(true); }}
        search={search}
        setSearch={setSearch}
        filters={filters}
        setFilters={setFilters}
        dataForExport={companies}
      />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Hero />

        {/* Analytics */}
        <section id="reports" className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-4">
          <div className="rounded-xl p-4 bg-white/70 dark:bg-neutral-900/70 backdrop-blur border border-neutral-200 dark:border-neutral-800">
            <p className="text-xs text-neutral-500">Total companies</p>
            <p className="mt-1 text-2xl font-semibold">{companies.length}</p>
          </div>
          <div className="rounded-xl p-4 bg-white/70 dark:bg-neutral-900/70 backdrop-blur border border-neutral-200 dark:border-neutral-800">
            <p className="text-xs text-neutral-500">Unique locations</p>
            <p className="mt-1 text-2xl font-semibold">{new Set(companies.map(c => c.location).filter(Boolean)).size}</p>
          </div>
          <div className="rounded-xl p-4 bg-white/70 dark:bg-neutral-900/70 backdrop-blur border border-neutral-200 dark:border-neutral-800">
            <p className="text-xs text-neutral-500">Types</p>
            <p className="mt-1 text-2xl font-semibold">{new Set(companies.map(c => c.type).filter(Boolean)).size}</p>
          </div>
        </section>

        <section className="mt-8">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-semibold">Companies</h2>
            <button onClick={() => { setEditing(null); setOpenForm(true); }} className="hidden sm:inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-3 py-2 rounded-md">Add Company</button>
          </div>
          <CompanyGrid companies={filtered} onEdit={handleEdit} onView={handleView} onDelete={handleDelete} />
        </section>
      </main>

      <CompanyForm open={openForm} onClose={() => setOpenForm(false)} onSubmit={handleSubmit} editing={editing} />
    </div>
  );
}

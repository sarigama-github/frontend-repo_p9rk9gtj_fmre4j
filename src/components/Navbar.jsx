import { useState, useEffect } from 'react';
import { Home, Settings, Plus, Search, Filter, Sun, Moon, FileDown } from 'lucide-react';

function exportToCSV(rows, filename = 'companies.csv') {
  if (!rows || rows.length === 0) return;
  const headers = Object.keys(rows[0]).filter(k => !['id'].includes(k));
  const csv = [
    headers.join(','),
    ...rows.map(r => headers.map(h => `"${String(r[h] ?? '').replace(/"/g, '""')}"`).join(','))
  ].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export default function Navbar({ onAddNew, search, setSearch, filters, setFilters, dataForExport }) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add('dark');
    else root.classList.remove('dark');
  }, [dark]);

  return (
    <header className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/80 dark:bg-neutral-900/80 border-b border-neutral-200 dark:border-neutral-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-3">
        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold">
          <Home className="w-5 h-5" />
          <span>Business Dashboard</span>
        </div>

        <div className="hidden md:flex items-center gap-2 ml-6 flex-1">
          <div className="relative w-full max-w-xl">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, contact, location or type"
              className="w-full pl-9 pr-3 py-2 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-sm text-neutral-800 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="hidden md:flex items-center gap-2 ml-auto">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-neutral-500" />
              <select
                value={filters.type}
                onChange={(e) => setFilters(f => ({ ...f, type: e.target.value }))}
                className="text-sm rounded-md border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-2 py-1.5"
              >
                <option value="">All Types</option>
                <option>Manufacturing</option>
                <option>Services</option>
                <option>Retail</option>
                <option>Finance</option>
                <option>Technology</option>
              </select>
              <select
                value={filters.location}
                onChange={(e) => setFilters(f => ({ ...f, location: e.target.value }))}
                className="text-sm rounded-md border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-2 py-1.5"
              >
                <option value="">All Locations</option>
                <option>Mumbai</option>
                <option>Delhi</option>
                <option>Bengaluru</option>
                <option>Chennai</option>
                <option>Pune</option>
              </select>
              <select
                value={filters.sort}
                onChange={(e) => setFilters(f => ({ ...f, sort: e.target.value }))}
                className="text-sm rounded-md border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-2 py-1.5"
              >
                <option value="new">Newest</option>
                <option value="old">Oldest</option>
                <option value="name">Name A-Z</option>
              </select>
            </div>
          </div>

          <button
            onClick={() => exportToCSV(dataForExport)}
            className="inline-flex items-center gap-2 text-sm font-medium px-3 py-2 rounded-md border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800"
          >
            <FileDown className="w-4 h-4" /> Export
          </button>

          <button
            onClick={() => setDark(v => !v)}
            className="inline-flex items-center justify-center w-10 h-9 rounded-md border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800"
            aria-label="Toggle theme"
          >
            {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            onClick={onAddNew}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-3 py-2 rounded-md"
          >
            <Plus className="w-4 h-4" /> Add Company
          </button>

          <nav className="flex items-center gap-3 ml-2 text-sm text-neutral-700 dark:text-neutral-300">
            <a href="#" className="hover:text-blue-600">Home</a>
            <a href="#form" className="hover:text-blue-600">Add Company</a>
            <a href="#reports" className="hover:text-blue-600 hidden sm:inline">Reports</a>
            <a href="#settings" className="hover:text-blue-600 inline-flex items-center gap-1"><Settings className="w-4 h-4" /> Settings</a>
          </nav>
        </div>

        {/* Mobile controls */}
        <div className="md:hidden ml-auto flex items-center gap-2">
          <button
            onClick={onAddNew}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-3 py-2 rounded-md"
          >
            <Plus className="w-4 h-4" />
          </button>
          <button
            onClick={() => setDark(v => !v)}
            className="inline-flex items-center justify-center w-9 h-9 rounded-md border border-neutral-200 dark:border-neutral-800"
            aria-label="Toggle theme"
          >
            {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile search & filters */}
      <div className="md:hidden px-4 pb-4 space-y-2">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search companies..."
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-sm text-neutral-800 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <select
            value={filters.type}
            onChange={(e) => setFilters(f => ({ ...f, type: e.target.value }))}
            className="flex-1 text-sm rounded-md border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-2 py-2"
          >
            <option value="">All Types</option>
            <option>Manufacturing</option>
            <option>Services</option>
            <option>Retail</option>
            <option>Finance</option>
            <option>Technology</option>
          </select>
          <select
            value={filters.location}
            onChange={(e) => setFilters(f => ({ ...f, location: e.target.value }))}
            className="flex-1 text-sm rounded-md border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-2 py-2"
          >
            <option value="">All Locations</option>
            <option>Mumbai</option>
            <option>Delhi</option>
            <option>Bengaluru</option>
            <option>Chennai</option>
            <option>Pune</option>
          </select>
          <select
            value={filters.sort}
            onChange={(e) => setFilters(f => ({ ...f, sort: e.target.value }))}
            className="text-sm rounded-md border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-2 py-2"
          >
            <option value="new">Newest</option>
            <option value="old">Oldest</option>
            <option value="name">Name A-Z</option>
          </select>
        </div>
      </div>
    </header>
  );
}

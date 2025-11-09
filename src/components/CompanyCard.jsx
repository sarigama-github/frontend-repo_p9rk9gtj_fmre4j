import { MapPin, Phone, Building2, Edit2, Eye, Trash2 } from 'lucide-react';

export default function CompanyCard({ company, onEdit, onView, onDelete }) {
  return (
    <div className="group rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/70 backdrop-blur p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-100 text-blue-700 grid place-items-center">
          <Building2 className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-base font-semibold text-neutral-900 dark:text-white truncate">{company.name}</h3>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-200">
              {company.type || 'General'}
            </span>
          </div>
          <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-sm text-neutral-600 dark:text-neutral-300">
            <div className="inline-flex items-center gap-2"><Phone className="w-4 h-4 text-neutral-400" /> {company.contact || '—'}</div>
            <div className="inline-flex items-center gap-2"><MapPin className="w-4 h-4 text-neutral-400" /> {company.location || '—'}</div>
          </div>
          {company.notes && (
            <p className="mt-2 text-sm text-neutral-500 line-clamp-2">{company.notes}</p>
          )}
        </div>
      </div>
      <div className="mt-4 flex items-center justify-end gap-2">
        <button onClick={() => onView(company)} className="inline-flex items-center gap-1.5 text-sm px-2.5 py-1.5 rounded-md border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800"><Eye className="w-4 h-4" /> View</button>
        <button onClick={() => onEdit(company)} className="inline-flex items-center gap-1.5 text-sm px-2.5 py-1.5 rounded-md border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-blue-700"><Edit2 className="w-4 h-4" /> Edit</button>
        <button onClick={() => onDelete(company)} className="inline-flex items-center gap-1.5 text-sm px-2.5 py-1.5 rounded-md border border-red-200 text-red-600 hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-900/20"><Trash2 className="w-4 h-4" /> Delete</button>
      </div>
    </div>
  );
}

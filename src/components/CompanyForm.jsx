import { useEffect, useState } from 'react';

const initialState = { id: null, name: '', contact: '', location: '', type: '', notes: '' };

export default function CompanyForm({ open, onClose, onSubmit, editing }) {
  const [form, setForm] = useState(initialState);

  useEffect(() => {
    if (editing) setForm({ ...initialState, ...editing });
    else setForm(initialState);
  }, [editing, open]);

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...form };
    if (!payload.name.trim()) return;
    onSubmit(payload);
  };

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div id="form" className="relative w-full max-w-lg rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xl">
        <div className="p-5 border-b border-neutral-200 dark:border-neutral-800">
          <h3 className="text-lg font-semibold">{editing ? 'Edit Company' : 'Add Company'}</h3>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Company Name</label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-md border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-3 py-2"
              placeholder="Acme Corp"
              required
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Contact Number</label>
              <input
                value={form.contact}
                onChange={(e) => setForm({ ...form, contact: e.target.value })}
                className="w-full rounded-md border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-3 py-2"
                placeholder="+91 98765 43210"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Location / Place</label>
              <input
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                className="w-full rounded-md border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-3 py-2"
                placeholder="Mumbai"
              />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Type of Company</label>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="w-full rounded-md border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-3 py-2"
              >
                <option value="">Select</option>
                <option>Manufacturing</option>
                <option>Services</option>
                <option>Retail</option>
                <option>Finance</option>
                <option>Technology</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Additional notes</label>
              <input
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                className="w-full rounded-md border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-3 py-2"
                placeholder="Optional"
              />
            </div>
          </div>
          <div className="flex items-center justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-md border border-neutral-200 dark:border-neutral-800">Cancel</button>
            <button type="submit" className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700">{editing ? 'Save changes' : 'Add company'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

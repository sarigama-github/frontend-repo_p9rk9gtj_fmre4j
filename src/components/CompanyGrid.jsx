import CompanyCard from './CompanyCard';

export default function CompanyGrid({ companies, onEdit, onView, onDelete }) {
  if (!companies.length) {
    return (
      <div className="text-center text-neutral-600 dark:text-neutral-300 py-16">
        No companies found. Try adding a new one.
      </div>
    );
  }

  return (
    <div id="companies" className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {companies.map((c) => (
        <CompanyCard key={c.id} company={c} onEdit={onEdit} onView={onView} onDelete={onDelete} />
      ))}
    </div>
  );
}

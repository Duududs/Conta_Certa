import { cn } from "../lib/ui";

function FiltersBar({ filters, activeFilter, counts, totalCount, onChange }) {
  return (
    <section className="pt-2">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-semibold tracking-tight uppercase text-zinc-700 dark:text-zinc-300">
          Contas do mês
        </h2>
        <span className="text-sm text-zinc-500 dark:text-zinc-400">
          {totalCount} {totalCount === 1 ? "conta" : "contas"}
        </span>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {filters.map((filter) => {
          const selected = filter.id === activeFilter;
          return (
            <button
              key={filter.id}
              type="button"
              onClick={() => onChange(filter.id)}
              className={cn(
                "shrink-0 rounded-full border px-4 py-1.5 text-base transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/70",
                selected
                  ? "border-transparent bg-emerald-400 text-zinc-900"
                  : "border-zinc-300 bg-zinc-100 text-zinc-700 hover:bg-white dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800",
              )}
              aria-pressed={selected}
            >
              {filter.label}
              <span className="ml-1.5 text-sm opacity-75">({counts[filter.id] ?? 0})</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default FiltersBar;

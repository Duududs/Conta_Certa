import { formatMonthYearLabel } from "../lib/dates";

function MonthPicker({ selectedDate, onChange }) {
  const month = selectedDate.getMonth();
  const year = selectedDate.getFullYear();

  function handlePrev() {
    onChange(new Date(year, month - 1, 1));
  }

  function handleNext() {
    onChange(new Date(year, month + 1, 1));
  }

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white/90 p-4 dark:border-zinc-800 dark:bg-zinc-900/55">
      <div className="flex items-center justify-center gap-2 sm:gap-3">
        <button
          type="button"
          onClick={handlePrev}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-300 bg-white text-zinc-700 transition hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/70 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
          aria-label="Selecionar mês anterior"
        >
          ‹
        </button>

        <div className="flex h-10 items-center gap-2 rounded-full border border-zinc-300 bg-white px-4 text-sm font-semibold dark:border-zinc-700 dark:bg-zinc-900">
          <svg viewBox="0 0 24 24" className="h-4 w-4 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="1.8">
            <rect x="4" y="5" width="16" height="15" rx="3" />
            <path d="M8 3v4M16 3v4M4 10h16" />
          </svg>
          <span>{formatMonthYearLabel(selectedDate)}</span>
        </div>

        <button
          type="button"
          onClick={handleNext}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-300 bg-white text-zinc-700 transition hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/70 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
          aria-label="Selecionar próximo mês"
        >
          ›
        </button>
      </div>
    </section>
  );
}

export default MonthPicker;

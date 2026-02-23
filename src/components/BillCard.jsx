import { buildDueDate, formatShortDate } from "../lib/dates";
import { formatBRL } from "../lib/money";
import { cn } from "../lib/ui";

const CATEGORY_META = {
  Casa: { icon: "🏠", className: "bg-cyan-400/12 text-cyan-500 dark:text-cyan-300" },
  Transporte: { icon: "🚌", className: "bg-teal-400/12 text-teal-600 dark:text-teal-300" },
  Assinaturas: { icon: "📺", className: "bg-violet-400/12 text-violet-600 dark:text-violet-300" },
  Cartão: { icon: "💳", className: "bg-sky-400/12 text-sky-600 dark:text-sky-300" },
  Saúde: { icon: "🩺", className: "bg-emerald-400/12 text-emerald-600 dark:text-emerald-300" },
  Outros: { icon: "📦", className: "bg-zinc-400/12 text-zinc-600 dark:text-zinc-300" },
};

const STATUS_BADGES = {
  Paga: "border-emerald-400/30 bg-emerald-400/12 text-emerald-600 dark:text-emerald-300",
  Pendente: "border-amber-400/30 bg-amber-400/12 text-amber-600 dark:text-amber-300",
  Atrasada: "border-rose-400/30 bg-rose-400/12 text-rose-600 dark:text-rose-300",
};

function IconButton({ title, onClick, children, className, ariaLabel }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      aria-label={ariaLabel}
      className={cn(
        "inline-flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-300 bg-white text-zinc-600 transition hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/70 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800",
        className,
      )}
    >
      {children}
    </button>
  );
}

function BillCard({ bill, monthKey, onEdit, onDelete, onTogglePaid }) {
  const dueDate = buildDueDate(monthKey, bill.dueDay);
  const category = CATEGORY_META[bill.category] ?? CATEGORY_META.Outros;

  return (
    <article className="group rounded-2xl border border-zinc-200 bg-white/95 p-4 dark:border-zinc-800 dark:bg-zinc-900/55">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg" aria-hidden="true">
                  {category.icon}
                </span>
                <h3 className="truncate text-base font-semibold sm:text-lg">{bill.title}</h3>
              </div>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                Vence em <strong className="text-zinc-900 dark:text-zinc-100">{formatShortDate(dueDate)}</strong>
              </p>
            </div>
            <p className="text-2xl font-semibold tracking-tight">{formatBRL(bill.value)}</p>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            <span className={cn("rounded-full px-2.5 py-1 text-xs font-medium", category.className)}>
              {bill.category}
            </span>
            <span className={cn("rounded-full border px-2.5 py-1 text-xs font-semibold", STATUS_BADGES[bill.status])}>
              {bill.status}
            </span>
            {bill.isRecurring ? (
              <span className="rounded-full bg-zinc-400/12 px-2.5 py-1 text-xs font-medium text-zinc-600 dark:text-zinc-300">
                Recorrente
              </span>
            ) : null}
          </div>

          {bill.notes ? (
            <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
              <span className="font-medium text-zinc-800 dark:text-zinc-200">Observação:</span> {bill.notes}
            </p>
          ) : null}
        </div>

        <div className="flex flex-row items-center justify-end gap-2 lg:flex-col lg:opacity-0 lg:transition-opacity lg:duration-200 lg:group-hover:opacity-100">
          <button
            type="button"
            onClick={() => onTogglePaid(bill.id)}
            className={cn(
              "h-9 rounded-lg px-3 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/70 sm:text-sm",
              bill.isPaid
                ? "bg-amber-400/14 text-amber-600 hover:bg-amber-400/20 dark:text-amber-300"
                : "bg-emerald-400/14 text-emerald-600 hover:bg-emerald-400/20 dark:text-emerald-300",
            )}
            aria-label={bill.isPaid ? "Marcar como pendente" : "Marcar como paga"}
          >
            {bill.isPaid ? "Marcar pendente" : "Marcar paga"}
          </button>

          <IconButton title="Editar conta" ariaLabel={`Editar conta ${bill.title}`} onClick={() => onEdit(bill)}>
            <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M3 14.8V17h2.2l9.2-9.2-2.2-2.2L3 14.8Z" />
              <path d="m11.9 5.6 2.2 2.2" />
            </svg>
          </IconButton>

          <IconButton
            title="Remover conta"
            ariaLabel={`Remover conta ${bill.title}`}
            onClick={() => onDelete(bill.id)}
            className="border-rose-300 text-rose-600 hover:bg-rose-50 dark:border-rose-900/70 dark:text-rose-300 dark:hover:bg-rose-900/30"
          >
            <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M4 5h12" />
              <path d="M7.2 5V3.8h5.6V5" />
              <path d="M6.2 6.8 7 16h6l.8-9.2" />
            </svg>
          </IconButton>
        </div>
      </div>
    </article>
  );
}

export default BillCard;

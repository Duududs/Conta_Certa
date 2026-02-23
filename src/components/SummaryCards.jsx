import { formatBRL } from "../lib/money";

function Card({ title, value, icon, lineClass, iconClass }) {
  return (
    <article className="rounded-2xl border border-zinc-200 bg-white/95 p-4 dark:border-zinc-800 dark:bg-zinc-900/55">
      <div className="mb-2 flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-[0.13em] text-zinc-500 dark:text-zinc-400">{title}</p>
        <span className={`inline-flex h-10 w-10 items-center justify-center rounded-xl border ${iconClass}`}>{icon}</span>
      </div>
      <p className="text-4xl font-semibold tracking-tight sm:text-[2rem]">{value}</p>
      <div className="mt-4 h-1 rounded-full bg-zinc-200/80 dark:bg-zinc-800">
        <div className={`h-full rounded-full ${lineClass}`} />
      </div>
    </article>
  );
}

function SummaryCards({ summary }) {
  return (
    <section className="grid grid-cols-1 gap-3 md:grid-cols-3">
      <Card
        title="Total previsto"
        value={formatBRL(summary.totalPlanned)}
        icon="↗"
        iconClass="border-emerald-400/30 bg-emerald-400/10 text-emerald-400"
        lineClass="w-full bg-emerald-400/55"
      />
      <Card
        title="Total pago"
        value={formatBRL(summary.totalPaid)}
        icon="✓"
        iconClass="border-emerald-400/30 bg-emerald-400/10 text-emerald-400"
        lineClass="w-full bg-zinc-400/40 dark:bg-zinc-600/70"
      />
      <Card
        title="Total pendente"
        value={formatBRL(summary.totalPending)}
        icon="◷"
        iconClass="border-amber-400/35 bg-amber-400/12 text-amber-400"
        lineClass="w-full bg-zinc-400/40 dark:bg-zinc-600/70"
      />
    </section>
  );
}

export default SummaryCards;

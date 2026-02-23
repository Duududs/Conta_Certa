import { ui } from "../lib/ui";

function EmptyState({ hasActiveFilter, onClearFilter, onCreateFirst }) {
  return (
    <div className="flex min-h-[45vh] flex-col items-center justify-center px-4 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-3xl border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900/70">
        <svg viewBox="0 0 24 24" className="h-9 w-9 text-zinc-500 dark:text-zinc-500" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M8 4h8l2 2v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" />
          <path d="M9 9h6M9 13h6M9 17h4" />
        </svg>
      </div>

      <h3 className="mt-6 text-4xl font-semibold tracking-tight sm:text-3xl">
        {hasActiveFilter ? "Nenhuma conta encontrada" : "Nenhuma conta cadastrada"}
      </h3>
      <p className="mt-3 max-w-lg text-lg text-zinc-600 dark:text-zinc-400 sm:text-xl">
        {hasActiveFilter
          ? "Ajuste os filtros para visualizar outras contas."
          : "Comece adicionando suas contas mensais para ter controle total das suas finanças."}
      </p>

      <div className="mt-8 w-full max-w-xs">
        {hasActiveFilter ? (
          <button type="button" onClick={onClearFilter} className={`${ui.buttonGhost} h-12 w-full`}>
            Limpar filtros
          </button>
        ) : (
          <button type="button" onClick={onCreateFirst} className={`${ui.buttonPrimary} h-12 w-full text-lg`}>
            ⊕ Adicionar primeira conta
          </button>
        )}
      </div>
    </div>
  );
}

export default EmptyState;

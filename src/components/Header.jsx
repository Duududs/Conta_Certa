import { ui } from "../lib/ui";

function Header({ onNewBill, theme, onToggleTheme }) {
  const isDark = theme === "dark";

  return (
    <header className="border-b border-zinc-200/70 bg-zinc-50/90 backdrop-blur dark:border-zinc-800/70 dark:bg-[#060a10]/80">
      <div className={`${ui.container} py-4`}>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-emerald-400/35 bg-emerald-400/12 text-emerald-400">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="4" y="5" width="14" height="14" rx="3" />
                <path d="M9 11h6M9 14h4" />
                <path d="M18 8h2v8h-2" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">Controle de Contas</h1>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Gerencie suas despesas mensais</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <button
              type="button"
              onClick={onToggleTheme}
              className={ui.buttonGhost}
              aria-label={isDark ? "Alternar para tema claro" : "Alternar para tema escuro"}
            >
              <span className="mr-2 inline-flex h-[18px] w-[18px] items-center justify-center" aria-hidden="true">
                {isDark ? (
                  <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2.2M12 19.8V22M4.93 4.93l1.55 1.55M17.52 17.52l1.55 1.55M2 12h2.2M19.8 12H22M4.93 19.07l1.55-1.55M17.52 6.48l1.55-1.55" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 1 0 9.8 9.8Z" />
                  </svg>
                )}
              </span>
              {isDark ? "Tema claro" : "Tema escuro"}
            </button>

            <button type="button" onClick={onNewBill} className={ui.buttonPrimary}>
              <span className="mr-2" aria-hidden="true">
                ⊕
              </span>
              Nova conta
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;

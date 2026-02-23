export function cn(...values) {
  return values.filter(Boolean).join(" ");
}

export const ui = {
  page:
    "min-h-screen bg-zinc-50 text-zinc-900 transition-colors dark:bg-[#05080d] dark:text-zinc-100",
  container: "mx-auto w-full max-w-6xl px-4 sm:px-6",
  accent: "bg-emerald-400",
  accentText: "text-emerald-400",
  card:
    "rounded-2xl border border-zinc-200/90 bg-white/95 transition-all duration-200 dark:border-zinc-800 dark:bg-zinc-900/65",
  input:
    "h-11 w-full rounded-xl border border-zinc-300 bg-white px-3 text-sm text-zinc-800 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/25 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-emerald-400",
  textarea:
    "w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-800 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/25 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-emerald-400",
  buttonPrimary:
    "inline-flex items-center justify-center rounded-xl bg-emerald-400 px-4 py-2.5 text-sm font-semibold text-zinc-900 transition-all duration-200 hover:bg-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/80 disabled:cursor-not-allowed disabled:opacity-50",
  buttonGhost:
    "inline-flex items-center justify-center rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm font-medium text-zinc-700 transition-all duration-200 hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/70 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800",
  buttonDanger:
    "inline-flex items-center justify-center rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-red-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400/70 disabled:cursor-not-allowed disabled:opacity-50",
};

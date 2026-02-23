function pad(value) {
  return String(value).padStart(2, "0");
}

export function monthKey(date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}`;
}

export function monthKeyToDate(key) {
  const [year, month] = key.split("-").map(Number);
  return new Date(year, month - 1, 1);
}

export function isCurrentMonthKey(key) {
  return key === monthKey(new Date());
}

export function getLastDayOfMonth(year, monthIndex) {
  return new Date(year, monthIndex + 1, 0).getDate();
}

export function normalizeDayToMonth(key, day) {
  const date = monthKeyToDate(key);
  const lastDay = getLastDayOfMonth(date.getFullYear(), date.getMonth());
  const safeDay = Number(day);
  if (!Number.isFinite(safeDay)) return 1;
  return Math.max(1, Math.min(lastDay, safeDay));
}

export function buildDueDate(selectedMonthKey, dueDay) {
  const date = monthKeyToDate(selectedMonthKey);
  const day = normalizeDayToMonth(selectedMonthKey, dueDay);
  return new Date(date.getFullYear(), date.getMonth(), day);
}

export function startOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function isOverdue(bill, selectedMonthKey, referenceDate = new Date()) {
  if (bill.isPaid) return false;
  const dueDate = buildDueDate(selectedMonthKey, bill.dueDay);
  const today = startOfDay(referenceDate);
  return dueDate < today;
}

export function isDueSoon(bill, selectedMonthKey, referenceDate = new Date()) {
  if (bill.isPaid) return false;

  const selectedMonthDate = monthKeyToDate(selectedMonthKey);
  const isCurrentSelectedMonth = monthKey(selectedMonthDate) === monthKey(referenceDate);
  const dueDate = buildDueDate(selectedMonthKey, bill.dueDay);

  // Regra de negócio:
  // no mês atual usamos "hoje" como referência;
  // em meses diferentes usamos o primeiro dia do mês selecionado.
  const start = isCurrentSelectedMonth ? startOfDay(referenceDate) : selectedMonthDate;
  const end = new Date(start);
  end.setDate(end.getDate() + 7);

  return dueDate >= start && dueDate <= end;
}

export function formatMonthYearLabel(date) {
  return new Intl.DateTimeFormat("pt-BR", {
    month: "long",
    year: "numeric",
  }).format(date);
}

export function formatShortDate(date) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

export function compareBillsByDueDay(a, b) {
  return Number(a.dueDay) - Number(b.dueDay);
}

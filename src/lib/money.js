const BRL_FORMATTER = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export function formatBRL(value) {
  const safeValue = Number(value);
  if (!Number.isFinite(safeValue)) return BRL_FORMATTER.format(0);
  return BRL_FORMATTER.format(safeValue);
}

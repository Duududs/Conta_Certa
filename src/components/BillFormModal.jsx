import { useEffect, useMemo, useRef, useState } from "react";
import { cn, ui } from "../lib/ui";

const CATEGORIES = ["Casa", "Transporte", "Assinaturas", "Cartão", "Saúde", "Outros"];

const INITIAL_FORM = {
  title: "",
  category: "Casa",
  value: "",
  dueDay: "",
  isPaid: false,
  isRecurring: true,
  notes: "",
};

function BillFormModal({ isOpen, onClose, onSubmit, initialData }) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const titleInputRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const source = initialData
      ? {
          title: initialData.title ?? "",
          category: initialData.category ?? "Casa",
          value: String(initialData.value ?? ""),
          dueDay: String(initialData.dueDay ?? ""),
          isPaid: Boolean(initialData.isPaid),
          isRecurring: Boolean(initialData.isRecurring),
          notes: initialData.notes ?? "",
        }
      : INITIAL_FORM;

    setForm(source);
    setErrors({});

    const timer = window.setTimeout(() => {
      titleInputRef.current?.focus();
    }, 0);

    return () => window.clearTimeout(timer);
  }, [isOpen, initialData]);

  useEffect(() => {
    if (!isOpen) return undefined;

    function handleEscape(event) {
      if (event.key === "Escape") onClose();
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  const isFormValid = useMemo(() => {
    const numericValue = Number(form.value);
    const numericDueDay = Number(form.dueDay);
    return (
      Boolean(form.title.trim()) &&
      Number.isFinite(numericValue) &&
      numericValue > 0 &&
      Number.isInteger(numericDueDay) &&
      numericDueDay >= 1 &&
      numericDueDay <= 31
    );
  }, [form]);

  if (!isOpen) return null;

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function validate(currentForm) {
    const nextErrors = {};
    if (!currentForm.title.trim()) {
      nextErrors.title = "O título é obrigatório.";
    }

    const numericValue = Number(currentForm.value);
    if (Number.isNaN(numericValue) || numericValue <= 0) {
      nextErrors.value = "O valor deve ser maior que zero.";
    }

    const numericDueDay = Number(currentForm.dueDay);
    if (!Number.isInteger(numericDueDay) || numericDueDay < 1 || numericDueDay > 31) {
      nextErrors.dueDay = "O vencimento deve estar entre 1 e 31.";
    }

    return nextErrors;
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    onSubmit({
      title: form.title.trim(),
      category: form.category,
      value: Number(form.value),
      dueDay: Number(form.dueDay),
      isPaid: form.isPaid,
      isRecurring: form.isRecurring,
      notes: form.notes.trim(),
    });
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-zinc-950/60 p-3 backdrop-blur-sm sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label={initialData ? "Editar conta" : "Adicionar nova conta"}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="max-h-[94vh] w-full max-w-2xl overflow-auto rounded-2xl border border-zinc-200 bg-white p-4 shadow-2xl dark:border-zinc-800 dark:bg-zinc-900 sm:p-6">
        <div className="mb-5 flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-400">
              Formulário
            </p>
            <h2 className="mt-1 text-xl font-semibold tracking-tight">
              {initialData ? "Editar conta" : "Nova conta"}
            </h2>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              Preencha as informações da conta para salvar neste mês.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-300 bg-white text-zinc-600 transition hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/70 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
            aria-label="Fechar modal"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="mb-1.5 block text-sm font-medium">
              Título
            </label>
            <input
              ref={titleInputRef}
              id="title"
              type="text"
              value={form.title}
              onChange={(event) => updateField("title", event.target.value)}
              className={ui.input}
              placeholder="Ex.: Aluguel"
            />
            {errors.title ? <p className="mt-1 text-xs text-red-500">{errors.title}</p> : null}
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label htmlFor="category" className="mb-1.5 block text-sm font-medium">
                Categoria
              </label>
              <select id="category" value={form.category} onChange={(event) => updateField("category", event.target.value)} className={ui.input}>
                {CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="value" className="mb-1.5 block text-sm font-medium">
                Valor (R$)
              </label>
              <input
                id="value"
                type="number"
                min="0"
                step="0.01"
                value={form.value}
                onChange={(event) => updateField("value", event.target.value)}
                className={ui.input}
                placeholder="0,00"
              />
              {errors.value ? <p className="mt-1 text-xs text-red-500">{errors.value}</p> : null}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label htmlFor="dueDay" className="mb-1.5 block text-sm font-medium">
                Dia de vencimento
              </label>
              <input
                id="dueDay"
                type="number"
                min="1"
                max="31"
                step="1"
                value={form.dueDay}
                onChange={(event) => updateField("dueDay", event.target.value)}
                className={ui.input}
                placeholder="1 a 31"
              />
              {errors.dueDay ? <p className="mt-1 text-xs text-red-500">{errors.dueDay}</p> : null}
            </div>

            <div className={cn(ui.cardSoft, "grid grid-cols-1 gap-1 p-3 sm:p-3.5")}>
              <label className="inline-flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.isPaid}
                  onChange={(event) => updateField("isPaid", event.target.checked)}
                  className="h-4 w-4 rounded border-zinc-300 text-emerald-600 focus:ring-emerald-500 dark:border-zinc-700 dark:bg-zinc-900"
                />
                Já está paga
              </label>
              <label className="inline-flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.isRecurring}
                  onChange={(event) => updateField("isRecurring", event.target.checked)}
                  className="h-4 w-4 rounded border-zinc-300 text-emerald-600 focus:ring-emerald-500 dark:border-zinc-700 dark:bg-zinc-900"
                />
                Conta recorrente
              </label>
            </div>
          </div>

          <div>
            <label htmlFor="notes" className="mb-1.5 block text-sm font-medium">
              Observação (opcional)
            </label>
            <textarea
              id="notes"
              rows={3}
              value={form.notes}
              onChange={(event) => updateField("notes", event.target.value)}
              className={ui.textarea}
              placeholder="Informações extras sobre a conta"
            />
          </div>

          <div className="flex flex-col-reverse gap-2 pt-1 sm:flex-row sm:justify-end">
            <button type="button" onClick={onClose} className={cn(ui.buttonGhost, "h-11")}>
              Cancelar
            </button>
            <button type="submit" disabled={!isFormValid} className={cn(ui.buttonPrimary, "h-11")}>
              {initialData ? "Salvar alterações" : "Salvar conta"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BillFormModal;


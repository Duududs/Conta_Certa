import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header";
import MonthPicker from "./components/MonthPicker";
import SummaryCards from "./components/SummaryCards";
import FiltersBar from "./components/FiltersBar";
import BillsList from "./components/BillsList";
import BillFormModal from "./components/BillFormModal";
import ConfirmDialog from "./components/ConfirmDialog";
import {
  monthKey,
  isCurrentMonthKey,
  isOverdue,
  isDueSoon,
  normalizeDayToMonth,
} from "./lib/dates";
import { getStorageValue, setStorageValue } from "./lib/storage";
import { ui } from "./lib/ui";

const FILTERS = [
  { id: "all", label: "Todas" },
  { id: "paid", label: "Pagas" },
  { id: "pending", label: "Pendentes" },
  { id: "overdue", label: "Atrasadas" },
  { id: "dueSoon", label: "Vencendo em 7 dias" },
];

const THEME_KEY = "theme";

function App() {
  const [selectedDate, setSelectedDate] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });
  const [bills, setBills] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingBill, setEditingBill] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [theme, setTheme] = useState(() => getStorageValue(THEME_KEY, "dark"));

  const selectedMonthKey = useMemo(() => monthKey(selectedDate), [selectedDate]);
  const storageKey = `bills:${selectedMonthKey}`;

  useEffect(() => {
    const loaded = getStorageValue(storageKey, []);
    setBills(Array.isArray(loaded) ? loaded : []);
  }, [storageKey]);

  useEffect(() => {
    setStorageValue(storageKey, bills);
  }, [bills, storageKey]);

  useEffect(() => {
    const safeTheme = theme === "light" ? "light" : "dark";
    setStorageValue(THEME_KEY, safeTheme);
    document.documentElement.classList.toggle("dark", safeTheme === "dark");
  }, [theme]);

  const enrichedBills = useMemo(() => {
    return bills.map((bill) => {
      const safeDay = normalizeDayToMonth(selectedMonthKey, Number(bill.dueDay));
      const overdue = isOverdue(bill, selectedMonthKey);
      const status = bill.isPaid ? "Paga" : overdue ? "Atrasada" : "Pendente";
      return {
        ...bill,
        dueDay: safeDay,
        status,
      };
    });
  }, [bills, selectedMonthKey]);

  const filteredBills = useMemo(() => {
    switch (activeFilter) {
      case "paid":
        return enrichedBills.filter((bill) => bill.isPaid);
      case "pending":
        return enrichedBills.filter((bill) => !bill.isPaid && bill.status === "Pendente");
      case "overdue":
        return enrichedBills.filter((bill) => !bill.isPaid && bill.status === "Atrasada");
      case "dueSoon":
        return enrichedBills.filter((bill) => isDueSoon(bill, selectedMonthKey));
      case "all":
      default:
        return enrichedBills;
    }
  }, [activeFilter, enrichedBills, selectedMonthKey]);

  const summary = useMemo(() => {
    const totalPlanned = enrichedBills.reduce((acc, bill) => acc + Number(bill.value || 0), 0);
    const totalPaid = enrichedBills
      .filter((bill) => bill.isPaid)
      .reduce((acc, bill) => acc + Number(bill.value || 0), 0);
    const totalPending = totalPlanned - totalPaid;

    return {
      totalPlanned,
      totalPaid,
      totalPending,
      totalCount: enrichedBills.length,
      paidCount: enrichedBills.filter((bill) => bill.isPaid).length,
    };
  }, [enrichedBills]);

  const filterCounts = useMemo(() => {
    return {
      all: enrichedBills.length,
      paid: enrichedBills.filter((bill) => bill.isPaid).length,
      pending: enrichedBills.filter((bill) => !bill.isPaid && bill.status === "Pendente").length,
      overdue: enrichedBills.filter((bill) => !bill.isPaid && bill.status === "Atrasada").length,
      dueSoon: enrichedBills.filter((bill) => isDueSoon(bill, selectedMonthKey)).length,
    };
  }, [enrichedBills, selectedMonthKey]);

  function handleAddBill(payload) {
    const newBill = {
      ...payload,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    setBills((current) => [newBill, ...current]);
    setIsFormOpen(false);
  }

  function handleEditBill(payload) {
    if (!editingBill) return;
    setBills((current) =>
      current.map((bill) => (bill.id === editingBill.id ? { ...bill, ...payload } : bill)),
    );
    setEditingBill(null);
    setIsFormOpen(false);
  }

  function handleSubmitBill(payload) {
    if (editingBill) {
      handleEditBill(payload);
      return;
    }
    handleAddBill(payload);
  }

  function handleTogglePaid(id) {
    setBills((current) =>
      current.map((bill) => (bill.id === id ? { ...bill, isPaid: !bill.isPaid } : bill)),
    );
  }

  function requestEdit(bill) {
    setEditingBill(bill);
    setIsFormOpen(true);
  }

  function requestCreate() {
    setEditingBill(null);
    setIsFormOpen(true);
  }

  function closeForm() {
    setIsFormOpen(false);
    setEditingBill(null);
  }

  function confirmDelete() {
    if (!confirmDeleteId) return;
    setBills((current) => current.filter((bill) => bill.id !== confirmDeleteId));
    setConfirmDeleteId(null);
  }

  return (
    <div className={ui.page}>
      <Header
        onNewBill={requestCreate}
        theme={theme}
        onToggleTheme={() => setTheme((current) => (current === "dark" ? "light" : "dark"))}
      />

      <main className={`${ui.container} py-6 sm:py-8`}>
        <div className="flex flex-col gap-6">
          <MonthPicker
            selectedDate={selectedDate}
            onChange={setSelectedDate}
            isCurrentMonth={isCurrentMonthKey(selectedMonthKey)}
          />

          <SummaryCards summary={summary} />

          <FiltersBar
            filters={FILTERS}
            activeFilter={activeFilter}
            counts={filterCounts}
            totalCount={summary.totalCount}
            onChange={setActiveFilter}
          />

          <BillsList
            bills={filteredBills}
            selectedMonthKey={selectedMonthKey}
            onEdit={requestEdit}
            onDelete={setConfirmDeleteId}
            onTogglePaid={handleTogglePaid}
            onCreateFirst={requestCreate}
            hasActiveFilter={activeFilter !== "all"}
            onClearFilter={() => setActiveFilter("all")}
          />
        </div>
      </main>

      <BillFormModal
        isOpen={isFormOpen}
        onClose={closeForm}
        onSubmit={handleSubmitBill}
        initialData={editingBill}
      />

      <ConfirmDialog
        isOpen={Boolean(confirmDeleteId)}
        title="Remover conta"
        description="Essa ação não pode ser desfeita. Deseja remover esta conta?"
        confirmText="Remover"
        onCancel={() => setConfirmDeleteId(null)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}

export default App;

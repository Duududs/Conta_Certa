import BillCard from "./BillCard";
import EmptyState from "./EmptyState";
import { compareBillsByDueDay } from "../lib/dates";

function BillsList({
  bills,
  selectedMonthKey,
  onEdit,
  onDelete,
  onTogglePaid,
  onCreateFirst,
  hasActiveFilter,
  onClearFilter,
}) {
  if (bills.length === 0) {
    return (
      <EmptyState
        hasActiveFilter={hasActiveFilter}
        onClearFilter={onClearFilter}
        onCreateFirst={onCreateFirst}
      />
    );
  }

  const sortedBills = [...bills].sort(compareBillsByDueDay);

  return (
    <section className="space-y-3 border-t border-zinc-200 pt-4 dark:border-zinc-800" aria-label="Lista de contas">
      {sortedBills.map((bill) => (
        <BillCard
          key={bill.id}
          bill={bill}
          monthKey={selectedMonthKey}
          onEdit={onEdit}
          onDelete={onDelete}
          onTogglePaid={onTogglePaid}
        />
      ))}
    </section>
  );
}

export default BillsList;

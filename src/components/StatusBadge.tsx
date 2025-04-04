type StatusBadgeProps = {
  status: string;
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const statusMap: Record<string, { label: string; color: string }> =
    {
      todo: { label: "To Do", color: "bg-gray-200 text-gray-800" },
      pending: {
        label: "Pending",
        color: "bg-yellow-200 text-yellow-800",
      },
      in_progress: {
        label: "In Progress",
        color: "bg-blue-200 text-blue-800",
      },
      completed: {
        label: "Completed",
        color: "bg-green-200 text-green-800",
      },
    };

  const { label, color } = statusMap[status] || {
    label: status,
    color: "bg-slate-200 text-slate-800",
  };

  return (
    <span
      className={`px-2 py-1 text-xs font-semibold rounded-full ${color}`}
    >
      {label}
    </span>
  );
}

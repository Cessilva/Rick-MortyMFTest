interface Props {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ page, totalPages, onPageChange }: Props) {
  if (totalPages <= 1) return null;

  const btnClass =
    "portal-cursor-pointer rounded-md px-3 py-2 text-sm text-white ring-1 ring-white/15 transition hover:text-portal-green hover:ring-portal-green/60 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:text-white disabled:hover:ring-white/15";

  return (
    <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
      <button
        type="button"
        className={btnClass}
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
      >
        ← Anterior
      </button>

      <span className="text-sm text-white/70">
        Página {page} de {totalPages}
      </span>

      <button
        type="button"
        className={btnClass}
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
      >
        Siguiente →
      </button>
    </div>
  );
}

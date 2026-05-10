interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  hasNext: boolean;
  onPrev: () => void;
  onNext: () => void;
  showPageInfo?: boolean;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  hasNext,
  onPrev,
  onNext,
  showPageInfo = true,
}) => {
  return (
    <div className="flex items-center gap-4">
      {showPageInfo && (
        <p className="text-sm text-gray-400">
          Page {currentPage} of {totalPages}
        </p>
      )}
      
      <div className="flex gap-2">
        <button
          onClick={onPrev}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-800 rounded disabled:opacity-50 hover:bg-gray-700 transition"
        >
          Prev
        </button>

        <button
          onClick={onNext}
          disabled={!hasNext}
          className="px-4 py-2 bg-gray-800 rounded disabled:opacity-50 hover:bg-gray-700 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginationControls;
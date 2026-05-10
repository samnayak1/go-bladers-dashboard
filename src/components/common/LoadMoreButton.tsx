interface LoadMoreButtonProps {
  hasMore: boolean;
  onLoadMore: () => void;
  loading?: boolean;
}

const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({
  hasMore,
  onLoadMore,
  loading = false,
}) => {
  if (!hasMore) return null;

  return (
    <button
      onClick={onLoadMore}
      disabled={loading}
      className="px-4 py-2 bg-gray-800 rounded hover:bg-gray-700 transition disabled:opacity-50"
    >
      {loading ? "Loading..." : "Load More"}
    </button>
  );
};

export default LoadMoreButton;
import StreamCard from "./StreamCard";
import { Empty } from "antd";
import type { StreamResponseDto } from "../../types/stream.type";

interface StreamsGridProps {
  streams: StreamResponseDto[];
  loading?: boolean;
}

const StreamsGrid: React.FC<StreamsGridProps> = ({
  streams,
  loading = false,
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-zinc-900 rounded-xl p-4 animate-pulse">
            <div className="w-full h-48 bg-zinc-800 rounded-lg mb-3" />
            <div className="h-6 bg-zinc-800 rounded w-3/4 mb-2" />
            <div className="h-4 bg-zinc-800 rounded w-1/4" />
          </div>
        ))}
      </div>
    );
  }

  if (streams.length === 0) {
    return (
      <Empty
        description="No streams yet"
        className="text-gray-400 py-12"
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {streams.map((stream) => (
        <StreamCard key={stream.id} {...stream} />
      ))}
    </div>
  );
};

export default StreamsGrid;
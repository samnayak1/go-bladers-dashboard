import StreamCard from "./StreamCard";
import PaginationControls from "../common/PaginationControls";

interface StreamsSectionProps {
  streams: any[];
  currentPage: number;
  totalPages: number;
  hasNext: boolean;
  onPrev: () => void;
  onNext: () => void;
  title?: string;
}

const StreamsSection: React.FC<StreamsSectionProps> = ({
  streams,
  currentPage,
  totalPages,
  hasNext,
  onPrev,
  onNext,
  title = "Latest Streams",
}) => {
  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
        <h2 className="text-2xl font-semibold">{title}</h2>
        
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          hasNext={hasNext}
          onPrev={onPrev}
          onNext={onNext}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {streams.map((stream) => (
          <StreamCard key={stream.id} {...stream} />
        ))}
      </div>
    </section>
  );
};

export default StreamsSection;
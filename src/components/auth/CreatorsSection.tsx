import CreatorCard from "./CreatorCard";
import LoadMoreButton from "../common/LoadMoreButton";

interface CreatorsSectionProps {
  creators: any[];
  hasMore: boolean;
  onLoadMore: () => void;
  loading?: boolean;
  title?: string;
}

const CreatorsSection: React.FC<CreatorsSectionProps> = ({
  creators,
  hasMore,
  onLoadMore,
  loading = false,
  title = "Latest Creators",
}) => {
  return (
    <section>
      <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
        <h2 className="text-2xl font-semibold">{title}</h2>
        
        <LoadMoreButton
          hasMore={hasMore}
          onLoadMore={onLoadMore}
          loading={loading}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {creators.map((creator) => (
          <CreatorCard key={creator.id} {...creator} />
        ))}
      </div>
    </section>
  );
};

export default CreatorsSection;
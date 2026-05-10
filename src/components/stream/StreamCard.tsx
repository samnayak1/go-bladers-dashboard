import { useNavigate } from "react-router-dom";

interface StreamCardProps {
  id: string;
  name: string;
  username: string;
  thumbnailUrl?: string|null;
  isLive: boolean;
}

const StreamCard: React.FC<StreamCardProps> = ({
  id,
  name,
  username,
  thumbnailUrl,
  isLive,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (isLive) {
      navigate(`/watch/${username}`);
    } else {
      navigate(`/watch/${username}/${id}`);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`
        rounded-xl p-4 border cursor-pointer transition
        ${isLive
          ? "bg-red-950 border-red-500 hover:border-red-400"
          : "bg-zinc-900 border-zinc-800 hover:border-zinc-600"
        }
      `}
    >
      <img
        src={thumbnailUrl || "https://placehold.co/600x400"}
        alt={name}
        className="w-full h-48 object-cover rounded-lg mb-3"
      />

      <h3 className="text-lg font-semibold line-clamp-2">
        {name}
      </h3>

      <p className="text-sm text-gray-400 mt-1">
        @{username}
      </p>

      <div className="mt-3">
        {isLive ? (
          <span className="bg-red-500 text-xs px-2 py-1 rounded inline-block">
            LIVE
          </span>
        ) : (
          <span className="bg-zinc-700 text-xs px-2 py-1 rounded inline-block">
            Replay
          </span>
        )}
      </div>
    </div>
  );
};

export default StreamCard;
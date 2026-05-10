import { useNavigate } from "react-router-dom";

interface CreatorCardProps {
  id: string;
  username: string;
  email: string;
  isVerified: boolean;
  isLive: boolean;
}

const CreatorCard: React.FC<CreatorCardProps> = ({
  username,
  email,
  isVerified,
  isLive,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (isLive) {
      navigate(`/watch/${username}`);
    } else {
      navigate(`/creator/${username}`);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`
        bg-zinc-900 rounded-xl p-4 border border-zinc-800
        transition cursor-pointer hover:border-zinc-600
      `}
    >
      <div className="w-16 h-16 rounded-full bg-linear-to-br from-purple-500 to-pink-500 mb-4" />

      <h3 className="font-semibold text-lg">
        {username}
      </h3>

      <p className="text-sm text-gray-400">
        {email}
      </p>

      <div className="flex gap-2 mt-3 flex-wrap">
        {isVerified && (
          <span className="bg-blue-500 text-xs px-2 py-1 rounded">
            Verified
          </span>
        )}

        {isLive && (
          <span className="bg-red-500 text-xs px-2 py-1 rounded animate-pulse">
            LIVE
          </span>
        )}
      </div>

      {!isLive && (
        <p className="text-xs text-zinc-500 mt-3">
          Offline
        </p>
      )}
    </div>
  );
};

export default CreatorCard;
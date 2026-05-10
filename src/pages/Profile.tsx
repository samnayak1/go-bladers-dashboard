import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuthStore } from "../hooks/useAuth";
import { useStreamStore } from "../hooks/useStream";
import type {  StreamResponseDto } from "../api/stream.api";



const Profile = () => {
  const { username } = useParams();

  const navigate = useNavigate();

  const {
    getUserDetails,
  } = useAuthStore();

  const {
    userStreams,
    fetchUserStreams,
    loading,
    error,
  } = useStreamStore();

  useEffect(() => {
    if (!username) return;

    const loadData = async () => {
      try {
        await Promise.all([
          getUserDetails(username),
          fetchUserStreams(username),
        ]);
      } catch (err) {
        console.error(err);
      }
    };

    loadData();
  }, [username]);

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 bg-zinc-800 rounded"
      >
        Back
      </button>

      <h1 className="text-4xl font-bold mb-8">
        {username}
      </h1>

      {loading && (
        <p className="text-zinc-400">
          Loading...
        </p>
      )}

      {error && (
        <p className="text-red-500">
          {error}
        </p>
      )}

      <h2 className="text-2xl font-semibold mb-4">
        Streams
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {userStreams.map((stream: StreamResponseDto) => (
          <div
            key={stream.id}
            onClick={() => {
              if (stream.isLive) {
                navigate(`/watch/${stream.username}`);
              } else {
                navigate(
                  `/watch/${stream.username}/${stream.id}`
                );
              }
            }}
            className="bg-zinc-900 rounded-xl p-4 border border-zinc-800 cursor-pointer hover:border-zinc-600 transition"
          >
            <img
              src={
                stream.thumbnailUrl ||
                "https://placehold.co/600x400"
              }
              alt={stream.name}
              className="w-full h-48 object-cover rounded-lg mb-3"
            />

            <h3 className="text-lg font-semibold">
              {stream.name}
            </h3>

            <div className="mt-3">
              {stream.isLive ? (
                <span className="bg-red-500 text-xs px-2 py-1 rounded">
                  LIVE
                </span>
              ) : (
                <span className="bg-zinc-700 text-xs px-2 py-1 rounded">
                  Replay
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
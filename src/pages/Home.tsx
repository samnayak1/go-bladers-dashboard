import { useEffect } from "react";
import { useStreamStore } from "../hooks/useStream";
import { useNavigate } from "react-router-dom";

import { Button } from "antd";
import {
    DashboardOutlined,

} from "@ant-design/icons";



const Home = () => {
    const {
        latestStreams,
        creators,

        latestStreamsPage,
        latestStreamsTotalPages,
        latestStreamsHasNext,

        creatorsPage,
        creatorsHasNext,

        loading,
        error,

    

        fetchLatestStreams,
        fetchLatestCreators,
    } = useStreamStore();


    const navigate = useNavigate();

    useEffect(() => {
        fetchLatestStreams(1, 10);
        fetchLatestCreators(1, 10);
    }, []);

    const handleNextStreams = async () => {
        if (!latestStreamsHasNext) return;

        await fetchLatestStreams(latestStreamsPage + 1, 10);
    };

    const handlePrevStreams = async () => {
        if (latestStreamsPage === 1) return;

        await fetchLatestStreams(latestStreamsPage - 1, 10);
    };

    const handleNextCreators = async () => {
        if (!creatorsHasNext) return;

        await fetchLatestCreators(creatorsPage + 1, 10);
    };

    return (
        <div className="min-h-screen bg-black text-white p-6">
            <h1 className="text-4xl font-bold mb-8">
                GoBladers
            </h1>


            {error && (
                <div className="bg-red-500 text-white p-3 rounded mb-6">
                    {error}
                </div>
            )}


            {loading && (
                <div className="mb-6 text-gray-300">
                    Loading...
                </div>
            )}
            <div className="flex gap-3 mb-8">
                <Button
                    type="primary"
                    icon={<DashboardOutlined />}
                    onClick={() => navigate("/dashboard")}
                >
                    Dashboard
                </Button>


            </div>

            {/* LATEST STREAMS */}
            <section className="mb-12">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-semibold">
                        Latest Streams
                    </h2>

                    <div className="flex gap-2">
                        <button
                            onClick={handlePrevStreams}
                            disabled={latestStreamsPage === 1}
                            className="px-4 py-2 bg-gray-800 rounded disabled:opacity-50"
                        >
                            Prev
                        </button>

                        <button
                            onClick={handleNextStreams}
                            disabled={!latestStreamsHasNext}
                            className="px-4 py-2 bg-gray-800 rounded disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </div>

                <p className="text-sm text-gray-400 mb-4">
                    Page {latestStreamsPage} of{" "}
                    {latestStreamsTotalPages}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {latestStreams.map((stream: any) => (
                        <div
                            key={stream.id}
                            onClick={() => {
                                // LIVE STREAM
                                if (stream.isLive) {
                                    navigate(`/watch/${stream.username}`);
                                }

                                // REPLAY STREAM
                                else {
                                    navigate(`/watch/${stream.username}/${stream.id}`);
                                }
                            }}
                            className={`
  rounded-xl p-4 border cursor-pointer transition
  ${stream.isLive
                                    ? "bg-red-950 border-red-500 hover:border-red-400"
                                    : "bg-zinc-900 border-zinc-800 hover:border-zinc-600"
                                }`}
                        >
                            <img
                                src={stream.thumbnailUrl}
                                alt={stream.title}
                                className="w-full h-48 object-cover rounded-lg mb-3"
                            />

                            <h3 className="text-lg font-semibold">
                                {stream.title}
                            </h3>

                            <p className="text-sm text-gray-400 mt-1">
                                @{stream.username}
                            </p>

                            {stream.isLive && (
                                <span className="inline-block mt-3 bg-red-500 text-xs px-2 py-1 rounded">
                                    LIVE
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            </section>


            <section>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-semibold">
                        Latest Creators
                    </h2>

                    <button
                        onClick={handleNextCreators}
                        disabled={!creatorsHasNext}
                        className="px-4 py-2 bg-gray-800 rounded disabled:opacity-50"
                    >
                        Load More
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {creators.map((creator) => (
                        <div
                            key={creator.id}
                            onClick={() => {
                                if (creator.isLive) {
                                    navigate(`/watch/${creator.username}`);
                                } else {
                                    navigate(`/creator/${creator.username}`);
                                }
                            }}
                            className={`
        bg-zinc-900 rounded-xl p-4 border border-zinc-800
        transition
        cursor-pointer hover:border-zinc-600
                                
      `}
                        >
                            <div className="w-16 h-16 rounded-full bg-zinc-700 mb-4" />

                            <h3 className="font-semibold">
                                {creator.username}
                            </h3>

                            <p className="text-sm text-gray-400">
                                {creator.email}
                            </p>

                            <div className="flex gap-2 mt-3">
                                {creator.isVerified && (
                                    <span className="bg-blue-500 text-xs px-2 py-1 rounded">
                                        Verified
                                    </span>
                                )}

                                {creator.isLive && (
                                    <span className="bg-red-500 text-xs px-2 py-1 rounded">
                                        LIVE
                                    </span>
                                )}
                            </div>

                            {!creator.isLive && (
                                <p className="text-xs text-zinc-500 mt-3">
                                    Offline
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;
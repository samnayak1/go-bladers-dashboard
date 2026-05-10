import { useEffect } from "react";
import { useStreamStore } from "../hooks/useStream";
import Container from "../components/common/Container";
import PageTitle from "../components/common/PageTitle";
import ErrorMessage from "../components/common/ErrorMessage";
import LoadingIndicator from "../components/common/LoadingIndicator";
import NavigationButtons from "../components/common/NavigationButtons";
import StreamsSection from "../components/stream/StreamsSection";
import CreatorsSection from "../components/auth/CreatorsSection";

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

  useEffect(() => {
    fetchLatestStreams(1, 10);
    fetchLatestCreators(1, 10);
  }, [fetchLatestStreams, fetchLatestCreators]);

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

  const handleRetry = () => {
    fetchLatestStreams(1, 10);
    fetchLatestCreators(1, 10);
  };

  if (error) {
    return (
      <Container>
        <PageTitle title="GoBladers" />
        <ErrorMessage message={error} onRetry={handleRetry} />
      </Container>
    );
  }

  return (
    <Container>
      <PageTitle 
        title="GoBladers" 
        subtitle="Discover live streams and content creators"
      />
      
      <NavigationButtons showDashboard={true} />

      {loading && !latestStreams.length && !creators.length ? (
        <LoadingIndicator text="Loading content..." />
      ) : (
        <>
          <StreamsSection
            streams={latestStreams}
            currentPage={latestStreamsPage}
            totalPages={latestStreamsTotalPages}
            hasNext={latestStreamsHasNext}
            onPrev={handlePrevStreams}
            onNext={handleNextStreams}
          />

          <CreatorsSection
            creators={creators}
            hasMore={creatorsHasNext}
            onLoadMore={handleNextCreators}
            loading={loading}
          />
        </>
      )}
    </Container>
  );
};

export default Home;
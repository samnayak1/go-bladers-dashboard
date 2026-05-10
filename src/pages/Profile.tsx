import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuthStore } from "../hooks/useAuth";
import { useStreamStore } from "../hooks/useStream";
import Container from "../components/common/Container";
import BackButton from "../components/common/BackButton";

import LoadingSpinner from "../components/common/LoadingSpinner";
import ErrorMessage from "../components/common/ErrorMessage";
import StreamsGrid from "../components/stream/StreamsGrid";
import type { StreamResponseDto } from "../types/stream.type";
import ProfileHeader from "../components/auth/ProfileHeader";
import SectionTitle from "../components/common/SectionTile";

const Profile = () => {
  const { username } = useParams();


  const { getUserDetails, user } = useAuthStore();
  const { userStreams, fetchUserStreams, loading, error } = useStreamStore();

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
  }, [username, getUserDetails, fetchUserStreams]);

  if (!username) {
    return (
      <Container>
        <ErrorMessage message="No username provided" />
      </Container>
    );
  }

  return (
    <Container>
      <BackButton className="mb-6" />

      <ProfileHeader
        username={username}
        email={user?.email}
      />

      <SectionTitle title="Streams" />

      {loading && <LoadingSpinner text="Loading streams..." />}

      {error && <ErrorMessage message={error} />}

      {!loading && !error && (
        <StreamsGrid streams={userStreams as StreamResponseDto[]} />
      )}
    </Container>
  );
};

export default Profile;
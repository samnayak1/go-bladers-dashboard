interface StreamUrlParams {
  username: string;
  streamId?: string;
  baseUrl?: string;
}

class StreamUrlBuilder {
  private static getBaseUrl(): string {
    return import.meta.env.VITE_SERVER_BASE_URL || "";
  }

  static buildLiveStreamUrl(username: string): string {
    const baseUrl = this.getBaseUrl();
    return `${baseUrl}/stream/${username}/index.m3u8`;
  }

  static buildReplayStreamUrl(username: string, streamId: string): string {
    const baseUrl = this.getBaseUrl();
    return `${baseUrl}/stream/replay/${username}/${streamId}/index.m3u8`;
  }

  static getStreamUrl({ username, streamId }: StreamUrlParams): string | null {
    if (!username) return null;

    if (streamId) {
      return this.buildReplayStreamUrl(username, streamId);
    }
    return this.buildLiveStreamUrl(username);
  }
}

export default StreamUrlBuilder;
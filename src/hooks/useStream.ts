import { create } from "zustand";

import {
  getLatestStreamsService,
  getStreamsOfUserService,
  regenerateStreamKeyService,
  type StreamResponseDto,
} from "../api/stream.api";

import {
  getLatestCreatorsService,
  type IUser,
  type LatestCreatorsResponse,
} from "../api/user.api";

interface StreamStoreState {

  latestStreams: StreamResponseDto[];
  userStreams: StreamResponseDto[];

  latestStreamsPage: number;
  latestStreamsTotalPages: number;
  latestStreamsHasNext: boolean;


  creators: IUser[];

  creatorsTotal: number;
  creatorsPage: number;
  creatorsLimit: number;
  creatorsTotalPages: number;
  creatorsHasNext: boolean;
  creatorsHasPrev: boolean;


  streamKey: string | null;

  loading: boolean;
  error: string | null;



  fetchLatestStreams: (
    page?: number,
    limit?: number
  ) => Promise<void>;

  fetchUserStreams: (username: string) => Promise<void>;

  regenerateStreamKey: () => Promise<void>;

  fetchLatestCreators: (
    page?: number,
    limit?: number
  ) => Promise<void>;

  clearError: () => void;

  clearStreams: () => void;

  clearCreators: () => void;
}

export const useStreamStore = create<StreamStoreState>((set) => ({
  
  latestStreams: [],
  userStreams: [],

  latestStreamsPage: 1,
  latestStreamsTotalPages: 1,
  latestStreamsHasNext: false,


  creators: [],

  creatorsTotal: 0,
  creatorsPage: 1,
  creatorsLimit: 10,
  creatorsTotalPages: 0,
  creatorsHasNext: false,
  creatorsHasPrev: false,


  streamKey: null,

  loading: false,
  error: null,

 
  fetchLatestStreams: async (page = 1, limit = 10) => {
    try {
      set({
        loading: true,
        error: null,
      });

      const data = await getLatestStreamsService(page, limit);

      set({
        latestStreams: data.streams,
        latestStreamsPage: page,
        latestStreamsTotalPages: data.totalPages,
        latestStreamsHasNext: data.hasNext,
      });
    } catch (err: any) {
      set({
        error:
          err?.response?.data?.message ||
          err?.message ||
          "Failed to fetch latest streams",
      });

      throw err;
    } finally {
      set({
        loading: false,
      });
    }
  },


  fetchUserStreams: async (username: string) => {
    try {
      if (!username) return;

      set({
        loading: true,
        error: null,
      });

      const data = await getStreamsOfUserService(username);

      set({
        userStreams: data.data,
      });
    } catch (err: any) {
      set({
        error:
          err?.response?.data?.message ||
          err?.message ||
          "Failed to fetch user streams",
      });

      throw err;
    } finally {
      set({
        loading: false,
      });
    }
  },


  regenerateStreamKey: async () => {
    try {
      set({
        loading: true,
        error: null,
      });

      const data = await regenerateStreamKeyService();

      set({
        streamKey: data.streamKey,
      });
    } catch (err: any) {
      set({
        error:
          err?.response?.data?.message ||
          err?.message ||
          "Failed to regenerate stream key",
      });

      throw err;
    } finally {
      set({
        loading: false,
      });
    }
  },

  fetchLatestCreators: async (page = 1, limit = 10) => {
    try {
      set({
        loading: true,
        error: null,
      });

      const response: LatestCreatorsResponse =
        await getLatestCreatorsService(
          page.toString(),
          limit.toString()
        );

      set({
        creators: response.creators,
        creatorsTotal: response.total,
        creatorsPage: response.page,
        creatorsLimit: response.limit,
        creatorsTotalPages: response.totalPages,
        creatorsHasNext: response.hasNext,
        creatorsHasPrev: response.hasPrev,
      });
    } catch (error: any) {
      set({
        error:
          error?.response?.data?.message ||
          error?.message ||
          "Failed to fetch creators",
      });

      throw error;
    } finally {
      set({
        loading: false,
      });
    }
  },


  clearStreams: () => {
    set({
      latestStreams: [],
      userStreams: [],
      latestStreamsPage: 1,
      latestStreamsTotalPages: 1,
      latestStreamsHasNext: false,
      streamKey: null,
    });
  },


  clearCreators: () => {
    set({
      creators: [],
      creatorsTotal: 0,
      creatorsPage: 1,
      creatorsLimit: 10,
      creatorsTotalPages: 0,
      creatorsHasNext: false,
      creatorsHasPrev: false,
    });
  },

  clearError: () => {
    set({
      error: null,
    });
  },
}));
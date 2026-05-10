import type { StreamResponseDto } from "../types/stream.type";
import axiosClient from "../utils/axios";

// stream type

export interface UserStreamsResponse{
  data: StreamResponseDto[] 
}

export interface LatestStreamsResponse{
    streams: StreamResponseDto[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;

}

export interface GeneratedStreamKeyResponse{
    streamKey: string
}


//get streams of user
export const getStreamsOfUserService=async (username:string)=>{
  const response = await axiosClient.get<UserStreamsResponse>(`/stream/${username}`);

  return response.data;
}

//latest streams
export const getLatestStreamsService=async(page:number,limit:number)=>{
   
    const response= await axiosClient.get<LatestStreamsResponse>(`/stream/latest`,{
        params: { page, limit }
    })
  return response.data;
}

//regenerate stream key
export const regenerateStreamKeyService=async()=>{
      const response= await axiosClient.post<GeneratedStreamKeyResponse>('/stream/stream-key/regenerate');
      return response.data;

}

// get live stream url for username
export const getLiveStreamUrl = (username: string): string => {
  return `${import.meta.env.VITE_SERVER_BASE_URL}/stream/${username}/index.m3u8`;
}

// get replayed stream url for streamId
export const getReplayStreamUrl = (username: string, streamId: string): string => {
  return `${import.meta.env.VITE_SERVER_BASE_URL}/stream/replay/${username}/${streamId}/index.m3u8`;
}



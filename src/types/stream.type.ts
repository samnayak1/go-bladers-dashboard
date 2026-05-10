export interface IStream{
    name: string;
    streamKey?: string;
    createdAt: Date;
    endedAt?: Date;
    userId: string;
    isLive: boolean;
    recordingKey?: string;  
    duration?: number;
    thumbnailKey?: string;
}

export interface StreamResponseDto {
  id: string;
  name: string;

  username: string;
  userId: string;

  isLive: boolean;

  thumbnailUrl?: string | null;
  recordingKey?: string | null;

  createdAt: Date;
  endedAt?: Date;
}
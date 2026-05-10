
import axiosClient from "../utils/axios";


export interface LatestCreatorsResponse{
   creators: IUser[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev:boolean;
}

 export interface IUser{
  username: string;
  email: string;
  streamKey?: string;  //not provided when searching for other users
  createdAt: Date;
  isLive?: boolean;
  isVerified?: boolean;
  id:string;
}

export interface UserResponseDto {
  id: string;
  username: string;
  email: string;

  streamKey?: string;

  isLive?: boolean;
  isVerified?: boolean;

  createdAt: Date;
}


export const getLatestCreatorsService=async (page:string,limit:string)=>{
  const response = await axiosClient.get<LatestCreatorsResponse>('/user/creators', {
    params: { page, limit },
  });

  return response.data;

}
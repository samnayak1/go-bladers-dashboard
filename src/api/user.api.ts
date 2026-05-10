
import type { UserResponseDto } from "../types/user.type";
import axiosClient from "../utils/axios";
export interface LatestCreatorsResponse{
   creators: UserResponseDto[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev:boolean;
}
export const getLatestCreatorsService=async (page:string,limit:string)=>{
  const response = await axiosClient.get<LatestCreatorsResponse>('/user/creators', {
    params: { page, limit },
  });

  return response.data;

}
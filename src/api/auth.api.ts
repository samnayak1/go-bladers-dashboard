


import axiosClient from "../utils/axios";


export interface LoginRequest{
    email:string;
    password:string;
}

export interface LoginResponse{
   accessToken:string;
   idToken:string;
   refreshToken:string;
   expiresIn:number
}

export interface RefreshTokenRequest{
    token:string;
    userId:string;
}
export interface RefreshTokenResponse{
     accessToken:string;
   idToken:string;
   refreshToken:string;
   expiresIn:number
}

export interface SessionUserResponse{
       username:string;
       email: string;
       streamKey: string;
       id:string;
}


export const getSessionUserService=async ():Promise<SessionUserResponse>=>{

  const response = await axiosClient.get<SessionUserResponse>('/auth/me');
  return response.data;
};


//TODO: add types
export const getUserDetailsService=async(username:string)=>{
    const response= await axiosClient.get('/auth'+`/${username}`);
    return response.data;
}



export const loginUserService=async ({email,password}:LoginRequest):Promise<LoginResponse>=>{
    
     const response = await axiosClient.post<LoginResponse>('/auth/login', {email,password});
      return response.data;
     
}

export const refreshTokenService=async ({token,userId}:RefreshTokenRequest):Promise<RefreshTokenResponse>=>{
    const response= await axiosClient.post<RefreshTokenResponse>('/auth/refresh',{token,userId});
    return response.data;
}





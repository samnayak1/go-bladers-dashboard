


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
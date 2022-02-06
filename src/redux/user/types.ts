export interface UserState {
  data: UserData | null;
  userGetted: boolean;
  isLoading: boolean;
}

export interface UserData {
  id: number;
  vkId: number;
  fullName: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

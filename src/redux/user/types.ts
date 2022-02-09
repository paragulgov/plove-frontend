export type UserModals = 'createBet' | 'calculateBets' | 'createMatch';

export interface UserModalsPayload {
  modal: keyof Record<UserModals, boolean>;
  value: boolean;
}

export interface UserState {
  data: UserData | null;
  userGetted: boolean;
  isLoading: boolean;
  modalOpen: Record<UserModals, boolean>;
}

export interface UserData {
  id: number;
  vkId: number;
  fullName: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

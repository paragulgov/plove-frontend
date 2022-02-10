import { UserRole } from '../../types/types';

export interface AuthState {
  isAuth: boolean;
  completeCheckAuth: boolean;
  isLoading: boolean;
}

export interface LoginVKPayload {
  code: string;
}

export interface LoginVKResponse {
  id: number;
  vkId: 503941146;
  fullName: string;
  role: UserRole;
  token: string;
}

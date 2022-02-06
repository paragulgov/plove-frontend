import { Role } from '../../types/types';

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
  role: Role;
  token: string;
}

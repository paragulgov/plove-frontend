import { AlertColor } from '@mui/material/Alert/Alert';

import { UserRole } from '../../types/types';

export type UserModals = 'createBet' | 'calculateBets' | 'createMatch' | 'updateMatch' | 'createTournament';

export interface UserModalsPayload {
  modal: keyof Record<UserModals, boolean>;
  value: boolean;
}

export interface UserState {
  data: UserData | null;
  userGetted: boolean;
  isLoading: boolean;
  modalOpen: Record<UserModals, boolean>;
  snackbar: SnackbarPayload;
}

export interface UserData {
  id: number;
  vkId: number;
  fullName: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export interface SnackbarPayload {
  open: boolean;
  message?: string;
  severity?: AlertColor;
}

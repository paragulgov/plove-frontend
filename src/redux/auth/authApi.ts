import { instance } from '../../base/api';
import { LoginVKPayload } from './types';

export const AuthApi = {
  authMe() {
    return instance.get('auth/me');
  },
  loginVK(payload: LoginVKPayload) {
    return instance.post('auth/login/vk', payload);
  },
};

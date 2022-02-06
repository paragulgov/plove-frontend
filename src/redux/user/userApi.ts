import { instance } from '../../base/api';

export const UserApi = {
  fetchUser() {
    return instance.get('users/profile');
  },
};

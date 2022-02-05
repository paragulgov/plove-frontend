import { RoleKeys } from './types/RouteTypes';

export const roles = {
  user: {
    role: 'user',
    label: 'Пользователь',
  },
  moderator: {
    role: 'moderator',
    label: 'Модератор',
  },
  admin: {
    role: 'admin',
    label: 'Администратор',
  },
};

export const EVERYBODY = Object.keys(roles).map(key => roles[key as RoleKeys]);
export default roles;

import { RoutesType } from '../base/routes/types/RouteTypes';
import LoginScreen from './login/LoginScreen';
import MainScreen from './main/MainScreen';
import NotFoundScreen from './not-found/NotFoundScreen';

const screens = { MainScreen, NotFoundScreen, LoginScreen };

type RoutesKeys = keyof typeof screens;
export const routes: RoutesType<RoutesKeys> = {
  MainScreen: {
    path: '/',
    exact: true,
    title: 'Главная',
    component: screens.MainScreen,
    // credentials: [roles.admin],
  },
  NotFoundScreen: {
    path: '/not-found',
    title: '404 Страница не найдена',
    component: screens.NotFoundScreen,
  },
  LoginScreen: {
    path: '/login/vk',
    title: 'Авторизация',
    component: screens.LoginScreen,
  },
};

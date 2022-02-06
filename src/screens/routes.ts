import { RoutesType } from '../base/routes/types/RouteTypes';
import LoginScreen from './login/LoginScreen';
import MainScreen from './main/MainScreen';
import NotFoundScreen from './not-found/NotFoundScreen';
import TournamentScreen from './tournament/TournamentScreen';

const screens = { MainScreen, NotFoundScreen, LoginScreen, TournamentScreen };

type RoutesKeys = keyof typeof screens;
export const routes: RoutesType<RoutesKeys> = {
  MainScreen: {
    path: '/',
    exact: true,
    title: 'Главная',
    component: screens.MainScreen,
    // credentials: [roles.admin],
  },
  TournamentScreen: {
    path: '/tournament/:id',
    title: 'Матчи турнира',
    component: screens.TournamentScreen,
  },
  LoginScreen: {
    path: '/login/vk',
    title: 'Авторизация',
    component: screens.LoginScreen,
  },
  NotFoundScreen: {
    path: '/not-found',
    title: '404 - Страница не найдена',
    component: screens.NotFoundScreen,
  },
};

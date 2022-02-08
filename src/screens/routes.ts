import { RoutesType } from '../base/routes/types/RouteTypes';
import LoginScreen from './login/LoginScreen';
import MainScreen from './main/MainScreen';
import MatchScreen from './match/MatchScreen';
import NotFoundScreen from './not-found/NotFoundScreen';
import TournamentScreen from './tournament/TournamentScreen';

const screens = { MainScreen, NotFoundScreen, LoginScreen, TournamentScreen, MatchScreen };

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
    path: '/tournament/:tournamentId',
    exact: true,
    title: 'Турнир',
    component: screens.TournamentScreen,
  },
  MatchScreen: {
    path: '/tournament/:tournamentId/match/:matchId',
    exact: true,
    title: 'Ставки на матч',
    component: screens.MatchScreen,
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

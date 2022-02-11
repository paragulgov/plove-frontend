import { RoutesType } from '../base/routes/types/RouteTypes';
import BetsScreen from './bets/BetsScreen';
import LoginScreen from './login/LoginScreen';
import MatchesScreen from './matches/MatchesScreen';
import NotFoundScreen from './not-found/NotFoundScreen';
import TournamentsScreen from './tournaments/TournamentsScreen';

const screens = { TournamentsScreen, NotFoundScreen, LoginScreen, MatchesScreen, BetsScreen };

type RoutesKeys = keyof typeof screens;
export const routes: RoutesType<RoutesKeys> = {
  TournamentsScreen: {
    path: '/',
    exact: true,
    title: 'Главная',
    component: screens.TournamentsScreen,
    // credentials: [roles.admin],
  },
  MatchesScreen: {
    path: '/tournaments/:tournamentId',
    exact: true,
    title: 'Турнир',
    component: screens.MatchesScreen,
  },
  BetsScreen: {
    path: '/tournaments/:tournamentId/matches/:matchId',
    exact: true,
    title: 'Ставки на матч',
    component: screens.BetsScreen,
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

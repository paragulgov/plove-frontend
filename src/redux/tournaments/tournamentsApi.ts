import { instance } from '../../base/api';
import { FetchAllTournamentsRequest, CreateTournamentValues } from './types';

export const TournamentsApi = {
  fetchTournaments(payload?: FetchAllTournamentsRequest) {
    const skip = payload?.skip;
    return instance.get(`tournaments?take=${5}&skip=${skip || 0}`);
  },
  fetchTournamentById(id: number) {
    return instance.get(`tournaments/${id}`);
  },
  fetchTournamentStatistic(tournamentId: number) {
    return instance.get(`statistics/tournament?id=${tournamentId}`);
  },
  createTournaments(payload: CreateTournamentValues) {
    return instance.post(`tournaments`, payload);
  },
};

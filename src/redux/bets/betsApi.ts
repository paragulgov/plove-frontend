import { instance } from '../../base/api';
import { CreateBetDto, GetBetsQuery } from './types';

export const BetsApi = {
  fetchBets({ matchId, take, skip }: GetBetsQuery) {
    return instance.get(`bets/match?id=${matchId}&take=${30}&skip=${skip || 0}`);
  },
  checkAccess(matchId: number) {
    return instance.get(`bets/checkAccess/${matchId}`);
  },
  createBet(payload: CreateBetDto) {
    return instance.post(`matches/bets`, payload);
  },
  updateBet(payload: CreateBetDto) {
    return instance.patch(`matches/bets`, payload);
  },
};

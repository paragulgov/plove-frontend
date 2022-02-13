import { instance } from '../../base/api';
import { CreateBetDto, GetBetsQuery, UpdateBetDto } from './types';

export const BetsApi = {
  fetchBets({ matchId, take, skip }: GetBetsQuery) {
    return instance.get(`bets/match?id=${matchId}&take=${30}&skip=${skip || 0}`);
  },
  checkAccess(matchId: number) {
    return instance.get(`bets/checkAccess/${matchId}`);
  },
  createBet(payload: CreateBetDto) {
    return instance.post(`bets`, payload);
  },
  updateBet(payload: UpdateBetDto) {
    const { id, ...data } = payload;
    return instance.patch(`matches/${id}`, data);
  },
};

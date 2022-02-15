import { instance } from '../../base/api';
import { CalculateMatchDto, CreateMatchDto, MatchesPayload, UpdateMatchRequestPayload } from './types';

export const MatchesApi = {
  fetchMatches({ tournamentId, take, skip }: MatchesPayload) {
    return instance.get(`matches/tournament?id=${tournamentId}&take=${20}&skip=${skip || 0}`);
  },
  fetchMatchById(id: number) {
    return instance.get(`matches/${id}`);
  },
  createMatch(payload: CreateMatchDto) {
    return instance.post(`matches`, payload);
  },
  updateMatch(payload: UpdateMatchRequestPayload) {
    const { id, ...data } = payload;
    return instance.patch(`matches/${id}`, data);
  },
  resultMatch(payload: CalculateMatchDto) {
    const { id, ...data } = payload;
    return instance.patch(`matches/result/${id}`, data);
  },
};

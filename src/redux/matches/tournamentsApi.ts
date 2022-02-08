import { instance } from '../../base/api';
import { MatchesPayload } from './types';

export const MatchesApi = {
  fetchMatches({ tournamentId, take, skip }: MatchesPayload) {
    return instance.get(`matches/tournament?id=${tournamentId}&take=${20}&skip=${skip || 0}`);
  },
};

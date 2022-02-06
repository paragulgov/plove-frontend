import { instance } from '../../base/api';

export const TournamentsApi = {
  fetchTournaments() {
    return instance.get('tournaments');
  },
};

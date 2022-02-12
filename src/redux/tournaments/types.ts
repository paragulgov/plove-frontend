import { Nullable } from '../../base/types/BaseTypes';

export interface TournamentsState {
  data: TournamentData[];
  currentTournament: Nullable<TournamentData>;
  total: number;
  skip: number;
  isLoading: boolean;
}

export interface TournamentData {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface FetchAllTournamentsResponse {
  data: TournamentData[];
  total: number;
}

export interface FetchAllTournamentsRequest {
  take?: number;
  skip?: number;
}

export interface CreateTournamentValues {
  name: string;
}

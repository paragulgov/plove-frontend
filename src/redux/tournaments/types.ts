import { Nullable } from '../../base/types/BaseTypes';

export interface TournamentsState {
  data: TournamentData[];
  currentTournament: Nullable<TournamentData>;
  total: number;
  skip: number;
  isLoading: boolean;
  table: TableData[];
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

export interface TableData {
  statistic_id: number;
  statistic_accurateScore: number;
  statistic_goalDifference: number;
  statistic_matchOutcome: number;
  statistic_points: number;
  statistic_userId: number;
  statistic_tournamentId: number;
  user_vkId: number;
  user_fullName: string;
}

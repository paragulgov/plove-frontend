export interface MatchesState {
  data: MatchData[];
  total: number;
  skip: number;
  isLoading: boolean;
}

export interface MatchData {
  id: number;
  homeTeam: string;
  awayTeam: string;
  homeTeamGoals: number | null;
  awayTeamGoals: number | null;
  isFinished: boolean;
  createdAt: string;
  updatedAt: string;
  betsWillEndAt: string;
}

export interface MatchesResponse {
  data: MatchData[];
  total: number;
}

export interface MatchesPayload {
  tournamentId: number;
  take?: number;
  skip?: number;
}

export interface CreateMatchValues {
  homeTeam: string;
  awayTeam: string;
}

export interface CreateMatchDto extends CreateMatchValues {
  betsWillEndAt: string;
  tournamentId: number;
}

export interface UpdateMatchRequestPayload {
  id: number;
  betsWillEndAt: string;
}

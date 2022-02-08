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

export interface TournamentsState {
  data: TournamentData[];
  isLoading: boolean;
}

export interface TournamentData {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

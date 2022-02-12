import { UserData } from '../user/types';

export interface BetsState {
  data: BetsData[];
  total: number;
  skip: number;
  isLoading: boolean;
}

export interface BetsData {
  id: number;
  homeTeamGoalsBet: number;
  awayTeamGoalsBet: number;
  isFinished: boolean;
  accurateScore: boolean;
  goalDifference: boolean;
  matchOutcome: boolean;
  points: number;
  createdAt: string;
  updatedAt: string;
  user: UserData;
}

export interface BetsResponse {
  data: BetsData[];
  total: number;
}

export interface GetBetsQuery {
  matchId: number;
  take?: number;
  skip?: number;
}

export interface CreateBetDto {
  homeTeam: string;
  awayTeam: string;
}

export interface UpdateBetDto extends CreateBetDto {
  id: number;
}

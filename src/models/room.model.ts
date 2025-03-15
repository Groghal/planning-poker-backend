import { User } from './user.model';

export interface Room {
  id: string;
  users: Record<string, User>;
  votes: Record<string, string>;
  showVotes: boolean;
  host: string;
  voteOptions?: string[];
} 
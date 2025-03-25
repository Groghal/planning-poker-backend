import { User } from './user.model';

export interface Room {
  roomId: string;
  users: Record<string, User>;
  votes: Record<string, string>;
  showVotes: boolean;
  host: string;
  voteOptions?: string[];
} 
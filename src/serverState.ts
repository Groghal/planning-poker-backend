// Define the Room interface
export interface User {
  id: string;
  username: string;
  vote: string | null;
}

export interface Room {
  roomId: string;
  users: Record<string, User>;
  votes: Record<string, string>;
  showVotes: boolean;
  host: string;
  voteOptions?: string[];
}

// Create a type for the rooms object
const rooms: Record<string, Room> = {};

export { rooms };
import { Room } from '../models/room.model';
import { User } from '../models/user.model';
import { AppError } from '../utils/errors';
import { rooms } from '../serverState';

class RoomService {
  createRoom(customRoomId?: string, voteOptions: string[] = ['1', '2', '3', '5', '8', '13']): Room {
    const roomId = customRoomId || `room-${Date.now()}`;
    
    if (rooms[roomId]) {
      throw new AppError('Room ID already exists', 400);
    }

    rooms[roomId] = {
      id: roomId,
      users: {},
      votes: {},
      showVotes: false,
      host: '',
      voteOptions
    };

    return rooms[roomId];
  }

  joinRoom(roomId: string, username: string): { userId: string; room: Room } {
    const room = this.getRoom(roomId);
    const userId = `user-${Date.now()}`;

    // Check if username already exists
    const userExists = Object.values(room.users).some(user => user.username === username);
    if (userExists) {
      throw new AppError('Username already taken in this room', 400);
    }

    room.users[userId] = {
      id: userId,
      username,
      vote: null
    };

    // If this is the first user, make them the host
    if (Object.keys(room.users).length === 1) {
      room.host = userId;
    }

    return { userId, room };
  }

  getRoom(roomId: string): Room {
    const room = rooms[roomId];
    if (!room) {
      throw new AppError('Room not found', 404);
    }
    return room;
  }

  revealVotes(roomId: string): Room {
    const room = this.getRoom(roomId);
    room.showVotes = true;
    return room;
  }

  resetVotes(roomId: string): Room {
    const room = this.getRoom(roomId);
    room.votes = {};
    room.showVotes = false;
    
    // Reset all user votes
    Object.keys(room.users).forEach(userId => {
      room.users[userId].vote = null;
    });

    return room;
  }

  submitVote(roomId: string, username: string, vote: string): void {
    const room = this.getRoom(roomId);
    
    // Find the user by username
    const userId = Object.keys(room.users).find(
      id => room.users[id].username === username
    );

    if (!userId) {
      throw new AppError('User not found in room', 404);
    }

    room.users[userId].vote = vote;
    room.votes[username] = vote;
  }

  deleteRoom(roomId: string): void {
    const room = this.getRoom(roomId);
    delete rooms[roomId];
  }
}

export const roomService = new RoomService(); 
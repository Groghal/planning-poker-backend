import { Request, Response } from 'express';
import { roomService } from '../services/room.service';
import { AppError } from '../utils/errors';
import { User } from '../models/user.model';

export class RoomController {
  createRoom(req: Request, res: Response): void {
    try {
      const { roomId: customRoomId, voteOptions } = req.body;
      const room = roomService.createRoom(customRoomId, voteOptions);
      res.status(201).json({ roomId: room.id, voteOptions: room.voteOptions });
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Internal Server Error' });
      }
    }
  }

  joinRoom(req: Request, res: Response): void {
    try {
      const { roomId } = req.params;
      const { username } = req.body;
      const { userId, room } = roomService.joinRoom(roomId, username);
      res.status(200).json({ message: 'Joined room', userId });
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Internal Server Error' });
      }
    }
  }

  revealVotes(req: Request, res: Response): void {
    try {
      const { roomId } = req.params;
      roomService.revealVotes(roomId);
      res.status(200).json({ message: 'Votes revealed' });
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Internal Server Error' });
      }
    }
  }

  resetVotes(req: Request, res: Response): void {
    try {
      const { roomId } = req.params;
      roomService.resetVotes(roomId);
      res.status(200).json({ message: 'Round reset' });
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Internal Server Error' });
      }
    }
  }

  getRoom(req: Request, res: Response): void {
    try {
      const { roomId } = req.params;
      const room = roomService.getRoom(roomId);
      const response: {
        users: Record<string, User>;
        showVotes: boolean;
        host: string;
        votes?: Record<string, string>;
      } = {
        users: room.users,
        showVotes: room.showVotes,
        host: room.host
      };
      
      if (room.showVotes) {
        response.votes = room.votes;
      }
      
      res.status(200).json(response);
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Internal Server Error' });
      }
    }
  }

  getVoteOptions(req: Request, res: Response): void {
    try {
      const { roomId } = req.params;
      const room = roomService.getRoom(roomId);
      res.status(200).json(room.voteOptions || ['0', '1', '2', '3', '5', '8', '13', '21', '34', '55', '89', '?']);
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Internal Server Error' });
      }
    }
  }

  deleteRoom(req: Request, res: Response): void {
    try {
      const { roomId } = req.params;
      roomService.deleteRoom(roomId);
      res.status(200).json({ message: 'Room deleted successfully' });
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Internal Server Error' });
      }
    }
  }

  submitVote(req: Request, res: Response): void {
    try {
      const { roomId } = req.params;
      const { username, vote } = req.body;
      roomService.submitVote(roomId, username, vote);
      res.status(200).json({ message: 'Vote recorded' });
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Internal Server Error' });
      }
    }
  }
}

export const roomController = new RoomController(); 
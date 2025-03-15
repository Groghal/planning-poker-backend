import { Router } from 'express';
import { roomController } from '../controllers/room.controller';

const router = Router();

/**
 * @swagger
 * /rooms:
 *   post:
 *     summary: Create a new room
 *     description: Creates a new planning poker room with optional custom room ID and vote options
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               roomId:
 *                 type: string
 *                 description: Custom room ID (optional)
 *                 example: "my-room"
 *               voteOptions:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Custom vote options (optional)
 *                 example: ["1", "2", "3", "5", "8", "13"]
 *     responses:
 *       201:
 *         description: Room created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 roomId:
 *                   type: string
 *                   description: The ID of the created room
 *                   example: "my-room"
 *                 voteOptions:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: Available vote options for the room
 *                   example: ["1", "2", "3", "5", "8", "13"]
 *       400:
 *         description: Room ID already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Room ID already exists"
 */
router.post('/', roomController.createRoom);

/**
 * @swagger
 * /rooms/{roomId}/join:
 *   post:
 *     summary: Join a user to a room
 *     parameters:
 *       - in: path
 *         name: roomId
 *         required: true
 *         schema:
 *           type: string
 */
router.post('/:roomId/join', roomController.joinRoom);

/**
 * @swagger
 * /rooms/{roomId}/reveal:
 *   post:
 *     summary: Reveal the votes in a room
 */
router.post('/:roomId/reveal', roomController.revealVotes);

/**
 * @swagger
 * /rooms/{roomId}/vote:
 *   post:
 *     summary: Submit a vote in a room
 *     parameters:
 *       - in: path
 *         name: roomId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Username of the voter
 *               vote:
 *                 type: string
 *                 description: The vote value
 *     responses:
 *       200:
 *         description: Vote recorded successfully
 *       404:
 *         description: Room or user not found
 */
router.post('/:roomId/vote', roomController.submitVote);

/**
 * @swagger
 * /rooms/{roomId}/reset:
 *   post:
 *     summary: Reset the voting round in a room
 */
router.post('/:roomId/reset', roomController.resetVotes);

/**
 * @swagger
 * /rooms/{roomId}/vote-options:
 *   get:
 *     summary: Get vote options for a room
 *     parameters:
 *       - in: path
 *         name: roomId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of vote options
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *       404:
 *         description: Room not found
 */
router.get('/:roomId/vote-options', roomController.getVoteOptions);

/**
 * @swagger
 * /rooms/{roomId}:
 *   get:
 *     summary: Get room information
 *     description: Retrieves information about a specific room, including users, votes (if revealed), and host
 *     parameters:
 *       - in: path
 *         name: roomId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the room to retrieve
 *         example: "my-room"
 *     responses:
 *       200:
 *         description: Room information retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: object
 *                   additionalProperties:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "user-1234567890"
 *                       username:
 *                         type: string
 *                         example: "John"
 *                       vote:
 *                         type: string
 *                         nullable: true
 *                         example: "5"
 *                 showVotes:
 *                   type: boolean
 *                   example: false
 *                 host:
 *                   type: string
 *                   example: "user-1234567890"
 *                 votes:
 *                   type: object
 *                   description: Only included if showVotes is true
 *                   additionalProperties:
 *                     type: string
 *                   example: {"John": "5", "Jane": "8"}
 *       404:
 *         description: Room not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Room not found"
 */
router.get('/:roomId', roomController.getRoom);

/**
 * @swagger
 * /rooms/{roomId}:
 *   delete:
 *     summary: Delete a room
 *     parameters:
 *       - in: path
 *         name: roomId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the room to delete
 *     responses:
 *       200:
 *         description: Room deleted successfully
 *       404:
 *         description: Room not found
 */
router.delete('/:roomId', roomController.deleteRoom);

export default router; 
import { Router } from 'express';
import roomRoutes from './room.routes';

const router = Router();

// Health check endpoint
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Health check endpoint
router.get('/health/startup', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Health check endpoint
router.get('/health/liveness', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Health check endpoint
router.get('/health/readiness', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

router.use('/rooms', roomRoutes);

export default router; 
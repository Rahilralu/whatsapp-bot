import express from 'express';
import { handleIncomingMessage } from '../controllers/bot.js';

const router = express.Router();

router.post('/', handleIncomingMessage);

router.get('/', (req, res) => {
  res.send('Webhook is working!');
});

export default router;
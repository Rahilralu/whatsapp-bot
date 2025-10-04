import express from 'express';
import { handleIncomingMessage } from '../controllers/bot.js';

const router = express.Router();

router.post('/whatsapp-webhook', handleIncomingMessage);

router.get('/whatsapp-webhook', (req, res) => {
  res.send('Webhook is working!');
});

export default router;
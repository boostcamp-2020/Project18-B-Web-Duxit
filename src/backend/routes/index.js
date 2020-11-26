import express from 'express';
import Games from '@game/Games';

const router = express.Router();

router.get('/rooms/:roomID', (req, res) => {
  const { roomID } = req.params;
  if (Games.isEnterableRoom(roomID)) {
    return res.status(200).json({});
  }

  return res.status(403).json({});
});

router.post('/rooms', (req, res) => {
  const roomID = Games.createGame();
  return res.status(200).json({ roomID });
});

export default router;

import express from 'express';
import Game from '@game/Game';
import Games from '@game/Games';

const router = express.Router();

// 해당 게임이 있는지 검사하는 로직
router.get('/rooms/:roomID', (req, res) => {
  const { roomID } = req.params;
  const game = Games.get(roomID);
  if (game && !game.IsPlaying()) {
    res.status(200).json({});
    return;
  }

  res.status(403).json({});
});

// 새로운 게임을 만드는 로직
router.post('/rooms', (req, res) => {
  const game = new Game();
  const roomID = game.getRoomID();
  Games.set(roomID, game);
  res.status(200).json({ roomID });
});

export default router;

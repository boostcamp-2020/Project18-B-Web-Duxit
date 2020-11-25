import express from 'express';
import Game from '@game/Game';

const Games = new Map();

const router = express.Router();

// 해당 게임이 있는지 검사하는 로직
router.get('/rooms/:roomID', (req, res) => {
  const { roomID } = req.params;
  const game = Games.get(roomID);
  if (game && !game.getIsGaming()) {
    res.status(200).end();
    return;
  }

  res.status(403).end();
});

// 새로운 게임을 만드는 로직
router.post('/rooms', (req, res) => {
  const game = new Game();
  const roomID = game.getRoomID();
  Games.set(roomID, game);
  res.status(200).json({ roomID });
});

export default router;

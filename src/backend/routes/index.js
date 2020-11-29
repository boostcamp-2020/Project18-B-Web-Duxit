import express from 'express';
import Games from '@game/Games';

const router = express.Router();

const getRoomsRouter = (req, res) => {
  const { roomID } = req.params;
  const game = Games.getGame(roomID);
  if (game && game.isEnterable(roomID)) {
    return res.status(200).json({});
  }

  return res.status(403).json({});
};

router.get('/rooms', getRoomsRouter);
router.get('/rooms/:roomID', getRoomsRouter);

router.post('/rooms', (req, res) => {
  const roomID = Games.createGame();
  return res.status(200).json({ roomID });
});

export default router;

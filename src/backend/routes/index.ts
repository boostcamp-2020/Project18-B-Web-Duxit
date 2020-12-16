import express, { Request, Response } from 'express';
import GameList from '@game/GameList';
import MESSAGE from '@utils/apiMessage.json'

const router = express.Router();

const getRoomsRouter = (req: Request, res: Response) => {
  const { roomID } = req.params;
  const game = GameList.getGame(roomID);

  if (!game) return res.status(403).json(MESSAGE.NOT_FOUND);
  if (game.isFull()) return res.status(403).json(MESSAGE.FULL);
  if (game.isAlreadyStart()) return res.status(403).json(MESSAGE.ALREADY_START);
  return res.status(200).json({});
};

router.get('/rooms', getRoomsRouter);
router.get('/rooms/:roomID', getRoomsRouter);

router.post('/rooms', (req: Request, res: Response) => {
  const roomID = GameList.createGame();
  return res.status(200).json({ roomID });
});

export default router;

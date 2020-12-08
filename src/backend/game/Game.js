import generateRandom from '@utils/generateRandom';
import GAME_STATE from '@utils/gameState';
import { PLAYER, CARD, TIME } from '@utils/number';
import { emit } from '@utils/socket';
import TOPIC from '@utils/cardTopic.json';
import GameList from '@game/GameList';
import socketIO from '@socket';
import User from './User';

export default class Game {
  constructor(roomID) {
    this.roomID = roomID;
    this.users = new Map();
    this.status = {
      state: GAME_STATE.WAITING,
      unusedCards: [],
      topic: '',
      turn: 0,
    };
  }

  start() {
    this.status = {
      ...this.status,
      state: GAME_STATE.TELLER,
      unusedCards: generateRandom.cards(CARD.DECK),
    };
    [...this.users.values()].forEach((user, index) => {
      user.initOnStart({ turnID: index });
    });

    const tellerID = this.startNewRound();
    setTimeout(() => {
      if (this.status.state === GAME_STATE.TELLER) {
        this.forceTellerSelect(tellerID);
      }
    }, TIME.WAIT_TELLER_SELECT);
  }

  end() {
    // 아직 사용되지 않은 함수
    this.status = {
      ...this.status,
      state: GAME_STATE.WAITING,
    };
  }

  updateState(state) {
    this.status = {
      ...this.status,
      state,
    };
  }

  isEnterable() {
    if (
      this.status.state !== GAME_STATE.WAITING ||
      this.users.size >= PLAYER.MAX
    )
      return false;
    return true;
  }

  addUser({ socketID }) {
    const nickname = generateRandom.nickname();
    const color = generateRandom.color();
    const user = new User({ socketID, nickname, color });
    GameList.addID(socketID, this);
    this.users.set(socketID, user);
    return user;
  }

  removeUser({ socketID }) {
    this.users.delete(socketID);
    GameList.removeID(socketID);
    if (this.users.size < 1) {
      GameList.removeID(this.roomID);
    }
  }

  getUser(socketID) {
    if (!this.users.has(socketID)) return null;
    return this.users.get(socketID);
  }

  getUsersProfile() {
    return [...this.users.keys()].map((socketID) => {
      return { ...this.users.get(socketID).getProfile(), socketID };
    });
  }

  updateUserProfile({ socketID, nickname, color }) {
    const user = this.users.get(socketID);
    user.setColor(color);
    user.setNickname(nickname);
  }

  dealCards(cards, count) {
    const newCards = this.status.unusedCards.slice(0, count);
    this.status = {
      ...this.status,
      unusedCards: [...this.status.unusedCards.slice(count)],
    };
    return [...cards, ...newCards];
  }

  getUserArray() {
    return [...this.users.values()];
  }

  selectCardFromUser({ socketID, teller = true }) {
    const user = this.users.get(socketID);
    const cardID = generateRandom.pickOneFromArray(user.cards);
    user.submittedCard = cardID;
    return teller ? { cardID, topic: TOPIC[cardID] } : { cardID };
  }

  forceTellerSelect(tellerID) {
    const { cardID, topic } = this.selectCardFromUser({
      socketID: tellerID,
      teller: true,
    });
    this.updateTopic(topic);
    this.users.forEach((user) => {
      const { socketID } = user;
      const isTeller = socketID === tellerID;
      const name = isTeller ? 'teller select card' : 'teller decision';
      const params = isTeller ? { cardID, topic } : { cardID };
      emit({ socketID, name, params });
    });
    this.updateState(GAME_STATE.GUESSER);
  }

  forceGuesserSelect() {
    this.getUserArray()
      .filter((user) => user.submittedCard === null)
      .forEach((user) => {
        const { socketID } = user;
        const { cardID } = this.selectCardFromUser({ socketID, teller: false });
        emit({ socketID, name: 'guesser select card', params: { cardID } });
        emit({
          users: this.users,
          name: 'other guesser decision',
          params: { playerID: socketID },
        });
      });
    this.updateState(GAME_STATE.GUESSER);
  }

  startNewRound() {
    // Initialize Game status
    this.status = {
      ...this.status,
      turn: this.status.turn + 1,
    };
    const {
      users,
      status: { unusedCards, turn },
    } = this;
    const isFirstTurn = turn === 1;
    const teller = [...users.values()][turn % users.size];
    const { socketID: tellerID } = teller;
    const requiredCardCount = isFirstTurn ? CARD.HAND : 1;

    // 카드가 부족한지 체크
    const outOfDeck = unusedCards.length < users.size * requiredCardCount;
    // if (outOfDeck) {
    //   // TODO: 점수나 승자같은 결과를 내면서 턴을 끝내야되요~
    //   return;
    // }

    users.forEach((user) => {
      const cards = this.dealCards(user.cards, requiredCardCount);
      const params = { tellerID, cards };
      user.initOnRound(params);
      emit({ socketID: user.socketID, name: 'get round data', params });
    });

    return tellerID;
  }

  updateTopic(topic) {
    this.status = {
      ...this.status,
      topic,
    };
  }
}

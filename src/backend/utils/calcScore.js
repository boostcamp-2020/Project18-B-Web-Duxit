// 출제자
// 출제자 (0 < 정답자 < 맞추는 사람.length): +3  => 보너스

// 맞추는 사람
// 정답을 맞힌 경우 : +3점 => 정답
// 내 카드를 선택한 사람이 있는 경우 : +1 * (속인 사람의 수) => 보너스
// 모두 정답을 맞힌 경우 : 출제자를 제외한 전원 +2점 => 보너스
// 정답자가 1명도 없는 경우 : 출제자를 제외한 전원 +2점 => 보너스

// 맞춰서받은점수: 3, => 정답
// 속여서받은점수: 1, => 보너스A
// 스토리텔러로받은점수: 3, => 보너스B
// 모두틀리거나맞아서받은점수: 2, => 보너스C

const isTellerWin = (guessers, correctAnswer) => {
  const correctGuessers = guessers.filter(
    (guesser) => guesser.votedCard === correctAnswer,
  ).length;

  if (correctGuessers === 0 || correctGuessers === guessers.length)
    return false;
  return true;
};

const calcScore = (game) => {
  let result;
  let bonusB;
  let bonusC;
  const users = game.getUserArray();
  const [teller] = users.filter((user) => user.isTeller);
  const guessers = users.filter((user) => !user.isTeller);

  // Teller
  // [다 맞추거나 아무도 못 맞춤]인지 [한명이라도 맞춤]인지 확인
  if (isTellerWin(guessers, teller.submittedCard)) {
    // 보너스B, 보너스C 점수 할당
    bonusB = 0;
    bonusC = 2;
  } else {
    // 보너스B, 보너스C 점수 할당
    bonusB = 3;
    bonusC = 0;
  }

  // teller = {correct: 0, bonus: 보너스B 점수}
  result = { [teller.socketID]: { correct: 0, bonus: bonusB } };

  // Guesser
  guessers.forEach((guesser) => {
    let correct;
    let bonusA;
    // 내가 정답을 맞췄는지 확인
    if (guesser.votedCard === teller.submittedCard) {
      // 정답 점수 할당
      correct = 3;
    } else {
      // 정답 점수 할당
      correct = 0;
    }

    // 다른 사람들이 내 카드를 얼마나 찍었는지 확인
    // 보너스A 점수 할당
    bonusA = guessers.filter(
      (otherGuesser) => otherGuesser.votedCard === guesser.submittedCard,
    ).length;

    // guesser = {correct: 정답, bonus: 보너스A + 보너스C}
    result = {
      ...result,
      [guesser.socketID]: { correct, bonus: bonusA + bonusC },
    };
  });

  return result;
};

// 플레이어 수 만큼 다시 계산해야 하는 비효율성!! 이지만 혹시 몰라서 만들어 봄
const getCorrectScore = (game, user) => {
  return calcScore(game)[user.socketID].correct;
};

const getBonusScore = (game, user) => {
  return calcScore(game)[user.socketID].bonus;
};

export { getCorrectScore, getBonusScore, calcScore };

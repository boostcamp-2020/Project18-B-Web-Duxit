/* ///SCORE RULE///
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
*/ /// //////////////

// 모든 Guesser가 맞추거나 모든 Guesser가 틀리면 Teller가 진 것으로 간주
const isTellerWin = (guessers, correctAnswer) => {
  const correctGuessers = guessers.filter(
    (guesser) => guesser.votedCard === correctAnswer,
  ).length;

  if (correctGuessers === 0 || correctGuessers === guessers.length)
    return false;
  return true;
};

const mapScore = (correctScore, bonusScore) => ({ correctScore, bonusScore });

const getScoreMap = (game) => {
  const scoreMap = new Map();
  const users = game.getUsers();
  const [teller] = users.filter((user) => user.isTeller);
  const guessers = users.filter((user) => !user.isTeller);

  // Teller
  // [다 맞추거나 아무도 못 맞춤]인지 [한명이라도 맞춤]인지 확인
  const tellerWin = isTellerWin(guessers, teller.submittedCard);
  // 보너스B, 보너스C 점수 할당
  const [bonusB, bonusC] = tellerWin ? [0, 2] : [3, 0];

  // teller = {correct: 0, bonus: 보너스B 점수}
  scoreMap.set(teller.socketID, mapScore(0, bonusB));

  // Guesser
  guessers.forEach((guesser) => {
    // 내가 정답을 맞췄는지 확인
    const correct = guesser.votedCard === teller.submittedCard;
    // 정답 점수 할당
    const correctScore = correct ? 3 : 0;

    // 다른 사람들이 내 카드를 얼마나 찍었는지 확인
    // 보너스A 점수 할당
    const bonusA = guessers.filter(
      (otherGuesser) => otherGuesser.votedCard === guesser.submittedCard,
    ).length;

    // guesser = {correct: 정답, bonus: 보너스A + 보너스C}
    scoreMap.set(guesser.socketID, mapScore(correctScore, bonusA + bonusC));
  });

  return scoreMap;
};

export { getScoreMap };

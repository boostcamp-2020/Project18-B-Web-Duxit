const randomStrings = new Set();

const generateRandomString = () =>
  Math.random().toString(36).substr(2, 5).toUpperCase();

export default {
  nickname: () => '코딩하는 덕싯',
  color: () => '#222222',
  code: () => {
    let randomString = generateRandomString();
    while (randomStrings.has(randomString)) {
      randomString = generateRandomString();
    }
    randomStrings.add(randomString);
    return randomString;
  },
};

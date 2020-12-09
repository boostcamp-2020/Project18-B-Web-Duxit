const hexColorRegex = /^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/;

export const getRandomColor = () => {
  const seed = Date.now() * Math.random();
  const result = seed.toString(16).replace('.', '').slice(0, 6);
  if (hexColorRegex.test(result)) return `#${result}`;
  return getRandomColor();
};

export const testHexColorString = (str) =>
  str.startsWith('#') && hexColorRegex.test(str.slice(1));

// https://stackoverflow.com/a/41491220
export const shouldUseBlack = (str) => {
  const hexColor = str.slice(1);
  const [, sr, sg, sb] = hexColorRegex.exec(hexColor) || [];
  const [r, g, b] = [sr, sg, sb].map((c) => parseInt(c, 16));
  return r * 0.299 + g * 0.587 + b * 0.114 > 186;
};

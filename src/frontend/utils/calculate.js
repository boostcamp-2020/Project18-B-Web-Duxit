import { ROOT } from './dom';

export const calcAbsolutePosFromRoot = (event) => {
  const { clientX: cursorX, clientY: cursorY } = event;
  const { x: rootX, y: rootY, width, height } = ROOT.getBoundingClientRect();
  const x = ((cursorX - rootX) / width) * 100;
  const y = ((cursorY - rootY) / height) * 100;

  return { x, y };
};

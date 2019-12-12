import { boardSize } from "../../init/initBoard";

export const calculSquarePosition = square => {
  const squareSize = boardSize / 8;
  const axeX = ["a", "b", "c", "d", "e", "f", "g", "h"];

  const squareX = axeX.indexOf(square[0]);
  const squareY = square[1];

  const xPosition = squareX * squareSize;
  const yPosition = boardSize - squareSize * squareY;

  return { xPosition, yPosition };
};

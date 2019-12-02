import { pieceName, squarePiece } from "./pieceAndSquare";

const axeX = ["a", "b", "c", "d", "e", "f", "g", "h"];
const squareNames = [];
export const squareList = [];
export const pieceList = [];

for (let i = 1; i < 9; i++) {
  for (let j = 1; j < 9; j++) {
    squareNames.push(axeX[j - 1] + i);
  }
}

for (let i = 0; i < squareNames.length; i++) {
  let firstColor = null;
  let secondColor = null;
  if (squareNames[i].slice(-1) % 2) {
    firstColor = "white";
    secondColor = "black";
  } else {
    firstColor = "black";
    secondColor = "white";
  }
  squareList.push({
    name: squareNames[i],
    color: i % 2 ? firstColor : secondColor
  });
}

squareList.reverse();

for (let i = 0; i < pieceName.length; i++) {
  const splitPiece = pieceName[i].split("_");
  pieceList.push({
    name: pieceName[i],
    currentSquare: squarePiece[i],
    color: splitPiece[2],
    type: splitPiece[0],
    coverage: []
  });
}
console.log(pieceList);

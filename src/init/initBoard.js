import { pieceName, squarePieceInit } from "./pieceAndSquare";

const axeX = ["a", "b", "c", "d", "e", "f", "g", "h"];
const squareNames = [];
export const boardList = [];
export const pieceList = [];

createBoard();
initPiece();

function createBoard() {
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
    boardList.push({
      squareName: squareNames[i],
      squareColor: i % 2 ? firstColor : secondColor,
      currentPiece: null
    });
  }
}

function initPiece() {
  boardList.reverse();
  for (let i = 0; i < pieceName.length; i++) {
    const splitPiece = pieceName[i].split("_");

    boardList.forEach(el => {
      if (el.squareName === squarePieceInit[i]) {
        el.currentPiece = pieceName[i];
      }
    });

    pieceList.push({
      name: pieceName[i],
      currentSquare: squarePieceInit[i],
      pieceColor: splitPiece[2],
      type: splitPiece[0],
      movePossible: [],
      historic: [squarePieceInit[i]],
      hasMoved: false
    });
  }
}

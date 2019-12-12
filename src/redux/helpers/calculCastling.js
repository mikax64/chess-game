export const calculCastling = (type, pieceList, pieceColor) => {
  const opponentColor = pieceColor === "white" ? "black" : "white";
  const king = pieceList.filter(
    piece => piece.name === `king_1_${pieceColor}`
  )[0];

  const rookOne = pieceList.filter(
    piece => piece.name === `rook_1_${pieceColor}`
  )[0];
  const rookTwo = pieceList.filter(
    piece => piece.name === `rook_2_${pieceColor}`
  )[0];

  const isEmptySquare = (squareX, squareY) => {
    const axeX = "abcdefgh";
    const letter = axeX.charAt(squareX - 1);
    const square = letter + squareY;

    const squareToCheck = pieceList.filter(
      piece => piece.currentSquare === square
    );

    return squareToCheck.length === 0 ? true : false;
  };
  const isSquareThreatened = (
    square1,
    square2,
    square3,
    square4,
    square5 = null
  ) => {
    for (let i = 0; i < pieceList.length; i++) {
      if (
        pieceList[i].pieceColor === opponentColor &&
        (pieceList[i].movePossible.includes(square1) ||
          pieceList[i].movePossible.includes(square2) ||
          pieceList[i].movePossible.includes(square3) ||
          pieceList[i].movePossible.includes(square4) ||
          pieceList[i].movePossible.includes(square5))
      ) {
        return true;
      }
    }
    return false;
  };

  if (
    type === "short" &&
    pieceColor === "white" &&
    king.hasMoved === false &&
    rookTwo !== undefined &&
    rookTwo.hasMoved === false &&
    isEmptySquare(6, 1) &&
    isEmptySquare(7, 1) &&
    isSquareThreatened("e1", "f1", "g1", "h1") === false
  ) {
    return "g1";
  }
  if (
    type === "long" &&
    pieceColor === "white" &&
    king.hasMoved === false &&
    rookOne !== undefined &&
    rookOne.hasMoved === false &&
    isEmptySquare(2, 1) &&
    isEmptySquare(3, 1) &&
    isEmptySquare(4, 1) &&
    isSquareThreatened("a1", "b1", "c1", "d1", "e1") === false
  ) {
    return "b1";
  }
  if (
    type === "short" &&
    pieceColor === "black" &&
    king.hasMoved === false &&
    rookTwo !== undefined &&
    rookTwo.hasMoved === false &&
    isEmptySquare(6, 8) &&
    isEmptySquare(7, 8) &&
    isSquareThreatened("e8", "f8", "g8", "h8") === false
  ) {
    return "g8";
  }
  if (
    type === "long" &&
    pieceColor === "black" &&
    king.hasMoved === false &&
    rookOne !== undefined &&
    rookOne.hasMoved === false &&
    isEmptySquare(2, 8) &&
    isEmptySquare(3, 8) &&
    isEmptySquare(4, 8) &&
    isSquareThreatened("a8", "b8", "c8", "d8", "e8") === false
  ) {
    return "b8";
  }
  return false;
};

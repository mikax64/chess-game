export const kingCheck = (pieceList, color) => {
  const opposite = color === "white" ? "black" : "white";
  const king = pieceList.filter(piece => piece.name === `king_1_${color}`)[0]
    .currentSquare;

  const pieceOpposite = pieceList.filter(
    piece => piece.pieceColor === opposite
  );

  for (let i = 0; i < pieceOpposite.length; i++) {
    const moves = pieceOpposite[i].movePossible;
    if (moves.indexOf(king) > -1) {
      return true;
    }
  }

  return false;
};

export const calculMovePossible = (pieceList, piece) => {
  const piecePosition = pieceList;
  const axeX = "abcdefgh";
  const pieceName = piece.name.split("_")[0];

  const pieceAxeY = Number(piece.currentSquare.charAt(1));
  const pieceAxeX = axeX.indexOf(piece.currentSquare.charAt(0)) + 1;

  const pieceColor = piece.color;
  const movePossible = [];

  const addMove = (squareX, squareY) => {
    const letter = axeX.charAt(squareX - 1);
    const squareToAdd = letter + squareY;

    const targetSquare = piecePosition.filter(
      piece => piece.currentSquare === squareToAdd
    );

    if (targetSquare.length === 0 || targetSquare[0].color !== pieceColor) {
      movePossible.push(squareToAdd);
    }
  };

  const increase = move => {
    return move + 1;
  };
  const decrease = move => {
    return move - 1;
  };
  console.log(pieceName);
  switch (pieceName) {
    case "pawn": {
      let moveX = pieceAxeX;
      let moveY = pieceAxeY;

      // if (pieceColor === "white") {
      //   if (pieceAxeX > 1 && pieceAxeX < 8 && pieceAxeY < 8) {
      //     addMove(decrease(moveX), increase(moveY));
      //     addMove(increase(moveX), increase(moveY));
      //   } else if (pieceAxeX === 1 && pieceAxeY < 8) {
      //     addMove(increase(moveX), increase(moveY));
      //   } else if (pieceAxeX === 8 && pieceAxeY < 8) {
      //     addMove(decrease(moveX), increase(moveY));
      //   }
      // } else {
      //   if (pieceAxeX > 1 && pieceAxeX < 8 && pieceAxeY > 1) {
      //     addMove(decrease(moveX), decrease(moveY));
      //     addMove(increase(moveX), decrease(moveY));
      //   } else if (pieceAxeX === 1 && pieceAxeY > 1) {
      //     addMove(increase(moveX), decrease(moveY));
      //   } else if (pieceAxeX === 8 && pieceAxeY > 1) {
      //     addMove(decrease(moveX), decrease(moveY));
      //   }
      // }

      if (pieceColor === "white") {
        if (pieceAxeY < 8) {
          addMove(moveX, moveY + 1);
          if (!piece.hasMoved) {
            addMove(moveX, moveY + 2);
          }
        }
      } else {
        if (pieceAxeY > 1) {
          addMove(moveX, moveY - 1);
          if (!piece.hasMoved) {
            addMove(moveX, moveY - 2);
          }
        }
      }

      return movePossible;
    }
    case "bishop": {
      bishopMoves("topRight");
      bishopMoves("topLeft");
      bishopMoves("bottomRight");
      bishopMoves("bottomLeft");

      function bishopMoves(direction) {
        let moveX = pieceAxeX;
        let moveY = pieceAxeY;

        const moveChange = () => {
          switch (direction) {
            case "topRight": {
              moveX++;
              moveY++;
              break;
            }
            case "topLeft": {
              moveX--;
              moveY++;
              break;
            }
            case "bottomRight": {
              moveX++;
              moveY--;
              break;
            }
            case "bottomLeft": {
              moveX--;
              moveY--;
              break;
            }
            default:
              return null;
          }
        };

        moveChange();

        while (
          moveX > 0 &&
          moveX < 9 &&
          moveY > 0 &&
          moveY < 9 &&
          checkSquare(moveX, moveY)
        ) {
          addMove(moveX, moveY);
          moveChange();
        }
      }

      return movePossible;
    }
    default: {
      return ["nopawn"];
    }
  }
};

import { pieceList } from "../../init/initBoard";

export const pieceReducer = (state = pieceList, action) => {
  switch (action.type) {
    case "CALCUL_PIECE": {
      return state.map(piece => {
        return { ...piece, coverage: calculAttack(piece) };
      });
    }

    default: {
      return state;
    }
  }
};

const calculAttack = piece => {
  const axeX = "abcdefgh";
  const pieceName = piece.name.split("_")[0];

  const pieceAxeY = Number(piece.currentSquare.charAt(1));
  const pieceAxeX = axeX.indexOf(piece.currentSquare.charAt(0)) + 1;

  const pieceColor = piece.color;
  const moveCoverage = [];

  //   const getXletter = xNumber => {
  //     return axeX.charAt(xNumber - 1);
  //   };
  const addMove = (squareX, squareY) => {
    const letter = axeX.charAt(squareX - 1);

    moveCoverage.push(letter + squareY);
  };

  const increase = move => {
    return move + 1;
  };
  const decrease = move => {
    return move - 1;
  };

  switch (pieceName) {
    case "pawn": {
      let moveX = pieceAxeX;
      let moveY = pieceAxeY;

      if (pieceColor === "white") {
        if (pieceAxeX > 1 && pieceAxeX < 8 && pieceAxeY < 8) {
          addMove(decrease(moveX), increase(moveY));
          addMove(increase(moveX), increase(moveY));
        } else if (pieceAxeX === 1 && pieceAxeY < 8) {
          addMove(increase(moveX), increase(moveY));
        } else if (pieceAxeX === 8 && pieceAxeY < 8) {
          addMove(decrease(moveX), increase(moveY));
        }
      } else {
        if (pieceAxeX > 1 && pieceAxeX < 8 && pieceAxeY > 1) {
          addMove(decrease(moveX), decrease(moveY));
          addMove(increase(moveX), decrease(moveY));
        } else if (pieceAxeX === 1 && pieceAxeY > 1) {
          addMove(increase(moveX), decrease(moveY));
        } else if (pieceAxeX === 8 && pieceAxeY > 1) {
          addMove(decrease(moveX), decrease(moveY));
        }
      }
      return moveCoverage;
    }
    case "bishop": {
      bishopMoves("topRight");
      bishopMoves("topLeft");

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
            default:
              return null;
          }
        };

        moveChange();

        while (moveX > 0 && moveX < 9 && moveY > 0 && moveY < 9) {
          addMove(moveX, moveY);
          moveChange();
        }
      }

      function topRightMove() {
        let moveXTopRight = pieceAxeX;
        let moveYTopRight = pieceAxeY;
        moveXTopRight++;
        moveYTopRight++;

        while (
          moveXTopRight > 0 &&
          moveXTopRight < 9 &&
          moveYTopRight > 0 &&
          moveYTopRight < 9
        ) {
          addMove(moveXTopRight, moveYTopRight);
          moveXTopRight++;
          moveYTopRight++;
        }
      }
      function topLeftMove() {
        let moveXTopLeft = pieceAxeX;
        let moveYTopLeft = pieceAxeY;
        moveXTopLeft--;
        moveYTopLeft++;

        while (
          moveXTopLeft > 0 &&
          moveXTopLeft < 9 &&
          moveYTopLeft > 0 &&
          moveYTopLeft < 9
        ) {
          addMove(moveXTopLeft, moveYTopLeft);
          moveXTopLeft--;
          moveYTopLeft++;
        }
      }

      //   while (
      //     moveXTopLeft > 1 &&
      //     moveXTopLeft < 8 &&
      //     moveYTopLeft > 0 &&
      //     moveYTopLeft < 8
      //   ) {
      //     moveXTopLeft--;
      //     moveYTopLeft++;
      //     addMove(decreaseX(moveXTopLeft) + increaseY(moveYTopLeft));
      //   }
      //   while (moveX > 0 && moveX < 9 && moveY > 0 && moveY < 9) {
      //     addMove(increaseX(moveX) + decreaseY(moveY));
      //     moveX--;
      //     moveY++;
      //   }
      //   while (moveX > 0 && moveX < 9 && moveY > 0 && moveY < 9) {
      //     addMove(decreaseX(moveX) + decreaseY(moveY));
      //     moveX--;
      //     moveY++;
      //   }
      return moveCoverage;
    }
    default: {
      return ["nopawn"];
    }
  }
};

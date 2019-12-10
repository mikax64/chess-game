export const calculMovePossible = (pieceList, piece) => {
  const axeX = "abcdefgh";
  const pieceName = piece.name.split("_")[0];

  const pieceAxeY = Number(piece.currentSquare.charAt(1));
  const pieceAxeX = axeX.indexOf(piece.currentSquare.charAt(0)) + 1;

  const pieceColor = piece.pieceColor;
  const movePossible = [];

  const addMove = (squareX, squareY) => {
    const letter = axeX.charAt(squareX - 1);
    const squareToAdd = letter + squareY;

    movePossible.push(squareToAdd);
  };

  const addMoveKing = (
    squareX,
    squareY,
    shortCastling = false,
    longCastling = false
  ) => {
    const letter = axeX.charAt(squareX - 1);
    const squareToAdd = letter + squareY;

    if (shortCastling) {
    }

    function castling(type) {
      if (pieceColor === "white") {
        const rookName = "";
      }
    }

    if (
      squareX > 0 &&
      squareX < 9 &&
      squareY > 0 &&
      squareY < 9 &&
      (isEmptySquare(squareX, squareY) || isOpponent(squareX, squareY))
    ) {
      movePossible.push(squareToAdd);
    }
  };

  const addMoveKnight = (squareX, squareY) => {
    const letter = axeX.charAt(squareX - 1);
    const squareToAdd = letter + squareY;

    if (
      squareX > 0 &&
      squareX < 9 &&
      squareY > 0 &&
      squareY < 9 &&
      (isEmptySquare(squareX, squareY) || isOpponent(squareX, squareY))
    ) {
      movePossible.push(squareToAdd);
    }
  };

  const addMovePawn = (squareX, squareY, isDiagonal, isEnPassant) => {
    const letter = axeX.charAt(squareX - 1);
    const squareToAdd = letter + squareY;

    if (
      isEmptySquare(squareX, squareY) ||
      (isOpponent(squareX, squareY) && isDiagonal) ||
      (isEnPassant && isEmptySquare(squareX, squareY))
    ) {
      movePossible.push(squareToAdd);
    }
  };

  switch (pieceName) {
    case "pawn": {
      let moveX = pieceAxeX;
      let moveY = pieceAxeY;
      let isDiagonal = false;
      let isEnPassant = false;

      if (pieceColor === "white") {
        if (pieceAxeY < 8) {
          addMovePawn(moveX, moveY + 1, isDiagonal, isEnPassant);
          if (pieceAxeX < 8 && isOpponent(moveX + 1, moveY + 1)) {
            isDiagonal = true;
            addMovePawn(moveX + 1, moveY + 1, isDiagonal, isEnPassant);
          }
          if (
            pieceAxeX < 8 &&
            pieceAxeY === 5 &&
            isOpponentEnPassant(moveX + 1, moveY)
          ) {
            isEnPassant = true;
            addMovePawn(moveX + 1, moveY + 1, isDiagonal, isEnPassant);
          }
          if (pieceAxeX > 1 && isOpponent(moveX - 1, moveY + 1)) {
            isDiagonal = true;
            addMovePawn(moveX - 1, moveY + 1, isDiagonal, isEnPassant);
          }
          if (
            pieceAxeX > 1 &&
            pieceAxeY === 5 &&
            isOpponentEnPassant(moveX - 1, moveY)
          ) {
            isEnPassant = true;
            addMovePawn(moveX - 1, moveY + 1, isDiagonal, isEnPassant);
          }
          if (!piece.hasMoved) {
            addMovePawn(moveX, moveY + 2, isDiagonal, isEnPassant);
          }
        }
      } else {
        if (pieceAxeY > 1) {
          addMovePawn(moveX, moveY - 1, isDiagonal);
          if (pieceAxeX < 8 && isOpponent(moveX + 1, moveY - 1)) {
            isDiagonal = true;
            addMovePawn(moveX + 1, moveY - 1, isDiagonal);
          }

          if (
            pieceAxeX < 8 &&
            pieceAxeY === 4 &&
            isOpponentEnPassant(moveX + 1, moveY)
          ) {
            isEnPassant = true;
            addMovePawn(moveX + 1, moveY - 1, isDiagonal, isEnPassant);
          }
          if (pieceAxeX > 1 && isOpponent(moveX - 1, moveY - 1)) {
            isDiagonal = true;
            addMovePawn(moveX - 1, moveY - 1, isDiagonal);
          }
          if (
            pieceAxeX > 1 &&
            pieceAxeY === 4 &&
            isOpponentEnPassant(moveX - 1, moveY)
          ) {
            isEnPassant = true;
            addMovePawn(moveX - 1, moveY - 1, isDiagonal, isEnPassant);
          }
          if (!piece.hasMoved) {
            addMovePawn(moveX, moveY - 2, isDiagonal);
          }
        }
      }

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

      return movePossible;
    }
    case "king": {
      let moveX = pieceAxeX;
      let moveY = pieceAxeY;

      addMoveKing(moveX, moveY + 1);
      addMoveKing(moveX + 1, moveY + 1);
      addMoveKing(moveX + 1, moveY);
      addMoveKing(moveX + 1, moveY - 1);
      addMoveKing(moveX, moveY - 1);
      addMoveKing(moveX - 1, moveY - 1);
      addMoveKing(moveX - 1, moveY);
      addMoveKing(moveX - 1, moveY + 1);

      return movePossible;
    }
    case "knight": {
      let moveX = pieceAxeX;
      let moveY = pieceAxeY;

      addMoveKnight(moveX + 2, moveY + 1);
      addMoveKnight(moveX + 1, moveY + 2);
      addMoveKnight(moveX + 2, moveY - 1);
      addMoveKnight(moveX + 1, moveY - 2);
      addMoveKnight(moveX - 2, moveY + 1);
      addMoveKnight(moveX - 1, moveY + 2);
      addMoveKnight(moveX - 2, moveY - 1);
      addMoveKnight(moveX - 1, moveY - 2);

      return movePossible;
    }
    case "bishop": {
      moves("topRight");
      moves("topLeft");
      moves("bottomRight");
      moves("bottomLeft");

      return movePossible;
    }
    case "rook": {
      moves("top");
      moves("bottom");
      moves("left");
      moves("right");

      return movePossible;
    }
    case "queen": {
      moves("top");
      moves("bottom");
      moves("left");
      moves("right");
      moves("topRight");
      moves("topLeft");
      moves("bottomRight");
      moves("bottomLeft");

      return movePossible;
    }
    default: {
      return ["nopawn"];
    }
  }

  function moves(direction) {
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
        case "top": {
          moveY++;
          break;
        }
        case "bottom": {
          moveY--;
          break;
        }
        case "left": {
          moveX--;
          break;
        }
        case "right": {
          moveX++;
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
      isEmptySquare(moveX, moveY)
    ) {
      addMove(moveX, moveY);
      moveChange();
    }
    if (isOpponent(moveX, moveY)) {
      addMove(moveX, moveY);
    }
  }

  function isEmptySquare(squareX, squareY) {
    const letter = axeX.charAt(squareX - 1);
    const square = letter + squareY;

    const squareToCheck = pieceList.filter(
      piece => piece.currentSquare === square
    );

    return squareToCheck.length === 0 ? true : false;
  }

  function isOpponent(squareX, squareY) {
    const letter = axeX.charAt(squareX - 1);
    const square = letter + squareY;

    const squareToCheck = pieceList.filter(
      piece => piece.currentSquare === square
    );

    if (squareToCheck[0] && squareToCheck[0].pieceColor !== pieceColor) {
      return true;
    }
  }

  function isOpponentEnPassant(squareX, squareY, pieceColor) {
    const letter = axeX.charAt(squareX - 1);
    const square = letter + squareY;

    const squareToCheck = pieceList.filter(
      piece => piece.currentSquare === square
    );

    if (
      squareToCheck[0] &&
      squareToCheck[0].type === "pawn" &&
      squareToCheck[0].pieceColor !== pieceColor &&
      squareToCheck[0].relativeHistoric[
        squareToCheck[0].relativeHistoric.length - 1
      ] === square
    ) {
      return true;
    }
  }
};

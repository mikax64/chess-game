import { kingCheck } from "../helpers/kingCheck";
import { kingCheckMoves } from "../helpers/kingCheckMoves";

import { calculCastling } from "./../helpers/calculCastling";

export const calculMoves = () => {
  return {
    type: "CALCUL_MOVES"
  };
};
export const resetMoves = color => {
  return {
    type: "RESET_MOVES",
    payload: color
  };
};

export const updateHistoric = () => {
  return {
    type: "UPDATE_HISTORIC"
  };
};

export const updateRelativeHistoric = () => {
  return {
    type: "UPDATE_RELATIVE_HISTORIC"
  };
};

export const updatePiecePosition = (pieceName, newPosition) => {
  return {
    type: "UPDATE_POSITION_PIECE",
    payload: pieceName,
    meta: newPosition
  };
};

export const removePiece = indexPiece => {
  return {
    type: "REMOVE_PIECE",
    payload: indexPiece
  };
};
export const promotionPiece = (pieceName, endName) => {
  return {
    type: "PROMOTION_PIECE",
    payload: pieceName,
    meta: endName
  };
};

export const updateEnPassant = (pieceName, target) => {
  return {
    type: "UPDATE_EN_PASSANT",
    payload: pieceName,
    meta: target
  };
};

export const kingCheckUpdate = color => {
  return {
    type: "KING_CHECK_UPDATE",
    payload: color
  };
};

export const kingCheckRemove = color => {
  return {
    type: "KING_CHECK_REMOVE",
    payload: color
  };
};

export const updateKingCheckMoves = piece => {
  return {
    type: "UPDTATE_KING_CHECK_MOVES",
    payload: piece
  };
};

export const updateCastling = (piece, square, add) => {
  return {
    type: "UPDTATE_CASTLING",
    payload: piece,
    meta: square,
    add
  };
};

export const displayMovePossible = moves => {
  return {
    type: "DISPLAY_MOVE_POSSIBLE",
    payload: moves
  };
};

export const updateCheckMate = () => {
  return {
    type: "UPDATE_CHECKMATE"
  };
};

export const updatePiece = (pieceName, newPosition) => {
  return (dispatch, getState) => {
    dispatch(updatePiecePosition(pieceName, newPosition));
    dispatch(updateHistoric());
    dispatch(updateRelativeHistoric());
    dispatch(calculMoves());

    const { pieces, game } = getState();
    if (kingCheck(pieces, "white") === true) {
      dispatch(kingCheckUpdate("white"));
    } else {
      if (kingCheck(pieces, "black") === true) {
        dispatch(kingCheckUpdate("black"));
      } else {
        dispatch(kingCheckRemove());
      }
    }

    kingCheckMoves(pieces, game.playerTurn);

    if (isCheckMate()) {
      dispatch(updateCheckMate());
    }
    checkCastling();

    function isCheckMate() {
      const { pieces, game } = getState();
      for (let i = 0; i < pieces.length; i++) {
        if (pieces[i].pieceColor === game.playerTurn) {
          const moves = pieces[i].movePossible;

          if (moves.length > 0) return false;
        }
      }
      return true;
    }

    function checkCastling() {
      const castling = (type, kingColor) => {
        if (calculCastling(type, pieces, kingColor) !== false) {
          const piece = pieces.filter(
            piece => piece.name === `king_1_${kingColor}`
          )[0];
          dispatch(
            updateCastling(piece, calculCastling(type, pieces, kingColor), true)
          );
        }
      };

      castling("short", "white");
      castling("long", "white");
      castling("short", "black");
      castling("long", "black");
    }
  };
};

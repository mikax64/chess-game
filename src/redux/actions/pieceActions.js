import { kingCheck } from "../helpers/kingCheck";
import { kingCheckMoves } from "../helpers/kingCheckMoves";

export const calculMoves = () => {
  return {
    type: "CALCUL_MOVES"
  };
};
export const resetMoves = () => {
  return {
    type: "RESET_MOVES"
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
  };
};

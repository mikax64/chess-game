export const calculMovePossible = () => {
  return {
    type: "CALCUL_MOVE_POSSIBLE"
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

export const updatePiece = (pieceName, newPosition) => {
  return dispatch => {
    dispatch(updatePiecePosition(pieceName, newPosition));
    dispatch(updateHistoric());
    dispatch(updateRelativeHistoric());
    dispatch(calculMovePossible());
  };
};

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

export const updatePiecePosition = (pieceName, newPosition) => {
  return {
    type: "UPDATE_POSITION_PIECE",
    payload: pieceName,
    meta: newPosition
  };
};

export const removePiece = pieceName => {
  return {
    type: "REMOVE_PIECE",
    payload: pieceName
  };
};

export const updatePiece = (pieceName, newPosition) => {
  return dispatch => {
    dispatch(updatePiecePosition(pieceName, newPosition));
    dispatch(updateHistoric());
    dispatch(calculMovePossible());
  };
};

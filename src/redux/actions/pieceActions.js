import { kingCheck } from "../helpers/kingCheck";
import { calculMovePossible } from "../helpers/calculMovePossible";

export const calculMoves = () => {
  return {
    type: "CALCUL_MOVES"
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

export const updatePiece = (pieceName, newPosition) => {
  return (dispatch, getState) => {
    dispatch(updatePiecePosition(pieceName, newPosition));
    dispatch(updateHistoric());
    dispatch(updateRelativeHistoric());
    dispatch(calculMoves());
    const { pieces } = getState();
    if (kingCheck(pieces, "white") === true) {
      dispatch(kingCheckUpdate("white"));
    } else {
      if (kingCheck(pieces, "black") === true) {
        dispatch(kingCheckUpdate("black"));
      } else {
        dispatch(kingCheckRemove());
      }
    }

    const { game } = getState();

    if (game.kingCheck.isCheck === true) {
      const kingColor = game.kingCheck.color;
      // const oppositeColor = kingColor === "white" ? "black" : "white";

      for (let i = 0; i < pieces.length; i++) {
        if (pieces[i].pieceColor === kingColor) {
          const moves = pieces[i].movePossible;
          const pieceName = pieces[i].name;

          for (let j = 0; j < moves.length; j++) {
            const newPieceList = JSON.parse(JSON.stringify(pieces));

            const currentPiece = newPieceList.filter(
              piece => piece.name === pieceName
            )[0];

            const objIndex = newPieceList.findIndex(
              piece => piece.name === pieceName
            );

            // newPieceList.map(piece =>
            //   piece.name === pieceName
            //     ? { ...piece, currentSquare: moves[j] }
            //     : piece
            // );

            newPieceList[objIndex].currentSquare = moves[j];
            newPieceList[objIndex].hasMoved = true;
            // newPieceList[objIndex].movePossible = calculMovePossible(
            //   newPieceList,
            //   currentPiece
            // );

            for (let k = 0; k < newPieceList.length; k++) {
              newPieceList[k].movePossible = calculMovePossible(
                newPieceList,
                newPieceList[k]
              );
            }

            console.log(pieceName);
            console.log(newPieceList);
            console.log(kingCheck(newPieceList, kingColor));
          }
        }
      }
    }
  };
};

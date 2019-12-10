import store from "../store";
import { kingCheck } from "./kingCheck";
import { calculMovePossible } from "./calculMovePossible";
import { resetMoves, updateKingCheckMoves } from "../actions/pieceActions";

export const kingCheckMoves = (pieces, colorToCheck) => {
  const movesPieces = [];

  for (let i = 0; i < pieces.length; i++) {
    if (pieces[i].pieceColor === colorToCheck) {
      const moves = pieces[i].movePossible;
      const pieceName = pieces[i].name;

      for (let j = 0; j < moves.length; j++) {
        const newPieceList = JSON.parse(JSON.stringify(pieces));

        const objIndex = newPieceList.findIndex(
          piece => piece.name === pieceName
        );

        newPieceList[objIndex].currentSquare = moves[j];
        newPieceList[objIndex].hasMoved = true;

        const pieceToRemoveIndex = newPieceList.findIndex(
          piece =>
            piece.currentSquare === newPieceList[objIndex].currentSquare &&
            piece.name !== pieceName
        );

        newPieceList.splice(pieceToRemoveIndex, 1);

        for (let k = 0; k < newPieceList.length; k++) {
          newPieceList[k].movePossible = calculMovePossible(
            newPieceList,
            newPieceList[k]
          );
        }
        if (kingCheck(newPieceList, colorToCheck) === false) {
          const pieceExist = movesPieces.findIndex(
            piece => piece.pieceName === pieceName
          );

          if (pieceExist > -1) {
            movesPieces[pieceExist].movePossible.push(moves[j]);
          } else {
            movesPieces.push({
              pieceName: pieceName,
              movePossible: [moves[j]]
            });
          }
        }
      }
    }
  }
  store.dispatch(resetMoves());
  for (let i = 0; i < movesPieces.length; i++) {
    // console.log(movesPieces[i]);
    store.dispatch(updateKingCheckMoves(movesPieces[i]));
  }
};

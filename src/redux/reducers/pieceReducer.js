import { pieceList } from "../../init/initBoard";
import { calculMovePossible } from "../helpers/calculMovePossible";

export const pieceReducer = (state = pieceList, action) => {
  switch (action.type) {
    case "UPDATE_POSITION_PIECE": {
      return state.map(piece => {
        if (piece.name === action.payload) {
          return { ...piece, currentSquare: action.meta, hasMoved: true };
        }
        return { ...piece };
      });
    }
    case "CALCUL_MOVE_POSSIBLE": {
      return state.map(piece => {
        return { ...piece, movePossible: calculMovePossible(state, piece) };
      });
    }
    case "UPDATE_HISTORIC": {
      return state.map(piece => {
        return {
          ...piece,
          historic: [...piece.historic, piece.currentSquare]
        };
      });
    }

    default: {
      return state;
    }
  }
};

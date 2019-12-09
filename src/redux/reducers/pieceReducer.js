import { pieceList } from "../../init/initBoard";
import { calculMovePossible } from "../helpers/calculMovePossible";
import { getRelativeHistoric } from "../helpers/getRelativeHistoric";

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
    case "CALCUL_MOVES": {
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
    case "UPDATE_RELATIVE_HISTORIC": {
      return state.map(piece => {
        return {
          ...piece,
          relativeHistoric: [
            ...piece.relativeHistoric,
            getRelativeHistoric(piece.historic, piece.currentSquare)
          ]
        };
      });
    }
    case "REMOVE_PIECE": {
      return [
        ...state.slice(0, action.payload),
        ...state.slice(action.payload + 1)
      ];
    }

    default: {
      return state;
    }
  }
};

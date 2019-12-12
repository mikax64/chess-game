import { pieceList } from "../../init/initBoard";
import { calculMovePossible } from "../helpers/calculMovePossible";
import { getRelativeHistoric } from "../helpers/getRelativeHistoric";
import { calculSquarePosition } from "../helpers/calculSquarePosition";

export const pieceReducer = (state = pieceList, action) => {
  switch (action.type) {
    case "UPDATE_POSITION_PIECE": {
      console.log("update");
      return state.map(piece => {
        if (piece.name === action.payload) {
          return {
            ...piece,
            currentSquare: action.meta,
            hasMoved: true,
            xPosition: calculSquarePosition(action.meta).xPosition,
            yPosition: calculSquarePosition(action.meta).yPosition
          };
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

    case "RESET_MOVES": {
      return state.map(piece => {
        if (piece.pieceColor === action.payload)
          return {
            ...piece,
            movePossible: [""]
          };
        return { ...piece };
      });
    }

    case "UPDTATE_KING_CHECK_MOVES": {
      return state.map(piece => {
        if (piece.name === action.payload.pieceName) {
          return {
            ...piece,
            movePossible: action.payload.movePossible
          };
        } else {
          return { ...piece };
        }
      });
    }

    case "UPDTATE_CASTLING": {
      return state.map(piece => {
        if (piece.name === action.payload.name) {
          if (action.add) {
            return {
              ...piece,
              movePossible: [...piece.movePossible, action.meta]
            };
          }
        }

        return { ...piece };
      });
    }

    default: {
      return state;
    }
  }
};

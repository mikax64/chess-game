const inititalState = {
  playerTurn: "white",
  globalHistoric: { pieceMove: [] },
  kingCheck: { isCheck: false, color: null }
};

export const gameReducer = (state = inititalState, action) => {
  switch (action.type) {
    case "PLAYER_TURN": {
      return {
        ...state,
        playerTurn: state.playerTurn === "white" ? "black" : "white"
      };
    }
    case "UPDATE_GLOBAL_HISTORIC": {
      return {
        ...state,
        globalHistoric: [...state.globalHistoric]
      };
    }

    case "KING_CHECK_UPDATE": {
      return {
        ...state,
        kingCheck: { ...state.kingCheck, isCheck: true, color: action.payload }
      };
    }
    case "KING_CHECK_REMOVE": {
      return {
        ...state,
        kingCheck: { ...state.kingCheck, isCheck: false, color: null }
      };
    }
    default: {
      return state;
    }
  }
};

const inititalState = {
  playerTurn: "white",
  globalHistoric: { pieceMove: [] }
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
    default: {
      return state;
    }
  }
};

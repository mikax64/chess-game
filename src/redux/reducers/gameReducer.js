const inititalState = {
  playerTurn: "white"
};

export const gameReducer = (state = inititalState, action) => {
  switch (action.type) {
    case "PLAYER_TURN": {
      return {
        ...state,
        playerTurn: state.playerTurn === "white" ? "black" : "white"
      };
    }
    default: {
      return state;
    }
  }
};

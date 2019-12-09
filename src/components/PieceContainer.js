import React, { Component } from "react";
import { connect } from "react-redux";
import Draggable from "react-draggable";
import { updatePiece, removePiece } from "../redux/actions/pieceActions";
import {
  changePlayerTurn,
  updateGlobalHistoric
} from "../redux/actions/gameActions";

class PieceContainer extends Component {
  constructor(props) {
    super(props);
    const { positionpiece } = props;

    this.state = {
      initStyleTop: positionpiece.current.offsetTop,
      initStyleLeft: positionpiece.current.offsetLeft,

      styleTop: positionpiece.current.offsetTop,
      styleLeft: positionpiece.current.offsetLeft,
      styleEvent: "initial",
      pieceDragged: null
    };

    //this.pieceRef = React.createRef();
  }

  componentDidMount() {
    const { refName } = this.props;
    console.log(this["pieceRef_pawn_4_white"]);
  }

  onStartDrag = e => {
    const { refParent, refName, pieces } = this.props;
    const sizeSquare = e.target.offsetWidth / 2;

    this.setState({
      styleTop: e.clientY - refParent.current.offsetTop - sizeSquare,
      styleLeft: e.clientX - refParent.current.offsetLeft - sizeSquare,
      styleEvent: "none", // to get the target mouseUp on Square,
      pieceDragged: e.target
    });

    console.log(pieces);
  };
  onStopDrag = e => {
    const {
      updatePiece,
      removePiece,
      changePlayerTurn,
      pieces,
      game,
      data: { name, pieceColor, type, historic }
    } = this.props;

    const { pieceDragged } = this.state;

    const targetX = e.target.offsetLeft;
    const targetY = e.target.offsetTop;

    let targetSquare;
    const movePossible = pieces.filter(piece => piece.name === name)[0]
      .movePossible;

    if (e.target.getAttribute("data-name") !== null) {
      targetSquare = e.target.getAttribute("data-name");
    }
    if (e.target.getAttribute("data-piece") !== null) {
      const target = e.target.getAttribute("data-piece");
      const piece = pieces.filter(piece => piece.name === target)[0];
      const indexPiece = pieces.indexOf(piece);

      targetSquare = piece.currentSquare;
      if (
        movePossible.includes(targetSquare) &&
        pieceColor === game.playerTurn
      ) {
        removePiece(indexPiece);
      }
    }

    //refParent.current.querySelectorAll("[data-piece='pawn_2_white']").remove()

    if (movePossible.includes(targetSquare) && pieceColor === game.playerTurn) {
      this.setState({
        styleTop: targetY,
        styleLeft: targetX,
        initStyleTop: targetY,
        initStyleLeft: targetX,
        styleEvent: "initial"
      });
      updatePiece(name, targetSquare);
      updateGlobalHistoric(pieceDragged.getAttribute("data-name"));
      changePlayerTurn();
      removeEnPassant();

      function removeEnPassant() {
        if (
          type === "pawn" &&
          e.target.getAttribute("data-name") !== null &&
          historic.length > 0
        ) {
          const lastSquareX = historic[historic.length - 1].split("")[0];
          const lastSquareY = historic[historic.length - 1].split("")[1];
          const currentSquareX = e.target
            .getAttribute("data-name")
            .split("")[0];

          if (lastSquareX !== currentSquareX) {
            const indexTarget = pieces.findIndex(
              piece => piece.currentSquare === currentSquareX + lastSquareY
            );

            removePiece(indexTarget);
          }
        }
      }
    } else {
      this.setState({
        styleTop: this.state.initStyleTop,
        styleLeft: this.state.initStyleLeft,
        styleEvent: "initial"
      });
    }
  };

  render() {
    const {
      data: { name }
    } = this.props;

    const { styleTop, styleLeft, styleEvent } = this.state;

    const styles = {
      position: "absolute",
      top: styleTop + "px",
      left: styleLeft + "px",
      pointerEvents: styleEvent
    };
    return (
      <Draggable
        position={{ x: 0, y: 0 }}
        onStart={this.onStartDrag}
        onStop={this.onStopDrag}
      >
        <div className={`piece`} style={styles} data-piece={name}>
          {name}
        </div>
      </Draggable>
    );
  }
}

const mapStateToProps = state => {
  return {
    board: state.board,
    pieces: state.pieces,
    game: state.game
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updatePiece: (pieceName, newPosition) =>
      dispatch(updatePiece(pieceName, newPosition)),
    removePiece: indexPiece => dispatch(removePiece(indexPiece)),
    changePlayerTurn: () => dispatch(changePlayerTurn()),
    updateGlobalHistoric: pieceDragged =>
      dispatch(updateGlobalHistoric(pieceDragged))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PieceContainer);

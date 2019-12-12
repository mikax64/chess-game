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
    const {
      data: { xPosition, yPosition }
    } = props;

    this.state = {
      styleEvent: "initial",
      pieceDragged: null
    };

    //this.pieceRef = React.createRef();
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
    //console.log(pieces);
  };
  onStopDrag = e => {
    const {
      updatePiece,
      removePiece,
      changePlayerTurn,
      pieces,
      game,
      data: { name, pieceColor, type, historic, xPosition, yPosition }
    } = this.props;

    const { pieceDragged } = this.state;

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

    if (movePossible.includes(targetSquare) && pieceColor === game.playerTurn) {
      this.setState(
        {
          styleEvent: "initial"
        },
        () => {
          changePlayerTurn();
          updatePiece(name, targetSquare);
          updateGlobalHistoric(pieceDragged.getAttribute("data-name"));

          removeEnPassant();
          castling();
        }
      );

      function castling() {
        const piece = pieceDragged.getAttribute("data-piece").split("_")[0];
        const pieceFullName = pieceDragged.getAttribute("data-piece");
        const hasMoved = pieces.filter(piece => piece.name === pieceFullName)[0]
          .hasMoved;

        console.log(hasMoved);

        if (!hasMoved && piece === "king" && targetSquare === "g1") {
          updatePiece("rook_2_white", "f1");
        }
        if (!hasMoved && piece === "king" && targetSquare === "b1") {
          updatePiece("rook_2_white", "c1");
        }
        if (!hasMoved && piece === "king" && targetSquare === "g8") {
          updatePiece("rook_2_black", "f8");
        }
        if (!hasMoved && piece === "king" && targetSquare === "b8") {
          updatePiece("rook_2_white", "c8");
        }
      }

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
      refName,
      data: { name }
    } = this.props;

    const { styleTop, styleLeft, styleEvent } = this.state;
    const {
      pieces,
      data: { xPosition, yPosition }
    } = this.props;

    const styles = {
      position: "absolute",
      top: yPosition + "px",
      left: xPosition + "px",
      pointerEvents: styleEvent
    };
    return (
      <Draggable
        position={{ x: 0, y: 0 }}
        onStart={this.onStartDrag}
        onStop={this.onStopDrag}
      >
        <div ref={refName} className={`piece`} style={styles} data-piece={name}>
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

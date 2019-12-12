import React, { Component } from "react";
import { connect } from "react-redux";
import Draggable from "react-draggable";
import {
  updatePiece,
  removePiece,
  promotionPiece
} from "../redux/actions/pieceActions";
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
      styleTop: null,
      styleLeft: null,
      styleEvent: "initial",
      pieceDragged: null,
      isDragged: false
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
      pieceDragged: e.target,
      isDragged: true
    });
  };
  onStopDrag = e => {
    const {
      updatePiece,
      removePiece,
      promotionPiece,
      changePlayerTurn,
      pieces,
      game,
      data: { name, pieceColor, type, historic }
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
          styleEvent: "initial",
          isDragged: false
        },
        () => {
          changePlayerTurn();
          updatePiece(name, targetSquare);
          updateGlobalHistoric(pieceDragged.getAttribute("data-name"));

          removeEnPassant();
          handleCastling();
          handlePromotion();
        }
      );

      function handlePromotion() {
        const pieceName = pieceDragged.getAttribute("data-piece");
        const piece = pieceName.split("_")[0];
        console.log(piece);

        if (
          (piece === "pawn" && parseInt(targetSquare[1]) === 8) ||
          (piece === "pawn" && parseInt(targetSquare[1]) === 1)
        ) {
          const numberOfQueens = pieces.filter(piece => {
            return piece.type === "queen" && piece.pieceColor === pieceColor;
          });

          const newNumberQueen = numberOfQueens.length + 1;
          const endName = `_${newNumberQueen}_${pieceColor}`;

          promotionPiece(pieceName, endName);
        }
      }

      function handleCastling() {
        const piece = pieceDragged.getAttribute("data-piece").split("_")[0];
        const pieceFullName = pieceDragged.getAttribute("data-piece");
        const hasMoved = pieces.filter(piece => piece.name === pieceFullName)[0]
          .hasMoved;

        if (!hasMoved && piece === "king" && targetSquare === "g1") {
          updatePiece("rook_2_white", "f1");
        }
        if (!hasMoved && piece === "king" && targetSquare === "b1") {
          updatePiece("rook_1_white", "c1");
        }
        if (!hasMoved && piece === "king" && targetSquare === "g8") {
          updatePiece("rook_2_black", "f8");
        }
        if (!hasMoved && piece === "king" && targetSquare === "b8") {
          updatePiece("rook_1_black", "c8");
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
        styleEvent: "initial",
        isDragged: false
      });
    }
  };

  render() {
    const {
      refName,
      data: { name }
    } = this.props;

    const { styleEvent, styleTop, styleLeft, isDragged } = this.state;
    const {
      data: { xPosition, yPosition, type, pieceColor }
    } = this.props;

    const styles = {
      position: "absolute",
      top: yPosition + "px",
      left: xPosition + "px",
      pointerEvents: styleEvent,
      zIndex: 1
    };

    if (isDragged) {
      styles.top = styleTop + "px";
      styles.left = styleLeft + "px";
      styles.zIndex = 10;
    } else {
      styles.top = yPosition + "px";
      styles.left = xPosition + "px";
    }

    return (
      <Draggable
        position={{ x: 0, y: 0 }}
        onStart={this.onStartDrag}
        onStop={this.onStopDrag}
      >
        <div
          ref={refName}
          className={`piece ${type}-${pieceColor}`}
          style={styles}
          data-piece={name}
        ></div>
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
    promotionPiece: (pieceName, endName) =>
      dispatch(promotionPiece(pieceName, endName)),
    changePlayerTurn: () => dispatch(changePlayerTurn()),
    updateGlobalHistoric: pieceDragged =>
      dispatch(updateGlobalHistoric(pieceDragged))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PieceContainer);

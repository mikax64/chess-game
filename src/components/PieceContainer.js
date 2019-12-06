import React, { Component } from "react";
import { connect } from "react-redux";
import Draggable from "react-draggable";
import { updatePiece, removePiece } from "../redux/actions/pieceActions";
import { changePlayerTurn } from "../redux/actions/gameActions";

class PieceContainer extends Component {
  constructor(props) {
    super(props);
    const { positionpiece } = props;

    this.state = {
      initStyleTop: positionpiece.current.offsetTop,
      initStyleLeft: positionpiece.current.offsetLeft,

      styleTop: positionpiece.current.offsetTop,
      styleLeft: positionpiece.current.offsetLeft,
      styleEvent: "initial"
    };
  }

  onStartDrag = e => {
    const { refParent, pieces } = this.props;
    const sizeSquare = e.target.offsetWidth / 2;

    this.setState({
      styleTop: e.clientY - refParent.current.offsetTop - sizeSquare,
      styleLeft: e.clientX - refParent.current.offsetLeft - sizeSquare,
      styleEvent: "none" // to get the target mouseUp on Square
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
      data: { name, pieceColor }
    } = this.props;

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

      targetSquare = piece.currentSquare;
      if (
        movePossible.includes(targetSquare) &&
        pieceColor === game.playerTurn
      ) {
        e.target.style.display = "none";
        removePiece(target);
      }
    }

    //console.log(pieces.filter(piece => piece.movePossible ))
    //console.log(this.refs.refParent.refs[`squareRef_b4`].current.offsetTops);
    console.log(pieceColor + game.playerTurn);
    if (movePossible.includes(targetSquare) && pieceColor === game.playerTurn) {
      this.setState({
        styleTop: targetY,
        styleLeft: targetX,
        initStyleTop: targetY,
        initStyleLeft: targetX,
        styleEvent: "initial"
      });
      console.log("OKKKKK");
      updatePiece(name, targetSquare);
      changePlayerTurn();
    } else {
      this.setState({
        styleTop: this.state.initStyleTop,
        styleLeft: this.state.initStyleLeft,
        styleEvent: "initial"
      });
      console.log("NOOOOOO");
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
    removePiece: pieceName => dispatch(removePiece(pieceName)),
    changePlayerTurn: () => dispatch(changePlayerTurn())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PieceContainer);

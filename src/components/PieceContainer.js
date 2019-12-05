import React, { Component } from "react";
import { connect } from "react-redux";
import Draggable from "react-draggable";
import { updateBoard } from "../redux/actions/pieceActions";

class PieceContainer extends Component {
  constructor(props) {
    super(props);
    const {
      positionpiece,

      data: { name }
    } = props;

    this.state = {
      initStyleTop: positionpiece.current.offsetTop,
      initStyleLeft: positionpiece.current.offsetLeft,

      styleTop: positionpiece.current.offsetTop,
      styleLeft: positionpiece.current.offsetLeft,
      styleEvent: "initial"
    };
  }

  onStartDrag = e => {
    const { refParent } = this.props;
    const sizeSquare = e.target.offsetWidth / 2;

    this.setState({
      styleTop: e.clientY - refParent.current.offsetTop - sizeSquare,
      styleLeft: e.clientX - refParent.current.offsetLeft - sizeSquare,
      styleEvent: "none" // to get the target mouseUp on Square
    });
  };
  onStopDrag = e => {
    const {
      updateBoard,
      pieces,
      data: { name }
    } = this.props;
    const targetSquare = e.target.getAttribute("data-name");

    const movePossible = pieces.filter(piece => piece.name === name)[0]
      .movePossible;

    //console.log(pieces.filter(piece => piece.movePossible ))
    //console.log(this.refs.refParent.refs[`squareRef_b4`].current.offsetTops);
    if (movePossible.includes(targetSquare)) {
      this.setState({
        styleTop: e.target.offsetTop,
        styleLeft: e.target.offsetLeft,
        initStyleTop: e.target.offsetTop,
        initStyleLeft: e.target.offsetLeft,
        styleEvent: "initial"
      });
      updateBoard(name, targetSquare);
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
        <div className={`piece`} style={styles}>
          {name}
        </div>
      </Draggable>
    );
  }
}

const mapStateToProps = state => {
  return {
    squares: state.squares,
    pieces: state.pieces
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateBoard: (pieceName, newPosition) =>
      dispatch(updateBoard(pieceName, newPosition))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PieceContainer);

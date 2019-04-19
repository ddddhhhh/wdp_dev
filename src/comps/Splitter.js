import * as React from "react";
import * as S from "./StyledComponents";

export default class Splitter extends React.Component {
  handleMouseDown(e) {
    console.log("down");
    this.props.onSplitterMouseDown(this.props.id);
  }
  handleMouseMove(e) {
    this.props.onSplitterMouseMove(e, this.props.id);
  }
  handleMouseUp(e) {
    console.log("up");
    this.props.onSplitterMouseUp(this.props.id);
  }
  render() {
    return (
      <S.Splitter
        {...this.props}
        onMouseDown={this.handleMouseDown.bind(this)}
        onMouseMove={this.handleMouseMove.bind(this)}
        onMouseUp={this.handleMouseUp.bind(this)}
      />
    );
  }
}

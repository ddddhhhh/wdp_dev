import * as React from "react";
import ImageButton from "./ImageButton";
import Image from "../../images/close.png";

export default class CloseButton extends React.Component {
  render() {
    return (
      <ImageButton
        src={Image}
        visible={this.props.visible}
        onClick={this.props.onClick}
      />
    );
  }
}

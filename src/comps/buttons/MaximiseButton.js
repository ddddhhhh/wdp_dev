import * as React from "react";
import ImageButton from "./ImageButton";
import Image from "../../images/test.png";

export default class MaximiseButton extends React.Component {
  render() {
    return <ImageButton src={Image} onClick={this.props.onClick} />;
  }
}

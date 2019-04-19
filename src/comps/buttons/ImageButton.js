import * as React from "react";
import * as S from "../StyledComponents";

export default class ImageButton extends React.Component {
  render() {
    return <S.ImageButton {...this.props} onClick={this.props.onClick} />;
  }
}

ImageButton.defaultProps = {
  visible: true
};

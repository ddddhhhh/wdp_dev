import * as React from "react";
import CloseButton from "../buttons/CloseButton";
import * as S from "../StyledComponents";

export default class CloseTool extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <S.Tool>
        <CloseButton onClick={this.props.onClick} />
      </S.Tool>
    );
  }
}

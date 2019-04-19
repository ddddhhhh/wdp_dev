import * as React from "react";
import MaximiseButton from "../buttons/MaximiseButton";
import * as S from "../StyledComponents";

export default class MaximiseTool extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <S.Tool>
        <MaximiseButton onClick={this.props.onClick} />
      </S.Tool>
    );
  }
}

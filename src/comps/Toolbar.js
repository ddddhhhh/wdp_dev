import * as React from "react";
import * as S from "./StyledComponents";
import MaximiseTool from "./tools/MaximiseTool";
import CloseTool from "./tools/CloseTool";

export class Toolbar extends React.Component {
  constructor(props) {
    super(props);

    this.innerDiv = React.createRef();
  }
  componentDidMount() {
    //console.log(this.innerDiv.current.clientWidth);
  }
  render() {
    return (
      <S.Toolbar ref={this.innerDiv} isDragging={this.props.isDragging}>
        {this.props.maximise && (
          <MaximiseTool onClick={this.props.onToolClick} tooltip="tooltiptip" />
        )}
        {this.props.closable && (
          <CloseTool onClick={this.props.onToolClick} tooltip="tooltiptip2" />
        )}
      </S.Toolbar>
    );
  }
}

Toolbar.defaultProps = {
  closable: true,
  maximise: true
};

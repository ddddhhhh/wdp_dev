import * as React from "react";
import CloseButton from "./buttons/CloseButton";
import * as S from "./StyledComponents";

export default class Tab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleTooltip: false,
      visibleCloseButton: false
    };
  }
  handleTabClick(e) {
    this.props.onClick(this.props.id);
  }
  handleTabCloseClock(e) {
    this.props.onCloseClick(this.props.id);
    e.stopPropagation();
  }
  handleMouseEnter(e) {
    this.setState({
      visibleCloseButton: true
    });
  }
  handleMouseLeave(e) {
    this.setState({
      visibleCloseButton: false
    });
  }
  render() {
    return (
      <S.Tab
        selected={this.props.selected}
        isDragging={this.props.isDragging}
        onClick={this.handleTabClick.bind(this)}
        onMouseEnter={this.handleMouseEnter.bind(this)}
        onMouseLeave={this.handleMouseLeave.bind(this)}
      >
        <S.TabTitle>{this.props.title}</S.TabTitle>
        {this.props.closable && (
          <CloseButton
            visible={this.state.visibleCloseButton}
            onClick={this.handleTabCloseClock.bind(this)}
          />
        )}
      </S.Tab>
    );
  }
}

Tab.defaultProps = {
  closable: true,
  selected: false
};
